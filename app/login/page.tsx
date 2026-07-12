'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) {
        setError('Incorrect email or password. Please try again.');
        return;
      }
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex">
      {/* ── Left brand panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-emerald-700 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 right-0 w-48 h-48 bg-white rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <img
            src="/logo-light.png"
            alt="Bhagat's One-Stop Point"
            className="h-20 w-auto object-contain"
          />
        </div>

        <div className="relative space-y-6">
          <div>
            <h1 className="text-4xl font-black text-white leading-tight tracking-tight">
              Bhagat's<br />One-Stop Point
            </h1>
            <p className="text-emerald-200 mt-3 text-lg font-medium">
              Business Management Portal
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-emerald-100">
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Trusted in Kishanganj since 1999</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-100">
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Serving Bihar's daily essentials</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-100">
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Secure staff-only access</span>
            </div>
          </div>
        </div>

        <p className="relative text-emerald-300/60 text-xs font-medium">
          © {new Date().getFullYear()} Bhagat's One-Stop Point
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo (hidden on desktop) */}
          <div className="lg:hidden flex justify-center mb-10">
            <img
              src="/logo-dark.png"
              alt="Bhagat's One-Stop Point"
              className="h-16 w-auto dark:hidden object-contain"
            />
            <img
              src="/logo-light.png"
              alt="Bhagat's One-Stop Point"
              className="h-16 w-auto hidden dark:block object-contain"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm font-medium mt-1">
              Sign in to your staff account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500 pointer-events-none" aria-hidden="true" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@bhagats.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500 pointer-events-none" aria-hidden="true" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors rounded"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" aria-hidden="true" />
                    : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-3 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-700 dark:text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-black rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] text-sm tracking-wide mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-400 dark:text-slate-600 text-xs mt-8 font-medium">
            Access restricted to authorised personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
