'use client';

import { useState, useEffect } from 'react';
import { DashboardService } from '@/services/dashboardService';
import { DashboardStats, SalesData, CategorySales } from '@/models/Dashboard';

const dashboardService = new DashboardService();

export function useDashboard(days: number = 30, customRange?: { start: string; end: string }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categorySales, setCategorySales] = useState<CategorySales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, [days, customRange?.start, customRange?.end]); // Re-fetch when filter changes

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, salesData, categoryData] = await Promise.all([
        dashboardService.getDashboardStats(days, customRange),
        dashboardService.getSalesData(days, customRange),
        dashboardService.getCategorySales(days, customRange),
      ]);
      setStats(statsData);
      setSalesData(salesData);
      setCategorySales(categoryData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, salesData, categorySales, loading, error, refresh: loadDashboardData };
}
