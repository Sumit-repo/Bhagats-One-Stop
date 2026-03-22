import { supabase } from '@/lib/supabase';
import { Order, OrderSummary } from '@/models/Order';
import { MOCK_ORDERS } from '@/lib/mockData';

export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    if (!supabase) {
      return MOCK_ORDERS;
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getRecentOrders(limit: number = 10): Promise<OrderSummary[]> {
    if (!supabase) {
      return MOCK_ORDERS.slice(0, limit);
    }
    const { data, error } = await supabase
      .from('orders')
      .select('order_number, product_name, customer_name, status, price, order_date')
      .order('order_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  private getMockOrders(): Order[] {
    return [
      { id: '1', order_number: 1001, product_name: 'Premium Toned Milk', customer_name: 'Anjali Singh', status: 'delivered', price: 450, order_date: '2024-03-22', created_at: new Date().toISOString() },
      { id: '2', order_number: 1002, product_name: 'Amul Butter 500g', customer_name: 'Rajesh Kumar', status: 'shipped', price: 280, order_date: '2024-03-22', created_at: new Date().toISOString() },
      { id: '3', order_number: 1003, product_name: 'Sudha Curd 1kg', customer_name: 'Priya Verma', status: 'processing', price: 90, order_date: '2024-03-21', created_at: new Date().toISOString() },
      { id: '4', order_number: 1004, product_name: 'Daily Biscuits Combo', customer_name: 'Suresh Raina', status: 'pending', price: 550, order_date: '2024-03-21', created_at: new Date().toISOString() },
      { id: '5', order_number: 1005, product_name: 'Mixed Spices Set', customer_name: 'Amitabh Jha', status: 'delivered', price: 1200, order_date: '2024-03-20', created_at: new Date().toISOString() },
    ];
  }

  async createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
