import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PublicFooter } from '@/components/PublicFooter';
import { siteMeta } from '@/lib/content';
import { Milk, Cookie, ShoppingBag, UtensilsCrossed, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Shop | Bhagat's One-Stop Point",
  description:
    "Fresh dairy, bakery, snacks, and daily groceries — all under one roof. Browse our product categories or WhatsApp us to order for home delivery.",
  openGraph: {
    title: "Shop at Bhagat's One-Stop Point",
    description:
      "Fresh dairy (Sudha & Amul), premium bakery, snacks, and daily essentials. Home delivery available.',",
  },
};

const categories = [
  {
    label: 'Dairy & Chilled',
    href: '/shop/dairy',
    icon: Milk,
    desc: 'Fresh Sudha & Amul milk, curd, paneer, buttermilk, chilled beverages and more.',
    highlights: ['Sudha Milk', 'Amul Butter', 'Fresh Curd', 'Paneer'],
    color: 'blue',
    bg: 'from-blue-50 to-cyan-50 dark:from-blue-500/5 dark:to-cyan-500/5',
    border: 'border-blue-100 dark:border-blue-500/20',
    iconBg: 'bg-blue-100 dark:bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badge: 'Daily Fresh',
  },
  {
    label: 'Bakery & Snacks',
    href: '/shop/bakery',
    icon: Cookie,
    desc: 'Fresh baked goods, premium biscuits, cakes, and ready-to-eat bakery items.',
    highlights: ['Bread', 'Cream Rolls', 'Cakes', 'Rusks'],
    color: 'amber',
    bg: 'from-amber-50 to-orange-50 dark:from-amber-500/5 dark:to-orange-500/5',
    border: 'border-amber-100 dark:border-amber-500/20',
    iconBg: 'bg-amber-100 dark:bg-amber-500/10',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badge: 'Fresh Daily',
  },
  {
    label: 'General Store',
    href: '/shop/general',
    icon: ShoppingBag,
    desc: 'Rice, pulses, oils, spices, cleaning supplies, stationery and all your household essentials.',
    highlights: ['Rice & Pulses', 'Cooking Oils', 'Spices', 'Detergents'],
    color: 'emerald',
    bg: 'from-emerald-50 to-green-50 dark:from-emerald-500/5 dark:to-green-500/5',
    border: 'border-emerald-100 dark:border-emerald-500/20',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badge: '1000+ Items',
  },
  {
    label: 'Snacks & Namkeen',
    href: '/shop/snacks',
    icon: UtensilsCrossed,
    desc: 'Chips, namkeen, biscuits, chocolates, energy drinks and all your favourite munchies.',
    highlights: ['Lay\'s & Bingo', 'Haldiram\'s', 'Parle-G', 'Maggi'],
    color: 'rose',
    bg: 'from-rose-50 to-pink-50 dark:from-rose-500/5 dark:to-pink-500/5',
    border: 'border-rose-100 dark:border-rose-500/20',
    iconBg: 'bg-rose-100 dark:bg-rose-500/10',
    iconColor: 'text-rose-600 dark:text-rose-400',
    badge: 'Popular Brands',
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
            🛒 Our Products
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-4">
            Everything You Need,<br />
            <span className="text-emerald-600">All In One Place</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium mb-8">
            From fresh morning dairy to evening snacks — browse our categories and WhatsApp us to place a home delivery order.
          </p>
          <a
            href={`https://wa.me/${siteMeta.phone}?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            Order via WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map(({ label, href, icon: Icon, desc, highlights, bg, border, iconBg, iconColor, badge }) => (
              <Link
                key={href}
                href={href}
                className={`group p-8 bg-gradient-to-br ${bg} border ${border} rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                  </div>
                  <span className={`px-3 py-1 ${iconBg} ${iconColor} text-xs font-black uppercase tracking-widest rounded-full`}>
                    {badge}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {label}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5 text-sm">{desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {highlights.map(h => (
                    <span key={h} className="px-3 py-1 bg-white/60 dark:bg-slate-800/60 text-xs font-bold text-gray-700 dark:text-slate-300 rounded-full">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Browse {label} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Banner */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Home Delivery Available</h2>
            <p className="text-emerald-100 font-medium mb-6 max-w-xl mx-auto">
              Send us your order list on WhatsApp and we will deliver to your doorstep. Quick, easy, and always fresh.
            </p>
            <a
              href={`https://wa.me/${siteMeta.phone}?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order%20for%20home%20delivery.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black hover:bg-emerald-50 transition-colors"
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
