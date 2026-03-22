'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { SummaryCard } from '@/components/teaFarm/SummaryCard';
import { ProfitChart } from '@/components/teaFarm/ProfitChart';
import { ExpenseTable } from '@/components/teaFarm/ExpenseTable';
import { EarningTable } from '@/components/teaFarm/EarningTable';
import { AddEntryModal } from '@/components/teaFarm/AddEntryModal';
import { useTeaFarm } from '@/hooks/useTeaFarm';

export default function TeaFarmPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { summary, expenses, earnings, monthlyData, loading, addEntry, deleteExpense, deleteEarning } = useTeaFarm();

  if (loading) {
    return (
      <div className="flex h-screen bg-white dark:bg-slate-950">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Loading tea farm data...</p>
          </div>
        </div>
      </div>
    );
  }

  const profitLoss = summary?.profit_loss || 0;
  const isProfitable = profitLoss >= 0;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1">Tea Farm Management</h1>
                <p className="text-gray-500 dark:text-slate-400 font-medium">Track your tea farm expenses and earnings</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 dark:shadow-none hover:scale-[1.02] active:scale-95"
              >
                <Plus className="w-6 h-6" />
                Add Entry
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <SummaryCard
                icon={DollarSign}
                title="Total Investment"
                value={`₹${summary?.total_investment.toFixed(2) || '0.00'}`}
                variant="red"
              />
              <SummaryCard
                icon={Wallet}
                title="Total Earnings"
                value={`₹${summary?.total_earnings.toFixed(2) || '0.00'}`}
                variant="green"
              />
              <SummaryCard
                icon={isProfitable ? TrendingUp : TrendingDown}
                title="Profit/Loss"
                value={`₹${Math.abs(profitLoss).toFixed(2)}`}
                variant={isProfitable ? 'green' : 'red'}
              />
              <SummaryCard
                icon={TrendingUp}
                title="Monthly Spend"
                value={`₹${summary?.monthly_trend.toFixed(2) || '0.00'}`}
                variant="orange"
              />
            </div>

            <div className="mb-8">
              <ProfitChart data={monthlyData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ExpenseTable expenses={expenses} onDelete={deleteExpense} />
              <EarningTable earnings={earnings} onDelete={deleteEarning} />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
              <h2 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">Financial Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 rounded-2xl">
                  <p className="text-sm font-bold text-red-500 dark:text-red-400 mb-2 uppercase tracking-wider text-xs">Total Expenses</p>
                  <p className="text-3xl font-black text-red-600 dark:text-red-400">
                    ₹{summary?.total_investment.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-medium mt-2">{expenses.length} transactions</p>
                </div>
                <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 rounded-2xl">
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider text-xs">Total Earnings</p>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{summary?.total_earnings.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-medium mt-2">{earnings.length} transactions</p>
                </div>
                <div className={`text-center p-6 rounded-2xl border transition-colors ${isProfitable
                  ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20'
                  : 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20'}`}>
                  <p className="text-xs font-black text-gray-400 dark:text-slate-500 mb-2 uppercase tracking-wider">Net {isProfitable ? 'Profit' : 'Loss'}</p>
                  <p className={`text-3xl font-black ${isProfitable ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isProfitable ? '+' : '-'}₹{Math.abs(profitLoss).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-medium mt-2">Overall balance</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addEntry}
      />
    </div>
  );
}
