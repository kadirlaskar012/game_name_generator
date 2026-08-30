import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro } from './astro/server_BsBWdKrh.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$GameCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GameCard;
  const { game } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/${game.slug}-name-generator/`, "href")} class="group bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-2xl p-5 transition-all duration-150 flex flex-col justify-between shadow-sm hover:shadow-md"> <div> <div class="flex items-center justify-between mb-3"> <div class="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-xl transition"> ${game.logo} </div> <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
Max ${game.rules?.maxLength || 14} Chars
</span> </div> <h3 class="text-base font-bold text-neutral-900 dark:text-white font-gaming mb-1 group-hover:text-sky-500 transition"> ${game.name} </h3> <p class="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4"> ${game.description} </p> </div> <div class="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-xs font-semibold text-neutral-900 dark:text-white"> <span>Generate Names →</span> <div class="flex items-center gap-1 text-[11px] text-neutral-400 font-mono"> ${game.rules?.preferredSymbols?.slice(0, 4).map((s) => renderTemplate`<span>${s}</span>`)} </div> </div> </a>`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/components/GameCard.astro", void 0);

export { $$GameCard as $ };
