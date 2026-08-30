import { k as getAllSeoPagesAdmin, l as saveSeoPage } from '../../../chunks/repository_CQmdAj9R.mjs';
import { c as adminSeoPageSchema } from '../../../chunks/schemas_B1KCwizN.mjs';
import { v as validateAdminSession } from '../../../chunks/auth_BOT6wdmU.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401 });
  }
  const list = await getAllSeoPagesAdmin();
  return new Response(JSON.stringify({ success: true, data: list }), { status: 200 });
};
const POST = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const parse = adminSeoPageSchema.safeParse(body);
    if (!parse.success) {
      return new Response(JSON.stringify({ success: false, error: "Invalid SEO page data" }), { status: 400 });
    }
    const saved = await saveSeoPage(parse.data);
    return new Response(JSON.stringify({ success: true, data: saved }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err?.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
