import { e as createComponent, m as maybeRenderHead, r as renderTemplate, g as addAttribute, h as createAstro } from './astro/server_BsBWdKrh.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { items } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Breadcrumb" class="py-2.5 mb-4 text-xs"> <ol class="flex items-center flex-wrap gap-1.5 text-neutral-500 dark:text-neutral-400"> <li> <a href="/" class="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"> <span>🏠</span> Home
</a> </li> ${items.map((item, index) => {
    const isLast = index === items.length - 1;
    return renderTemplate`<li class="flex items-center gap-1.5"> <span class="text-neutral-300 dark:text-neutral-700">/</span> ${isLast ? renderTemplate`<span class="text-neutral-900 dark:text-white font-semibold truncate max-w-[180px] sm:max-w-none" aria-current="page"> ${item.name} </span>` : renderTemplate`<a${addAttribute(item.url, "href")} class="hover:text-neutral-900 dark:hover:text-white transition-colors truncate max-w-[140px] sm:max-w-none"> ${item.name} </a>`} </li>`;
  })} </ol> </nav>`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/components/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
