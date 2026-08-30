import { f as deleteFaq, c as getFaqs, s as saveFaq } from '../../../chunks/repository_CQmdAj9R.mjs';
import { a as adminFaqSchema } from '../../../chunks/schemas_B1KCwizN.mjs';
import { v as validateAdminSession } from '../../../chunks/auth_BOT6wdmU.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401 });
  }
  const list = await getFaqs();
  return new Response(JSON.stringify({ success: true, data: list }), { status: 200 });
};
const POST = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const parse = adminFaqSchema.safeParse(body);
    if (!parse.success) {
      return new Response(JSON.stringify({ success: false, error: "Invalid FAQ data" }), { status: 400 });
    }
    const saved = await saveFaq(parse.data);
    return new Response(JSON.stringify({ success: true, data: saved }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err?.message }), { status: 500 });
  }
};
const DELETE = async ({ request, url }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401 });
  }
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ success: false, error: "Missing FAQ ID" }), { status: 400 });
  }
  const success = await deleteFaq(id);
  return new Response(JSON.stringify({ success }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
