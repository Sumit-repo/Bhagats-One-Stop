'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, User, ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2, Check, X } from 'lucide-react';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { Order, OrderStatus } from '@/models/Order';

type SortKey = 'order_number' | 'customer_name' | 'order_date' | 'status' | 'price';
type SortDir = 'asc' | 'desc';

const STATUS_OPTIONS = [
  { label: 'All Status', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
];

const statusStyle: Record<string, string> = {
  delivered: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  shipped: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
  processing: 'bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400',
  pending: 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400',
};

const statusRank: Record<string, number> = { pending: 0, processing: 1, shipped: 2, delivered: 3 };

interface OrderTableProps {
  orders: Order[];
  onFilter: (filters: { status?: string; search?: string }) => void;
  onDelete: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, status: OrderStatus) => Promise<void>;
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
  return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-emerald-500" /> : <ArrowDown className="w-3 h-3 text-emerald-500" />;
}

function ActionMenu({ order, onUpdateStatus, onDelete }: { order: Order; onUpdateStatus: (id: string, s: OrderStatus) => Promise<void>; onDelete: (id: string) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setConfirming(false); setEditingStatus(false); } };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try { await onDelete(order.id); } finally { setDeleting(false); setConfirming(false); setOpen(false); }
  };

  const handleStatus = async (s: string) => {
    await onUpdateStatus(order.id, s as OrderStatus);
    setEditingStatus(false);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-gray-700 dark:hover:text-white">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="2" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="14" r="1.5"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 w-52 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          {!confirming && !editingStatus ? (
            <>
              <button onClick={() => setEditingStatus(true)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Pencil className="w-4 h-4 text-blue-500" /> Update Status
              </button>
              <button onClick={() => setConfirming(true)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-gray-100 dark:border-slate-700">
                <Trash2 className="w-4 h-4" /> Delete Order
              </button>
            </>
          ) : confirming ? (
            <div className="p-4">
              <p className="text-xs font-bold text-gray-700 dark:text-slate-300 mb-3">Delete order #{order.order_number}?</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirming(false)} disabled={deleting} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300"><X className="w-3 h-3" /> No</button>
                <button onClick={handleDelete} disabled={deleting} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700">{deleting ? '...' : <><Check className="w-3 h-3" /> Yes</>}</button>
              </div>
            </div>
          ) : (
            <div className="p-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 py-1">Set Status</p>
              {(['pending','processing','shipped','delivered'] as OrderStatus[]).map(s => (
                <button key={s} onClick={() => handleStatus(s)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${order.status === s ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'}`}>
                  {order.status === s && <Check className="w-3 h-3" />} {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function OrderTable({ orders, onFilter, onDelete, onUpdateStatus }: OrderTableProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('order_date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSearch = (val: string) => { setSearch(val); onFilter({ search: val, status }); };
  const handleStatusChange = (val: string) => { setStatus(val); onFilter({ search, status: val }); };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = useMemo(() => {
    return [...orders].sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortKey) {
        case 'order_number':   aVal = a.order_number;                    bVal = b.order_number;                    break;
        case 'customer_name':  aVal = a.customer_name.toLowerCase();     bVal = b.customer_name.toLowerCase();     break;
        case 'order_date':     aVal = new Date(a.order_date).getTime();  bVal = new Date(b.order_date).getTime();  break;
        case 'status':         aVal = statusRank[a.status] ?? 0;         bVal = statusRank[b.status] ?? 0;         break;
        case 'price':          aVal = a.price;                           bVal = b.price;                           break;
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [orders, sortKey, sortDir]);

  const thClass = "px-6 py-5 cursor-pointer select-none hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors";

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search orders..." value={search} onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500" />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest hidden md:block">Status:</span>
          <CustomDropdown options={STATUS_OPTIONS} value={status} onChange={handleStatusChange} className="w-full md:w-auto" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-100 dark:border-slate-800">
                <th className={thClass} onClick={() => toggleSort('order_number')}><div className="flex items-center gap-2"><span>Order ID</span><SortIcon col="order_number" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('customer_name')}><div className="flex items-center gap-2"><span>Product & Customer</span><SortIcon col="customer_name" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('order_date')}><div className="flex items-center gap-2"><span>Date</span><SortIcon col="order_date" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('status')}><div className="flex items-center gap-2"><span>Status</span><SortIcon col="status" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('price')}><div className="flex items-center gap-2"><span>Total</span><SortIcon col="price" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {sorted.length > 0 ? sorted.map((order) => (
                <tr key={order.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5 text-sm font-bold text-gray-400 dark:text-slate-600 font-mono">#{order.order_number}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center"><User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{order.customer_name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-500 font-medium">{order.product_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-slate-400 font-medium font-mono italic">
                    {new Date(order.order_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusStyle[order.status] || statusStyle.pending}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-gray-900 dark:text-white">₹{order.price.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right">
                    <ActionMenu order={order} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-500 dark:text-slate-400 font-medium italic">No orders found matching filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
