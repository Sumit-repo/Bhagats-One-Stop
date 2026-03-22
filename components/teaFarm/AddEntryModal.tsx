'use client';

import { useState } from 'react';
import { X, Receipt, Leaf, Info, Calendar as CalendarIcon, Package, DollarSign } from 'lucide-react';
import { FinanceEntry, ExpenseCategory } from '@/models/TeaFarm';

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: FinanceEntry) => Promise<void>;
}

export function AddEntryModal({ isOpen, onClose, onSubmit }: AddEntryModalProps) {
  const [type, setType] = useState<'expense' | 'earning'>('expense');
  const [category, setCategory] = useState<ExpenseCategory>('labour');
  const [amount, setAmount] = useState('');
  const [quantityKg, setQuantityKg] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const entry: FinanceEntry = {
        type,
        date,
        notes,
        amount: 0,
      };

      if (type === 'expense') {
        entry.category = category;
        entry.amount = parseFloat(amount);
      } else {
        entry.quantity_kg = parseFloat(quantityKg);
        entry.price_per_kg = parseFloat(pricePerKg);
        entry.amount = parseFloat(quantityKg) * parseFloat(pricePerKg);
      }

      await onSubmit(entry);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Failed to add entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setType('expense');
    setCategory('labour');
    setAmount('');
    setQuantityKg('');
    setPricePerKg('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border-none text-sm font-medium text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500/40 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500";
  const labelClass = "block text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2";

  return (
    <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl transition-colors relative overflow-hidden">
        
        {/* Glow effect */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-colors ${type === 'expense' ? 'bg-red-500' : 'bg-emerald-500'}`} />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Record Financials</h2>
            <p className="text-xs font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase tracking-widest">Add new {type}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {/* Type Toggle */}
          <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                type === 'expense'
                  ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
              }`}
            >
              <Receipt className="w-4 h-4" /> Expense
            </button>
            <button
              type="button"
              onClick={() => setType('earning')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                type === 'earning'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
              }`}
            >
              <Leaf className="w-4 h-4" /> Earning
            </button>
          </div>

          <div className="space-y-4">
            {type === 'expense' ? (
              <>
                <div>
                  <label className={labelClass}>Category</label>
                  <div className="relative">
                    <Info className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                      className={`${inputClass} appearance-none cursor-pointer`}
                      required
                    >
                      <option value="labour">Labour Cost</option>
                      <option value="fertilizers">Fertilizers</option>
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
            )}

            {/* Total calculation for earnings */}
            {type === 'earning' && quantityKg && pricePerKg && (
              <div className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Calculated Total</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                  ₹{(parseFloat(quantityKg) * parseFloat(pricePerKg)).toFixed(2)}
                </span>
              </div>
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
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none text-sm font-medium text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500/40 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center ${
              type === 'expense' 
                ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20' 
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
            } disabled:opacity-50 disabled:pointer-events-none`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              `Save ${type}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
