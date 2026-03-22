'use client';

import { ProductSummary } from '@/models/Product';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { useState } from 'react';

interface TopProductsProps {
  products?: ProductSummary[];
}

export function TopProducts({ products = [] }: TopProductsProps) {
  const [period, setPeriod] = useState('monthly');
  
  const displayProducts = products && products.length > 0 ? products : [
    { id: '1', name: 'Fresh Milk', price: 684.00, quantity_sold: 342 },
    { id: '2', name: 'Wheat Bread', price: 512.00, quantity_sold: 256 },
    { id: '3', name: 'Emerald Velvet', price: 355.90, quantity_sold: 189 },
  ];

  return (
    <div className="bg-transparent dark:bg-transparent">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-gray-900 dark:text-white">Top Sellers</h3>
        <CustomDropdown
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
          value={period}
          onChange={setPeriod}
        />
      </div>

      <div className="space-y-6">
        {displayProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-4 group cursor-pointer">
            <div className="w-14 h-14 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 border border-transparent group-hover:border-emerald-500/10">
              <span className="text-xl">📦</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 dark:text-white mb-0.5 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{product.name}</p>
              <p className="text-xs text-gray-500 dark:text-slate-500 font-black uppercase tracking-widest">{product.quantity_sold} units sold</p>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
