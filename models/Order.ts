export interface Order {
  id: string;
  order_number: number;
  product_name: string;
  customer_name: string;
  status: OrderStatus;
  price: number;
  order_date: string;
  created_at: string;
}

export type OrderStatus = 'pending' | 'processing' | 'received' | 'shipped' | 'delivered';

export interface OrderSummary {
  order_number: number;
  product_name: string;
  customer_name: string;
  status: OrderStatus;
  price: number;
  order_date: string;
}
