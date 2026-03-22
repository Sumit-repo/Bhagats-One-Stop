'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ProfitChartProps {
  data: { month: string; expenses: number; earnings: number }[];
}

export function ProfitChart({ data }: ProfitChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Profit Analysis</h3>
          <p className="text-sm text-gray-600">Monthly comparison of expenses vs earnings</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value: number) => `₹${value.toFixed(2)}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: '#ef4444', r: 4 }}
            name="Expenses"
          />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 4 }}
            name="Earnings"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
