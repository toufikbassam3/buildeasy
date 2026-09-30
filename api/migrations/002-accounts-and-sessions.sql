-- Database-backed accounts and login sessions.
ALTER TABLE customers ADD COLUMN IF NOT EXISTS password_hash text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS password_hash text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS contact_name text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS business_type text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS pincode text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS categories text[] NOT NULL DEFAULT '{}';
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS status text;
UPDATE suppliers SET status = CASE WHEN verified THEN 'APPROVED' ELSE 'PENDING' END WHERE status IS NULL;
ALTER TABLE suppliers ALTER COLUMN status SET DEFAULT 'PENDING';
ALTER TABLE suppliers ALTER COLUMN status SET NOT NULL;

CREATE TABLE IF NOT EXISTS admin_users (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS api_sessions (
  token_hash text PRIMARY KEY,
  role text NOT NULL,
  customer_id bigint REFERENCES customers(id) ON DELETE CASCADE,
  supplier_id bigint REFERENCES suppliers(id) ON DELETE CASCADE,
  admin_id bigint REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE api_sessions DROP CONSTRAINT IF EXISTS api_sessions_role_check;
ALTER TABLE api_sessions ADD CONSTRAINT api_sessions_role_check CHECK (role IN ('CUSTOMER','SUPPLIER','ADMIN'));
ALTER TABLE api_sessions DROP CONSTRAINT IF EXISTS api_sessions_identity_check;
ALTER TABLE api_sessions ADD CONSTRAINT api_sessions_identity_check CHECK (
  (role = 'CUSTOMER' AND customer_id IS NOT NULL AND supplier_id IS NULL AND admin_id IS NULL) OR
  (role = 'SUPPLIER' AND customer_id IS NULL AND supplier_id IS NOT NULL AND admin_id IS NULL) OR
  (role = 'ADMIN' AND customer_id IS NULL AND supplier_id IS NULL AND admin_id IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS api_sessions_expiry_idx ON api_sessions(expires_at);
