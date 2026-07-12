import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';
import { siteMeta } from '@/lib/content';
import { Milk, ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Dairy & Chilled Products | Bhagat's One-Stop Point",
  description:
    'Fresh Sudha and Amul milk, paneer, curd, buttermilk, and chilled beverages. Daily fresh stock — visit us or order via WhatsApp for home delivery.',
  openGraph: {
    title: "Dairy & Chilled — Bhagat's One-Stop Point",
    description: 'Fresh Sudha & Amul dairy products delivered to your door. Order via WhatsApp.',
  },
};

const products = [
  { name: 'Sudha Full Cream Milk', price: '₹28 / 500ml', brand: 'Sudha', tag: 'Bestseller' },
  { name: 'Sudha Toned Milk', price: '₹24 / 500ml', brand: 'Sudha', tag: null },
  { name: 'Sudha Fresh Curd', price: '₹35 / 200g', brand: 'Sudha', tag: 'Fresh Daily' },
  { name: 'Amul Butter', price: '₹56 / 100g', brand: 'Amul', tag: 'Popular' },
  { name: 'Amul Cheese Slices', price: '₹110 / pack', brand: 'Amul', tag: null },
  { name: 'Sudha Paneer', price: '₹85 / 200g', brand: 'Sudha', tag: 'Fresh Daily' },
  { name: 'Amul Milk (Tetrapack)', price: '₹26 / 200ml', brand: 'Amul', tag: null },
  { name: 'Sudha Buttermilk', price: '₹10 / 200ml', brand: 'Sudha', tag: null },
  { name: 'Frooti / Maaza', price: 'From ₹20', brand: 'Various', tag: 'Chilled' },
  { name: 'Cold Drinks & Juices', price: 'From ₹20', brand: 'Various', tag: 'Chilled' },
];

export default function DairyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 dark:text-white font-bold">Dairy & Chilled</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-12 pt-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-500/5 dark:to-cyan-500/5 border-b border-blue-100 dark:border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center">
              <Milk className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Daily Fresh</span>
              <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Dairy & Chilled</h1>
            </div>
          </div>
          <p className="text-muted-foreground font-medium max-w-xl leading-relaxed">
            Fresh Sudha and Amul dairy products stocked every morning. From full cream milk to paneer, curd, and
            chilled beverages — your daily dairy, sorted.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-foreground mb-6">What We Stock</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(({ name, price, brand, tag }) => (
              <div
                key={name}
                className="p-5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">{brand}</span>
                  {tag && (
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  )}
                </div>
                <p className="text-sm font-black text-gray-900 dark:text-white mb-1">{name}</p>
                <p className="text-sm font-bold text-muted-foreground">{price}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">
            * Prices and availability subject to change. WhatsApp us for latest pricing.
          </p>
        </div>
      </section>

      {/* Order CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-black text-white mb-3">Order Fresh Dairy for Home Delivery</h2>
            <p className="text-blue-100 font-medium mb-6">
              Message us your dairy list on WhatsApp — we will pack and deliver fresh to your door.
            </p>
            <a
              href={`https://wa.me/${siteMeta.phone}?text=Hi%2C%20I%20would%20like%20to%20order%20some%20dairy%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-2xl font-black hover:bg-blue-50 transition-colors"
            >
              WhatsApp Your Order
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
      <WhatsAppButton />
    </main>
  );
}
