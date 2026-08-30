import type { APIRoute } from 'astro';
import { trackNameUsage } from '@/lib/database/repository';
import { trackEventSchema } from '@/lib/validation/schemas';
import { checkRateLimit, getClientIp } from '@/lib/security/ratelimit';

export const POST: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(`track_${ip}`, 180);

  if (!rateCheck.isAllowed) {
    return new Response(JSON.stringify({ success: false, error: 'Rate limit exceeded' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const parse = trackEventSchema.safeParse(body);

    if (!parse.success) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid event data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await trackNameUsage(
      parse.data.name,
      parse.data.gameId,
      parse.data.styleId,
      parse.data.action
    );

    return new Response(JSON.stringify({ success: true }), {
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
