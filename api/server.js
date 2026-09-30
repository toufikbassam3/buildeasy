'use strict';

const express = require('express');
const { Pool } = require('pg');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { promisify } = require('node:util');
const scrypt = promisify(crypto.scrypt);

const app = express();
const port = Number(process.env.PORT || 3001);
const sessionCookie = 'buildeasy_session';
const sessionDurationMs = 7 * 24 * 60 * 60 * 1000;
const authAttempts = new Map();
const pool = new Pool({
  host: process.env.PGHOST || 'db',
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || 'buildeasy',
  user: process.env.PGUSER || 'buildeasy',
  password: process.env.PGPASSWORD
});

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use((req, res, next) => {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.get('origin')) {
    try {
      if (new URL(req.get('origin')).host !== req.get('host')) return res.status(403).json({ error: 'Cross-site request rejected.' });
    } catch (_error) { return res.status(403).json({ error: 'Invalid request origin.' }); }
  }
  next();
});
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});
function limitAuthAttempts(req, res, next) {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const recent = (authAttempts.get(key) || []).filter(time => now - time < 15 * 60 * 1000);
  if (recent.length >= 15) return res.status(429).json({ error: 'Too many account attempts. Wait 15 minutes and try again.' });
  recent.push(now);
  authAttempts.set(key, recent);
  if (authAttempts.size > 5000) {
    for (const [ip, times] of authAttempts) if (!times.length || now - times[times.length - 1] >= 15 * 60 * 1000) authAttempts.delete(ip);
  }
  next();
}

function cleanString(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}
function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function validDateOnly(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map(part => {
    const [name, ...value] = part.trim().split('=');
    return [name, value.join('=')];
  }).filter(([name]) => name));
}
function sessionToken(req) {
  return parseCookies(req.headers.cookie || '')[sessionCookie] || '';
}
function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}
function writeSessionCookie(res, token) {
  const secure = process.env.COOKIE_SECURE === 'true' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${sessionCookie}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${sessionDurationMs / 1000}${secure}`);
}
function clearSessionCookie(res) {
  const secure = process.env.COOKIE_SECURE === 'true' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${sessionCookie}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`);
}
async function passwordHash(password) {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `${salt.toString('hex')}:${hash.toString('hex')}`;
}
async function passwordMatches(password, stored) {
  if (typeof stored !== 'string' || !stored.includes(':')) return false;
  const [salt, digest] = stored.split(':');
  const expected = Buffer.from(digest, 'hex');
  const actual = await scrypt(password, Buffer.from(salt, 'hex'), expected.length);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}
