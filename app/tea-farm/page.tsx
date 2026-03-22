'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
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
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tea farm data...</p>
          </div>
        </div>
      </div>
    );
  }

  const profitLoss = summary?.profit_loss || 0;
  const isProfitable = profitLoss >= 0;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Tea Farm Management</h1>
                <p className="text-gray-600">Track your tea farm expenses and earnings</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
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

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Total Expenses</p>
                  <p className="text-3xl font-bold text-red-600">
                    ₹{summary?.total_investment.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{expenses.length} transactions</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Total Earnings</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    ₹{summary?.total_earnings.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{earnings.length} transactions</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                  <p className="text-sm text-gray-600 mb-2">Net {isProfitable ? 'Profit' : 'Loss'}</p>
                  <p className={`text-3xl font-bold ${isProfitable ? 'text-emerald-600' : 'text-red-600'}`}>
                    {isProfitable ? '+' : '-'}₹{Math.abs(profitLoss).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Overall balance</p>
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
