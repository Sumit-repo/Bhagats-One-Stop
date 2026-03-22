'use client';

import { ProductSummary } from '@/models/Product';

interface TopProductsProps {
  products: ProductSummary[];
}

export function TopProducts({ products }: TopProductsProps) {
  const displayProducts = products.length > 0 ? products : [
    { id: '1', name: 'Fresh Milk', price: 684.00, quantity_sold: 342 },
    { id: '2', name: 'Wheat Bread', price: 512.00, quantity_sold: 256 },
    { id: '3', name: 'Emerald Velvet', price: 355.90, quantity_sold: 189 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Top Products</h3>
        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      </div>

      <div className="space-y-4">
        {displayProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-1">{product.name}</p>
              <p className="text-sm text-gray-500">{product.quantity_sold} sold</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
