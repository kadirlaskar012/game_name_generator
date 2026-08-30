import { E as searchDatabase } from '../../chunks/repository_CQmdAj9R.mjs';
import { s as searchQuerySchema } from '../../chunks/schemas_B1KCwizN.mjs';
import { g as getClientIp, c as checkRateLimit } from '../../chunks/ratelimit_B38cZCNC.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request, url }) => {
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(`search_${ip}`, 120);
  if (!rateCheck.isAllowed) {
    return new Response(JSON.stringify({ success: false, error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Content-Type": "application/json" }
    });
  }
  const query = url.searchParams.get("q") || "";
  const parseResult = searchQuerySchema.safeParse({ q: query });
  if (!parseResult.success) {
    return new Response(JSON.stringify({ success: false, data: { games: [], styles: [], seoPages: [], names: [] } }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const results = await searchDatabase(parseResult.data.q);
    return new Response(
      JSON.stringify({
        success: true,
        data: results
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120"
        }
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error?.message || "Search failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
