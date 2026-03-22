'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from 'next-themes';

interface ProfitChartProps {
  data: { month: string; expenses: number; earnings: number }[];
}

export function ProfitChart({ data }: ProfitChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const tickColor = isDark ? '#64748b' : '#94a3b8';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipText = isDark ? '#e2e8f0' : '#0f172a';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-0.5">Profit Analysis</h3>
          <p className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-widest">Monthly expenses vs earnings comparison</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
            <span className="w-3 h-0.5 bg-red-500 dark:bg-red-400 rounded-full inline-block" />
            Expenses
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-0.5 bg-emerald-500 rounded-full inline-block" />
            Earnings
          </span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-60 text-gray-400 dark:text-slate-500 font-medium italic text-sm">
          No data available yet. Add entries to see the chart.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 11 }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '12px',
                fontSize: '12px',
                color: tooltipText,
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                padding: '10px 14px',
              }}
              formatter={(value: number, name: string) => [`₹${value.toFixed(2)}`, name]}
              labelStyle={{ fontWeight: 700, marginBottom: 4, color: tooltipText }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ fill: '#ef4444', r: 4, strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
              activeDot={{ r: 6 }}
              name="Expenses"
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ fill: '#10b981', r: 4, strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
              activeDot={{ r: 6 }}
              name="Earnings"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
