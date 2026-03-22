'use client';

import { useState, useEffect } from 'react';
import { OrderService } from '@/services/orderService';
import { Order, OrderStatus } from '@/models/Order';

const orderService = new OrderService();

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const allOrders = await orderService.getAllOrders();
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (filters: { status?: string; search?: string }) => {
    let result = [...orders];
    if (filters.status && filters.status !== 'all') result = result.filter(o => o.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(o => o.customer_name.toLowerCase().includes(q) || o.order_number.toString().includes(q) || o.product_name.toLowerCase().includes(q));
    }
    setFilteredOrders(result);
  };

  const addOrder = async (newOrder: Omit<Order, 'id' | 'created_at'>) => {
    const created = await orderService.createOrder(newOrder);
    setOrders(prev => [created, ...prev]);
    setFilteredOrders(prev => [created, ...prev]);
    return created;
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    const updated = await orderService.updateOrderStatus(id, status);
    setOrders(prev => prev.map(o => o.id === id ? updated : o));
    setFilteredOrders(prev => prev.map(o => o.id === id ? updated : o));
  };

  const deleteOrder = async (id: string) => {
    await orderService.deleteOrder(id);
    setOrders(prev => prev.filter(o => o.id !== id));
    setFilteredOrders(prev => prev.filter(o => o.id !== id));
  };

  return { orders: filteredOrders, loading, error, refresh: loadOrders, applyFilters, addOrder, updateOrderStatus, deleteOrder };
}
