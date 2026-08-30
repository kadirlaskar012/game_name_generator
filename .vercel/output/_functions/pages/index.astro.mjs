import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Cy9QhUQ_.mjs';
import { G as GeneratorApp } from '../chunks/GeneratorApp_D0T8_eDS.mjs';
import { T as TrendingSection } from '../chunks/TrendingSection_DzKNgPi4.mjs';
import { $ as $$GameCard } from '../chunks/GameCard_DP0oY3Qk.mjs';
import { $ as $$FaqAccordion } from '../chunks/FaqAccordion_tFYrl5E9.mjs';
import { a as getGames, b as getStyles, c as getFaqs } from '../chunks/repository_CQmdAj9R.mjs';
import { c as generateWebSiteSchema, g as generateWebApplicationSchema, b as generateFaqPageSchema } from '../chunks/schema_OK0uhK4x.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [games, styles, faqs] = await Promise.all([
    getGames(),
    getStyles(),
    getFaqs()
  ]);
  const initialGames = games.map((g) => ({
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
  const homeSchema = [
    generateWebSiteSchema("https://gamertagpro.com", "GamerTag Pro"),
    generateWebApplicationSchema(
      "GamerTag Pro \u2014 Gaming Name & Nickname Generator",
      "https://gamertagpro.com",
      "Generate stylish, unique, and game-acceptable gaming nicknames for Free Fire, BGMI, Valorant, PUBG, and Esports Clans with verified Unicode symbols."
    ),
    generateFaqPageSchema(faqs)
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Gaming Name Generator (2026) \u2014 100% In-Game Compatible Stylish Nicknames & Symbols", "description": "Generate stylish, unique, and game-acceptable gaming nicknames for Free Fire, BGMI, Valorant, PUBG, and Esports Clans. Features Small Caps (\u1D0B\u1D00\u1D05\u026A\u0280), boss crowns (\u4E97), angel wings, and clan brackets.", "schemaJson": homeSchema }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="text-center pt-2 sm:pt-4 pb-6 sm:pb-8 max-w-3xl mx-auto px-2"> <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-3.5 rounded-full text-[11px] sm:text-xs font-medium bg-neutral-100 dark:bg-[#111620] text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-[#1c2333]"> <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> <span>100% In-Game Compatible Unicode Engine</span> </div> <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white font-gaming tracking-tight mb-2.5">
Gaming Name Generator
</h1> <p class="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
Type any nickname or choose a style to generate verified IGNs, boss crowns (<span class="font-mono text-neutral-800 dark:text-neutral-200">亗</span>), Japanese katakana, and clan tags for Free Fire, BGMI, and Valorant.
</p> </section>  <section class="mb-12 sm:mb-16"> ${renderComponent($$result2, "GeneratorApp", GeneratorApp, { "client:load": true, "initialGames": initialGames, "initialStyles": initialStyles, "defaultGameSlug": "free-fire", "defaultName": "Kadir", "client:component-hydration": "load", "client:component-path": "@/islands/GeneratorApp", "client:component-export": "GeneratorApp" })} </section>  <section class="mb-12 sm:mb-16"> <div class="flex items-center justify-between mb-4 sm:mb-5"> <div> <h2 class="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white font-gaming">
Game-Specific Generators
</h2> <p class="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
Tailored with exact character limits and supported symbols
</p> </div> <a href="/games/" class="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline transition-colors">
View All Games →
</a> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5"> ${games.slice(0, 8).map((game) => renderTemplate`${renderComponent($$result2, "GameCard", $$GameCard, { "game": game })}`)} </div> </section>  <section class="mb-12 sm:mb-16"> <div class="flex items-center justify-between mb-4 sm:mb-5"> <div> <h2 class="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white font-gaming flex items-center gap-2"> <span>🔥</span> Trending Nicknames
</h2> <p class="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
Most copied and favorited gamer tags across all games
</p> </div> <a href="/trending/" class="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline transition-colors">
Full Leaderboard →
</a> </div> ${renderComponent($$result2, "TrendingSection", TrendingSection, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/islands/TrendingSection", "client:component-export": "TrendingSection" })} </section>  <article class="pt-10 border-t border-neutral-200 dark:border-[#1c2333] space-y-10 text-neutral-700 dark:text-neutral-300"> <header class="space-y-3"> <h2 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-gaming">
The Ultimate Guide to Creating Pro Gaming Names & In-Game Nicknames (2026)
</h2> <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
Whether you are competing in Garena Free Fire tournaments, climbing the ranked leaderboards of BGMI (Battlegrounds Mobile India), locking down Radiant lobbies in Valorant, or building an esports clan brand, your in-game name (IGN) is the foundation of your digital persona. Below is a comprehensive masterclass on how gamer tags work, how Unicode typography renders across mobile and PC platforms, and how to craft an unforgettable alias.
</p> </header> <!-- Section 1: Psychology --> <section class="space-y-3"> <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming">
1. The Science & Psychology of an Unforgettable Gamer Tag
</h3> <p class="text-xs sm:text-sm leading-relaxed">
A memorable gamer tag accomplishes three vital psychological goals inside the lobby and kill feed:
</p> <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1"> <div class="p-4 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <h4 class="font-bold text-neutral-900 dark:text-white text-xs sm:text-sm mb-1">Instant Recognition</h4> <p class="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
Short, punchy aliases between 4 to 9 characters allow tournament casters, teammates, and opponents to call you out instantly in voice comms without stumbling over complicated spellings.
</p> </div> <div class="p-4 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <h4 class="font-bold text-neutral-900 dark:text-white text-xs sm:text-sm mb-1">Kill Feed Presence</h4> <p class="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
Symmetric decorative symbols like boss crowns (<code class="text-xs">亗</code>) and wing brackets (<code class="text-xs">꧁༺ ༻꧂</code>) frame your name, immediately drawing attention when you score headshots.
</p> </div> <div class="p-4 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <h4 class="font-bold text-neutral-900 dark:text-white text-xs sm:text-sm mb-1">Brand Longevity</h4> <p class="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
Avoid appending fleeting temporary numbers unless intentional. Timeless aliases can transition from a casual mobile battle royale to YouTube gaming, Twitch streaming, and competitive PC titles.
</p> </div> </div> </section> <!-- Section 2: Character Limits Comparison Table --> <section class="space-y-4"> <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming">
2. In-Game Character Limits & Technical Rules Comparison Table
</h3> <p class="text-xs sm:text-sm leading-relaxed">
Every major gaming engine calculates character lengths differently. Some games count raw bytes (where a multi-byte Unicode glyph takes 3 bytes), while modern engines count Unicode code points (where each symbol takes exactly 1 character length).
</p> <div class="overflow-x-auto border border-neutral-200 dark:border-[#1c2333] rounded-xl bg-white dark:bg-[#111620]"> <table class="w-full text-left text-xs"> <thead class="bg-neutral-100 dark:bg-[#0b0e14] border-b border-neutral-200 dark:border-[#1c2333] text-neutral-900 dark:text-white"> <tr> <th class="p-3 font-bold">Game Title</th> <th class="p-3 font-bold">Max Limit</th> <th class="p-3 font-bold">Min Limit</th> <th class="p-3 font-bold">Supported Unicode Symbols</th> <th class="p-3 font-bold">Name Change Cost</th> </tr> </thead> <tbody class="divide-y divide-neutral-100 dark:divide-[#1c2333] text-neutral-600 dark:text-neutral-400"> <tr> <td class="p-3 font-semibold text-neutral-900 dark:text-white">Garena Free Fire / MAX</td> <td class="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">12 Chars</td> <td class="p-3 font-mono">3 Chars</td> <td class="p-3 font-mono">亗, 👑, ☬, ꧁༺ ༻꧂, ࿐, 么, 々, メ, ⚡</td> <td class="p-3">390 Diamonds / Name Card</td> </tr> <tr> <td class="p-3 font-semibold text-neutral-900 dark:text-white">BGMI / PUBG Mobile</td> <td class="p-3 font-mono font-bold text-sky-600 dark:text-sky-400">14 Chars</td> <td class="p-3 font-mono">3 Chars</td> <td class="p-3 font-mono">メ, 〆, 々, 么, 乡, 『 』, 【 】, 父, 气</td> <td class="p-3">180 UC / Rename Card</td> </tr> <tr> <td class="p-3 font-semibold text-neutral-900 dark:text-white">Riot Valorant</td> <td class="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">16 Chars</td> <td class="p-3 font-mono">3 Chars</td> <td class="p-3 font-mono">Small Caps (ᴋᴀᴅɪʀ), •, ·, /, —, ×, ø, †</td> <td class="p-3">Free (Every 30 Days)</td> </tr> <tr> <td class="p-3 font-semibold text-neutral-900 dark:text-white">Call of Duty: Mobile</td> <td class="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">14 Chars</td> <td class="p-3 font-mono">3 Chars</td> <td class="p-3 font-mono">☠, ⚔, ⚡, ☣, ✘, 𝕏, 🎯, ×, •</td> <td class="p-3">200 CP / 1000 Credits</td> </tr> <tr> <td class="p-3 font-semibold text-neutral-900 dark:text-white">Roblox</td> <td class="p-3 font-mono font-bold text-pink-600 dark:text-pink-400">20 Chars</td> <td class="p-3 font-mono">3 Chars</td> <td class="p-3 font-mono">✿, ♡, ✧, ⋆, 🧸, ʚɞ, ✰ (Display Name)</td> <td class="p-3">Free (Display Name) / 1000 R$</td> </tr> <tr> <td class="p-3 font-semibold text-neutral-900 dark:text-white">Minecraft Java/Bedrock</td> <td class="p-3 font-mono font-bold text-neutral-600 dark:text-neutral-400">16 Chars</td> <td class="p-3 font-mono">3 Chars</td> <td class="p-3 font-mono">Alphanumeric + Underscores (_)</td> <td class="p-3">Free (Every 30 Days)</td> </tr> </tbody> </table> </div> </section> <!-- Section 3: Unicode Font Mechanics --> <section class="space-y-3"> <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming">
3. Understanding Unicode Font Transformations: How It Works
</h3> <p class="text-xs sm:text-sm leading-relaxed">
Many gamers wonder how styled text like <span class="font-bold text-neutral-900 dark:text-white">ᴋᴀᴅɪʀ</span> or <span class="font-bold text-neutral-900 dark:text-white">𝕶𝖆𝖉𝖎𝖗</span> works inside games that do not have custom font pickers. The answer lies in the **Unicode Mathematical Alphanumeric Symbols Standard**.
</p> <p class="text-xs sm:text-sm leading-relaxed">
Instead of regular ASCII characters (which range from character code 65 to 122), our generator maps your standard letters to dedicated Unicode code points. Because modern games use UTF-8 text rendering, they treat these characters as universal glyphs. This allows you to copy and paste custom fonts directly into games without installing any third-party mods or keyboards.
</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"> <div class="p-3.5 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl space-y-1"> <span class="text-[11px] font-mono text-sky-500 uppercase font-bold">Small Caps Engine</span> <div class="text-base font-bold font-gaming text-neutral-900 dark:text-white">ᴋ ᴀ ᴅ ɪ ʀ</div> <p class="text-[11px] text-neutral-500">Maps characters to Latin Letter Small Capitals (U+1D00–U+1D7F). Highly recommended for clean esports aliases.</p> </div> <div class="p-3.5 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl space-y-1"> <span class="text-[11px] font-mono text-amber-500 uppercase font-bold">Gothic Fraktur Engine</span> <div class="text-base font-bold font-gaming text-neutral-900 dark:text-white">𝕶 𝖆 𝖉 𝖎 𝖗</div> <p class="text-[11px] text-neutral-500">Maps characters to Mathematical Fraktur (U+1D56C–U+1D59F). Creates an intimidating dark medieval aesthetic.</p> </div> </div> </section> <!-- Section 4: Step-by-Step Tutorial --> <section class="space-y-4"> <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming">
4. Step-by-Step: How to Change Your In-Game Name Without Errors
</h3> <div class="space-y-2.5 text-xs sm:text-sm"> <div class="flex items-start gap-3 p-3 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <span class="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0">1</span> <div> <strong class="text-neutral-900 dark:text-white">Generate and Copy:</strong> Use our generator above, customize your preferred style or game filter, and click the <strong>Copy</strong> button on your chosen card.
</div> </div> <div class="flex items-start gap-3 p-3 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <span class="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0">2</span> <div> <strong class="text-neutral-900 dark:text-white">Launch Your Game:</strong> Open Free Fire, BGMI, or Valorant on your device and tap your profile banner in the top-left corner.
</div> </div> <div class="flex items-start gap-3 p-3 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <span class="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0">3</span> <div> <strong class="text-neutral-900 dark:text-white">Open Rename Dialog:</strong> Tap the pencil/edit icon next to your existing nickname.
</div> </div> <div class="flex items-start gap-3 p-3 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl"> <span class="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0">4</span> <div> <strong class="text-neutral-900 dark:text-white">Paste and Confirm:</strong> Long press on the text box, select Paste, verify that the character length indicator shows a green checkmark, and confirm using your Name Change Card or in-game currency.
</div> </div> </div> </section> <!-- Section 5: Esports Clan Identity --> <section class="space-y-3"> <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming">
5. Clan Identity & Squad Tag Architecture
</h3> <p class="text-xs sm:text-sm leading-relaxed">
Professional esports organizations (such as Team Soul, GodLike, S8UL, T1, Sentinels, and FaZe Clan) enforce strict naming guidelines for their tournament rosters. When creating tags for your 4-player squad or 50-member guild:
</p> <ul class="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2 text-neutral-600 dark:text-neutral-400"> <li><strong>Pick a Uniform Bracket:</strong> Standardize on one bracket style across all members (e.g. <code class="px-1 bg-neutral-200 dark:bg-[#1c2333] rounded text-neutral-900 dark:text-white">『TAG』Name</code> or <code class="px-1 bg-neutral-200 dark:bg-[#1c2333] rounded text-neutral-900 dark:text-white">【TAG】Name</code>).</li> <li><strong>Designate Squad Roles:</strong> You can append compact role markers like <code class="px-1 bg-neutral-200 dark:bg-[#1c2333] rounded text-neutral-900 dark:text-white">_IGL</code> (In-Game Leader), <code class="px-1 bg-neutral-200 dark:bg-[#1c2333] rounded text-neutral-900 dark:text-white">_FRAG</code> (Entry Fragger), or <code class="px-1 bg-neutral-200 dark:bg-[#1c2333] rounded text-neutral-900 dark:text-white">_SNIPER</code>.</li> <li><strong>Ensure Mobile Kill-Feed Visibility:</strong> Keep the clan tag prefix to 3 or 4 letters so your player nickname remains fully visible on mobile screens.</li> </ul> </section> <!-- Section 6: FAQ Accordion Section --> <section class="space-y-4 pt-4 border-t border-neutral-200 dark:border-[#1c2333]"> <h3 class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-gaming">
Frequently Asked Questions (FAQ)
</h3> ${renderComponent($$result2, "FaqAccordion", $$FaqAccordion, { "faqs": faqs })} </section> </article> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/index.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
