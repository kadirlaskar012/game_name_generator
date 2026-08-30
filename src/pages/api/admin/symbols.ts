import type { APIRoute } from 'astro';
import { getAllSymbolsAdmin, saveSymbol, deleteSymbol } from '@/lib/database/repository';
import { adminSymbolSchema } from '@/lib/validation/schemas';
import { validateAdminSession } from '@/lib/security/auth';

export const GET: APIRoute = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
  }

  const list = await getAllSymbolsAdmin();
  return new Response(JSON.stringify({ success: true, data: list }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const parse = adminSymbolSchema.safeParse(body);
    if (!parse.success) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid symbol data' }), { status: 400 });
    }

    const saved = await saveSymbol(parse.data as any);
    return new Response(JSON.stringify({ success: true, data: saved }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, url }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
  }

  const id = url.searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ success: false, error: 'Missing symbol ID' }), { status: 400 });
  }

  const success = await deleteSymbol(id);
  return new Response(JSON.stringify({ success }), { status: 200 });
};
