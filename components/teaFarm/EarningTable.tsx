'use client';

import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { TeaFarmEarning } from '@/models/TeaFarm';

interface EarningTableProps {
  earnings: TeaFarmEarning[];
  onDelete: (id: string) => void;
}

export function EarningTable({ earnings, onDelete }: EarningTableProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Earnings Record</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Quantity (kg)</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Price/kg</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Total Amount</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Notes</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {earnings.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No earnings recorded yet
                </td>
              </tr>
            ) : (
              earnings.map((earning) => (
                <tr key={earning.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2 text-sm text-gray-900">
                    {format(new Date(earning.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-900">
                    {earning.quantity_kg} kg
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-900">
                    ₹{earning.price_per_kg.toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-sm font-semibold text-emerald-600">
                    +₹{earning.total_amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-600">
                    {earning.notes || '-'}
                  </td>
                  <td className="py-4 px-2">
                    <button
                      onClick={() => onDelete(earning.id)}
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
