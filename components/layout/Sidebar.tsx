'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Package, Users, ChartBar as BarChart3, LogOut, Leaf } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ShoppingCart, label: 'Orders', href: '/orders' },
  { icon: Package, label: 'Inventory', href: '/inventory' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: BarChart3, label: 'Reports & Analytics', href: '/reports' },
];

const otherItems = [
  { icon: Leaf, label: 'Tea Farm', href: '/tea-farm' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''
  );

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 h-screen flex flex-col transition-colors">
      <div className="py-10 px-6 border-b border-gray-200 dark:border-slate-800 flex justify-center">
        <Link href="/dashboard" className="group">
          <img
            src="/logo-dark.png"
            alt="Bhagat's One-Stop Point"
            className="h-16 w-auto dark:hidden object-contain"
          />
          <img
            src="/logo-light.png"
            alt="Bhagat's One-Stop Point"
            className="h-16 w-auto hidden dark:block object-contain"
          />
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-500 mb-3 px-3 uppercase tracking-wider">Main</p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-gray-700 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-500 mb-3 px-3 uppercase tracking-wider">Business</p>
          <ul className="space-y-1">
            {otherItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-gray-700 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 w-full transition-all group disabled:opacity-50"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          {loggingOut ? 'Signing out...' : 'Logout'}
        </button>
      </div>
    </aside>
  );
}
