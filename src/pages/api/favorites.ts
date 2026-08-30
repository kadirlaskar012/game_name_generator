import type { APIRoute } from 'astro';
import { getUserFavorites, addUserFavorite, removeUserFavorite } from '@/lib/database/repository';
import { favoriteRequestSchema } from '@/lib/validation/schemas';
import { getClientIp } from '@/lib/security/ratelimit';

export const GET: APIRoute = async ({ request, url }) => {
  const userId = url.searchParams.get('userId') || getClientIp(request);
  try {
    const list = await getUserFavorites(userId);
    return new Response(JSON.stringify({ success: true, data: list }), {
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const parse = favoriteRequestSchema.safeParse(body);
    if (!parse.success) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userId = body.userId || getClientIp(request);
    const fav = await addUserFavorite(userId, {
      name: parse.data.name,
      gameName: parse.data.gameName,
      styleName: parse.data.styleName,
    });

    return new Response(JSON.stringify({ success: true, data: fav }), {
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
  try {
    const userId = url.searchParams.get('userId') || getClientIp(request);
    const nameOrId = url.searchParams.get('id') || url.searchParams.get('name');

    if (!nameOrId) {
      return new Response(JSON.stringify({ success: false, error: 'Missing favorite ID or name' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const success = await removeUserFavorite(userId, nameOrId);
    return new Response(JSON.stringify({ success }), {
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
