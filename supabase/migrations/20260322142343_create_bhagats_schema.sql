/*
  # Bhagat's One-Stop Business Management System
  
  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `price` (decimal)
      - `quantity_sold` (integer)
      - `stock` (integer)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (integer)
      - `product_name` (text)
      - `customer_name` (text)
      - `status` (text)
      - `price` (decimal)
      - `order_date` (timestamp)
      - `created_at` (timestamp)
    
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `total_orders` (integer)
      - `created_at` (timestamp)
    
    - `tea_farm_expenses`
      - `id` (uuid, primary key)
      - `category` (text: labour, fertilizers, maintenance, miscellaneous)
      - `amount` (decimal)
      - `date` (date)
      - `notes` (text)
      - `created_at` (timestamp)
    
    - `tea_farm_earnings`
      - `id` (uuid, primary key)
      - `quantity_kg` (decimal)
      - `price_per_kg` (decimal)
      - `total_amount` (decimal)
      - `date` (date)
      - `notes` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  quantity_sold integer DEFAULT 0,
  stock integer DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number integer NOT NULL,
  product_name text NOT NULL,
  customer_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  price decimal(10,2) NOT NULL DEFAULT 0,
  order_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on orders"
  ON orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  total_orders integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on customers"
  ON customers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Tea Farm Expenses Table
CREATE TABLE IF NOT EXISTS tea_farm_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('labour', 'fertilizers', 'maintenance', 'miscellaneous')),
  amount decimal(10,2) NOT NULL DEFAULT 0,
  date date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tea_farm_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on tea_farm_expenses"
  ON tea_farm_expenses FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Tea Farm Earnings Table
CREATE TABLE IF NOT EXISTS tea_farm_earnings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quantity_kg decimal(10,2) NOT NULL DEFAULT 0,
  price_per_kg decimal(10,2) NOT NULL DEFAULT 0,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  date date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tea_farm_earnings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on tea_farm_earnings"
  ON tea_farm_earnings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);