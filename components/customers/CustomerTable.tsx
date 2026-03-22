'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, User, Mail, ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2, Check, X } from 'lucide-react';
import { Customer } from '@/models/Customer';

type SortKey = 'name' | 'email' | 'total_orders' | 'created_at';
type SortDir = 'asc' | 'desc';

interface CustomerTableProps {
  customers: Customer[];
  onFilter: (filters: { search?: string }) => void;
  onDelete: (id: string) => Promise<void>;
  onEdit: (customer: Customer) => Promise<void>;
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
  return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-emerald-500" /> : <ArrowDown className="w-3 h-3 text-emerald-500" />;
}

function ActionMenu({ customer, onEdit, onDelete }: { customer: Customer; onEdit: (c: Customer) => Promise<void>; onDelete: (id: string) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingOpen, setEditingOpen] = useState(false);
  const [form, setForm] = useState({ name: customer.name, email: customer.email || '' });
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setConfirming(false); setEditingOpen(false); } };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try { await onDelete(customer.id); } finally { setDeleting(false); setConfirming(false); setOpen(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try { await onEdit({ ...customer, name: form.name, email: form.email }); setEditingOpen(false); setOpen(false); } finally { setSaving(false); }
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-gray-700 dark:hover:text-white">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="2" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="14" r="1.5"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 w-60 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          {!confirming && !editingOpen ? (
            <>
              <button onClick={() => setEditingOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Pencil className="w-4 h-4 text-blue-500" /> Edit Customer
              </button>
              <button onClick={() => setConfirming(true)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-gray-100 dark:border-slate-700">
                <Trash2 className="w-4 h-4" /> Delete Customer
              </button>
            </>
          ) : confirming ? (
            <div className="p-4">
              <p className="text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Delete {customer.name}?</p>
              <p className="text-[10px] text-gray-400 mb-3">This action cannot be undone.</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirming(false)} disabled={deleting} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300"><X className="w-3 h-3" /> No</button>
                <button onClick={handleDelete} disabled={deleting} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700">{deleting ? '...' : <><Check className="w-3 h-3" /> Yes</>}</button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Edit Customer</p>
              <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Name" className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
              <input value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="Email" className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
              <div className="flex gap-2">
                <button onClick={() => setEditingOpen(false)} className="flex-1 py-1.5 text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 rounded-lg">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">{saving ? '...' : 'Save'}</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CustomerTable({ customers, onFilter, onDelete, onEdit }: CustomerTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSearch = (val: string) => { setSearch(val); onFilter({ search: val }); };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = useMemo(() => {
    return [...customers].sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortKey) {
        case 'name':         aVal = a.name.toLowerCase();          bVal = b.name.toLowerCase();          break;
        case 'email':        aVal = (a.email || '').toLowerCase(); bVal = (b.email || '').toLowerCase(); break;
        case 'total_orders': aVal = a.total_orders;                bVal = b.total_orders;                break;
        case 'created_at':   aVal = new Date(a.created_at).getTime(); bVal = new Date(b.created_at).getTime(); break;
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [customers, sortKey, sortDir]);

  const thClass = "px-6 py-5 cursor-pointer select-none hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-100 dark:border-slate-800">
                <th className={thClass} onClick={() => toggleSort('name')}><div className="flex items-center gap-2"><span>Customer Name / Email</span><SortIcon col="name" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('total_orders')}><div className="flex items-center gap-2"><span>Total Orders</span><SortIcon col="total_orders" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('created_at')}><div className="flex items-center gap-2"><span>Joined Date</span><SortIcon col="created_at" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {sorted.length > 0 ? sorted.map((customer) => (
                <tr key={customer.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{customer.name}</p>
                        {customer.email && <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-500 font-medium"><Mail className="w-3 h-3" />{customer.email}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-[10px] font-black uppercase">{customer.total_orders} Orders</span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-slate-400 font-medium font-mono italic">
                    {new Date(customer.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <ActionMenu customer={customer} onEdit={onEdit} onDelete={onDelete} />
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="px-6 py-16 text-center text-gray-500 dark:text-slate-400 font-medium italic">No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
