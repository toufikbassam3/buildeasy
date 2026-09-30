-- Supplier fulfillment details and an unguessable claim for guest requests.
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS guest_access_hash text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS expected_delivery_date date;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS supplier_note text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS supplier_confirmed_at timestamptz;
ALTER TABLE materials ADD COLUMN IF NOT EXISTS name_bn text;
ALTER TABLE materials ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE materials ADD COLUMN IF NOT EXISTS visual text NOT NULL DEFAULT 'generic';
UPDATE materials SET name_bn=name WHERE name_bn IS NULL;
UPDATE materials SET description=name || ' construction material.' WHERE description IS NULL;
CREATE INDEX IF NOT EXISTS orders_customer_created_idx ON orders(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS orders_supplier_created_idx ON orders(supplier_id, created_at DESC);
CREATE INDEX IF NOT EXISTS quote_requests_open_created_idx ON quote_requests(status, created_at DESC);
DROP INDEX IF EXISTS orders_quote_request_unique_idx;
CREATE UNIQUE INDEX IF NOT EXISTS orders_active_quote_request_unique_idx
  ON orders(quote_request_id)
  WHERE quote_request_id IS NOT NULL AND status NOT IN ('DECLINED','CANCELLED');
