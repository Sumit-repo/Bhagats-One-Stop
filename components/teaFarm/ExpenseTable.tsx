'use client';

import { format } from 'date-fns';
import { Trash2, Receipt } from 'lucide-react';
import { TeaFarmExpense } from '@/models/TeaFarm';

interface ExpenseTableProps {
  expenses: TeaFarmExpense[];
  onDelete: (id: string) => void;
}

const categoryStyle: Record<string, string> = {
  labour:        'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20',
  fertilizers:   'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-500/20',
  maintenance:   'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20',
  miscellaneous: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-500/20',
};

export function ExpenseTable({ expenses, onDelete }: ExpenseTableProps) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center">
            <Receipt className="w-4 h-4 text-red-500 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 dark:text-white">Expense Tracking</h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{expenses.length} records</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Total</p>
          <p className="text-lg font-black text-red-600 dark:text-red-400">-₹{total.toFixed(2)}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100 dark:border-slate-800">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Notes</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-14 text-center text-gray-400 dark:text-slate-500 font-medium italic text-sm">
                  No expenses recorded yet. Add an entry to get started.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono font-medium text-gray-500 dark:text-slate-400 italic">
                    {format(new Date(expense.date), 'dd MMM yy')}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${categoryStyle[expense.category] || categoryStyle.miscellaneous}`}>
                      {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-black text-red-600 dark:text-red-400">
                    -₹{expense.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-slate-400 font-medium max-w-[140px] truncate">
                    {expense.notes || <span className="text-gray-300 dark:text-slate-600 italic">—</span>}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-gray-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
