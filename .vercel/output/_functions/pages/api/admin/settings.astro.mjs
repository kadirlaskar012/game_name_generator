import { m as getSiteSettings, n as getAllBlockedWordsAdmin, o as getAnalyticsSummary, u as updateSiteSettings, p as addBlockedWord, r as removeBlockedWord } from '../../../chunks/repository_CQmdAj9R.mjs';
import { v as validateAdminSession } from '../../../chunks/auth_BOT6wdmU.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request, url }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401 });
  }
  url.searchParams.get("type") || "all";
  try {
    const settings = await getSiteSettings();
    const blockedWords = await getAllBlockedWordsAdmin();
    const analytics = await getAnalyticsSummary();
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          settings,
          blockedWords,
          analytics
        }
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err?.message }), { status: 500 });
  }
};
const POST = async ({ request }) => {
  const auth = await validateAdminSession(request);
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const { action, settings, blockedWord, blockedWordId } = body;
    if (action === "update_settings" && settings) {
      const updated = await updateSiteSettings(settings);
      return new Response(JSON.stringify({ success: true, data: updated }), { status: 200 });
    }
    if (action === "add_blocked_word" && blockedWord) {
      const added = await addBlockedWord(blockedWord);
      return new Response(JSON.stringify({ success: true, data: added }), { status: 200 });
    }
    if (action === "remove_blocked_word" && blockedWordId) {
      const removed = await removeBlockedWord(blockedWordId);
      return new Response(JSON.stringify({ success: true, data: removed }), { status: 200 });
    }
    return new Response(JSON.stringify({ success: false, error: "Invalid action" }), { status: 400 });
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
