'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Package, ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2, Check, X } from 'lucide-react';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { Product } from '@/models/Product';

type SortKey = 'name' | 'category' | 'stock' | 'price' | 'sales';
type SortDir = 'asc' | 'desc';

interface ProductTableProps {
  products: Product[];
  onFilter: (filters: { category?: string; stockStatus?: string; search?: string }) => void;
  onDelete: (id: string) => Promise<void>;
  onEdit: (product: Product) => Promise<void>;
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
  return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-emerald-500" /> : <ArrowDown className="w-3 h-3 text-emerald-500" />;
}

function ActionMenu({ product, onEdit, onDelete }: { product: Product; onEdit: (p: Product) => void; onDelete: (id: string) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try { await onDelete(product.id); } finally { setDeleting(false); setConfirming(false); setOpen(false); }
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-gray-700 dark:hover:text-white">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="2" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="14" r="1.5"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 w-44 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          {!confirming ? (
            <>
              <button onClick={() => { onEdit(product); setOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Pencil className="w-4 h-4 text-blue-500" /> Edit
              </button>
              <button onClick={() => setConfirming(true)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-gray-100 dark:border-slate-700">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </>
          ) : (
            <div className="p-4">
              <p className="text-xs font-bold text-gray-700 dark:text-slate-300 mb-3">Delete this product?</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirming(false)} disabled={deleting} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                  <X className="w-3 h-3" /> No
                </button>
                <button onClick={handleDelete} disabled={deleting} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700">
                  {deleting ? '...' : <><Check className="w-3 h-3" /> Yes</>}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EditRow({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState({ name: product.name, category: product.category, price: product.price.toString(), stock: product.stock.toString() });
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    try { await onSave({ ...product, name: form.name, category: form.category, price: parseFloat(form.price), stock: parseInt(form.stock) }); } finally { setSaving(false); }
  };
  return (
    <tr className="bg-emerald-50/50 dark:bg-emerald-500/5 border-b border-emerald-100 dark:border-emerald-500/20">
      <td className="px-4 py-3"><input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className="w-full px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30" /></td>
      <td className="px-4 py-3">
        <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} className="w-full px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none">
          {['Dairy','Bakery','General','Snacks'].map(c => <option key={c}>{c}</option>)}
        </select>
      </td>
      <td className="px-4 py-3"><input type="number" value={form.stock} onChange={e => setForm(p => ({...p, stock: e.target.value}))} className="w-20 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none" /></td>
      <td className="px-4 py-3"><input type="number" value={form.price} onChange={e => setForm(p => ({...p, price: e.target.value}))} className="w-24 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 dark:text-white focus:outline-none" /></td>
      <td className="px-4 py-3 text-sm text-gray-400">—</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button onClick={handleSave} disabled={saving} className="px-3 py-1.5 text-xs font-black bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">{saving ? '...' : 'Save'}</button>
          <button onClick={onCancel} className="px-3 py-1.5 text-xs font-black bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 rounded-lg">Cancel</button>
        </div>
      </td>
    </tr>
  );
}

export function ProductTable({ products, onFilter, onDelete, onEdit }: ProductTableProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSearch = (val: string) => { setSearch(val); onFilter({ search: val, category }); };
  const handleCategoryChange = (val: string) => { setCategory(val); onFilter({ search, category: val }); };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortKey) {
        case 'name':     aVal = a.name.toLowerCase();    bVal = b.name.toLowerCase();    break;
        case 'category': aVal = a.category.toLowerCase(); bVal = b.category.toLowerCase(); break;
        case 'stock':    aVal = a.stock;                 bVal = b.stock;                 break;
        case 'price':    aVal = a.price;                 bVal = b.price;                 break;
        case 'sales':    aVal = a.sales ?? 0;            bVal = b.sales ?? 0;            break;
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [products, sortKey, sortDir]);

  const handleEditSave = async (updated: Product) => {
    await onEdit(updated);
    setEditingProduct(null);
  };

  const thClass = "px-6 py-5 cursor-pointer select-none hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors";

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500" />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest hidden md:block">Filter by:</span>
          <CustomDropdown options={[{ label: 'All Categories', value: '' },{ label: 'Dairy', value: 'Dairy' },{ label: 'Bakery', value: 'Bakery' },{ label: 'General', value: 'General' },{ label: 'Snacks', value: 'Snacks' }]}
            value={category} onChange={handleCategoryChange} className="w-full md:w-auto" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-100 dark:border-slate-800">
                <th className={thClass} onClick={() => toggleSort('name')}><div className="flex items-center gap-2"><span>Product Name</span><SortIcon col="name" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('category')}><div className="flex items-center gap-2"><span>Category</span><SortIcon col="category" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('stock')}><div className="flex items-center gap-2"><span>Stock</span><SortIcon col="stock" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('price')}><div className="flex items-center gap-2"><span>Price</span><SortIcon col="price" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className={thClass} onClick={() => toggleSort('sales')}><div className="flex items-center gap-2"><span>Sales</span><SortIcon col="sales" sortKey={sortKey} sortDir={sortDir} /></div></th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {sorted.length > 0 ? sorted.map((product) =>
                editingProduct?.id === product.id ? (
                  <EditRow key={product.id} product={product} onSave={handleEditSave} onCancel={() => setEditingProduct(null)} />
                ) : (
                  <tr key={product.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {product.image_url
                          ? <img src={product.image_url} alt={product.name} className="w-10 h-10 rounded-xl object-cover" />
                          : <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center"><Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>}
                        <span className="text-sm font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5"><span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase rounded-lg">{product.category}</span></td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className={`text-sm font-bold ${product.stock < 20 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{product.stock} units</span>
                        <div className="w-20 h-1 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${product.stock < 20 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-black text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">₹{(product.sales || 0).toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.quantity_sold} Sold</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <ActionMenu product={product} onEdit={(p) => setEditingProduct(p)} onDelete={onDelete} />
                    </td>
                  </tr>
                )
              ) : (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-500 dark:text-slate-400 font-medium italic">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
