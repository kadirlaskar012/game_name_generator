import type { APIRoute } from 'astro';
import { generateGamingNames } from '@/lib/generator/engine';
import { generateRequestSchema } from '@/lib/validation/schemas';
import { checkRateLimit, getClientIp } from '@/lib/security/ratelimit';
import { trackNameUsage } from '@/lib/database/repository';

export const POST: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(`gen_${ip}`, 120);

  if (!rateCheck.isAllowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Too many requests. Please slow down.',
        retryAfter: rateCheck.resetSeconds,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateCheck.resetSeconds),
          'X-RateLimit-Limit': String(rateCheck.limit),
          'X-RateLimit-Remaining': String(rateCheck.remaining),
        },
      }
    );
  }

  try {
    const rawBody = await request.json().catch(() => ({}));
    const parseResult = generateRequestSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid parameters',
          details: parseResult.error.flatten(),
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { name, game, gameId, gameSlug, style, styleId, styleSlug, gender, language, symbols, length, count, offset, seed } = parseResult.data;

    const result = await generateGamingNames({
      name: name || undefined,
      gameId: gameId || (game && !game.startsWith('/') ? game : undefined),
      gameSlug: gameSlug || (game && !game.startsWith('/') ? game : undefined),
      styleId: styleId || (style && !style.startsWith('/') ? style : undefined),
      styleSlug: styleSlug || (style && !style.startsWith('/') ? style : undefined),
      gender,
      language,
      includeSymbols: symbols,
      lengthCategory: length,
      count,
      offset,
      seed,
    });

    // Track usage for top result
    if (result.results.length > 0) {
      trackNameUsage(result.results[0].name, gameId, styleId, 'generate').catch(() => {});
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: result.results,
        meta: {
          total: result.total,
          inputName: result.inputName,
          gameName: result.gameName,
          styleName: result.styleName,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          'X-RateLimit-Limit': String(rateCheck.limit),
          'X-RateLimit-Remaining': String(rateCheck.remaining),
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'Failed to generate gaming names',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
