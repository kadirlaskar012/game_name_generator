import type { APIRoute } from 'astro';
import { searchDatabase } from '@/lib/database/repository';
import { searchQuerySchema } from '@/lib/validation/schemas';
import { checkRateLimit, getClientIp } from '@/lib/security/ratelimit';

export const GET: APIRoute = async ({ request, url }) => {
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(`search_${ip}`, 120);

  if (!rateCheck.isAllowed) {
    return new Response(JSON.stringify({ success: false, error: 'Rate limit exceeded' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const query = url.searchParams.get('q') || '';
  const parseResult = searchQuerySchema.safeParse({ q: query });

  if (!parseResult.success) {
    return new Response(JSON.stringify({ success: false, data: { games: [], styles: [], seoPages: [], names: [] } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const results = await searchDatabase(parseResult.data.q);
    return new Response(
      JSON.stringify({
        success: true,
        data: results,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error?.message || 'Search failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
