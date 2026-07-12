import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';
import { siteMeta } from '@/lib/content';
import { Cookie, ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Bakery & Snacks | Bhagat's One-Stop Point",
  description:
    'Fresh bread, cream rolls, biscuits, rusks, cakes and premium bakery items. Daily fresh stock available at Bhagat\'s One-Stop Point.',
  openGraph: {
    title: "Bakery & Snacks — Bhagat's One-Stop Point",
    description: 'Fresh daily bakery items and premium snacks. Visit us or order via WhatsApp.',
  },
};

const products = [
  { name: 'Britannia Bread', price: '₹40 / loaf', brand: 'Britannia', tag: 'Bestseller' },
  { name: 'Cream Rolls', price: '₹10 each', brand: 'Local Bakery', tag: 'Fresh Daily' },
  { name: 'Khari Biscuits', price: '₹20 / pack', brand: 'Various', tag: 'Fresh Daily' },
  { name: 'Britannia Marie Gold', price: '₹35 / pack', brand: 'Britannia', tag: null },
  { name: 'Parle-G Biscuits', price: '₹5 / pack', brand: 'Parle', tag: 'Popular' },
  { name: 'Rusks & Toasts', price: 'From ₹25', brand: 'Various', tag: null },
  { name: 'Bourbon / Hide & Seek', price: '₹30 / pack', brand: 'Britannia', tag: null },
  { name: 'Cream Biscuits (Oreo)', price: '₹30 / pack', brand: 'Cadbury', tag: 'Popular' },
  { name: 'Celebration Cakes', price: 'On Order', brand: 'Local Bakery', tag: 'Pre-order' },
  { name: 'Pav (Dinner Rolls)', price: '₹20 / 4 pcs', brand: 'Local Bakery', tag: 'Fresh Daily' },
];

export default function BakeryPage() {
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
            <span className="text-gray-900 dark:text-white font-bold">Bakery & Snacks</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-12 pt-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/5 dark:to-orange-500/5 border-b border-amber-100 dark:border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center">
              <Cookie className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Fresh Daily</span>
              <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Bakery & Snacks</h1>
            </div>
          </div>
          <p className="text-muted-foreground font-medium max-w-xl leading-relaxed">
            Start your morning right with freshly stocked bread, rusks, and cream rolls. Browse our range of branded
            biscuits, cakes, and premium bakery favourites.
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
                className="p-5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:border-amber-200 dark:hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">{brand}</span>
                  {tag && (
                    <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-widest rounded-full">
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
            * Prices and availability subject to change. WhatsApp us for latest pricing and pre-orders.
          </p>
        </div>
      </section>

      {/* Order CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-500 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-black text-white mb-3">Pre-order Cakes & Fresh Bakes</h2>
            <p className="text-amber-50 font-medium mb-6">
              For celebration cakes or bulk orders, WhatsApp us in advance and we will have everything ready for you.
            </p>
            <a
              href={`https://wa.me/${siteMeta.phone}?text=Hi%2C%20I%20would%20like%20to%20order%20some%20bakery%20items.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 rounded-2xl font-black hover:bg-amber-50 transition-colors"
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
