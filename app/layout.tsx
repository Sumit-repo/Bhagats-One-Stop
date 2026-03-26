import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Bhagat's One-Stop Point | Quality Grocery & General Store",
  description: "The ultimate destination for fresh dairy (Sudha & Amul), premium groceries, and daily essentials. Trusted neighborhood favorite since 1990.",
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-hidden h-screen select-none">
      <body className={`${inter.className} overflow-hidden h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main App Container with Overlay-Enabled Scrollbar Architecture */}
          <div className="relative h-screen flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto overflow-x-hidden selection:bg-emerald-100 dark:selection:bg-emerald-500/30">
              {children}
            </main>

            {/* The Theme Switch sits at the TOP of the Z-stack, above the internal scrollbar */}
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
