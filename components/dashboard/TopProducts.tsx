'use client';

import { ProductSummary } from '@/models/Product';
import { Package } from 'lucide-react';

interface TopProductsProps {
  products?: ProductSummary[];
}

export function TopProducts({ products = [] }: TopProductsProps) {
  if (products.length === 0) {
    return (
      <div className="bg-transparent dark:bg-transparent">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Top Sellers</h3>
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="w-14 h-14 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
            <Package className="w-7 h-7 text-gray-400 dark:text-slate-500" />
          </div>
          <p className="text-sm text-gray-400 dark:text-slate-500 font-medium">No products yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent dark:bg-transparent">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-gray-900 dark:text-white">Top Sellers</h3>
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 group cursor-pointer">
            <div className="w-14 h-14 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 border border-transparent group-hover:border-emerald-500/10">
              <Package className="w-6 h-6 text-gray-400 dark:text-slate-500" />
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
