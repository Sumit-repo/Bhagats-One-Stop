'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Milk, Cookie, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { siteMeta } from '@/lib/content';

const shopCategories = [
  { label: 'Dairy & Chilled', href: '/shop/dairy', icon: Milk, desc: 'Sudha, Amul & fresh produce' },
  { label: 'Bakery & Snacks', href: '/shop/bakery', icon: Cookie, desc: 'Fresh baked & premium snacks' },
  { label: 'General Store', href: '/shop/general', icon: ShoppingBag, desc: 'Daily staples & household' },
  { label: 'Snacks & Namkeen', href: '/shop/snacks', icon: UtensilsCrossed, desc: 'Chips, biscuits & more' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [shopOpen, setShopOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      isActive(href)
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400'
    }`;

  return (
    <nav className="fixed left-0 top-0 w-full z-[50] bg-background/80 backdrop-blur-md border-b border-emerald-100 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center group py-2">
              <img
                src="/logo-dark.png"
                alt="Bhagat's — One-Stop Point"
                className="h-12 w-auto dark:hidden object-contain"
              />
              <img
                src="/logo-light.png"
                alt="Bhagat's — One-Stop Point"
                className="h-12 w-auto hidden dark:block object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  isActive('/shop')
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
                aria-haspopup="true"
                aria-expanded={shopOpen}
              >
                Shop
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
              </button>

              {shopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-2xl p-2 w-72">
                    <Link
                      href="/shop"
                      className="block px-4 py-2 text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-slate-800 mb-1"
                    >
                      Browse All Categories →
                    </Link>
                    {shopCategories.map(({ label, href, icon: Icon, desc }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{label}</p>
                          <p className="text-xs text-gray-400 dark:text-slate-500">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/services" className={linkClass('/services')}>Services</Link>
            <Link href="/about" className={linkClass('/about')}>About</Link>
            <Link href="/contact" className={linkClass('/contact')}>Contact</Link>
            <a
              href={`https://wa.me/${siteMeta.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              Order on WhatsApp
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-muted-foreground" aria-label="Toggle menu">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-emerald-100 dark:border-border px-4 py-6 space-y-1">
          <Link href="/shop" className="block px-4 py-3 text-base font-bold text-gray-900 dark:text-white" onClick={() => setIsOpen(false)}>Shop</Link>
          <div className="pl-4 space-y-1 border-l-2 border-emerald-100 dark:border-slate-800 ml-4 mb-2">
            {shopCategories.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                <Icon className="w-4 h-4" /> {label}
              </Link>
            ))}
          </div>
          <Link href="/services" className="block px-4 py-3 text-base font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/about" className="block px-4 py-3 text-base font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className="block px-4 py-3 text-base font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>Contact</Link>
          <a
            href={`https://wa.me/${siteMeta.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 mt-2 bg-emerald-600 text-white rounded-xl font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
