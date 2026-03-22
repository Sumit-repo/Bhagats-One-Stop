'use client';

import { Video as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change?: number;
  variant: 'green' | 'blue' | 'red' | 'orange';
}

const variantStyles = {
  green: 'bg-emerald-600 text-white',
  blue: 'bg-blue-600 text-white',
  red: 'bg-red-600 text-white',
  orange: 'bg-orange-600 text-white',
};

const iconBgStyles = {
  green: 'bg-emerald-700',
  blue: 'bg-blue-700',
  red: 'bg-red-700',
  orange: 'bg-orange-700',
};

export function SummaryCard({ icon: Icon, title, value, change, variant }: SummaryCardProps) {
  const hasChange = typeof change === 'number';
  const isPositive = change && change > 0;

  return (
    <div className={`rounded-2xl p-6 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgStyles[variant]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-1 text-white/80">{title}</p>
        <p className="text-3xl font-bold mb-2 text-white">{value}</p>
        {hasChange && (
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-white" />
            ) : (
              <TrendingDown className="w-4 h-4 text-white" />
            )}
            <span className="text-sm font-medium text-white">
              {Math.abs(change!)}%
            </span>
            <span className="text-sm text-white/70">this month</span>
          </div>
        )}
      </div>
    </div>
  );
}
