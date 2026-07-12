import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
      '',
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set() {},
        remove() {},
      },
    }
  );
}

/** Call at the top of every API route handler. Returns 401 response if not authenticated. */
export async function requireAuth(): Promise<
  | { user: { id: string; email?: string }; supabase: ReturnType<typeof createSupabaseServerClient>; unauthorized: null }
  | { user: null; supabase: null; unauthorized: NextResponse }
> {
  const supabase = createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return { user: null, supabase: null, unauthorized: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { user: user as { id: string; email?: string }, supabase, unauthorized: null };
}
