import { D as trackNameUsage } from '../../chunks/repository_CQmdAj9R.mjs';
import { t as trackEventSchema } from '../../chunks/schemas_B1KCwizN.mjs';
import { g as getClientIp, c as checkRateLimit } from '../../chunks/ratelimit_B38cZCNC.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(`track_${ip}`, 180);
  if (!rateCheck.isAllowed) {
    return new Response(JSON.stringify({ success: false, error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const parse = trackEventSchema.safeParse(body);
    if (!parse.success) {
      return new Response(JSON.stringify({ success: false, error: "Invalid event data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
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
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
