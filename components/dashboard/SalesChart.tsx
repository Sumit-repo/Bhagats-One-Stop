'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { SalesData } from '@/models/Dashboard';
import { useTheme } from 'next-themes';

interface SalesChartProps {
  data: SalesData[];
}

export function SalesChart({ data }: SalesChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="relative w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isDark ? '#1e293b' : '#f0f0f0'} 
            vertical={false} 
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94a3b8' : '#6b7280', fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94a3b8' : '#6b7280', fontSize: 12, fontWeight: 600 }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#10b981',
              border: isDark ? '1px solid #334155' : 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
            itemStyle={{ color: 'white' }}
            formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
            labelStyle={{ display: 'none' }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#10b981"
            strokeWidth={4}
            dot={false}
            activeDot={{ r: 6, fill: '#10b981', stroke: isDark ? '#0f172a' : 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