async function findSession(req) {
  const token = sessionToken(req);
  if (!/^[a-f0-9]{64}$/i.test(token)) return null;
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const result = await pool.query(
    `SELECT s.role, s.customer_id, s.supplier_id, s.admin_id,
            c.full_name, c.email AS customer_email, c.phone AS customer_phone,
            p.business_name, p.contact_name, p.email AS supplier_email,
            p.phone AS supplier_phone, p.city, p.state, p.status AS supplier_status,
            a.email AS admin_email
       FROM api_sessions s
       LEFT JOIN customers c ON c.id = s.customer_id
       LEFT JOIN suppliers p ON p.id = s.supplier_id
       LEFT JOIN admin_users a ON a.id = s.admin_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`, [hash]);
  return result.rows[0] || null;
}
function accountView(session) {
  if (!session) return null;
  if (session.role === 'CUSTOMER') return {
    role: 'CUSTOMER', id: String(session.customer_id), fullName: session.full_name,
    email: session.customer_email, phone: session.customer_phone || ''
  };
  if (session.role === 'SUPPLIER') return {
    role: 'SUPPLIER', id: String(session.supplier_id), businessName: session.business_name,
    ownerName: session.contact_name || '', email: session.supplier_email,
    phone: session.supplier_phone || '', city: session.city || '',
    state: session.state || '', status: session.supplier_status
  };
  return { role: 'ADMIN', id: String(session.admin_id), email: session.admin_email };
}
async function startSession(res, role, id) {
  const token = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const expiry = new Date(Date.now() + sessionDurationMs);
  await pool.query(
    `INSERT INTO api_sessions (token_hash, role, customer_id, supplier_id, admin_id, expires_at)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [hash, role, role === 'CUSTOMER' ? id : null, role === 'SUPPLIER' ? id : null, role === 'ADMIN' ? id : null, expiry]);
  writeSessionCookie(res, token);
}
async function requireAdmin(req, res, next) {
  try {
    req.accountSession = await findSession(req);
    if (req.accountSession?.role !== 'ADMIN') return res.status(403).json({ error: 'Admin sign-in is required.' });
    next();
  } catch (_error) {
    res.status(500).json({ error: 'Could not verify admin access.' });
  }
}
async function requireCustomer(req, res, next) {
  try {
    req.accountSession = await findSession(req);
    if (req.accountSession?.role !== 'CUSTOMER') return res.status(401).json({ error: 'Customer sign-in is required.' });
    next();
  } catch (_error) { res.status(500).json({ error: 'Could not verify customer access.' }); }
}
async function requireApprovedSupplier(req, res, next) {
  try {
    req.accountSession = await findSession(req);
    if (req.accountSession?.role !== 'SUPPLIER') return res.status(401).json({ error: 'Supplier sign-in is required.' });
    if (req.accountSession.supplier_status !== 'APPROVED') return res.status(403).json({ error: 'Your supplier account is awaiting approval.' });
    next();
  } catch (_error) { res.status(500).json({ error: 'Could not verify supplier access.' }); }
}

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok', database: 'connected' }); }
  catch (_error) { res.status(503).json({ status: 'error', database: 'unavailable' }); }
});

app.get('/api/materials', async (_req, res) => {
  try {
    const result = await pool.query('SELECT id, name, name_bn AS "nameBn", description, visual, default_unit AS "defaultUnit" FROM materials WHERE active = true ORDER BY name');
    res.json(result.rows);
  } catch (_error) { res.status(500).json({ error: 'Could not load materials.' }); }
});

app.get('/api/suppliers', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, business_name, contact_name, email, phone, address, city, state, pincode, description, categories, status
         FROM suppliers WHERE status = 'APPROVED' ORDER BY business_name`);
    res.json(result.rows.map(row => ({
      id: String(row.id), businessName: row.business_name, ownerName: row.contact_name || '',
      email: row.email || '', phone: row.phone || '', address: row.address || '',
      city: row.city || '', state: row.state || '', pincode: row.pincode || '',
      description: row.description || '', categories: row.categories || [],
      profileImage: '', status: row.status
    })));
  } catch (_error) { res.status(500).json({ error: 'Could not load suppliers.' }); }
});

app.get('/api/auth/me', async (req, res) => {
  try { res.json({ account: accountView(await findSession(req)) }); }
  catch (_error) { res.status(500).json({ error: 'Could not read account session.' }); }
});

app.post('/api/auth/register/customer', limitAuthAttempts, async (req, res) => {
  const fullName = cleanString(req.body?.fullName, 120);
  const email = cleanString(req.body?.email, 254).toLowerCase();
  const phone = cleanString(req.body?.phone, 40) || null;
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!fullName || !validEmail(email) || password.length < 8) return res.status(400).json({ error: 'Enter your name, a valid email, and a password with at least 8 characters.' });
  try {
    const hash = await passwordHash(password);
    const result = await pool.query('INSERT INTO customers (full_name,email,phone,password_hash) VALUES ($1,$2,$3,$4) RETURNING id', [fullName,email,phone,hash]);
    await startSession(res, 'CUSTOMER', result.rows[0].id);
    res.status(201).json({ account: { role: 'CUSTOMER', id: String(result.rows[0].id), fullName, email, phone: phone || '' } });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ error: 'An account with this email or phone already exists.' });
    res.status(500).json({ error: 'Could not create the customer account.' });
  }
});

