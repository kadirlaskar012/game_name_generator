import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Cy9QhUQ_.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_D7-QhZvd.mjs';
import { G as GeneratorApp } from '../../chunks/GeneratorApp_D0T8_eDS.mjs';
import { $ as $$FaqAccordion } from '../../chunks/FaqAccordion_tFYrl5E9.mjs';
import { g as getGameBySlug, d as getStyleBySlug, a as getGames, b as getStyles, c as getFaqs } from '../../chunks/repository_CQmdAj9R.mjs';
import { g as generateWebApplicationSchema, a as generateBreadcrumbSchema, b as generateFaqPageSchema } from '../../chunks/schema_OK0uhK4x.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$style = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$style;
  const { game: gameSlug, style: styleSlug } = Astro2.params;
  const [game, style, allGames, allStyles, allFaqs] = await Promise.all([
    getGameBySlug(gameSlug),
    getStyleBySlug(styleSlug),
    getGames(),
    getStyles(),
    getFaqs()
  ]);
  if (!game || !style) {
    return Astro2.redirect("/404");
  }
  const gameFaqs = allFaqs.filter((f) => !f.gameId || f.gameId === game.id);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Games", url: "/games/" },
    { name: `${game.name} Generator`, url: `/${game.slug}-name-generator/` },
    { name: `${style.name} Names`, url: `/${game.slug}-names/${style.slug}/` }
  ];
  const schema = [
    generateWebApplicationSchema(),
    generateBreadcrumbSchema(breadcrumbs),
    generateFaqPageSchema(gameFaqs)
  ];
  const initialGames = allGames.map((g) => ({
    id: g.id,
    name: g.name,
    slug: g.slug,
    logo: g.logo || "\u{1F3AE}",
    rules: g.rules
  }));
  const initialStyles = allStyles.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${game.name} ${style.name} Names & Symbols Generator`, "description": `Best ${style.name} nickname ideas for ${game.name}. Generated with Unicode font transformations and verified symbols within the ${game.rules?.maxLength || 14} char limit.`, "schemaJson": schema }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": breadcrumbs })} ${maybeRenderHead()}<div class="mb-6"> <div class="flex items-center gap-3 mb-2"> <span class="text-3xl">${game.logo}</span> <div> <h1 class="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-gaming"> ${game.name} ${style.name} Names
</h1> <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
Curated ${style.name} style combinations compliant with ${game.name} regulations
</p> </div> </div> </div> <section class="mb-12"> ${renderComponent($$result2, "GeneratorApp", GeneratorApp, { "client:load": true, "initialGames": initialGames, "initialStyles": initialStyles, "defaultGameSlug": game.slug, "defaultStyleSlug": style.slug, "defaultName": "Kadir", "client:component-hydration": "load", "client:component-path": "@/islands/GeneratorApp", "client:component-export": "GeneratorApp" })} </section> <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-neutral-200 dark:border-neutral-800/80 mb-12"> <div class="lg:col-span-7 space-y-4"> <h2 class="text-xl font-bold text-neutral-900 dark:text-white font-gaming">
About ${style.name} Gaming Names for ${game.name} </h2> <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed"> ${style.description || `Discover trending ${style.name} gaming nicknames crafted specifically for ${game.name}. All generated symbols and Unicode typography are fully validated to render crisply without breaking in-game name change cards.`} </p> </div> <div class="lg:col-span-5"> <h2 class="text-xl font-bold text-neutral-900 dark:text-white font-gaming mb-3">
FAQs
</h2> ${renderComponent($$result2, "FaqAccordion", $$FaqAccordion, { "faqs": gameFaqs })} </div> </section> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/[game]-names/[style].astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/[game]-names/[style].astro";
const $$url = "/[game]-names/[style]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$style,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
