import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase-server';
import { z } from 'zod';

const earningSchema = z.object({
  quantity_kg: z.number().min(0.01, 'Quantity must be greater than 0'),
  price_per_kg: z.number().min(0, 'Price must be >= 0'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

export async function GET() {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { data, error } = await supabase!
    .from('supari_farm_earnings')
    .select('*')
    .order('date', { ascending: false });

  if (error) return NextResponse.json({ error: 'Failed to fetch earnings' }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validated = earningSchema.parse(body);

    const record = {
      ...validated,
      total_amount: validated.quantity_kg * validated.price_per_kg,
    };

    const { data, error } = await supabase!
      .from('supari_farm_earnings')
      .insert([record])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