app.post('/api/auth/register/supplier', limitAuthAttempts, async (req, res) => {
  const businessName = cleanString(req.body?.businessName, 160);
  const ownerName = cleanString(req.body?.ownerName, 120);
  const email = cleanString(req.body?.email, 254).toLowerCase();
  const phone = cleanString(req.body?.phone, 40);
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const businessType = cleanString(req.body?.businessType, 120);
  const city = cleanString(req.body?.city, 100);
  const state = cleanString(req.body?.state, 100);
  const pincode = cleanString(req.body?.pincode, 20);
  const address = cleanString(req.body?.address, 500);
  const description = cleanString(req.body?.description, 1000);
  const categories = Array.isArray(req.body?.categories) ? [...new Set(req.body.categories.map(v => cleanString(v,80)).filter(Boolean))].slice(0,20) : [];
  if (!businessName || !ownerName || !validEmail(email) || !phone || password.length < 8 || !city || !state || !address || !categories.length) return res.status(400).json({ error: 'Complete the required business, contact, password, location, address, and category fields.' });
  try {
    const hash = await passwordHash(password);
    const result = await pool.query(
      `INSERT INTO suppliers (business_name,contact_name,email,phone,address,city,state,pincode,business_type,description,categories,password_hash,status,verified)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'PENDING',false)
       RETURNING id,business_name,contact_name,email,phone,city,state,status`,
      [businessName,ownerName,email,phone,address,city,state,pincode,businessType,description,categories,hash]);
    const supplier = result.rows[0];
    await startSession(res, 'SUPPLIER', supplier.id);
    res.status(201).json({ account: { role:'SUPPLIER', id:String(supplier.id), businessName:supplier.business_name, ownerName:supplier.contact_name, email:supplier.email, phone:supplier.phone, city:supplier.city, state:supplier.state, status:supplier.status } });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ error: 'A supplier account with this email already exists.' });
    res.status(500).json({ error: 'Could not create the supplier account.' });
  }
});

app.post('/api/auth/login', limitAuthAttempts, async (req, res) => {
  const email = cleanString(req.body?.email,254).toLowerCase();
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const role = req.body?.role === 'SUPPLIER' ? 'SUPPLIER' : 'CUSTOMER';
  if (!validEmail(email) || !password) return res.status(400).json({ error: 'Enter a valid email and password.' });
  try {
    const result = role === 'CUSTOMER'
      ? await pool.query('SELECT id,full_name,email,phone,password_hash FROM customers WHERE email=$1',[email])
      : await pool.query('SELECT id,business_name,contact_name,email,phone,city,state,status,password_hash FROM suppliers WHERE email=$1',[email]);
    const record = result.rows[0];
    if (!record || !(await passwordMatches(password,record.password_hash))) return res.status(401).json({ error: 'Email or password is incorrect.' });
    await startSession(res,role,record.id);
    res.json({ account: role === 'CUSTOMER'
      ? { role,id:String(record.id),fullName:record.full_name,email:record.email,phone:record.phone||'' }
      : { role,id:String(record.id),businessName:record.business_name,ownerName:record.contact_name||'',email:record.email,phone:record.phone||'',city:record.city||'',state:record.state||'',status:record.status }
    });
  } catch (_error) { res.status(500).json({ error: 'Could not sign in.' }); }
});

// Local development bootstrap: the first valid admin login creates the first admin.
app.post('/api/auth/admin', limitAuthAttempts, async (req, res) => {
  const email = cleanString(req.body?.email,254).toLowerCase();
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!validEmail(email) || password.length < 8) return res.status(400).json({ error: 'Use a valid email and a password with at least 8 characters.' });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(46271031)');
    let result = await client.query('SELECT id,password_hash FROM admin_users WHERE email=$1',[email]);
    if (!result.rowCount) {
      const count = await client.query('SELECT count(*)::int AS count FROM admin_users');
      if (count.rows[0].count !== 0) {
        await client.query('ROLLBACK');
        return res.status(401).json({ error: 'Admin account not found.' });
      }
      if (password.length < 12) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'For the first admin account, choose a password with at least 12 characters.' });
      }
      const hash = await passwordHash(password);
      result = await client.query('INSERT INTO admin_users (email,password_hash) VALUES ($1,$2) RETURNING id,password_hash',[email,hash]);
    } else if (!(await passwordMatches(password,result.rows[0].password_hash))) {
      await client.query('ROLLBACK');
      return res.status(401).json({ error: 'Email or password is incorrect.' });
    }
    await client.query('COMMIT');
    await startSession(res,'ADMIN',result.rows[0].id);
    res.json({ account:{ role:'ADMIN',id:String(result.rows[0].id),email } });
  } catch (_error) {
    await client.query('ROLLBACK').catch(()=>{});
    res.status(500).json({ error: 'Could not sign in as admin.' });
  } finally { client.release(); }
});

