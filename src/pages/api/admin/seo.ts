import type { APIRoute } from 'astro';
import { getAllSeoPagesAdmin, saveSeoPage } from '@/lib/database/repository';
import { adminSeoPageSchema } from '@/lib/validation/schemas';
import { validateAdminSession } from '@/lib/security/auth';

export const GET: APIRoute = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
  }

  const list = await getAllSeoPagesAdmin();
  return new Response(JSON.stringify({ success: true, data: list }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const parse = adminSeoPageSchema.safeParse(body);
    if (!parse.success) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid SEO page data' }), { status: 400 });
    }

    const saved = await saveSeoPage(parse.data as any);
    return new Response(JSON.stringify({ success: true, data: saved }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message }), { status: 500 });
  }
};
