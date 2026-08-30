import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { I as Image, C as Copy, a as CanvasCardGenerator } from './CanvasCardGenerator_DIeN-9O7.mjs';
import { c as createLucideIcon } from './createLucideIcon_BXIrLuf3.mjs';
import { C as Check } from './check_BKkbHLpp.mjs';

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("Trophy", __iconNode);

const TrendingSection = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [copiedName, setCopiedName] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/trending?limit=15").then((res) => res.json()).then((data) => {
      if (data.success) {
        setTrendingList(data.data || []);
      }
    }).catch(() => {
    }).finally(() => setLoading(false));
  }, []);
  const handleCopy = async (name) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2e3);
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, action: "copy" })
      }).catch(() => {
      });
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-20 bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 rounded-xl animate-pulse" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: trendingList.map((item, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl p-3 flex items-center justify-between transition shadow-sm hover:shadow-md",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 overflow-hidden pr-2", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-mono shrink-0 ${index === 0 ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300" : index === 1 ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200" : index === 2 ? "bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300" : "bg-neutral-100 dark:bg-neutral-900 text-neutral-500"}`,
                children: index < 3 ? /* @__PURE__ */ jsx(Trophy, { className: "w-3.5 h-3.5" }) : `#${index + 1}`
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "truncate", children: [
              /* @__PURE__ */ jsx("div", { className: "text-base font-bold text-neutral-900 dark:text-white font-gaming truncate select-all", children: item.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-neutral-400 font-mono", children: [
                item.copyCount,
                " copies • ",
                item.favoriteCount,
                " likes"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedCard(item.name),
                title: "Card Banner",
                className: "p-1.5 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 rounded-lg transition",
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
            )
          ] })
        ]
      },
      item.id || index
    )) }),
    selectedCard && /* @__PURE__ */ jsx(
      CanvasCardGenerator,
      {
        name: selectedCard,
        gameName: "Trending Gamer",
        styleName: "Leaderboard Top Pick",
        onClose: () => setSelectedCard(null)
      }
    )
  ] });
};

export { TrendingSection as T };
