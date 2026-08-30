import type { APIRoute } from 'astro';
import { getAllGamesAdmin, saveGame, deleteGame } from '@/lib/database/repository';
import { adminGameSchema } from '@/lib/validation/schemas';
import { validateAdminSession } from '@/lib/security/auth';

export const GET: APIRoute = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const list = await getAllGamesAdmin();
  return new Response(JSON.stringify({ success: true, data: list }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const parse = adminGameSchema.safeParse(body);
    if (!parse.success) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid data', details: parse.error.flatten() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const saved = await saveGame(parse.data as any);
    return new Response(JSON.stringify({ success: true, data: saved }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request, url }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = url.searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ success: false, error: 'Missing game ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const success = await deleteGame(id);
  return new Response(JSON.stringify({ success }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
