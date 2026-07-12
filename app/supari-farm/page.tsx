'use client';

import { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Plus, Download, Printer } from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { SummaryCard } from '@/components/teaFarm/SummaryCard';
import { ProfitChart } from '@/components/teaFarm/ProfitChart';
import { ExpenseTable } from '@/components/supariFarm/ExpenseTable';
import { EarningTable } from '@/components/supariFarm/EarningTable';
import { AddEntryModal } from '@/components/supariFarm/AddEntryModal';
import { useSupariFarm } from '@/hooks/useSupariFarm';
import { downloadCsv, printPage } from '@/lib/exportUtils';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function SupariFarmPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const { expenses, earnings, loading, addEntry, deleteExpense, deleteEarning, updateExpense, updateEarning } = useSupariFarm();

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    [...expenses, ...earnings].forEach(e => years.add(new Date(e.date).getFullYear()));
    return Array.from(years).sort((a, b) => b - a);
  }, [expenses, earnings]);

  const filteredExpenses = useMemo(
    () => selectedYear === 'all' ? expenses : expenses.filter(e => new Date(e.date).getFullYear() === selectedYear),
    [expenses, selectedYear]
  );
  const filteredEarnings = useMemo(
    () => selectedYear === 'all' ? earnings : earnings.filter(e => new Date(e.date).getFullYear() === selectedYear),
    [earnings, selectedYear]
  );

  const totalInvestment = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalEarnings = filteredEarnings.reduce((sum, e) => sum + Number(e.total_amount), 0);
  const profitLoss = totalEarnings - totalInvestment;
  const isProfitable = profitLoss >= 0;

  const monthlyData = useMemo(() => MONTHS.map((month, i) => ({
    month,
    expenses: filteredExpenses.filter(e => new Date(e.date).getMonth() === i).reduce((s, e) => s + Number(e.amount), 0),
    earnings: filteredEarnings.filter(e => new Date(e.date).getMonth() === i).reduce((s, e) => s + Number(e.total_amount), 0),
  })), [filteredExpenses, filteredEarnings]);

  const handleExportCsv = () => {
    const rows = [
      ...filteredExpenses.map(e => ({ Type: 'Expense', Date: e.date, Category: e.category, Amount: e.amount, 'Qty (kg)': '', '₹/kg': '', 'Total Amount': '', Notes: e.notes ?? '' })),
      ...filteredEarnings.map(e => ({ Type: 'Earning', Date: e.date, Category: '', Amount: '', 'Qty (kg)': e.quantity_kg, '₹/kg': e.price_per_kg, 'Total Amount': e.total_amount, Notes: e.notes ?? '' })),
    ].sort((a, b) => a.Date.localeCompare(b.Date));
    downloadCsv(`supari-farm-${selectedYear === 'all' ? 'all-years' : selectedYear}.csv`, rows);
  };

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Loading supari farm data...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1">Supari Farm Management</h1>
                <p className="text-gray-500 dark:text-slate-400 font-medium">Track your areca nut farm expenses and earnings</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {/* Year filter */}
                {availableYears.length > 0 && (
                  <select
                    value={selectedYear}
                    onChange={e => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-300 rounded-2xl focus:ring-2 focus:ring-amber-500/40 outline-none cursor-pointer"
                  >
                    <option value="all">All Years</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                )}
                <button
                  onClick={handleExportCsv}
                  className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">CSV</span>
                </button>
                <button
                  onClick={printPage}
                  className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-[2rem] font-black text-base hover:bg-amber-700 transition-all shadow-xl shadow-amber-200 dark:shadow-none hover:scale-[1.02] active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  Add Entry
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <SummaryCard icon={DollarSign} title="Total Investment" value={`₹${totalInvestment.toFixed(2)}`} variant="red" />
              <SummaryCard icon={Wallet} title="Total Earnings" value={`₹${totalEarnings.toFixed(2)}`} variant="orange" />
              <SummaryCard
                icon={isProfitable ? TrendingUp : TrendingDown}
                title="Profit/Loss"
                value={`₹${Math.abs(profitLoss).toFixed(2)}`}
                variant={isProfitable ? 'green' : 'red'}
              />
              <SummaryCard icon={TrendingUp} title="Transactions" value={String(filteredExpenses.length + filteredEarnings.length)} variant="orange" />
            </div>

            <div className="mb-8">
              <ProfitChart data={monthlyData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ExpenseTable expenses={filteredExpenses} onDelete={deleteExpense} onEditSave={updateExpense} />
              <EarningTable earnings={filteredEarnings} onDelete={deleteEarning} onEditSave={updateEarning} />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
              <h2 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">Financial Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 rounded-2xl">
                  <p className="text-xs font-bold text-red-500 dark:text-red-400 mb-2 uppercase tracking-wider">Total Expenses</p>
                  <p className="text-3xl font-black text-red-600 dark:text-red-400">₹{totalInvestment.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-medium mt-2">{filteredExpenses.length} transactions</p>
                </div>
                <div className="text-center p-6 bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 rounded-2xl">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider">Total Earnings</p>
                  <p className="text-3xl font-black text-amber-600 dark:text-amber-400">₹{totalEarnings.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-medium mt-2">{filteredEarnings.length} transactions</p>
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

      <AddEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addEntry} />
    </DashboardShell>
  );
}
