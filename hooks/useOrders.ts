'use client';

import { useState, useEffect } from 'react';
import { OrderService } from '@/services/orderService';
import { Order, OrderSummary } from '@/models/Order';

const orderService = new OrderService();

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentOrders, setRecentOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const [allOrders, recent] = await Promise.all([
        orderService.getAllOrders(),
        orderService.getRecentOrders(),
      ]);
      setOrders(allOrders);
      setRecentOrders(recent);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await orderService.updateOrderStatus(id, status);
      await loadOrders();
    } catch (err) {
      setError(err as Error);
    }
  };

  return { orders, recentOrders, loading, error, refresh: loadOrders, updateStatus };
}
