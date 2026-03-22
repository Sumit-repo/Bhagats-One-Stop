'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Package, Users, ChartBar as BarChart3, Settings, CircleHelp as HelpCircle, LogOut, Leaf } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ShoppingCart, label: 'Orders', href: '/orders' },
  { icon: Package, label: 'Inventory', href: '/inventory' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: BarChart3, label: 'Reports & Analytics', href: '/reports' },
];

const otherItems = [
  { icon: Leaf, label: 'Tea Farm', href: '/tea-farm' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help/Support', href: '/support' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Bhagat&apos;s One-Stop</h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 mb-3 px-3">Main</p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-700 hover:bg-gray-50'
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
          <p className="text-xs font-semibold text-gray-500 mb-3 px-3">Other</p>
          <ul className="space-y-1">
            {otherItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 w-full">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Need Help?</h3>
          <p className="text-xs text-gray-600 mb-3">Contact support team</p>
          <button className="w-full bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Get Support
          </button>
        </div>
      </div>
    </aside>
  );
}
