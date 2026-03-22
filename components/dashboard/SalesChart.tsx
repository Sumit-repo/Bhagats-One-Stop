'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { SalesData } from '@/models/Dashboard';

interface SalesChartProps {
  data: SalesData[];
}

export function SalesChart({ data }: SalesChartProps) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const highlightDay = 'FRI';

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Sales By Category</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              8.24%
            </span>
          </div>
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#10b981',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
              labelStyle={{ display: 'none' }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#10b981' }}
            />
            {data.map((item, index) => {
              if (item.day === highlightDay) {
                return (
                  <rect
                    key={index}
                    x={`${(index / (data.length - 1)) * 100}%`}
                    y="0"
                    width="14%"
                    height="100%"
                    fill="rgba(16, 185, 129, 0.1)"
                  />
                );
              }
              return null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
