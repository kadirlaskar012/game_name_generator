import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro } from './astro/server_BsBWdKrh.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$FaqAccordion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FaqAccordion;
  const { faqs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="space-y-2.5"> ${faqs.map((faq, index) => renderTemplate`<details class="group bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl p-4 transition-colors"${addAttribute(index === 0, "open")}> <summary class="flex items-center justify-between font-semibold text-neutral-900 dark:text-white text-sm sm:text-base cursor-pointer select-none list-none"> <span class="pr-4">${faq.question}</span> <span class="w-5 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 group-open:rotate-180 transition-transform shrink-0 font-mono text-[10px]">
▼
</span> </summary> <div class="mt-2.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"> ${faq.answer} </div> </details>`)} </div>`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/components/FaqAccordion.astro", void 0);

export { $$FaqAccordion as $ };
