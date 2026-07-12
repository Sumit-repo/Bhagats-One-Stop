import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase-server';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be >= 0"),
  stock: z.number().min(0, "Stock must be >= 0"),
  image_url: z.string().url().nullable().optional().or(z.literal('')),
});

export async function GET() {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { data, error } = await supabase!
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });

  const enriched = (data || []).map((p: any) => ({
    ...p,
    sales: Number(p.price) * Number(p.quantity_sold),
  }));

  return NextResponse.json(enriched);
}

export async function POST(request: Request) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validatedData = productSchema.parse(body);

    const { data, error } = await supabase!
      .from('products')
      .insert([{ ...validatedData, quantity_sold: 0 }])
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
