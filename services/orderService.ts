import { supabase } from '@/lib/supabase';
import { Order, OrderSummary } from '@/models/Order';

export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getRecentOrders(limit: number = 10): Promise<OrderSummary[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('order_number, product_name, customer_name, status, price, order_date')
      .order('order_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
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
