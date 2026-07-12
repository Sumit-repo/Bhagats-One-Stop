import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase-server';
import { z } from 'zod';

const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  stock: z.number().min(0).optional(),
  quantity_sold: z.number().min(0).optional(),
  image_url: z.string().url().nullable().optional().or(z.literal('')),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { data, error } = await supabase!
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ...data, sales: Number(data.price) * Number(data.quantity_sold) });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validatedData = productUpdateSchema.parse(body);

    const { data, error } = await supabase!
      .from('products')
      .update(validatedData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ ...data, sales: Number(data.price) * Number(data.quantity_sold) });
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
    .from('products')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  return NextResponse.json({ success: true });
}
