'use client';

import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  change: number;
  trend?: number[];
  variant?: 'green' | 'blue' | 'purple' | 'orange';
}

const variantStyles = {
  green: 'bg-emerald-600 text-white',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
};

const iconBgStyles = {
  green: 'bg-emerald-700',
  blue: 'bg-blue-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
};

export function StatCard({ icon: Icon, title, value, change, trend, variant = 'blue' }: StatCardProps) {
  const isPositive = change > 0;
  const isGreenCard = variant === 'green';

  return (
    <div className={`rounded-2xl p-6 ${isGreenCard ? variantStyles[variant] : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isGreenCard ? iconBgStyles[variant] : iconBgStyles[variant].replace('bg-', 'dark:bg-').replace('100', '900') + ' ' + iconBgStyles[variant]}`}>
          <Icon className={`w-6 h-6 ${isGreenCard ? 'text-white' : variantStyles[variant].split(' ')[1]}`} />
        </div>
        {trend && (
          <div className="flex-1 ml-4 h-8">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <polyline
                points={trend.map((val, i) => `${(i / (trend.length - 1)) * 100},${30 - val * 25}`).join(' ')}
                fill="none"
                stroke={isGreenCard ? 'rgba(255,255,255,0.5)' : 'currentColor'}
                strokeWidth="2"
                className={isGreenCard ? '' : variantStyles[variant].split(' ')[1]}
              />
            </svg>
          </div>
        )}
      </div>

      <div>
        <p className={`text-sm font-medium mb-1 ${isGreenCard ? 'text-white/80' : 'text-gray-600 dark:text-slate-400'}`}>{title}</p>
        <p className={`text-3xl font-bold mb-2 ${isGreenCard ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{value}</p>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className={`w-4 h-4 ${isGreenCard ? 'text-white' : 'text-emerald-600'}`} />
          ) : (
            <TrendingDown className={`w-4 h-4 ${isGreenCard ? 'text-white' : 'text-red-600'}`} />
          )}
          <span className={`text-sm font-medium ${isGreenCard ? 'text-white' : isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {Math.abs(change)}%
          </span>
          <span className={`text-sm ${isGreenCard ? 'text-white/70' : 'text-gray-500 dark:text-slate-500'}`}>this week</span>
        </div>
      </div>
    </div>
  );
}
