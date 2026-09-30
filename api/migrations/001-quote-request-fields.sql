-- Add fields needed by the website's material requirement form.
-- Guest requests are allowed, and signed-in customer requests are linked
-- to their account by the API.
ALTER TABLE quote_requests ALTER COLUMN customer_id DROP NOT NULL;
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS required_date date;
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS project_type text;
