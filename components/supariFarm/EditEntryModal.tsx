'use client';

import { useState, useEffect } from 'react';
import { X, Receipt, Sprout, Info, Calendar as CalendarIcon, Package, DollarSign, Pencil } from 'lucide-react';
import { SupariFarmExpense, SupariFarmEarning, SupariExpenseCategory } from '@/models/SupariFarm';

export type SupariEditTarget =
  | { kind: 'expense'; entry: SupariFarmExpense }
  | { kind: 'earning'; entry: SupariFarmEarning };

interface EditEntryModalProps {
  target: SupariEditTarget | null;
  onClose: () => void;
  onSaveExpense: (id: string, data: Partial<Omit<SupariFarmExpense, 'id' | 'created_at'>>) => Promise<void>;
  onSaveEarning: (id: string, data: Partial<Omit<SupariFarmEarning, 'id' | 'created_at'>>) => Promise<void>;
}

const inputClass = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border-none text-sm font-medium text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-500/40 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500";
const labelClass = "block text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2";

export function EditEntryModal({ target, onClose, onSaveExpense, onSaveEarning }: EditEntryModalProps) {
  const [category, setCategory] = useState<SupariExpenseCategory>('labour');
  const [amount, setAmount] = useState('');
  const [quantityKg, setQuantityKg] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!target) return;
    if (target.kind === 'expense') {
      const e = target.entry;
      setCategory(e.category);
      setAmount(String(e.amount));
      setDate(e.date);
      setNotes(e.notes ?? '');
    } else {
      const e = target.entry;
      setQuantityKg(String(e.quantity_kg));
      setPricePerKg(String(e.price_per_kg));
      setDate(e.date);
      setNotes(e.notes ?? '');
    }
  }, [target]);

  if (!target) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (target.kind === 'expense') {
        await onSaveExpense(target.entry.id, {
          category,
          amount: parseFloat(amount),
          date,
          notes: notes || undefined,
        });
      } else {
        const qty = parseFloat(quantityKg);
        const price = parseFloat(pricePerKg);
        await onSaveEarning(target.entry.id, {
          quantity_kg: qty,
          price_per_kg: price,
          total_amount: qty * price,
          date,
          notes: notes || undefined,
        });
      }
      onClose();
    } catch {
      // error handled by hook
    } finally {
      setLoading(false);
    }
  };

  const isExpense = target.kind === 'expense';

  return (
    <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl transition-colors relative overflow-hidden max-h-[90dvh] overflow-y-auto">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-colors ${isExpense ? 'bg-red-500' : 'bg-amber-500'}`} />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isExpense ? 'bg-red-50 dark:bg-red-500/10' : 'bg-amber-50 dark:bg-amber-500/10'}`}>
              <Pencil className={`w-4 h-4 ${isExpense ? 'text-red-500' : 'text-amber-500'}`} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Edit Entry</h2>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase tracking-widest">
                {isExpense ? <><Receipt className="inline w-3 h-3 mr-1" />Expense</> : <><Sprout className="inline w-3 h-3 mr-1" />Earning</>}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {isExpense ? (
            <>
              <div>
                <label className={labelClass}>Category</label>
                <div className="relative">
                  <Info className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SupariExpenseCategory)}
                    className={`${inputClass} appearance-none cursor-pointer`}
                    required
                  >
                    <option value="planting">Planting</option>
                    <option value="labour">Labour Cost</option>
                    <option value="fertilizers">Fertilizers</option>
                    <option value="pesticides">Pesticides</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="miscellaneous">Miscellaneous</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 dark:text-slate-500">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Quantity</label>
                  <div className="relative">
                    <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.0"
                      value={quantityKg}
                      onChange={(e) => setQuantityKg(e.target.value)}
                      className={inputClass}
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 dark:text-slate-500">kg</span>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Price / kg</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={pricePerKg}
                      onChange={(e) => setPricePerKg(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>
              {quantityKg && pricePerKg && (
                <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/20 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">Calculated Total</span>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                    ₹{(parseFloat(quantityKg) * parseFloat(pricePerKg)).toFixed(2)}
                  </span>
                </div>
              )}
            </>
          )}

          <div>
            <label className={labelClass}>Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${inputClass} [&::-webkit-calendar-picker-indicator]:opacity-50 dark:[&::-webkit-calendar-picker-indicator]:invert`}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Optional details..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none text-sm font-medium text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-500/40 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center ${
              isExpense
                ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20'
                : 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'
            } disabled:opacity-50 disabled:pointer-events-none`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
