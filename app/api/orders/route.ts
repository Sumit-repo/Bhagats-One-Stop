import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase-server';
import { z } from 'zod';

const orderSchema = z.object({
  order_number: z.number().min(1).optional(),
  product_name: z.string().min(1, "Product name is required"),
  customer_name: z.string().min(1, "Customer name is required"),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered']).default('pending'),
  price: z.number().min(0, "Price must be >= 0"),
  order_date: z.string().min(1, "Order date is required"),
});

export async function GET() {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  const { data, error } = await supabase!
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Auto-generate order_number if not provided
    let order_number = validatedData.order_number;
    if (!order_number) {
      const { data: maxRow } = await supabase!
        .from('orders')
        .select('order_number')
        .order('order_number', { ascending: false })
        .limit(1)
        .single();
      order_number = (maxRow?.order_number ?? 1000) + 1;
    }

    const { data, error } = await supabase!
      .from('orders')
      .insert([{ ...validatedData, order_number }])
      .select()
      .single();

    if (error) throw error;

    // Exact case-insensitive product lookup for stock decrement
    const { data: product } = await supabase!
      .from('products')
      .select('id, stock, quantity_sold, price')
      .ilike('name', validatedData.product_name.trim())
      .limit(1)
      .single();

    if (product && product.stock > 0) {
      await supabase!
        .from('products')
        .update({
          stock: product.stock - 1,
          quantity_sold: (product.quantity_sold || 0) + 1,
        })
        .eq('id', product.id);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
