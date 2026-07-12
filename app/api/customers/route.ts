import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase-server';
import { z } from 'zod';

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").optional().or(z.literal('')),
  total_orders: z.number().min(0).default(0),
});

export async function GET() {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { data, error } = await supabase!
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validatedData = customerSchema.parse(body);

    const { data, error } = await supabase!
      .from('customers')
      .insert([validatedData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
