import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Cy9QhUQ_.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_D7-QhZvd.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { C as Copy, D as Download, I as Image, a as CanvasCardGenerator } from '../chunks/CanvasCardGenerator_DIeN-9O7.mjs';
import { H as Heart } from '../chunks/heart_DzqRNVNV.mjs';
import { C as Check } from '../chunks/check_BKkbHLpp.mjs';
import { T as Trash2 } from '../chunks/trash-2_DHX_S6U5.mjs';
import { a as generateBreadcrumbSchema } from '../chunks/schema_OK0uhK4x.mjs';
export { renderers } from '../renderers.mjs';

const FavoritesManager = () => {
  const [favorites, setFavorites] = useState([]);
  const [copiedName, setCopiedName] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("gtp_favorites") || "[]");
      setFavorites(stored);
    } catch {
    }
  }, []);
  const handleRemove = (nameToRemove) => {
    const updated = favorites.filter((f) => f.name !== nameToRemove);
    setFavorites(updated);
    try {
      localStorage.setItem("gtp_favorites", JSON.stringify(updated));
    } catch {
    }
    fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameToRemove })
    }).catch(() => {
    });
  };
  const handleClearAll = () => {
    if (!confirm("Are you sure you want to remove all saved favorites?")) return;
    setFavorites([]);
    try {
      localStorage.removeItem("gtp_favorites");
    } catch {
    }
  };
  const handleCopy = async (name) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2e3);
    } catch {
    }
  };
  const handleCopyAll = async () => {
    if (favorites.length === 0) return;
    const text = favorites.map((f) => f.name).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2e3);
    } catch {
    }
  };
  const handleExportTxt = () => {
    if (favorites.length === 0) return;
    const text = favorites.map((f) => `${f.name} (${f.gameName || "General"})`).join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gamertag_favorites_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    favorites.length > 0 ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5 text-red-500 fill-red-500" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-neutral-900 dark:text-white font-gaming", children: [
            favorites.length,
            " Saved Nicknames"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleCopyAll,
              className: "px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition",
              children: [
                copiedAll ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
                "Copy All"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleExportTxt,
              className: "px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" }),
                "Export TXT"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleClearAll,
              className: "px-3 py-1.5 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                "Clear"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: favorites.map((item, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl p-3.5 flex items-center justify-between transition shadow-sm hover:shadow-md",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "truncate pr-2", children: [
              /* @__PURE__ */ jsx("div", { className: "text-base font-bold text-neutral-900 dark:text-white font-gaming truncate select-all", children: item.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-neutral-400", children: [
                item.gameName || "Gamer",
                " • ",
                item.styleName || "Custom"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedCard(item.name),
                  title: "Download Banner",
                  className: "p-1.5 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg transition",
                  children: /* @__PURE__ */ jsx(Image, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleCopy(item.name),
                  className: `py-1 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${copiedName === item.name ? "bg-emerald-600 text-white" : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90"}`,
                  children: [
                    copiedName === item.name ? /* @__PURE__ */ jsx(Check, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }),
                    copiedName === item.name ? "Done" : "Copy"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleRemove(item.name),
                  title: "Remove",
                  className: "p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ]
        },
        index
      )) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-20 bg-white dark:bg-surface-dark border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-8", children: [
      /* @__PURE__ */ jsx(Heart, { className: "w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" }),
      /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-neutral-900 dark:text-white mb-1", children: "No Favorites Saved Yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto", children: "Click the heart icon on any generated nickname to save it to your collection." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs rounded-xl shadow-sm hover:opacity-90 transition",
          children: "Start Generating Names"
        }
      )
    ] }),
    selectedCard && /* @__PURE__ */ jsx(
      CanvasCardGenerator,
      {
        name: selectedCard,
        gameName: "Saved Favorite",
        styleName: "My Tag",
        onClose: () => setSelectedCard(null)
      }
    )
  ] });
};

const $$Favorites = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "My Favorites", url: "/favorites/" }
  ];
  const schema = [
    generateBreadcrumbSchema(breadcrumbs)
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Saved Favorite Gaming Names & Nicknames", "description": "Manage, export, and copy your favorite saved gaming names and nicknames for Free Fire, BGMI, and Valorant.", "schemaJson": schema }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": breadcrumbs })} ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-gaming mb-2">
Saved Gamer Tags
</h1> <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
Your personal collection of saved nicknames, synced to your device and database.
</p> </div> <section class="mb-12"> ${renderComponent($$result2, "FavoritesManager", FavoritesManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/islands/FavoritesManager", "client:component-export": "FavoritesManager" })} </section> ` })}`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/favorites.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/favorites.astro";
const $$url = "/favorites";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Favorites,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
