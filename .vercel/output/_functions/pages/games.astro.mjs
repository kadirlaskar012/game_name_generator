import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Cy9QhUQ_.mjs';
import { $ as $$GameCard } from '../chunks/GameCard_DP0oY3Qk.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_D7-QhZvd.mjs';
import { a as getGames } from '../chunks/repository_CQmdAj9R.mjs';
import { a as generateBreadcrumbSchema } from '../chunks/schema_OK0uhK4x.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const games = await getGames();
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Games Directory", url: "/games/" }
  ];
  const schema = [
    generateBreadcrumbSchema(breadcrumbItems)
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "All Supported Games \u2014 Gaming Name Generators", "description": "Explore gaming nickname generators for Free Fire, BGMI, Valorant, Fortnite, Roblox, Minecraft, CODM, and Esports Clans with game-specific character limits.", "schemaJson": schema }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": breadcrumbItems })} ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-gaming mb-2">
All Supported Games
</h1> <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
Select your game below to generate formatted nicknames compliant with specific character lengths and supported symbols.
</p> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-12"> ${games.map((game) => renderTemplate`${renderComponent($$result2, "GameCard", $$GameCard, { "game": game })}`)} </div> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/games/index.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/games/index.astro";
const $$url = "/games";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
