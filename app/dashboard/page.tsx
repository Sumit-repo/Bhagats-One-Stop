'use client';

import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { useDashboard } from '@/hooks/useDashboard';
import { useProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';

export default function DashboardPage() {
  const { stats, salesData, categorySales, loading: dashboardLoading } = useDashboard();
  const { topProducts, loading: productsLoading } = useProducts();
  const { recentOrders, loading: ordersLoading } = useOrders();

  const loading = dashboardLoading || productsLoading || ordersLoading;

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Your grocery store&apos;s performance view</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={DollarSign}
                title="Total Revenue"
                value={`$${stats?.total_revenue.toFixed(2) || '0.00'}`}
                change={stats?.revenue_change || 0}
                trend={[0.8, 1, 0.9, 1.1, 0.95, 1.2]}
                variant="green"
              />
              <StatCard
                icon={ShoppingCart}
                title="Total Orders"
                value={stats?.total_orders.toLocaleString() || '0'}
                change={stats?.orders_change || 0}
                trend={[0.7, 0.9, 1.1, 0.95, 1.2, 1]}
                variant="blue"
              />
              <StatCard
                icon={Package}
                title="Total Product"
                value={stats?.total_products.toLocaleString() || '0'}
                change={stats?.products_change || 0}
                trend={[1, 0.9, 0.95, 0.85, 0.9, 0.8]}
                variant="purple"
              />
              <StatCard
                icon={Users}
                title="Active Customers"
                value={stats?.active_customers.toLocaleString() || '0'}
                change={stats?.customers_change || 0}
                trend={[0.8, 1, 1.1, 1.05, 1.3, 1.2]}
                variant="orange"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <SalesChart data={salesData} />
              </div>
              <div>
                <CategoryChart data={categorySales} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <TopProducts products={topProducts} />
              </div>
              <div className="lg:col-span-2">
                <RecentOrders orders={recentOrders} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
