'use client';

import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change?: number;
  variant: 'green' | 'blue' | 'red' | 'orange';
}

const variants = {
  green: {
    card: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20',
    icon: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    title: 'text-emerald-700 dark:text-emerald-400',
    value: 'text-emerald-800 dark:text-emerald-300',
    badge: 'text-emerald-600 dark:text-emerald-400',
  },
  red: {
    card: 'bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20',
    icon: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400',
    title: 'text-red-700 dark:text-red-400',
    value: 'text-red-800 dark:text-red-300',
    badge: 'text-red-600 dark:text-red-400',
  },
  blue: {
    card: 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20',
    icon: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    title: 'text-blue-700 dark:text-blue-400',
    value: 'text-blue-800 dark:text-blue-300',
    badge: 'text-blue-600 dark:text-blue-400',
  },
  orange: {
    card: 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20',
    icon: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
    title: 'text-orange-700 dark:text-orange-400',
    value: 'text-orange-800 dark:text-orange-300',
    badge: 'text-orange-600 dark:text-orange-400',
  },
};

export function SummaryCard({ icon: Icon, title, value, change, variant }: SummaryCardProps) {
  const v = variants[variant];
  const hasChange = typeof change === 'number';
  const isPositive = change && change > 0;

  return (
    <div className={`rounded-2xl p-6 border transition-all hover:scale-[1.01] ${v.card}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${v.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
        {hasChange && (
          <div className={`flex items-center gap-1 text-xs font-bold ${v.badge}`}>
            {isPositive
              ? <TrendingUp className="w-3.5 h-3.5" />
              : <TrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(change!)}%
          </div>
        )}
      </div>

      <p className={`text-xs font-black uppercase tracking-widest mb-1 ${v.title}`}>{title}</p>
      <p className={`text-3xl font-black ${v.value}`}>{value}</p>
      {hasChange && (
        <p className={`text-xs font-medium mt-1 opacity-70 ${v.badge}`}>vs last month</p>
      )}
    </div>
  );
}
