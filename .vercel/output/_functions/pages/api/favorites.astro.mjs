import { z as removeUserFavorite, A as getUserFavorites, B as addUserFavorite } from '../../chunks/repository_CQmdAj9R.mjs';
import { f as favoriteRequestSchema } from '../../chunks/schemas_B1KCwizN.mjs';
import { g as getClientIp } from '../../chunks/ratelimit_B38cZCNC.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request, url }) => {
  const userId = url.searchParams.get("userId") || getClientIp(request);
  try {
    const list = await getUserFavorites(userId);
    return new Response(JSON.stringify({ success: true, data: list }), {
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
const POST = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const parse = favoriteRequestSchema.safeParse(body);
    if (!parse.success) {
      return new Response(JSON.stringify({ success: false, error: "Invalid data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const userId = body.userId || getClientIp(request);
    const fav = await addUserFavorite(userId, {
      name: parse.data.name,
      gameName: parse.data.gameName,
      styleName: parse.data.styleName
    });
    return new Response(JSON.stringify({ success: true, data: fav }), {
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
const DELETE = async ({ request, url }) => {
  try {
    const userId = url.searchParams.get("userId") || getClientIp(request);
    const nameOrId = url.searchParams.get("id") || url.searchParams.get("name");
    if (!nameOrId) {
      return new Response(JSON.stringify({ success: false, error: "Missing favorite ID or name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const success = await removeUserFavorite(userId, nameOrId);
    return new Response(JSON.stringify({ success }), {
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
  DELETE,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
