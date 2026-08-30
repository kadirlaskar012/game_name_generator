import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Cy9QhUQ_.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_D7-QhZvd.mjs';
import { G as GeneratorApp } from '../chunks/GeneratorApp_D0T8_eDS.mjs';
import { a as getGames, b as getStyles } from '../chunks/repository_CQmdAj9R.mjs';
import { g as generateWebApplicationSchema, a as generateBreadcrumbSchema } from '../chunks/schema_OK0uhK4x.mjs';
export { renderers } from '../renderers.mjs';

const $$EsportsNameGenerator = createComponent(async ($$result, $$props, $$slots) => {
  const [allGames, styles] = await Promise.all([
    getGames(),
    getStyles()
  ]);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Esports Name Generator", url: "/esports-name-generator/" }
  ];
  const initialGames = allGames.map((g) => ({
    id: g.id,
    name: g.name,
    slug: g.slug,
    logo: g.logo || "\u{1F3AE}",
    rules: g.rules
  }));
  const initialStyles = styles.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug
  }));
  const schema = [
    generateWebApplicationSchema(),
    generateBreadcrumbSchema(breadcrumbs)
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Esports Pro Name Generator \u2014 Professional Gamer Tags & Small Caps", "description": "Generate clean, minimalist, pro gamer tags in Small Caps, Gothic Fraktur, and impact fonts used by tier-1 esports athletes.", "schemaJson": schema }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": breadcrumbs })} ${maybeRenderHead()}<div class="mb-6"> <h1 class="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-gaming mb-2">
Esports Pro Name Generator
</h1> <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
Create clean, professional player aliases in Small Caps (ᴋᴀᴅɪʀ) and subtle typography for tournament leaderboards.
</p> </div> <section class="mb-12"> ${renderComponent($$result2, "GeneratorApp", GeneratorApp, { "client:load": true, "initialGames": initialGames, "initialStyles": initialStyles, "defaultGameSlug": "valorant", "defaultName": "SHADOW", "client:component-hydration": "load", "client:component-path": "@/islands/GeneratorApp", "client:component-export": "GeneratorApp" })} </section> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/esports-name-generator.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/esports-name-generator.astro";
const $$url = "/esports-name-generator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$EsportsNameGenerator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
