import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { Customer } from '@/models/Customer';

export const MOCK_ORDERS: Order[] = [
  { id: '1', order_number: 1001, product_name: 'Premium Toned Milk', customer_name: 'Anjali Singh', status: 'delivered', price: 450, order_date: '2024-03-22', created_at: '2024-03-22T10:00:00Z' },
  { id: '2', order_number: 1002, product_name: 'Amul Butter 500g', customer_name: 'Rajesh Kumar', status: 'shipped', price: 280, order_date: '2024-03-22', created_at: '2024-03-22T11:30:00Z' },
  { id: '3', order_number: 1003, product_name: 'Sudha Curd 1kg', customer_name: 'Priya Verma', status: 'processing', price: 90, order_date: '2024-03-21', created_at: '2024-03-21T09:15:00Z' },
  { id: '4', order_number: 1004, product_name: 'Daily Biscuits Combo', customer_name: 'Suresh Raina', status: 'pending', price: 550, order_date: '2024-03-21', created_at: '2024-03-21T15:45:00Z' },
  { id: '5', order_number: 1005, product_name: 'Mixed Spices Set', customer_name: 'Amitabh Jha', status: 'delivered', price: 1200, order_date: '2024-03-20', created_at: '2024-03-20T14:20:00Z' },
  { id: '6', order_number: 1006, product_name: 'Premium Basmati Rice', customer_name: 'Sunita Devi', status: 'delivered', price: 850, order_date: '2024-03-19', created_at: '2024-03-19T10:30:00Z' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Sudha Gold Milk', category: 'Dairy', price: 66, quantity_sold: 450, stock: 120, sales: 29700, created_at: '2024-01-01T00:00:00Z' },
  { id: 'p2', name: 'Amul Butter 500g', category: 'Dairy', price: 280, quantity_sold: 120, stock: 45, sales: 33600, created_at: '2024-01-02T00:00:00Z' },
  { id: 'p3', name: 'Britannia Good Day', category: 'Bakery', price: 30, quantity_sold: 800, stock: 200, sales: 24000, created_at: '2024-01-03T00:00:00Z' },
  { id: 'p4', name: 'Maggi Noodles 12pk', category: 'General', price: 168, quantity_sold: 350, stock: 60, sales: 58800, created_at: '2024-01-04T00:00:00Z' },
  { id: 'p5', name: 'Tata Tea Gold', category: 'General', price: 420, quantity_sold: 180, stock: 30, sales: 75600, created_at: '2024-01-05T00:00:00Z' },
  { id: 'p6', name: 'Aashirvaad Atta 5kg', category: 'General', price: 310, quantity_sold: 290, stock: 15, sales: 89900, created_at: '2024-01-06T00:00:00Z' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Anjali Singh', email: 'anjali@example.com', total_orders: 12, created_at: '2023-11-15T00:00:00Z' },
  { id: 'c2', name: 'Rajesh Kumar', email: 'rajesh@example.com', total_orders: 8, created_at: '2023-12-01T00:00:00Z' },
  { id: 'c3', name: 'Priya Verma', email: 'priya@example.com', total_orders: 25, created_at: '2023-10-20T00:00:00Z' },
  { id: 'c4', name: 'Suresh Raina', email: 'suresh@example.com', total_orders: 5, created_at: '2024-01-10T00:00:00Z' },
  { id: 'c5', name: 'Amitabh Jha', email: 'amitabh@example.com', total_orders: 18, created_at: '2023-09-05T00:00:00Z' },
  { id: 'c6', name: 'Sunita Devi', email: 'sunita@example.com', total_orders: 3, created_at: '2024-02-14T00:00:00Z' },
];
