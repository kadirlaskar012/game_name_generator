import type { APIRoute } from 'astro';
import { getTrendingNames } from '@/lib/database/repository';

export const GET: APIRoute = async ({ url }) => {
  const limit = parseInt(url.searchParams.get('limit') || '20', 10);
  const gameId = url.searchParams.get('gameId') || undefined;

  try {
    const list = await getTrendingNames(limit, gameId);
    return new Response(JSON.stringify({ success: true, data: list }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
