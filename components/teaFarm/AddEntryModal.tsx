'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Entry</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  type === 'expense'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType('earning')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  type === 'earning'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Earning
              </button>
            </div>
          </div>

          {type === 'expense' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="labour">Labour Cost</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per kg (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              {quantityKg && pricePerKg && (
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-bold text-emerald-600">
                    ₹{(parseFloat(quantityKg) * parseFloat(pricePerKg)).toFixed(2)}
                  </p>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
