'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed left-0 top-0 w-[calc(100%-8px)] z-[50] bg-background/80 backdrop-blur-md border-b border-emerald-100 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center group py-2">
              <img
                src="/logo-dark.png"
                alt="Bhagat's One-Stop Point"
                className="h-12 w-auto dark:hidden object-contain"
              />
              <img
                src="/logo-light.png"
                alt="Bhagat's One-Stop Point"
                className="h-12 w-auto hidden dark:block object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors">Services</Link>
            <Link href="#legacy" className="text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors">Our Legacy</Link>
            <Link href="#reviews" className="text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors">Reviews</Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors">Contact</Link>
            <Link href="/dashboard" className="px-5 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-md">
              Admin Dashboard
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-muted-foreground">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-emerald-100 dark:border-border px-4 py-6 space-y-4">
          <Link href="#services" className="block text-base font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="#legacy" className="block text-base font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>Our Legacy</Link>
          <Link href="#reviews" className="block text-base font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>Reviews</Link>
          <Link href="#contact" className="block text-base font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/dashboard" className="block w-full text-center py-3 bg-emerald-600 text-white rounded-xl font-semibold" onClick={() => setIsOpen(false)}>
            Admin Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
