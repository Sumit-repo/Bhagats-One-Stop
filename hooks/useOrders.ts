'use client';

import { useState, useEffect } from 'react';
import { OrderService } from '@/services/orderService';
import { Order, OrderSummary } from '@/models/Order';

const orderService = new OrderService();

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

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
    if (filters.status && filters.status !== 'all') {
      result = result.filter(o => o.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(o => 
        o.customer_name.toLowerCase().includes(q) || 
        o.order_number.toString().includes(q) ||
        o.product_name.toLowerCase().includes(q)
      );
    }
    setFilteredOrders(result);
  };

  const addOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setFilteredOrders(prev => [newOrder, ...prev]);
  };

  return { orders: filteredOrders, loading, error, refresh: loadOrders, applyFilters, addOrder };
}
