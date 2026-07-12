import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';
import { siteMeta } from '@/lib/content';
import { UtensilsCrossed, ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Snacks & Namkeen | Bhagat's One-Stop Point",
  description:
    "Chips, namkeen, chocolates, Maggi, energy drinks and all your favourite snacks. Haldiram's, Lay's, Bingo, Parle and more at Bhagat's One-Stop Point.",
  openGraph: {
    title: "Snacks & Namkeen — Bhagat's One-Stop Point",
    description: "Your favourite snack brands — Lay's, Haldiram's, Maggi and more.",
  },
};

const products = [
  { name: "Lay's Classic Salted", price: '₹20 / 26g', brand: "Lay's", tag: 'Bestseller' },
  { name: 'Bingo Mad Angles', price: '₹20 / pack', brand: 'Bingo', tag: 'Popular' },
  { name: "Haldiram's Aloo Bhujia", price: '₹50 / 150g', brand: "Haldiram's", tag: null },
  { name: "Haldiram's Mixture", price: '₹50 / 150g', brand: "Haldiram's", tag: null },
  { name: 'Kurkure Masala Munch', price: '₹20 / pack', brand: 'Kurkure', tag: 'Popular' },
  { name: 'Maggi 2-Minute Noodles', price: '₹14 / pack', brand: 'Maggi', tag: 'Classic' },
  { name: 'Top Ramen Noodles', price: '₹12 / pack', brand: 'Top Ramen', tag: null },
  { name: 'Cadbury Dairy Milk', price: 'From ₹10', brand: 'Cadbury', tag: 'Popular' },
  { name: 'KitKat', price: '₹20 each', brand: 'Nestlé', tag: null },
  { name: 'Red Bull / Monster', price: '₹125 / can', brand: 'Various', tag: 'Energy' },
  { name: 'Frooti / Slice Mango', price: '₹20 / 200ml', brand: 'Various', tag: null },
  { name: 'Thumsup / Pepsi 2L', price: '₹95 / 2L', brand: 'Various', tag: 'Party Pack' },
];

export default function SnacksPage() {
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
            <span className="text-gray-900 dark:text-white font-bold">Snacks & Namkeen</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-12 pt-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-500/5 dark:to-pink-500/5 border-b border-rose-100 dark:border-rose-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center">
              <UtensilsCrossed className="w-8 h-8 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">Popular Brands</span>
              <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Snacks & Namkeen</h1>
            </div>
          </div>
          <p className="text-muted-foreground font-medium max-w-xl leading-relaxed">
            All your munchie favourites in one place — Haldiram&apos;s namkeen, Lay&apos;s chips, Maggi noodles,
            chocolates, cold drinks, and energy drinks.
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
                className="p-5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:border-rose-200 dark:hover:border-rose-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">{brand}</span>
                  {tag && (
                    <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[9px] font-black uppercase tracking-widest rounded-full">
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
            * Prices and availability subject to change. WhatsApp us for latest pricing or bulk orders.
          </p>
        </div>
      </section>

      {/* Order CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-500 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-black text-white mb-3">Bulk Snack Orders? We&apos;ve Got You</h2>
            <p className="text-rose-50 font-medium mb-6">
              Planning a party or event? WhatsApp us your snack list and we will pack it all for you.
            </p>
            <a
              href={`https://wa.me/${siteMeta.phone}?text=Hi%2C%20I%20would%20like%20to%20order%20some%20snacks.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rose-700 rounded-2xl font-black hover:bg-rose-50 transition-colors"
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
