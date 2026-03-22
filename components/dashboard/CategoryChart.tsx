'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CategorySales } from '@/models/Dashboard';

interface CategoryChartProps {
  data: CategorySales[];
}

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

export function CategoryChart({ data }: CategoryChartProps) {
  const chartData = data.length > 0 ? data : [
    { category: 'Dairy', amount: 25500, percentage: 25 },
    { category: 'Fruits', amount: 34000, percentage: 33 },
    { category: 'Vegetables', amount: 25600, percentage: 25 },
    { category: 'Meat', amount: 17000, percentage: 17 },
  ];

  const totalSales = chartData.reduce((sum, item) => sum + item.amount, 0);
  const centerValue = chartData[0]?.amount || 16100;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Sales By Category</h3>
        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="amount"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-gray-900">{centerValue.toLocaleString()}</p>
          <p className="text-sm text-white bg-emerald-600 px-3 py-1 rounded-full font-medium mt-1">
            {((centerValue / totalSales) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {chartData.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-sm text-gray-600">{item.category}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{item.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Total Number of Sales</p>
        <p className="text-2xl font-bold text-gray-900">{totalSales.toLocaleString()}</p>
      </div>
    </div>
  );
}
