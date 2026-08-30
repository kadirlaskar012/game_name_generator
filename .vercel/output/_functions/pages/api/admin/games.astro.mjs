import { h as deleteGame, i as getAllGamesAdmin, j as saveGame } from '../../../chunks/repository_CQmdAj9R.mjs';
import { b as adminGameSchema } from '../../../chunks/schemas_B1KCwizN.mjs';
import { v as validateAdminSession } from '../../../chunks/auth_BOT6wdmU.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const list = await getAllGamesAdmin();
  return new Response(JSON.stringify({ success: true, data: list }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const parse = adminGameSchema.safeParse(body);
    if (!parse.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid data", details: parse.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const saved = await saveGame(parse.data);
    return new Response(JSON.stringify({ success: true, data: saved }), {
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
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ success: false, error: "Missing game ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const success = await deleteGame(id);
  return new Response(JSON.stringify({ success }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
