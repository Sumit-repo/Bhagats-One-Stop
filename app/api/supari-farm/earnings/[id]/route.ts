import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase-server';
import { z } from 'zod';

const earningUpdateSchema = z.object({
  quantity_kg: z.number().min(0.01).optional(),
  price_per_kg: z.number().min(0).optional(),
  date: z.string().min(1).optional(),
  notes: z.string().optional(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { data, error } = await supabase!
    .from('supari_farm_earnings')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: 'Failed to fetch earning' }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validated = earningUpdateSchema.parse(body);

    // Recompute total_amount if either component changes
    let update: Record<string, unknown> = { ...validated };
    if (validated.quantity_kg !== undefined || validated.price_per_kg !== undefined) {
      const { data: current } = await supabase!
        .from('supari_farm_earnings')
        .select('quantity_kg, price_per_kg')
        .eq('id', params.id)
        .single();

      const qty = validated.quantity_kg ?? current?.quantity_kg ?? 0;
      const price = validated.price_per_kg ?? current?.price_per_kg ?? 0;
      update.total_amount = qty * price;
    }

    const { data, error } = await supabase!
      .from('supari_farm_earnings')
      .update(update)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { error } = await supabase!
    .from('supari_farm_earnings')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: 'Failed to delete earning' }, { status: 500 });
  return NextResponse.json({ success: true });
}
