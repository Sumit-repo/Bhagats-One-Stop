import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const expenseSchema = z.object({
  category: z.enum(['labour', 'fertilizers', 'maintenance', 'miscellaneous']),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

export async function GET() {
  if (!supabase) return NextResponse.json({ error: "Supabase not connected" }, { status: 503 });
  
  const { data, error } = await supabase
    .from('tea_farm_expenses')
    .select('*')
    .order('date', { ascending: false });
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!supabase) return NextResponse.json({ error: "Supabase not connected" }, { status: 503 });
  
  try {
    const body = await request.json();
    const validatedData = expenseSchema.parse(body);
    
    const { data, error } = await supabase
      .from('tea_farm_expenses')
      .insert([validatedData])
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
