'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Search, Filter, ShoppingCart, Calendar, User, ChevronDown, ArrowUpDown } from 'lucide-react';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { Order } from '@/models/Order';

interface OrderTableProps {
  orders: Order[];
  onFilter: (filters: { status?: string; search?: string }) => void;
}

export function OrderTable({ orders, onFilter }: OrderTableProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = (val: string) => {
    setSearch(val);
    onFilter({ search: val, status });
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    onFilter({ search, status: val });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest hidden md:block">Status:</span>
          <CustomDropdown
            options={[
              { label: 'All Status', value: '' },
              { label: 'Pending', value: 'pending' },
              { label: 'Processing', value: 'processing' },
              { label: 'Delivered', value: 'delivered' },
            ]}
            value={status}
            onChange={handleStatusChange}
            className="w-full md:w-auto"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-100 dark:border-slate-800">
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Order ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Product & Customer</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Status</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 cursor-pointer hover:text-emerald-600 transition-colors">
                <div className="flex items-center gap-2">
                  <span>Total</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5 text-sm font-bold text-gray-400 dark:text-slate-600 font-mono">
                    #{order.order_number}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
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
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                      ${order.status === 'delivered' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 
                        order.status === 'processing' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' : 
                        'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-gray-900 dark:text-white">
                    ₹{order.price.toLocaleString()}
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
                  No orders found matching filters.
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
