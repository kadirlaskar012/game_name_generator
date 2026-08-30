import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Cy9QhUQ_.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 Page Not Found | GamerTag Pro", "description": "The requested gaming name generator page could not be found.", "robots": "noindex, follow" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="text-center py-24 max-w-lg mx-auto"> <div class="inline-flex p-4 rounded-3xl bg-gaming-accent/10 border border-gaming-accent/30 text-gaming-accent mb-6 shadow-neon-cyan animate-pulse"> <span class="text-5xl font-extrabold font-gaming">404</span> </div> <h1 class="text-3xl font-bold text-white font-gaming mb-3">
MISSION ABORTED • PAGE NOT FOUND
</h1> <p class="text-sm text-gray-400 mb-8 leading-relaxed">
The coordinates you requested do not exist or have moved to another battle zone.
</p> <div class="flex items-center justify-center gap-4"> <a href="/" class="px-6 py-2.5 bg-gaming-accent text-black font-bold text-xs rounded-xl shadow-neon-cyan hover:bg-gaming-neon transition">
Return to Home Generator
</a> <a href="/games/" class="px-6 py-2.5 bg-white/5 border border-gaming-border text-white text-xs font-semibold rounded-xl hover:bg-white/10 transition">
Browse Games
</a> </div> </div> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/404.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
