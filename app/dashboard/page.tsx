'use client';

import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
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
  const { products, loading: productsLoading } = useProducts();
  const { orders, loading: ordersLoading } = useOrders();

  // Use the shared data for dashboard components
  const topProductsLimit = products.slice(0, 5).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity_sold: p.quantity_sold
  }));

  const recentOrdersLimit = orders.slice(0, 5);

  return (
    <DashboardShell>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
              <p className="text-gray-500 dark:text-slate-400 font-medium mt-1">Real-time performance at Bhagat&apos;s One-Stop</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {dashboardLoading ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 animate-pulse h-32" />
              )) : <>
                <StatCard icon={DollarSign} title="Total Revenue" value={`₹${stats?.total_revenue.toLocaleString() || '0'}`} change={stats?.revenue_change || 0} trend={[0.8, 1, 0.9, 1.1, 0.95, 1.2]} variant="green" />
                <StatCard icon={ShoppingCart} title="Total Orders" value={stats?.total_orders.toLocaleString() || '0'} change={stats?.orders_change || 0} trend={[0.7, 0.9, 1.1, 0.95, 1.2, 1]} variant="blue" />
                <StatCard icon={Package} title="Total Products" value={stats?.total_products.toLocaleString() || '0'} change={stats?.products_change || 0} trend={[1, 0.9, 0.95, 0.85, 0.9, 0.8]} variant="purple" />
                <StatCard icon={Users} title="Active Customers" value={stats?.active_customers.toLocaleString() || '0'} change={stats?.customers_change || 0} trend={[0.8, 1, 1.1, 1.05, 1.3, 1.2]} variant="orange" />
              </>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Revenue Trend</h3>
                <div className="h-[300px]">
                  {dashboardLoading ? <div className="w-full h-full bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse" /> : <SalesChart data={salesData} />}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Sales Categories</h3>
                <div className="flex-1 min-h-[300px]">
                  {dashboardLoading ? <div className="w-full h-full bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse" /> : <CategoryChart data={categorySales} />}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
                {productsLoading ? <div className="w-full h-48 bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse" /> : <TopProducts products={topProductsLimit} />}
              </div>
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
                {ordersLoading ? <div className="w-full h-48 bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse" /> : <RecentOrders orders={recentOrdersLimit} />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardShell>
  );
}
