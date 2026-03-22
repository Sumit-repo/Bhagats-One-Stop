'use client';

import { format } from 'date-fns';
import { Filter } from 'lucide-react';
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
  const displayOrders = orders && orders.length > 0 ? orders : [
    { id: '1', order_number: 1001, product_name: 'Fresh Dairy', customer_name: 'M-Starlight', status: 'delivered', price: 145.80, order_date: '2024-05-05' },
    { id: '2', order_number: 1002, product_name: 'Vegetables', customer_name: 'Serene W', status: 'delivered', price: 210.30, order_date: '2024-05-04' },
    { id: '3', order_number: 1003, product_name: 'Range Eggs', customer_name: 'James D', status: 'delivered', price: 298.40, order_date: '2024-05-03' },
  ];

  return (
    <div className="bg-transparent dark:bg-transparent transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-gray-900 dark:text-white">Recent Activity</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-gray-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors">
          <Filter className="w-4 h-4" />
          More Details
        </button>
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
            {displayOrders.map((order) => (
              <tr key={order.id || order.order_number} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-5 px-2 text-sm font-bold text-gray-400 dark:text-slate-600 font-mono">#{order.order_number}</td>
                <td className="py-5 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110">
                      📦
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
