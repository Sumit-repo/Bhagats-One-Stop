import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase-server';
import { z } from 'zod';

const expenseUpdateSchema = z.object({
  category: z.enum(['labour', 'fertilizers', 'maintenance', 'miscellaneous']).optional(),
  amount: z.number().min(0.01).optional(),
  date: z.string().min(1).optional(),
  notes: z.string().optional(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { data, error } = await supabase!
    .from('tea_farm_expenses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: 'Failed to fetch expense' }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validatedData = expenseUpdateSchema.parse(body);

    const { data, error } = await supabase!
      .from('tea_farm_expenses')
      .update(validatedData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { error } = await supabase!
    .from('tea_farm_expenses')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  return NextResponse.json({ success: true });
}
