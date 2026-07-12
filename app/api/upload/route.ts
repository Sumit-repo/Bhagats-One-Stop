import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase-server';

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  const { supabase, unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "File exceeds 5 MB limit" }, { status: 400 });
    }

    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED_EXTENSIONS.has(ext) || !ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." }, { status: 400 });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase!
      .storage
      .from('media')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase!
      .storage
      .from('media')
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl }, { status: 201 });

  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
