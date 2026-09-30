-- BuildEasy marketplace starter schema. Applied automatically on first database creation.

CREATE TABLE customers (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name text NOT NULL,
    email text UNIQUE,
    phone text UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE TABLE suppliers (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    business_name text NOT NULL,
    contact_name text,
    email text UNIQUE,
    phone text,
    address text,
    city text NOT NULL DEFAULT 'Kolkata',
    state text NOT NULL DEFAULT 'West Bengal',
    verified boolean NOT NULL DEFAULT false,
    rating numeric(2,1) CHECK (rating BETWEEN 0 AND 5),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE materials (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE,
    default_unit text NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE supplier_materials (
    supplier_id bigint NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
    material_id bigint NOT NULL REFERENCES materials(id),
    unit_price numeric(12,2) CHECK (unit_price >= 0),
    available boolean NOT NULL DEFAULT true,
    PRIMARY KEY (supplier_id, material_id)
);

CREATE TABLE quote_requests (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id bigint NOT NULL REFERENCES customers(id),
    delivery_location text NOT NULL,
    status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','quoted','accepted','cancelled','expired')),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE quote_request_items (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    request_id bigint NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
    material_id bigint NOT NULL REFERENCES materials(id),
    quantity numeric(12,3) NOT NULL CHECK (quantity > 0),
    unit text NOT NULL
);

CREATE TABLE quotes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    request_id bigint NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
    supplier_id bigint NOT NULL REFERENCES suppliers(id),
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected','withdrawn','expired')),
    delivery_days integer CHECK (delivery_days >= 0),
    valid_until timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (request_id, supplier_id, id)
);

CREATE TABLE quote_items (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quote_id bigint NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    request_item_id bigint NOT NULL REFERENCES quote_request_items(id),
    unit_price numeric(12,2) NOT NULL CHECK (unit_price >= 0),
    quantity numeric(12,3) NOT NULL CHECK (quantity > 0),
    UNIQUE (quote_id, request_item_id)
);

CREATE TABLE orders (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_number text NOT NULL UNIQUE,
    customer_id bigint NOT NULL REFERENCES customers(id),
    quote_id bigint NOT NULL REFERENCES quotes(id),
    status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','preparing','ready_for_dispatch','out_for_delivery','delivered','cancelled')),
    delivery_location text NOT NULL,
    total_amount numeric(12,2) NOT NULL CHECK (total_amount >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id bigint NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    material_id bigint NOT NULL REFERENCES materials(id),
    quantity numeric(12,3) NOT NULL CHECK (quantity > 0),
    unit text NOT NULL,
    unit_price numeric(12,2) NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE payments (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id bigint NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    method text NOT NULL CHECK (method IN ('cash_on_delivery','upi','bank_transfer','online')),
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','authorized','paid','failed','refunded')),
    amount numeric(12,2) NOT NULL CHECK (amount >= 0),
    provider_reference text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tracking_events (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id bigint NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status text NOT NULL CHECK (status IN ('confirmed','preparing','ready_for_dispatch','out_for_delivery','delivered')),
    note text,
    occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX quote_requests_customer_created_idx ON quote_requests(customer_id, created_at DESC);
CREATE INDEX quotes_request_status_idx ON quotes(request_id, status);
CREATE INDEX orders_customer_created_idx ON orders(customer_id, created_at DESC);
CREATE INDEX orders_status_idx ON orders(status);
CREATE INDEX tracking_events_order_time_idx ON tracking_events(order_id, occurred_at);

INSERT INTO materials (name, default_unit) VALUES
    ('Cement', 'Bag'), ('Steel', 'Ton'), ('Sand', 'Truck'),
    ('Bricks', 'Piece'), ('Pipes', 'Piece'), ('Tiles', 'Sq.Ft');
