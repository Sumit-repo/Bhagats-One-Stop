'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Sprout, Pencil } from 'lucide-react';
import { SupariFarmEarning } from '@/models/SupariFarm';
import { TablePagination, PAGE_SIZE } from '@/components/ui/TablePagination';
import { EditEntryModal, SupariEditTarget } from './EditEntryModal';

interface EarningTableProps {
  earnings: SupariFarmEarning[];
  onDelete: (id: string) => void;
  onEditSave: (id: string, data: Partial<Omit<SupariFarmEarning, 'id' | 'created_at'>>) => Promise<void>;
}

export function EarningTable({ earnings, onDelete, onEditSave }: EarningTableProps) {
  const [page, setPage] = useState(1);
  const [editTarget, setEditTarget] = useState<SupariEditTarget | null>(null);
  const total = earnings.reduce((sum, e) => sum + e.total_amount, 0);
  const totalKg = earnings.reduce((sum, e) => sum + e.quantity_kg, 0);
  const paged = earnings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center">
            <Sprout className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 dark:text-white">Earnings Record</h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{earnings.length} records · {totalKg.toFixed(1)} kg total</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Total</p>
          <p className="text-lg font-black text-amber-600 dark:text-amber-400">+₹{total.toFixed(2)}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100 dark:border-slate-800">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Qty (kg)</th>
              <th className="px-5 py-3">₹/kg</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Notes</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-14 text-center text-gray-400 dark:text-slate-500 font-medium italic text-sm">
                  No earnings recorded yet. Add an entry to get started.
                </td>
              </tr>
            ) : (
              paged.map((earning) => (
                <tr key={earning.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono font-medium text-gray-500 dark:text-slate-400 italic">
                    {format(new Date(earning.date), 'dd MMM yy')}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-black border border-amber-100 dark:border-amber-500/20">
                      {earning.quantity_kg} kg
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-600 dark:text-slate-400">
                    ₹{earning.price_per_kg.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-sm font-black text-amber-600 dark:text-amber-400">
                    +₹{earning.total_amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-slate-400 font-medium max-w-[120px] truncate">
                    {earning.notes || <span className="text-gray-300 dark:text-slate-600 italic">—</span>}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditTarget({ kind: 'earning', entry: earning })}
                        aria-label="Edit earning"
                        className="p-3 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors text-gray-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(earning.id)}
                        aria-label="Delete earning"
                        className="p-3 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePagination total={earnings.length} page={page} onPageChange={setPage} />
      <EditEntryModal
        target={editTarget}
        onClose={() => setEditTarget(null)}
        onSaveExpense={async () => {}}
        onSaveEarning={onEditSave}
      />
    </div>
  );
}
