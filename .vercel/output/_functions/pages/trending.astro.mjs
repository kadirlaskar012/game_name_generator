import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Cy9QhUQ_.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_D7-QhZvd.mjs';
import { T as TrendingSection } from '../chunks/TrendingSection_DzKNgPi4.mjs';
import { a as generateBreadcrumbSchema } from '../chunks/schema_OK0uhK4x.mjs';
export { renderers } from '../renderers.mjs';

const $$Trending = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Trending Names", url: "/trending/" }
  ];
  const schema = [
    generateBreadcrumbSchema(breadcrumbs)
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Trending Gaming Names & Nicknames \u2014 Live Leaderboard", "description": "Discover the most popular, copied, and favorited gamer tags in real time, dynamically ranked by player popularity.", "schemaJson": schema }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": breadcrumbs })} ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-gaming mb-2 flex items-center gap-2"> <span>🔥</span> Live Trending Leaderboard
</h1> <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
The most popular in-game names copied and favorited by the community. Click Copy or Download Card on any item.
</p> </div> <section class="mb-12"> ${renderComponent($$result2, "TrendingSection", TrendingSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/islands/TrendingSection", "client:component-export": "TrendingSection" })} </section> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/trending.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/trending.astro";
const $$url = "/trending";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Trending,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
