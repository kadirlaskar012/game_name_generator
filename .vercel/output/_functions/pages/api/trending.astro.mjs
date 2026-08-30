import { F as getTrendingNames } from '../../chunks/repository_CQmdAj9R.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ url }) => {
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const gameId = url.searchParams.get("gameId") || void 0;
  try {
    const list = await getTrendingNames(limit, gameId);
    return new Response(JSON.stringify({ success: true, data: list }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60"
      }
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
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