app.post('/api/auth/logout', async (req, res) => {
  const token = sessionToken(req);
  if (/^[a-f0-9]{64}$/i.test(token)) {
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    await pool.query('DELETE FROM api_sessions WHERE token_hash=$1',[hash]).catch(()=>{});
  }
  clearSessionCookie(res);
  res.json({ signedOut:true });
});

app.post('/api/quote-requests', async (req, res) => {
  const materialId=Number(req.body?.materialId), quantity=Number(req.body?.quantity);
  const unit=cleanString(req.body?.unit,40), deliveryLocation=cleanString(req.body?.deliveryLocation,500);
  const requiredDate=req.body?.requiredDate||null, projectType=cleanString(req.body?.projectType,80)||null;
  if (!Number.isSafeInteger(materialId)||materialId<1||!Number.isFinite(quantity)||quantity<=0||quantity>999999999.999||Math.abs(quantity*1000-Math.round(quantity*1000))>1e-8||!unit||!deliveryLocation) return res.status(400).json({ error:'Enter a valid material, quantity (up to three decimal places), unit, and delivery location.' });
  if (requiredDate && !validDateOnly(requiredDate)) return res.status(400).json({error:'Enter a valid required date.'});
  const client=await pool.connect();
  try {
    const session=await findSession(req), customerId=session?.role==='CUSTOMER'?session.customer_id:null;
    if (session && session.role !== 'CUSTOMER') return res.status(403).json({ error: 'Sign in with a customer account to make a request.' });
    const guestAccessToken=customerId ? null : crypto.randomBytes(32).toString('hex');
    await client.query('BEGIN');
    const material=await client.query('SELECT id,default_unit FROM materials WHERE id=$1 AND active=true',[materialId]);
    if (!material.rowCount||material.rows[0].default_unit!==unit) { await client.query('ROLLBACK'); return res.status(400).json({ error:'That material or unit is not available.' }); }
    const saved=await client.query(`INSERT INTO quote_requests(customer_id,delivery_location,status,required_date,project_type,guest_access_hash) VALUES($1,$2,'open',$3,$4,$5) RETURNING id,status,created_at`,[customerId,deliveryLocation,requiredDate,projectType,guestAccessToken?sha256(guestAccessToken):null]);
    const request=saved.rows[0];
    await client.query('INSERT INTO quote_request_items(request_id,material_id,quantity,unit) VALUES($1,$2,$3,$4)',[request.id,materialId,quantity,unit]);
    await client.query('COMMIT');
    res.status(201).json({ id:request.id,status:request.status,createdAt:request.created_at,guestAccessToken });
  } catch (_error) { await client.query('ROLLBACK').catch(()=>{}); res.status(500).json({ error:'Could not save the material requirement.' }); }
  finally { client.release(); }
});

