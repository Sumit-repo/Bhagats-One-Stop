'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { useDashboard } from '@/hooks/useDashboard';
import { ChartBar as BarChart3, TrendingUp, Calendar, Download, ArrowUpRight } from 'lucide-react';

export default function ReportsPage() {
  const { stats, salesData, categorySales, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto uppercase-header-context">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Analytics Dashboard</h1>
                </div>
                <p className="text-gray-500 dark:text-slate-400 font-medium">Data-driven insights for Bhagat&apos;s One-Stop</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                  <Calendar className="w-4 h-4" />
                  Last 30 Days
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none hover:scale-[1.02] active:scale-95">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Revenue Growth</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mt-1">Daily earnings over current period</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black rounded-xl uppercase tracking-wider">
                    <ArrowUpRight className="w-3 h-3" />
                    {stats?.revenue_change}%
                  </div>
                </div>
                <div className="h-[350px] w-full">
                  <SalesChart data={salesData} />
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">Category Mix</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mt-1">Sales distribution by department</p>
                </div>
                <div className="flex-1 min-h-[300px]">
                  <CategoryChart data={categorySales} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Net Profit', value: `₹${(stats?.total_revenue || 0 * 0.4).toLocaleString()}`, trend: '+8.4%', sub: 'Estimated margin' },
                { label: 'Avg Ticket', value: '₹842', trend: '+2.1%', sub: 'Per customer spend' },
                { label: 'Retain Rate', value: '72%', trend: '+12%', sub: 'Returning customers' },
                { label: 'Conversion', value: '4.8%', trend: '-0.4%', sub: 'Traffic to orders' },
              ].map((metric, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-all hover:border-emerald-200 dark:hover:border-emerald-500/30">
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-black uppercase tracking-widest mb-3">{metric.label}</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white mb-2">{metric.value}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${metric.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{metric.trend}</span>
                    <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">{metric.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
