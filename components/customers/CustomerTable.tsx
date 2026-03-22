'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Search, User, Mail, Calendar, ArrowUpDown } from 'lucide-react';
import { Customer } from '@/models/Customer';

interface CustomerTableProps {
  customers: Customer[];
  onFilter: (filters: { search?: string }) => void;
}

export function CustomerTable({ customers, onFilter }: CustomerTableProps) {
  const [search, setSearch] = useState('');

  const handleSearch = (val: string) => {
    setSearch(val);
    onFilter({ search: val });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
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
                  <span>Customer Name / Email</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Total Orders</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Joined Date</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{customer.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-500 font-medium">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-[10px] font-black uppercase">
                      {customer.total_orders} Orders
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-slate-400 font-medium font-mono italic">
                    {new Date(customer.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
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
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-slate-400 font-medium italic">
                  No customers found.
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
