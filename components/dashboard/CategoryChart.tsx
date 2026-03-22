'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CategorySales } from '@/models/Dashboard';
import { useTheme } from 'next-themes';

interface CategoryChartProps {
  data: CategorySales[];
}

const COLORS = ['#10b981', '#059669', '#34d399', '#6ee7b7'];

export function CategoryChart({ data }: CategoryChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = data.length > 0 ? data : [
    { category: 'Dairy', amount: 25500, percentage: 25 },
    { category: 'Bakery', amount: 34000, percentage: 33 },
    { category: 'General', amount: 25600, percentage: 25 },
    { category: 'Snacks', amount: 17000, percentage: 17 },
  ];

  const totalSales = chartData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="relative w-full h-full min-h-[300px] flex flex-col">
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="amount"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1e293b' : 'white', 
                borderRadius: '12px', 
                border: isDark ? '1px solid #334155' : '1px solid #f1f5f9',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">Total</p>
          <p className="text-2xl font-black text-gray-900 dark:text-white">₹{totalSales.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {chartData.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-xs font-bold text-gray-600 dark:text-slate-400">{item.category}</span>
            </div>
            <span className="text-xs font-black text-gray-900 dark:text-white">₹{item.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
