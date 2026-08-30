import { e as createComponent, m as maybeRenderHead, k as renderComponent, r as renderTemplate, g as addAttribute, l as renderSlot, h as createAstro } from './astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { c as createLucideIcon, $ as $$SeoHead } from './createLucideIcon_BXIrLuf3.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { X, G as Gamepad2, F as FileText } from './x_CEN4oiZd.mjs';
import { A as ArrowRight } from './arrow-right_BXE5_Eo6.mjs';
import 'clsx';
import { a as SEED_GAMES } from './seedData_DsVjXbpq.mjs';
/* empty css                         */

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$3 = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("Flame", __iconNode$3);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$2 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("Moon", __iconNode$2);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$1 = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
];
const Search = createLucideIcon("Search", __iconNode$1);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("Sun", __iconNode);

const SiteSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ games: [], styles: [], seoPages: [], names: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" || e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults({ games: [], styles: [], seoPages: [], names: [] });
    }
  }, [isOpen]);
  useEffect(() => {
    if (!query.trim()) {
      setResults({ games: [], styles: [], seoPages: [], names: [] });
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch {
      }
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);
  const hasResults = results.games.length > 0 || results.styles.length > 0 || results.seoPages.length > 0 || results.names.length > 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen(true),
        className: "flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white text-xs shadow-sm transition",
        title: "Search Games, Styles, and Nicknames",
        children: [
          /* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5 text-neutral-400" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Search..." }),
          /* @__PURE__ */ jsx("kbd", { className: "hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-400", children: "/" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60", children: [
        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-neutral-400 mr-3" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            type: "text",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Search games, styles, keywords...",
            className: "w-full bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 text-sm outline-none"
          }
        ),
        loading && /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mr-2" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsOpen(false),
            className: "p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800",
            children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-y-auto p-4 space-y-4", children: [
        !query.trim() && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-neutral-400 text-xs", children: "Type to search across Games, Styles, Guides, and Popular Names." }),
        query.trim() && !loading && !hasResults && /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-neutral-400 text-sm", children: [
          'No matching results found for "',
          query,
          '".'
        ] }),
        results.games.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs font-mono uppercase text-neutral-400 mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Gamepad2, { className: "w-3.5 h-3.5" }),
            " Games (",
            results.games.length,
            ")"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: results.games.map((g, i) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: g.slug,
              className: "p-2.5 bg-neutral-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl flex items-center justify-between group transition",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-lg", children: g.icon }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-neutral-900 dark:text-white font-gaming", children: g.title }),
                    /* @__PURE__ */ jsx("div", { className: "text-[11px] text-neutral-500 line-clamp-1", children: g.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition" })
              ]
            },
            i
          )) })
        ] }),
        results.names.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs font-mono uppercase text-neutral-400 mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Flame, { className: "w-3.5 h-3.5 text-amber-500" }),
            " Popular Names"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: results.names.map((n, i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                navigator.clipboard.writeText(n.title);
                setIsOpen(false);
              },
              className: "px-3 py-1.5 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-gaming text-sm rounded-lg transition",
              title: "Click to copy name",
              children: n.title
            },
            i
          )) })
        ] }),
        results.seoPages.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs font-mono uppercase text-neutral-400 mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5" }),
            " Guides"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: results.seoPages.map((p, i) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: p.slug,
              className: "p-2.5 bg-neutral-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl flex items-center justify-between group transition",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-neutral-900 dark:text-white", children: p.title }),
                  /* @__PURE__ */ jsx("div", { className: "text-[11px] text-neutral-500 line-clamp-1", children: p.description })
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-neutral-400" })
              ]
            },
            i
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-4 py-2.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-between text-[11px] text-neutral-400 font-mono", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Press ",
          /* @__PURE__ */ jsx("kbd", { className: "px-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded", children: "ESC" }),
          " to close"
        ] }),
        /* @__PURE__ */ jsx("span", { children: "GamerTag Pro" })
      ] })
    ] }) })
  ] });
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    const handleThemeEvent = (e) => {
      if (e.detail?.theme) {
        setTheme(e.detail.theme);
      }
    };
    window.addEventListener("theme-change", handleThemeEvent);
    return () => window.removeEventListener("theme-change", handleThemeEvent);
  }, []);
  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const nextTheme = isCurrentlyDark ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
    }
    setTheme(nextTheme);
    window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: nextTheme } }));
  };
  if (!mounted) {
    return /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111620]" });
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: toggleTheme,
      "aria-label": `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`,
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`,
      className: "w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111620] text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm transition-colors cursor-pointer active:scale-95",
      children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4 text-amber-400" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4 text-sky-600" })
    }
  );
};

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-surface-darkMuted/80 backdrop-blur-lg"> <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"> <!-- Brand Logo --> <a href="/" class="flex items-center gap-2.5 group shrink-0"> <div class="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center font-display font-extrabold text-sm text-white dark:text-neutral-900 transition">
G
</div> <div class="flex flex-col"> <span class="font-display font-extrabold text-base tracking-tight text-neutral-900 dark:text-white">
GAMERTAG<span class="text-sky-500 font-bold">PRO</span> </span> </div> </a> <!-- Desktop Navigation Links --> <nav class="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300"> <a href="/" class="px-3 py-1.5 rounded-lg hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
Generator
</a> <a href="/games/" class="px-3 py-1.5 rounded-lg hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
Games
</a> <a href="/free-fire-name-generator/" class="px-3 py-1.5 rounded-lg hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
Free Fire
</a> <a href="/bgmi-name-generator/" class="px-3 py-1.5 rounded-lg hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
BGMI
</a> <a href="/clan-name-generator/" class="px-3 py-1.5 rounded-lg hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
Clans
</a> <a href="/trending/" class="px-3 py-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition flex items-center gap-1"> <span>🔥</span> Trending
</a> <a href="/favorites/" class="px-3 py-1.5 rounded-lg hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition">
Favorites
</a> </nav> <!-- Right Controls: Search + Theme Toggle + Admin Link --> <div class="flex items-center gap-2"> ${renderComponent($$result, "SiteSearch", SiteSearch, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/islands/SiteSearch", "client:component-export": "SiteSearch" })} ${renderComponent($$result, "ThemeToggle", ThemeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/islands/ThemeToggle", "client:component-export": "ThemeToggle" })} <a href="/admin/" class="hidden sm:inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-mono font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
Admin
</a> </div> </div> <!-- Mobile Quick Horizontal Bar --> <div class="md:hidden flex items-center gap-1 px-4 py-2 border-t border-neutral-200 dark:border-neutral-800/80 overflow-x-auto no-scrollbar text-xs font-medium tracking-wide bg-neutral-50 dark:bg-surface-dark"> <a href="/" class="px-2.5 py-1 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white whitespace-nowrap">Generator</a> <a href="/games/" class="px-2.5 py-1 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white whitespace-nowrap">Games</a> <a href="/free-fire-name-generator/" class="px-2.5 py-1 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white whitespace-nowrap">Free Fire</a> <a href="/bgmi-name-generator/" class="px-2.5 py-1 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white whitespace-nowrap">BGMI</a> <a href="/clan-name-generator/" class="px-2.5 py-1 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white whitespace-nowrap">Clans</a> <a href="/trending/" class="px-2.5 py-1 rounded-md text-amber-600 dark:text-amber-400 whitespace-nowrap">🔥 Trending</a> <a href="/favorites/" class="px-2.5 py-1 rounded-md text-neutral-600 dark:text-neutral-300 whitespace-nowrap">Favorites</a> </div> </header>`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-surface-dark py-10 transition-colors"> <div class="max-w-6xl mx-auto px-4 sm:px-6"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs"> <!-- Brand column --> <div class="md:col-span-1"> <a href="/" class="flex items-center gap-2 mb-2"> <div class="w-6 h-6 rounded-md bg-neutral-900 dark:bg-white flex items-center justify-center font-display font-bold text-xs text-white dark:text-neutral-900">
G
</div> <span class="font-display font-bold text-base text-neutral-900 dark:text-white">
GAMERTAG<span class="text-sky-500">PRO</span> </span> </a> <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
Instant Unicode gaming nickname generator for Free Fire, BGMI, Valorant, and esports clans.
</p> </div> <!-- Games Column --> <div> <h4 class="font-semibold text-neutral-900 dark:text-neutral-200 mb-2 uppercase tracking-wider text-[11px]">
Game Generators
</h4> <ul class="space-y-1.5 text-neutral-500 dark:text-neutral-400"> ${SEED_GAMES.slice(0, 6).map((game) => renderTemplate`<li> <a${addAttribute(`/${game.slug}-name-generator/`, "href")} class="hover:text-neutral-900 dark:hover:text-white transition flex items-center gap-1.5"> <span>${game.logo}</span> ${game.name} </a> </li>`)} </ul> </div> <!-- Styles Column --> <div> <h4 class="font-semibold text-neutral-900 dark:text-neutral-200 mb-2 uppercase tracking-wider text-[11px]">
Styles & Fonts
</h4> <ul class="space-y-1.5 text-neutral-500 dark:text-neutral-400"> <li><a href="/free-fire-names/stylish/" class="hover:text-neutral-900 dark:hover:text-white transition">Small Caps (ᴋᴀᴅɪʀ)</a></li> <li><a href="/free-fire-names/attitude/" class="hover:text-neutral-900 dark:hover:text-white transition">Boss Crowns (亗, ☬)</a></li> <li><a href="/clan-name-generator/" class="hover:text-neutral-900 dark:hover:text-white transition">Clan Brackets (『』, 【】)</a></li> <li><a href="/bgmi-name-generator/" class="hover:text-neutral-900 dark:hover:text-white transition">Japanese Katakana (メ, 々, 么)</a></li> <li><a href="/esports-name-generator/" class="hover:text-neutral-900 dark:hover:text-white transition">Gothic Fraktur (𝕶𝖆𝖉𝖎𝖗)</a></li> </ul> </div> <!-- Quick Links --> <div> <h4 class="font-semibold text-neutral-900 dark:text-neutral-200 mb-2 uppercase tracking-wider text-[11px]">
Platform
</h4> <ul class="space-y-1.5 text-neutral-500 dark:text-neutral-400"> <li><a href="/trending/" class="hover:text-amber-500 transition">Trending Leaderboards</a></li> <li><a href="/favorites/" class="hover:text-red-500 transition">Saved Favorites</a></li> <li><a href="/sitemap.xml" class="hover:text-neutral-900 dark:hover:text-white transition">XML Sitemap</a></li> <li><a href="/admin/" class="hover:text-neutral-900 dark:hover:text-white transition">Admin Panel</a></li> </ul> </div> </div> <div class="pt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400"> <div>
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} GamerTag Pro. 100% Client & Server Unicode Compliant.
</div> <div>
Free & Zero Watermarks
</div> </div> </div> </footer>`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const props = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> ${renderComponent($$result, "SeoHead", $$SeoHead, { ...props })}${maybeRenderHead()}<body class="bg-neutral-50 dark:bg-surface-darkMuted text-neutral-900 dark:text-neutral-100 min-h-screen flex flex-col antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors"> <!-- Subtle Dot Pattern --> <div class="fixed inset-0 pointer-events-none z-[-1] dot-grid opacity-60"></div> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
