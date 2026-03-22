'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Search, Package, ArrowUpDown, ChevronDown } from 'lucide-react';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { Product } from '@/models/Product';

interface ProductTableProps {
  products: Product[];
  onFilter: (filters: { category?: string; stockStatus?: string; search?: string }) => void;
}

export function ProductTable({ products, onFilter }: ProductTableProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (val: string) => {
    setSearch(val);
    onFilter({ search: val, category });
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    onFilter({ search, category: val });
  };

  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest hidden md:block">Filter by:</span>
          <CustomDropdown
            options={[
              { label: 'All Categories', value: '' },
              { label: 'Dairy', value: 'Dairy' },
              { label: 'Bakery', value: 'Bakery' },
              { label: 'General', value: 'General' },
              { label: 'Snacks', value: 'Snacks' },
            ]}
            value={category}
            onChange={handleCategoryChange}
            className="w-full md:w-auto"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-100 dark:border-slate-800">
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Product Name</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Category</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Stock</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Sales</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-6 py-5 text-sm font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase rounded-lg">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className={`text-sm font-bold ${product.stock < 20 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        {product.stock} units
                      </span>
                      <div className="w-20 h-1 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${product.stock < 20 ? 'bg-red-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-gray-900 dark:text-white">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">₹{(product.sales || 0).toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.quantity_sold} Sold</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-slate-400 font-medium italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
