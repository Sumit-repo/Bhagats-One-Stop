import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be >= 0"),
  stock: z.number().min(0, "Stock must be >= 0"),
  image_url: z.string().url().nullable().optional().or(z.literal('')),
});

export async function GET() {
  if (!supabase) return NextResponse.json({ error: "Supabase not connected" }, { status: 503 });
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Compute `sales` field from price * quantity_sold (not stored in DB)
  const enriched = (data || []).map((p: any) => ({
    ...p,
    sales: Number(p.price) * Number(p.quantity_sold),
  }));

  return NextResponse.json(enriched);
}

export async function POST(request: Request) {
  if (!supabase) return NextResponse.json({ error: "Supabase not connected" }, { status: 503 });
  
  try {
    const body = await request.json();
    const validatedData = productSchema.parse(body);
    
    const newProduct = {
      ...validatedData,
      quantity_sold: 0,
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
      .single();
      
    if (error) throw error;
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    const msg = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
