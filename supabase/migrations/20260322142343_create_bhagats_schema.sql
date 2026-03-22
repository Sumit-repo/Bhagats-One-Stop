/*
  ================================================================
  Bhagat's One-Stop Business Management System
  Full Schema + Seed Data
  
  Run this in your Supabase SQL Editor:
  Dashboard → SQL Editor → New Query → Paste → Run
  ================================================================
*/

-- ===================== EXTENSIONS =====================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===================== TYPES / ENUMS =====================
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE expense_category AS ENUM ('labour', 'fertilizers', 'maintenance', 'miscellaneous');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ===================== PRODUCTS TABLE =====================
CREATE TABLE IF NOT EXISTS products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL CHECK (char_length(name) >= 2),
  category    text NOT NULL,
  price       numeric(10,2) NOT NULL CHECK (price >= 0),
  stock       integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  quantity_sold integer NOT NULL DEFAULT 0 CHECK (quantity_sold >= 0),
  image_url   text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON products(created_at DESC);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on products" ON products;
CREATE POLICY "Allow all on products" ON products FOR ALL USING (true) WITH CHECK (true);

-- ===================== CUSTOMERS TABLE =====================
CREATE TABLE IF NOT EXISTS customers (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL CHECK (char_length(name) >= 2),
  email        text UNIQUE,
  phone        text,
  total_orders integer NOT NULL DEFAULT 0 CHECK (total_orders >= 0),
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS customers_name_idx ON customers(name);
CREATE INDEX IF NOT EXISTS customers_email_idx ON customers(email);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on customers" ON customers;
CREATE POLICY "Allow all on customers" ON customers FOR ALL USING (true) WITH CHECK (true);

-- ===================== ORDERS TABLE =====================
CREATE TABLE IF NOT EXISTS orders (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number  integer NOT NULL,
  product_name  text NOT NULL CHECK (char_length(product_name) >= 2),
  customer_name text NOT NULL CHECK (char_length(customer_name) >= 2),
  status        order_status NOT NULL DEFAULT 'pending',
  price         numeric(10,2) NOT NULL CHECK (price >= 0),
  order_date    date NOT NULL DEFAULT CURRENT_DATE,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS orders_order_number_idx ON orders(order_number);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_order_date_idx ON orders(order_date DESC);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on orders" ON orders;
CREATE POLICY "Allow all on orders" ON orders FOR ALL USING (true) WITH CHECK (true);

-- Create a sequence for auto-incrementing order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1001 INCREMENT 1;

-- ===================== TEA FARM EXPENSES TABLE =====================
CREATE TABLE IF NOT EXISTS tea_farm_expenses (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category   expense_category NOT NULL,
  amount     numeric(10,2) NOT NULL CHECK (amount > 0),
  date       date NOT NULL DEFAULT CURRENT_DATE,
  notes      text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tea_farm_expenses_date_idx ON tea_farm_expenses(date DESC);
CREATE INDEX IF NOT EXISTS tea_farm_expenses_category_idx ON tea_farm_expenses(category);

ALTER TABLE tea_farm_expenses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on tea_farm_expenses" ON tea_farm_expenses;
CREATE POLICY "Allow all on tea_farm_expenses" ON tea_farm_expenses FOR ALL USING (true) WITH CHECK (true);

-- ===================== TEA FARM EARNINGS TABLE =====================
CREATE TABLE IF NOT EXISTS tea_farm_earnings (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quantity_kg  numeric(10,2) NOT NULL CHECK (quantity_kg > 0),
  price_per_kg numeric(10,2) NOT NULL CHECK (price_per_kg >= 0),
  total_amount numeric(10,2) NOT NULL CHECK (total_amount >= 0),
  date         date NOT NULL DEFAULT CURRENT_DATE,
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tea_farm_earnings_date_idx ON tea_farm_earnings(date DESC);

ALTER TABLE tea_farm_earnings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on tea_farm_earnings" ON tea_farm_earnings;
CREATE POLICY "Allow all on tea_farm_earnings" ON tea_farm_earnings FOR ALL USING (true) WITH CHECK (true);

-- ===================== STORAGE BUCKET =====================
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allow media upload" ON storage.objects;
CREATE POLICY "Allow media upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Allow media read" ON storage.objects;
CREATE POLICY "Allow media read" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- ===================== SEED DATA: PRODUCTS =====================
INSERT INTO products (name, category, price, stock, quantity_sold)
VALUES
  ('Sudha Gold Full Cream Milk 1L',  'Dairy',   66.00,  150, 820),
  ('Sudha Toned Milk 500ml',         'Dairy',   32.00,  280, 1200),
  ('Amul Butter 500g',               'Dairy',  280.00,   45, 380),
  ('Sudha Paneer 200g',              'Dairy',   85.00,   60, 290),
  ('Sudha Dahi 500g',                'Dairy',   42.00,  120, 640),
  ('Britannia Good Day 75g',         'Bakery',  20.00,  300, 1100),
  ('Parle-G Biscuits 250g',          'Bakery',  20.00,  400, 1500),
  ('Monginis Cream Roll x4',         'Bakery',  40.00,   80, 310),
  ('Modern Bread Slices 400g',       'Bakery',  45.00,  100, 520),
  ('Maggi Noodles 4pk',              'General', 68.00,   90, 670),
  ('Tata Tea Gold 250g',             'General',135.00,   55, 310),
  ('Aashirvaad Atta 5kg',            'General',310.00,   30, 190),
  ('Fortune Sunflower Oil 1L',       'General',160.00,   70, 430),
  ('Dabur Chyawanprash 1kg',         'General',310.00,   25, 120),
  ('Lays Classic Salted 73g',        'Snacks',   20.00,  200, 780),
  ('Kurkure Masala Munch 90g',       'Snacks',   20.00,  220, 860),
  ('Haldirams Aloo Bhujia 400g',     'Snacks',   80.00,   75, 340)
ON CONFLICT DO NOTHING;

-- ===================== SEED DATA: CUSTOMERS =====================
INSERT INTO customers (name, email, phone, total_orders)
VALUES
  ('Anjali Singh',    'anjali.singh@gmail.com',   '9801234560', 18),
  ('Rajesh Kumar',    'rajesh.kumar@yahoo.com',   '9812345601', 12),
  ('Priya Verma',     'priya.verma@gmail.com',    '9823456012', 31),
  ('Suresh Raina',    'suresh.raina@outlook.com', '9834560123',  7),
  ('Amitabh Jha',     'amitabh.jha@gmail.com',   '9845601234', 22),
  ('Sunita Devi',     'sunita.devi@gmail.com',    '9856012345',  4),
  ('Vikram Sharma',   'vikram.sharma@gmail.com',  '9867123456', 15),
  ('Deepa Kumari',    'deepa.k@gmail.com',        '9878234567',  9),
  ('Manish Prasad',   'manish.p@yahoo.com',       '9889345678', 27),
  ('Kavita Singh',    'kavita.s@gmail.com',       '9890456789',  3)
ON CONFLICT DO NOTHING;

-- ===================== SEED DATA: ORDERS =====================
INSERT INTO orders (order_number, product_name, customer_name, status, price, order_date)
VALUES
  (1001, 'Sudha Gold Full Cream Milk 1L', 'Anjali Singh',   'delivered',  198.00, CURRENT_DATE - 10),
  (1002, 'Amul Butter 500g',             'Rajesh Kumar',   'delivered',  280.00, CURRENT_DATE - 9),
  (1003, 'Maggi Noodles 4pk',            'Priya Verma',    'delivered',   68.00, CURRENT_DATE - 8),
  (1004, 'Lays Classic Salted 73g',      'Suresh Raina',   'delivered',   40.00, CURRENT_DATE - 7),
  (1005, 'Tata Tea Gold 250g',           'Amitabh Jha',    'delivered',  135.00, CURRENT_DATE - 7),
  (1006, 'Aashirvaad Atta 5kg',          'Sunita Devi',    'shipped',    310.00, CURRENT_DATE - 5),
  (1007, 'Fortune Sunflower Oil 1L',     'Vikram Sharma',  'shipped',    160.00, CURRENT_DATE - 4),
  (1008, 'Sudha Paneer 200g',            'Deepa Kumari',   'processing',  85.00, CURRENT_DATE - 3),
  (1009, 'Britannia Good Day 75g',       'Manish Prasad',  'processing',  60.00, CURRENT_DATE - 2),
  (1010, 'Modern Bread Slices 400g',     'Kavita Singh',   'pending',     45.00, CURRENT_DATE - 1),
  (1011, 'Sudha Dahi 500g',             'Anjali Singh',   'pending',     84.00, CURRENT_DATE),
  (1012, 'Haldirams Aloo Bhujia 400g',  'Rajesh Kumar',   'pending',     80.00, CURRENT_DATE),
  (1013, 'Dabur Chyawanprash 1kg',      'Priya Verma',    'pending',    310.00, CURRENT_DATE)
ON CONFLICT DO NOTHING;

-- ===================== SEED DATA: TEA FARM EXPENSES =====================
INSERT INTO tea_farm_expenses (category, amount, date, notes)
VALUES
  ('labour',         8500.00, CURRENT_DATE - 60,  'Monthly farm worker wages - March'),
  ('fertilizers',    4200.00, CURRENT_DATE - 55,  'Urea and DAP fertilizer purchase'),
  ('labour',         8500.00, CURRENT_DATE - 30,  'Monthly farm worker wages - April'),
  ('maintenance',    2800.00, CURRENT_DATE - 25,  'Irrigation pipe repair'),
  ('fertilizers',    3100.00, CURRENT_DATE - 20,  'Organic compost application'),
  ('miscellaneous',   950.00, CURRENT_DATE - 15,  'Tool replacement - sickles and gloves'),
  ('labour',         8500.00, CURRENT_DATE - 5,   'Monthly farm worker wages - May partial'),
  ('maintenance',    1500.00, CURRENT_DATE - 3,   'Shed roof repair after rain')
ON CONFLICT DO NOTHING;

-- ===================== SEED DATA: TEA FARM EARNINGS =====================
INSERT INTO tea_farm_earnings (quantity_kg, price_per_kg, total_amount, date, notes)
VALUES
  (120.00, 240.00, 28800.00, CURRENT_DATE - 58, 'First flush harvest - March batch A'),
  ( 95.00, 240.00, 22800.00, CURRENT_DATE - 50, 'First flush harvest - March batch B'),
  (140.00, 260.00, 36400.00, CURRENT_DATE - 28, 'Second flush - April premium batch'),
  (110.00, 255.00, 28050.00, CURRENT_DATE - 20, 'Second flush - April regular batch'),
  ( 85.00, 270.00, 22950.00, CURRENT_DATE - 6,  'Pre-monsoon batch - May')
ON CONFLICT DO NOTHING;