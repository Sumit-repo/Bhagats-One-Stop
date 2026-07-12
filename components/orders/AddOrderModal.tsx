'use client';

import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Order, OrderStatus } from '@/models/Order';
import { localDateString } from '@/lib/constants';

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (order: Omit<Order, 'id' | 'created_at' | 'order_number'>) => Promise<Order>;
}

const STATUS_OPTIONS: { label: string; value: OrderStatus }[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
];

const inputClass = "w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all";

export function AddOrderModal({ isOpen, onClose, onAdd }: AddOrderModalProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    product_name: '',
    price: '',
    status: 'pending' as OrderStatus,
    order_date: localDateString(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onAdd({
        customer_name: formData.customer_name,
        product_name: formData.product_name,
        price: parseFloat(formData.price),
        status: formData.status,
        order_date: formData.order_date,
      });
      setFormData({ customer_name: '', product_name: '', price: '', status: 'pending', order_date: localDateString() });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">New Order</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {error && (
          <div role="alert" className="mb-6 p-3 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-500/10 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="order-customer" className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Customer Name</label>
            <input
              id="order-customer"
              required
              type="text"
              value={formData.customer_name}
              onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="order-product" className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Product</label>
            <input
              id="order-product"
              required
              type="text"
              value={formData.product_name}
              onChange={e => setFormData({ ...formData, product_name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="order-price" className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Total (₹)</label>
              <input
                id="order-price"
                required
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="order-status" className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Status</label>
              <select
                id="order-status"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as OrderStatus })}
                className={inputClass}
              >
                {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="order-date" className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Order Date</label>
            <input
              id="order-date"
              type="date"
              value={formData.order_date}
              onChange={e => setFormData({ ...formData, order_date: e.target.value })}
              className={`${inputClass} dark:[&::-webkit-calendar-picker-indicator]:invert`}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </span>
            ) : 'Create Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
