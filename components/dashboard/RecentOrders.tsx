'use client';

import { format } from 'date-fns';
import { Filter } from 'lucide-react';
import { OrderSummary } from '@/models/Order';

interface RecentOrdersProps {
  orders: OrderSummary[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const displayOrders = orders.length > 0 ? orders.slice(0, 3) : [
    { order_number: 1, product_name: 'Fresh Dairy', customer_name: 'M-Starlight', status: 'received' as const, price: 145.80, order_date: '2024-05-05' },
    { order_number: 2, product_name: 'Vegetables', customer_name: 'Serene W', status: 'received' as const, price: 210.30, order_date: '2024-05-04' },
    { order_number: 3, product_name: 'Rang Eggs', customer_name: 'James D', status: 'received' as const, price: 298.40, order_date: '2024-05-03' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Order</h3>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">#</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Product</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Customer</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.map((order) => (
              <tr key={order.order_number} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 text-sm text-gray-900">{order.order_number}</td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">
                      🥛
                    </div>
                    <span className="text-sm font-medium text-gray-900">{order.product_name}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-sm text-gray-600">
                  {format(new Date(order.order_date), 'MMM d')}
                </td>
                <td className="py-4 px-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-2 text-sm font-semibold text-gray-900">${order.price.toFixed(2)}</td>
                <td className="py-4 px-2 text-sm text-gray-600">{order.customer_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
