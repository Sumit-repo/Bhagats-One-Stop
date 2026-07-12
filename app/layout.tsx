import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bhagatsonestop.com';

const OG_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200&h=630';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Bhagat's — One-Stop Point | Grocery, Dairy & Digital Services, Kishanganj",
    template: "%s | Bhagat's, Kishanganj",
  },
  description:
    "Kishanganj's trusted neighborhood store for fresh Sudha & Amul dairy, groceries, Xerox, passport photos, and AEPS banking. Serving Bihar since 1999. Home delivery via WhatsApp.",
  keywords: [
    'general store near me',
    'dairy products delivery',
    'Xerox near me',
    "Bhagat's One-Stop",
    'Sudha milk',
    'Amul products',
    'AEPS banking',
    'grocery delivery',
  ],
  openGraph: {
    type: 'website',
    siteName: "Bhagat's One-Stop Point",
    title: "Bhagat's — One-Stop Point | Grocery, Dairy & Digital Services",
    description:
      "Fresh Sudha & Amul dairy, daily groceries, Xerox, and AEPS banking in Kishanganj — all under one roof. Home delivery via WhatsApp.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Bhagat's One-Stop Point — Fresh Grocery & Daily Essentials" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagat's — One-Stop Point | Grocery, Dairy & Digital Services",
    description: "Fresh Sudha & Amul dairy, daily groceries, Xerox, and AEPS banking in Kishanganj — your neighborhood one-stop shop.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: "Bhagat's One-Stop Point",
  alternateName: 'Uma Xerox',
  url: BASE_URL,
  telephone: '+917004211630',
  priceRange: '₹',
  openingHours: 'Mo-Su 07:00-21:00',
  hasMap: 'https://maps.app.goo.gl/3ugWFGWYusQPKEr9A',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kishanganj',
    addressRegion: 'Bihar',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.10588312310992,
    longitude: 87.95600801091413,
  },
  areaServed: {
    '@type': 'City',
    name: 'Kishanganj',
  },
  sameAs: ['https://wa.me/917004211630'],
  description:
    "Neighborhood general store offering fresh Sudha & Amul dairy, groceries, Xerox, passport photos, lamination, and AEPS banking. Home delivery via WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-hidden h-screen select-none">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.className} overflow-hidden h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative h-screen flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto overflow-x-hidden selection:bg-emerald-100 dark:selection:bg-emerald-500/30">
              {children}
            </main>
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
