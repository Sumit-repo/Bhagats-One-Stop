'use client';

import { format } from 'date-fns';
import { Package } from 'lucide-react';
import { Order } from '@/models/Order';

interface RecentOrdersProps {
  orders?: Order[];
}

const statusColors = {
  pending: 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400',
  processing: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
  shipped: 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',
  delivered: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  received: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
};

export function RecentOrders({ orders = [] }: RecentOrdersProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-transparent dark:bg-transparent transition-colors">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Recent Activity</h3>
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="w-14 h-14 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
            <Package className="w-7 h-7 text-gray-400 dark:text-slate-500" />
          </div>
          <p className="text-sm text-gray-400 dark:text-slate-500 font-medium">No orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent dark:bg-transparent transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-gray-900 dark:text-white">Recent Activity</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800 text-gray-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <th className="py-4 px-2">ID</th>
              <th className="py-4 px-2">Customer & Product</th>
              <th className="py-4 px-2">Date</th>
              <th className="py-4 px-2">Status</th>
              <th className="py-4 px-2">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {orders.map((order) => (
              <tr key={order.id || order.order_number} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-5 px-2 text-sm font-bold text-gray-400 dark:text-slate-600 font-mono">#{order.order_number}</td>
                <td className="py-5 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                      <Package className="w-5 h-5 text-gray-500 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{order.customer_name}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-500 font-medium">{order.product_name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-2 text-sm font-bold text-gray-500 dark:text-slate-500 italic">
                  {format(new Date(order.order_date), 'MMM d')}
                </td>
                <td className="py-5 px-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusColors[order.status as keyof typeof statusColors] || statusColors.pending}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-5 px-2 text-sm font-black text-gray-900 dark:text-white">₹{order.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
