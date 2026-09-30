-- Let the front-end order flow create an order from a saved quote request.
ALTER TABLE orders ALTER COLUMN customer_id DROP NOT NULL;
ALTER TABLE orders ALTER COLUMN quote_id DROP NOT NULL;
ALTER TABLE orders ALTER COLUMN total_amount SET DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS quote_request_id bigint REFERENCES quote_requests(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS supplier_id bigint REFERENCES suppliers(id);
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;
UPDATE orders SET status = CASE lower(status)
  WHEN 'pending_confirmation' THEN 'PENDING_CONFIRMATION'
  WHEN 'declined' THEN 'DECLINED'
  WHEN 'confirmed' THEN 'CONFIRMED'
  WHEN 'preparing' THEN 'PROCESSING'
  WHEN 'ready_for_dispatch' THEN 'PROCESSING'
  WHEN 'out_for_delivery' THEN 'OUT_FOR_DELIVERY'
  WHEN 'delivered' THEN 'DELIVERED'
  WHEN 'cancelled' THEN 'CANCELLED'
  ELSE 'PENDING_CONFIRMATION'
END;
ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'PENDING_CONFIRMATION';
ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (
  status IN ('PENDING_CONFIRMATION','CONFIRMED','PROCESSING','OUT_FOR_DELIVERY','DELIVERED','DECLINED','CANCELLED')
);
CREATE UNIQUE INDEX IF NOT EXISTS orders_quote_request_unique_idx ON orders(quote_request_id) WHERE quote_request_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS orders_supplier_created_idx ON orders(supplier_id, created_at DESC);
