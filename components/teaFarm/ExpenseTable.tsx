'use client';

import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { TeaFarmExpense } from '@/models/TeaFarm';

interface ExpenseTableProps {
  expenses: TeaFarmExpense[];
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  labour: 'bg-blue-50 text-blue-700',
  fertilizers: 'bg-green-50 text-green-700',
  maintenance: 'bg-orange-50 text-orange-700',
  miscellaneous: 'bg-purple-50 text-purple-700',
};

export function ExpenseTable({ expenses, onDelete }: ExpenseTableProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Expense Tracking</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Notes</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No expenses recorded yet
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2 text-sm text-gray-900">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-4 px-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category]}`}>
                      {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-sm font-semibold text-red-600">
                    -₹{expense.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-600">
                    {expense.notes || '-'}
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
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
