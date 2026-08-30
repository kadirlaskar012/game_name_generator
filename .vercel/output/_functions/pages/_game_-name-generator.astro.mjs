import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Cy9QhUQ_.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_D7-QhZvd.mjs';
import { G as GeneratorApp } from '../chunks/GeneratorApp_D0T8_eDS.mjs';
import { $ as $$FaqAccordion } from '../chunks/FaqAccordion_tFYrl5E9.mjs';
import { g as getGameBySlug, a as getGames, b as getStyles, c as getFaqs } from '../chunks/repository_CQmdAj9R.mjs';
import { g as generateWebApplicationSchema, a as generateBreadcrumbSchema, b as generateFaqPageSchema } from '../chunks/schema_OK0uhK4x.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { game: gameSlug } = Astro2.params;
  const [game, allGames, styles, allFaqs] = await Promise.all([
    getGameBySlug(gameSlug),
    getGames(),
    getStyles(),
    getFaqs()
  ]);
  if (!game) {
    return Astro2.redirect("/404");
  }
  const gameFaqs = allFaqs.filter((f) => !f.gameId || f.gameId === game.id);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Games Directory", url: "/games/" },
    { name: `${game.name} Generator`, url: `/${game.slug}-name-generator/` }
  ];
  const schema = [
    generateWebApplicationSchema(
      `${game.name} Name Generator \u2014 GamerTag Pro`,
      `https://gamertagpro.com/${game.slug}-name-generator/`,
      `Generate stylish in-game names for ${game.name} with verified Unicode symbols, wings, boss crowns, and clan brackets within the ${game.rules?.maxLength || 14} character limit.`
    ),
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
  const initialStyles = styles.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": game.seoTitle || `${game.name} Name Generator 2026 \u2014 Stylish Nicknames, Boss Crowns & Symbols`, "description": game.seoDescription || `Create unique, stylish in-game names for ${game.name} with verified Unicode symbols, wings, boss crowns, and clan brackets within the ${game.rules?.maxLength || 14} character limit.`, "schemaJson": schema }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": breadcrumbs })}  ${maybeRenderHead()}<div class="mb-6 sm:mb-8"> <div class="flex items-center gap-3 mb-2.5"> <span class="text-3xl sm:text-4xl p-2 rounded-2xl bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] shadow-sm">${game.logo}</span> <div> <h1 class="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-gaming tracking-tight"> ${game.name} Name Generator
</h1> <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
Max ${game.rules?.maxLength || 14} characters • Min ${game.rules?.minLength || 3} characters • Verified Symbols & Fonts
</p> </div> </div> </div>  <section class="mb-12 sm:mb-16"> ${renderComponent($$result2, "GeneratorApp", GeneratorApp, { "client:load": true, "initialGames": initialGames, "initialStyles": initialStyles, "defaultGameSlug": game.slug, "defaultName": "Kadir", "client:component-hydration": "load", "client:component-path": "@/islands/GeneratorApp", "client:component-export": "GeneratorApp" })} </section>  <article class="pt-8 border-t border-neutral-200 dark:border-[#1c2333] space-y-8 text-neutral-700 dark:text-neutral-300"> <div class="space-y-3"> <h2 class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-gaming">
Comprehensive ${game.name} Nickname Guide & Symbol Compliance
</h2> <p class="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"> ${game.description} When choosing or changing your in-game name for ${game.name}, it is crucial to ensure that every symbol and font transformation adheres to the official game client character limits and Unicode rendering standards.
</p> </div> <!-- Rule Cards --> <div class="grid grid-cols-1 sm:grid-cols-3 gap-3"> <div class="p-4 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <span class="text-[11px] font-mono text-neutral-400 uppercase font-bold">Length Limit</span> <div class="text-xl font-bold font-gaming text-neutral-900 dark:text-white mt-1">
Max ${game.rules?.maxLength || 14} Chars
</div> <p class="text-[11px] text-neutral-500 mt-1">Names exceeding this limit will trigger an in-game error during name change.</p> </div> <div class="p-4 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <span class="text-[11px] font-mono text-neutral-400 uppercase font-bold">Minimum Length</span> <div class="text-xl font-bold font-gaming text-neutral-900 dark:text-white mt-1">
Min ${game.rules?.minLength || 3} Chars
</div> <p class="text-[11px] text-neutral-500 mt-1">Single or dual character names are disallowed in public lobbies.</p> </div> <div class="p-4 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <span class="text-[11px] font-mono text-neutral-400 uppercase font-bold">Verified Symbols</span> <div class="text-sm font-bold font-mono text-neutral-900 dark:text-white mt-1 truncate"> ${game.rules?.preferredSymbols?.slice(0, 6).join("  ") || "\u4E97  \u30E1  \u3005  \u4E48  \uA9C2"} </div> <p class="text-[11px] text-neutral-500 mt-1">100% verified to display without question marks or missing box glyphs.</p> </div> </div> <!-- Step by Step Rename Process --> <div class="space-y-3"> <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming">
How to Change Your Name in ${game.name} </h3> <ol class="list-decimal list-inside space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 pl-1 leading-relaxed"> <li>Select and copy your favorite generated name from the list above.</li> <li>Open the ${game.name} application on your mobile phone or PC and head to your In-Game Profile.</li> <li>Locate the edit/pencil icon adjacent to your player name banner.</li> <li>Paste the copied text into the nickname input box. Check that all Unicode symbols render properly.</li> <li>Confirm using your Rename Card, Name Change Card, or in-game currency.</li> </ol> </div> <!-- FAQs Section --> <div class="space-y-4 pt-4 border-t border-neutral-200 dark:border-[#1c2333]"> <h3 class="text-xl font-bold text-neutral-900 dark:text-white font-gaming"> ${game.name} Frequently Asked Questions
</h3> ${renderComponent($$result2, "FaqAccordion", $$FaqAccordion, { "faqs": gameFaqs })} </div> </article> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/[game]-name-generator/index.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/[game]-name-generator/index.astro";
const $$url = "/[game]-name-generator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
