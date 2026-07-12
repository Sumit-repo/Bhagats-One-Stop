'use client';

import { useState, useEffect } from 'react';
import { X, User, Mail } from 'lucide-react';
import { Customer } from '@/models/Customer';

interface EditCustomerModalProps {
  customer: Customer;
  onClose: () => void;
  onSave: (customer: Customer) => Promise<void>;
}

export function EditCustomerModal({ customer, onClose, onSave }: EditCustomerModalProps) {
  const [form, setForm] = useState({ name: customer.name, email: customer.email || '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({ name: customer.name, email: customer.email || '' });
    setError('');
  }, [customer.id]);

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required.'); return; }
    setSaving(true);
    setError('');
    try {
      await onSave({ ...customer, name: form.name.trim(), email: form.email.trim() });
      onClose();
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-2xl w-full max-w-md max-h-[90dvh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">Edit Customer</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{customer.name}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-3 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {error && (
            <p className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-500/10 px-4 py-2.5 rounded-xl">{error}</p>
          )}
          <div className="space-y-1.5">
            <label htmlFor="edit-name" className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="edit-name"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Customer name"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="edit-email" className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="edit-email"
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="customer@email.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onClose} className="flex-1 py-3 text-sm font-bold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 text-sm font-bold bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
