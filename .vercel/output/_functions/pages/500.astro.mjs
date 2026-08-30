import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Cy9QhUQ_.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  const { error } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "500 Internal Server Error | GamerTag Pro", "description": "A temporary server error occurred.", "robots": "noindex, follow" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="text-center py-24 max-w-lg mx-auto"> <div class="inline-flex p-4 rounded-3xl bg-red-500/10 border border-red-500/30 text-red-400 mb-6"> <span class="text-5xl font-extrabold font-gaming">500</span> </div> <h1 class="text-3xl font-bold text-white font-gaming mb-3">
SYSTEM GLITCH • SERVER ERROR
</h1> <p class="text-sm text-gray-400 mb-8 leading-relaxed">
A temporary glitch occurred in the generator engine. Our engineering crew has been deployed.
</p> <a href="/" class="px-6 py-2.5 bg-gaming-accent text-black font-bold text-xs rounded-xl shadow-neon-cyan hover:bg-gaming-neon transition">
Restart Generator
</a> </div> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/500.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$500,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
