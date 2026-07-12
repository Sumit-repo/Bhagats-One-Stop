'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from './Sidebar';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar: fixed overlay on mobile, static on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:relative md:z-auto md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 rounded-xl text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center">
            <img src="/logo-dark.png" alt="Bhagat's" className="h-8 w-auto dark:hidden object-contain" />
            <img src="/logo-light.png" alt="Bhagat's" className="h-8 w-auto hidden dark:block object-contain" />
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
