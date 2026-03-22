import { Order, OrderSummary, OrderStatus } from '@/models/Order';

export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    const res = await fetch('/api/orders');
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async getRecentOrders(limit: number = 10): Promise<OrderSummary[]> {
    const res = await fetch('/api/orders');
    if (!res.ok) throw new Error(await res.text());
    const data: Order[] = await res.json();
    return data.slice(0, limit);
  }

  async createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async deleteOrder(id: string): Promise<void> {
    const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
  }
}