app.post('/api/orders', async (req, res) => {
  const requestId=Number(req.body?.quoteRequestId), supplierId=Number(req.body?.supplierId);
  if (!Number.isSafeInteger(requestId)||requestId<1||!Number.isSafeInteger(supplierId)||supplierId<1) return res.status(400).json({ error:'Choose a valid requirement and supplier.' });
  const client=await pool.connect();
  try {
    const session=await findSession(req), customerId=session?.role==='CUSTOMER'?session.customer_id:null;
    if (!customerId) return res.status(401).json({ error: 'Sign in with a customer account before placing an order.' });
    await client.query('BEGIN');
    const request=await client.query('SELECT id,customer_id,status,guest_access_hash FROM quote_requests WHERE id=$1 FOR UPDATE',[requestId]);
    if (!request.rowCount||!['open','quoted'].includes(request.rows[0].status)) { await client.query('ROLLBACK'); return res.status(404).json({ error:'That saved requirement is unavailable.' }); }
    if (request.rows[0].customer_id && request.rows[0].customer_id !== customerId) { await client.query('ROLLBACK'); return res.status(403).json({ error:'Sign in with the customer account that created this request.' }); }
    if (!request.rows[0].customer_id && (!req.body?.guestAccessToken || !request.rows[0].guest_access_hash || !crypto.timingSafeEqual(Buffer.from(sha256(String(req.body.guestAccessToken)),'hex'),Buffer.from(request.rows[0].guest_access_hash,'hex')))) { await client.query('ROLLBACK'); return res.status(403).json({ error:'This guest request can only be ordered from the browser that created it.' }); }
    const supplier=await client.query("SELECT s.id,s.business_name,s.categories, m.name AS material_name FROM suppliers s JOIN quote_request_items qi ON qi.request_id=$2 JOIN materials m ON m.id=qi.material_id WHERE s.id=$1 AND s.status='APPROVED' AND s.categories @> ARRAY[m.name]::text[]",[supplierId,requestId]);
    if (!supplier.rowCount) { await client.query('ROLLBACK'); return res.status(400).json({ error:'That supplier is not approved or available.' }); }
    const orderNumber=`BE-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    const saved=await client.query(
      `INSERT INTO orders(order_number,customer_id,quote_id,quote_request_id,supplier_id,status,delivery_location,total_amount)
       SELECT $1,COALESCE(q.customer_id,$2),NULL,q.id,$3,'PENDING_CONFIRMATION',q.delivery_location,0
         FROM quote_requests q WHERE q.id=$4 RETURNING id,order_number,status,total_amount`,
      [orderNumber,customerId,supplierId,requestId]);
    const order=saved.rows[0];
    await client.query(`INSERT INTO order_items(order_id,material_id,quantity,unit,unit_price) SELECT $1,material_id,quantity,unit,0 FROM quote_request_items WHERE request_id=$2`,[order.id,requestId]);
    await client.query("UPDATE quote_requests SET status='accepted' WHERE id=$1",[requestId]);
    await client.query('COMMIT');
    res.status(201).json({ id:order.id,orderId:order.order_number,status:order.status,totalAmount:order.total_amount });
  } catch (error) { await client.query('ROLLBACK').catch(()=>{}); if(error.code==='23505') return res.status(409).json({error:'This requirement already has an active order. Refresh your page to see it.'}); res.status(500).json({ error:'Could not save the order.' }); }
  finally { client.release(); }
});

app.get('/api/my/orders', requireCustomer, async (req,res)=>{
  try {
    const result=await pool.query(`SELECT o.id,o.quote_request_id,q.status AS request_status,q.required_date,q.project_type,o.order_number,o.status,o.total_amount,o.delivery_location,o.expected_delivery_date,o.supplier_note,o.created_at,s.business_name AS supplier_name,
      COALESCE((SELECT json_agg(json_build_object('materialId',m.id,'materialName',m.name,'quantity',oi.quantity,'unit',oi.unit,'unitPrice',oi.unit_price) ORDER BY oi.id) FROM order_items oi JOIN materials m ON m.id=oi.material_id WHERE oi.order_id=o.id),'[]'::json) AS items,
      COALESCE((SELECT json_agg(json_build_object('status',te.status,'note',te.note,'occurredAt',te.occurred_at) ORDER BY te.occurred_at) FROM tracking_events te WHERE te.order_id=o.id),'[]'::json) AS timeline
      FROM orders o LEFT JOIN suppliers s ON s.id=o.supplier_id LEFT JOIN quote_requests q ON q.id=o.quote_request_id WHERE o.customer_id=$1 ORDER BY o.created_at DESC`,[req.accountSession.customer_id]);
    res.json(result.rows);
  } catch (_error) { res.status(500).json({error:'Could not load orders.'}); }
});

app.patch('/api/my/orders/:id/status', async (req,res)=>{
  const client=await pool.connect();
  try {
    const session=await findSession(req);
    if (session?.role!=='CUSTOMER') return res.status(401).json({error:'Customer sign-in is required.'});
    const status=cleanString(req.body?.status,40).toUpperCase();
    if (!['DECLINED','CANCELLED'].includes(status)) return res.status(400).json({error:'Invalid customer order action.'});
    await client.query('BEGIN');
    const result=await client.query(
      `UPDATE orders SET status=$1,updated_at=now()
        WHERE id=$2 AND customer_id=$3
          AND (($1='DECLINED' AND status='PENDING_CONFIRMATION')
            OR ($1='CANCELLED' AND status IN ('PENDING_CONFIRMATION','CONFIRMED','PROCESSING')))
        RETURNING id,order_number,status`,[status,req.params.id,session.customer_id]);
    if (!result.rowCount) { await client.query('ROLLBACK'); return res.status(409).json({error:'This order cannot be changed from this account or at its current status.'}); }
    await client.query("UPDATE quote_requests SET status='open' WHERE id=(SELECT quote_request_id FROM orders WHERE id=$1) AND status='accepted'",[req.params.id]);
    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (_error) { await client.query('ROLLBACK').catch(()=>{}); res.status(500).json({error:'Could not update the order.'}); }
  finally { client.release(); }
});

app.get('/api/supplier/orders', requireApprovedSupplier, async (req,res)=>{
  try {
    const result=await pool.query(`SELECT o.id,o.order_number,o.status,o.total_amount,o.delivery_location,o.expected_delivery_date,o.created_at,o.supplier_note,
      c.full_name AS customer_name,q.required_date,q.project_type,
      COALESCE((SELECT json_agg(json_build_object('materialId',m.id,'materialName',m.name,'quantity',oi.quantity,'unit',oi.unit,'unitPrice',oi.unit_price) ORDER BY oi.id) FROM order_items oi JOIN materials m ON m.id=oi.material_id WHERE oi.order_id=o.id),'[]'::json) AS items
      FROM orders o LEFT JOIN customers c ON c.id=o.customer_id LEFT JOIN quote_requests q ON q.id=o.quote_request_id
      WHERE o.supplier_id=$1 ORDER BY o.created_at DESC`,[req.accountSession.supplier_id]);
    res.json(result.rows);
  } catch (_error) { res.status(500).json({error:'Could not load supplier orders.'}); }
});

app.patch('/api/supplier/orders/:id', requireApprovedSupplier, async (req,res)=>{
  const action=cleanString(req.body?.action,40).toUpperCase();
  const note=cleanString(req.body?.note,500)||null;
  const client=await pool.connect();
  try {
    await client.query('BEGIN');
    const found=await client.query('SELECT id,status FROM orders WHERE id=$1 AND supplier_id=$2 FOR UPDATE',[req.params.id,req.accountSession.supplier_id]);
    if (!found.rowCount) { await client.query('ROLLBACK'); return res.status(404).json({error:'Order not found for this supplier.'}); }
    const current=found.rows[0].status;
    let next, tracking;
    if (action==='ACCEPT') {
      const unitPrice=Number(req.body?.unitPrice), deliveryDate=cleanString(req.body?.expectedDeliveryDate,10);
      if (!Number.isFinite(unitPrice)||unitPrice<=0||unitPrice>9999999999||!validDateOnly(deliveryDate)||deliveryDate<new Date().toISOString().slice(0,10)) { await client.query('ROLLBACK'); return res.status(400).json({error:'Enter a unit price greater than zero and a valid delivery date that is today or later.'}); }
      if (current!=='PENDING_CONFIRMATION') { await client.query('ROLLBACK'); return res.status(409).json({error:'Only a pending order can be accepted.'}); }
      const roundedUnitPrice=Math.round(unitPrice*100)/100;
      const amount=await client.query('SELECT COALESCE(sum(quantity*$1::numeric(12,2)),0)::numeric(30,2) AS total FROM order_items WHERE order_id=$2',[roundedUnitPrice,req.params.id]);
      const total=Number(amount.rows[0].total);
      if (!Number.isFinite(total)||total<=0||total>9999999999.99) { await client.query('ROLLBACK'); return res.status(400).json({error:'The total price is outside the supported range.'}); }
      await client.query('UPDATE order_items SET unit_price=$1 WHERE order_id=$2',[roundedUnitPrice,req.params.id]);
      await client.query(`UPDATE orders SET status='CONFIRMED',total_amount=$1,expected_delivery_date=$2,supplier_note=$3,supplier_confirmed_at=now(),updated_at=now() WHERE id=$4`,[amount.rows[0].total,deliveryDate,note,req.params.id]);
      next='CONFIRMED'; tracking='confirmed';
    } else if (action==='DECLINE') {
      if (current!=='PENDING_CONFIRMATION') { await client.query('ROLLBACK'); return res.status(409).json({error:'Only a pending order can be declined.'}); }
      await client.query(`UPDATE orders SET status='DECLINED',supplier_note=$1,updated_at=now() WHERE id=$2`,[note,req.params.id]);
      await client.query("UPDATE quote_requests SET status='open' WHERE id=(SELECT quote_request_id FROM orders WHERE id=$1) AND status='accepted'",[req.params.id]);
      next='DECLINED';
    } else {
      const progression={PROCESSING:{from:'CONFIRMED',tracking:'preparing'},OUT_FOR_DELIVERY:{from:'PROCESSING',tracking:'out_for_delivery'},DELIVERED:{from:'OUT_FOR_DELIVERY',tracking:'delivered'}};
      const step=progression[action];
      if (!step) { await client.query('ROLLBACK'); return res.status(400).json({error:'Choose accept, decline, processing, out for delivery, or delivered.'}); }
      if (current!==step.from) { await client.query('ROLLBACK'); return res.status(409).json({error:`This order must be ${step.from.toLowerCase().replaceAll('_',' ')} before that update.`}); }
      await client.query('UPDATE orders SET status=$1,supplier_note=COALESCE($2,supplier_note),updated_at=now() WHERE id=$3',[action,note,req.params.id]);
      next=action; tracking=step.tracking;
    }
    if (tracking) await client.query('INSERT INTO tracking_events(order_id,status,note) VALUES($1,$2,$3)',[req.params.id,tracking,note||`Supplier updated order to ${next}.`]);
    await client.query('COMMIT');
    res.json({id:Number(req.params.id),status:next});
  } catch (_error) { await client.query('ROLLBACK').catch(()=>{}); res.status(500).json({error:'Could not update this supplier order.'}); }
  finally { client.release(); }
});

app.get('/api/admin/summary', requireAdmin, async (_req,res)=>{
  try {
    const result=await pool.query(`SELECT (SELECT count(*) FROM orders)::int AS orders,(SELECT count(*) FROM suppliers)::int AS suppliers,(SELECT count(*) FROM customers)::int AS customers,(SELECT count(*) FROM materials WHERE active=true)::int AS materials`);
    res.json(result.rows[0]);
  } catch (_error) { res.status(500).json({error:'Could not load admin summary.'}); }
});
app.get('/api/admin/suppliers', requireAdmin, async (_req,res)=>{
  try { const r=await pool.query('SELECT id,business_name,contact_name,email,phone,city,state,pincode,description,categories,status FROM suppliers ORDER BY id DESC'); res.json(r.rows); }
  catch (_error) { res.status(500).json({error:'Could not load supplier applications.'}); }
});
app.patch('/api/admin/suppliers/:id', requireAdmin, async (req,res)=>{
  const status=cleanString(req.body?.status,20).toUpperCase();
  if (!['APPROVED','REJECTED'].includes(status)) return res.status(400).json({error:'Choose APPROVED or REJECTED.'});
  try {
    const r=await pool.query('UPDATE suppliers SET status=$1,verified=$2 WHERE id=$3 RETURNING id,status',[status,status==='APPROVED',req.params.id]);
    if (!r.rowCount) return res.status(404).json({error:'Supplier not found.'});
    res.json(r.rows[0]);
  } catch (_error) { res.status(500).json({error:'Could not update supplier status.'}); }
});
app.get('/api/admin/customers', requireAdmin, async (_req,res)=>{
  try { const r=await pool.query('SELECT id,full_name,email,phone,created_at FROM customers ORDER BY id DESC'); res.json(r.rows); }
  catch (_error) { res.status(500).json({error:'Could not load customers.'}); }
});
app.get('/api/admin/orders', requireAdmin, async (_req,res)=>{
  try {
    const r=await pool.query(`SELECT o.id,o.order_number,o.status,o.total_amount,o.delivery_location,o.created_at,o.customer_id,s.business_name,m.id AS material_id,m.name AS material_name,oi.quantity,oi.unit FROM orders o LEFT JOIN suppliers s ON s.id=o.supplier_id LEFT JOIN order_items oi ON oi.order_id=o.id LEFT JOIN materials m ON m.id=oi.material_id ORDER BY o.created_at DESC`);
    res.json(r.rows.map(x=>({id:x.id,orderId:x.order_number,status:x.status,amount:Number(x.total_amount),location:x.delivery_location,customerId:x.customer_id,material:String(x.material_id||''),materialName:x.material_name,quantity:x.quantity,unit:x.unit,supplier:{businessName:x.business_name||''}})));
  } catch (_error) { res.status(500).json({error:'Could not load orders.'}); }
});
app.patch('/api/admin/orders/:id/status', requireAdmin, async (req,res)=>{
  const status=cleanString(req.body?.status,40).toUpperCase();
  const allowed={CONFIRMED:['PROCESSING'],PROCESSING:['OUT_FOR_DELIVERY'],OUT_FOR_DELIVERY:['DELIVERED']};
  if (!Object.values(allowed).flat().includes(status)) return res.status(400).json({error:'Invalid order status transition.'});
  const map={CONFIRMED:'confirmed',PROCESSING:'preparing',OUT_FOR_DELIVERY:'out_for_delivery',DELIVERED:'delivered'};
  const client=await pool.connect();
  try {
    await client.query('BEGIN');
    const current=await client.query('SELECT id,status FROM orders WHERE id=$1 FOR UPDATE',[req.params.id]);
    if (!current.rowCount) { await client.query('ROLLBACK'); return res.status(404).json({error:'Order not found.'}); }
    if (!allowed[current.rows[0].status]?.includes(status)) { await client.query('ROLLBACK'); return res.status(409).json({error:'That order cannot move to this status yet.'}); }
    const r=await client.query('UPDATE orders SET status=$1,updated_at=now() WHERE id=$2 RETURNING id,order_number,status',[status,req.params.id]);
    if (!r.rowCount) { await client.query('ROLLBACK'); return res.status(404).json({error:'Order not found.'}); }
    if (map[status]) await client.query('INSERT INTO tracking_events(order_id,status,note) VALUES($1,$2,$3)',[r.rows[0].id,map[status],`Order status changed to ${status}.`]);
    await client.query('COMMIT'); res.json(r.rows[0]);
  } catch (_error) { await client.query('ROLLBACK').catch(()=>{}); res.status(500).json({error:'Could not update order status.'}); }
  finally { client.release(); }
});
app.post('/api/admin/materials', requireAdmin, async (req,res)=>{
  const name=cleanString(req.body?.name,120), unit=cleanString(req.body?.unit,40);
  const nameBn=cleanString(req.body?.nameBn,120)||name, description=cleanString(req.body?.description,500)||`${name} construction material.`;
  const allowedVisuals=['cement','steel','sand','brick','tile','pipe','generic'];
  const visual=allowedVisuals.includes(req.body?.visual)?req.body.visual:'generic';
  if (!name||!unit) return res.status(400).json({error:'Material name and unit are required.'});
  try { const r=await pool.query('INSERT INTO materials(name,name_bn,description,visual,default_unit) VALUES($1,$2,$3,$4,$5) RETURNING id,name,name_bn AS "nameBn",description,visual,default_unit AS "defaultUnit"',[name,nameBn,description,visual,unit]); res.status(201).json(r.rows[0]); }
  catch (error) { if(error.code==='23505') return res.status(409).json({error:'That material already exists.'}); res.status(500).json({error:'Could not add material.'}); }
});

app.use(express.static(path.join(__dirname,'public')));
app.use((_req,res)=>res.status(404).json({error:'API route not found.'}));

async function start() {
  try {
    const directory=path.join(__dirname,'migrations');
    const files=(await fs.readdir(directory)).filter(f=>/^\d+.*\.sql$/i.test(f)).sort();
    await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
    for (const file of files) {
      const existing=await pool.query('SELECT 1 FROM schema_migrations WHERE version=$1',[file]);
      if (existing.rowCount) continue;
      const client=await pool.connect();
      try {
        await client.query('BEGIN');
        await client.query(await fs.readFile(path.join(directory,file),'utf8'));
        await client.query('INSERT INTO schema_migrations(version) VALUES($1)',[file]);
        await client.query('COMMIT');
        console.log(`Applied database migration ${file}`);
      } catch (migrationError) {
        await client.query('ROLLBACK').catch(()=>{});
        console.error(`Database migration ${file} failed: ${migrationError.message}`);
        throw migrationError;
      } finally { client.release(); }
    }
    await pool.query('DELETE FROM api_sessions WHERE expires_at<=now()').catch(()=>{});
    const sessionCleanup=setInterval(()=>pool.query('DELETE FROM api_sessions WHERE expires_at<=now()').catch(()=>{}),6*60*60*1000);
    sessionCleanup.unref();
    app.listen(port,'0.0.0.0',()=>console.log(`BuildEasy API listening on port ${port}`));
  } catch (_error) {
    console.error('BuildEasy API could not start. Check the database schema and connection.');
    process.exit(1);
  }
}
async function stop(){ await pool.end(); process.exit(0); }
start();
process.on('SIGTERM',stop);
process.on('SIGINT',stop);
