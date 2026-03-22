'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-200">
                <ShoppingBag className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 tracking-tight leading-none">Bhagat's</span>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mt-1">One-Stop Point</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Services</Link>
            <Link href="#products" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Products</Link>
            <Link href="#legacy" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Our Legacy</Link>
            <Link href="/dashboard" className="px-5 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-200">
              Admin Dashboard
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-4 py-6 space-y-4">
          <Link href="#services" className="block text-base font-medium text-gray-600" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="#products" className="block text-base font-medium text-gray-600" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="#legacy" className="block text-base font-medium text-gray-600" onClick={() => setIsOpen(false)}>Our Legacy</Link>
          <Link href="/dashboard" className="block w-full text-center py-3 bg-emerald-600 text-white rounded-xl font-semibold" onClick={() => setIsOpen(false)}>
            Admin Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
