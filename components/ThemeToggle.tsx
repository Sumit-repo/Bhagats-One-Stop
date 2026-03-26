'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed right-0 bottom-32 z-[9999] flex h-14 w-16 items-center justify-start pl-4 rounded-l-full bg-emerald-600 text-white shadow-xl shadow-black/10 transition-all hover:w-20 active:scale-95 group border-y border-l border-emerald-500/30"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6 transition-transform group-hover:rotate-45" />
      ) : (
        <Moon className="h-6 w-6 transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}
