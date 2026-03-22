import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const customerUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional().or(z.literal('')),
  total_orders: z.number().min(0).optional(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  if (!supabase) return NextResponse.json({ error: "Supabase not connected" }, { status: 503 });
  
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', params.id)
    .single();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!supabase) return NextResponse.json({ error: "Supabase not connected" }, { status: 503 });
  
  try {
    const body = await request.json();
    const validatedData = customerUpdateSchema.parse(body);
    
    const { data, error } = await supabase
      .from('customers')
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
    const msg = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!supabase) return NextResponse.json({ error: "Supabase not connected" }, { status: 503 });
  
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', params.id);
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
