import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { memo, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { C as Copy, I as Image, a as CanvasCardGenerator } from './CanvasCardGenerator_DIeN-9O7.mjs';
import { C as Check } from './check_BKkbHLpp.mjs';
import { H as Heart } from './heart_DzqRNVNV.mjs';
import { c as createLucideIcon } from './createLucideIcon_BXIrLuf3.mjs';
import { X } from './x_CEN4oiZd.mjs';
import { R as RefreshCw } from './refresh-cw_CFEUS7d-.mjs';

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$3 = [
  ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2", key: "6agr2n" }],
  [
    "path",
    { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6", key: "1o487t" }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 14h.01", key: "ssrbsk" }],
  ["path", { d: "M15 6h.01", key: "cblpky" }],
  ["path", { d: "M18 9h.01", key: "2061c0" }]
];
const Dices = createLucideIcon("Dices", __iconNode$3);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("Layers", __iconNode$2);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("Share2", __iconNode$1);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("SlidersHorizontal", __iconNode);

const ResultCardComponent = ({
  name,
  gameName,
  styleName,
  validation,
  isFavorited = false,
  onToggleFavorite
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [favorited, setFavorited] = useState(isFavorited);
  const [showCardModal, setShowCardModal] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, action: "copy" })
      }).catch(() => {
      });
    } catch {
    }
  };
  const handleFavorite = () => {
    const nextFav = !favorited;
    setFavorited(nextFav);
    if (onToggleFavorite) {
      onToggleFavorite(name, nextFav);
    }
    try {
      const stored = JSON.parse(localStorage.getItem("gtp_favorites") || "[]");
      let updated;
      if (nextFav) {
        updated = [...stored, { name, gameName, styleName, createdAt: /* @__PURE__ */ new Date() }];
      } else {
        updated = stored.filter((item) => item.name !== name);
      }
      localStorage.setItem("gtp_favorites", JSON.stringify(updated));
    } catch {
    }
    fetch("/api/favorites", {
      method: nextFav ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, gameName, styleName })
    }).catch(() => {
    });
  };
  const handleShare = async () => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, action: "share" })
    }).catch(() => {
    });
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Gamer Tag: ${name}`,
          text: `Check out my gaming nickname "${name}" on GamerTag Pro!`,
          url: window.location.href
        });
        return;
      } catch {
      }
    }
    try {
      await navigator.clipboard.writeText(`${name}`);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between shadow-sm transition-colors duration-150", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate", children: styleName }),
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: `text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${validation.isValid ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40" : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40"}`,
            children: [
              validation.length,
              "/",
              validation.maxLength,
              " ",
              validation.isValid ? "✓" : "⚠️"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          onClick: handleCopy,
          title: "Click to copy name",
          className: "my-2 py-3 px-2 bg-neutral-50 dark:bg-[#0b0e14] rounded-lg text-center cursor-pointer select-all hover:bg-neutral-100 dark:hover:bg-[#151b27] transition-colors",
          children: /* @__PURE__ */ jsx("span", { className: "text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 dark:text-white font-gaming tracking-wide break-all select-all", children: name })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-1.5 mt-2 pt-2 border-t border-neutral-100 dark:border-[#1c2333]", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleCopy,
            className: `flex-1 min-h-[38px] py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 ${copied ? "bg-emerald-600 text-white" : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90"}`,
            children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }),
              " Copied"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
              " Copy"
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleFavorite,
            title: favorited ? "Remove favorite" : "Save favorite",
            className: `w-9 h-9 flex items-center justify-center rounded-lg border transition-colors cursor-pointer active:scale-95 ${favorited ? "border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-red-500" : "border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#151b27]"}`,
            children: /* @__PURE__ */ jsx(Heart, { className: `w-3.5 h-3.5 ${favorited ? "fill-red-500 text-red-500" : ""}` })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowCardModal(true),
            title: "Download Card Banner",
            className: "w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#151b27] transition-colors cursor-pointer active:scale-95",
            children: /* @__PURE__ */ jsx(Image, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleShare,
            title: "Share",
            className: "w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#151b27] transition-colors cursor-pointer active:scale-95",
            children: shared ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ jsx(Share2, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] }),
    showCardModal && /* @__PURE__ */ jsx(
      CanvasCardGenerator,
      {
        name,
        gameName,
        styleName,
        onClose: () => setShowCardModal(false)
      }
    )
  ] });
};
const ResultCard = memo(ResultCardComponent);

const SAMPLE_NAMES = ["Kadir", "Ghost", "Shadow", "Viper", "Titan", "Reaper", "Blade", "Storm", "Phoenix", "Hunter", "Samurai", "Valkyrie", "Rogue", "Raven", "Wolf", "Apex"];
const GeneratorApp = ({
  initialGames = [],
  initialStyles = [],
  defaultGameSlug,
  defaultStyleSlug,
  defaultName = ""
}) => {
  const [name, setName] = useState(defaultName);
  const [selectedGameSlug, setSelectedGameSlug] = useState(defaultGameSlug || (initialGames[0]?.slug || "free-fire"));
  const [selectedStyleSlug, setSelectedStyleSlug] = useState(defaultStyleSlug || "all");
  const [gender, setGender] = useState("all");
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [lengthCategory, setLengthCategory] = useState("all");
  const [count, setCount] = useState(24);
  const [pageOffset, setPageOffset] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [favoritedNames, setFavoritedNames] = useState(/* @__PURE__ */ new Set());
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("gtp_favorites") || "[]");
      setFavoritedNames(new Set(stored.map((item) => item.name)));
    } catch {
    }
  }, []);
  const selectedGame = useMemo(() => {
    return initialGames.find((g) => g.slug === selectedGameSlug) || initialGames[0];
  }, [initialGames, selectedGameSlug]);
  const executeGenerate = useCallback(
    async (params = {}) => {
      const isAppend = params.append === true;
      if (isAppend) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const targetName = params.nameVal !== void 0 ? params.nameVal : name;
      const targetStyle = params.styleVal !== void 0 ? params.styleVal : selectedStyleSlug;
      const targetGame = params.gameVal !== void 0 ? params.gameVal : selectedGameSlug;
      const targetGender = params.genderVal !== void 0 ? params.genderVal : gender;
      const targetSymbols = params.symbolsVal !== void 0 ? params.symbolsVal : includeSymbols;
      const targetLength = params.lengthVal !== void 0 ? params.lengthVal : lengthCategory;
      const targetCount = params.countVal !== void 0 ? params.countVal : count;
      const targetOffset = params.offsetVal !== void 0 ? params.offsetVal : isAppend ? pageOffset + targetCount : 0;
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: targetName.trim(),
            gameSlug: targetGame,
            styleSlug: targetStyle === "all" ? void 0 : targetStyle,
            gender: targetGender,
            symbols: targetSymbols,
            length: targetLength,
            count: targetCount,
            offset: targetOffset
          })
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to generate names");
        }
        if (isAppend) {
          setResults((prev) => [...prev, ...data.data || []]);
          setPageOffset(targetOffset);
        } else {
          setResults(data.data || []);
          setPageOffset(0);
        }
      } catch (err) {
        setError(err?.message || "Error generating names");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [name, selectedGameSlug, selectedStyleSlug, gender, includeSymbols, lengthCategory, count, pageOffset]
  );
  useEffect(() => {
    executeGenerate();
  }, []);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      executeGenerate({ nameVal: name, offsetVal: 0 });
    }, 150);
    return () => clearTimeout(timer);
  }, [name]);
  const handleStyleClick = (styleSlug) => {
    setSelectedStyleSlug(styleSlug);
    executeGenerate({ styleVal: styleSlug, offsetVal: 0 });
  };
  const handleGameChange = (newGameSlug) => {
    setSelectedGameSlug(newGameSlug);
    executeGenerate({ gameVal: newGameSlug, offsetVal: 0 });
  };
  const handleGenderChange = (newGender) => {
    setGender(newGender);
    executeGenerate({ genderVal: newGender, offsetVal: 0 });
  };
  const handleSymbolsToggle = () => {
    const next = !includeSymbols;
    setIncludeSymbols(next);
    executeGenerate({ symbolsVal: next, offsetVal: 0 });
  };
  const handleRandomDice = () => {
    const random = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
    setName(random);
    executeGenerate({ nameVal: random, offsetVal: 0 });
  };
  const handleLoadMore = () => {
    executeGenerate({ append: true });
  };
  const handleCopyAll = async () => {
    if (results.length === 0) return;
    const text = results.map((r) => r.name).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1800);
    } catch {
    }
  };
  const filteredResults = useMemo(() => {
    if (!searchFilter.trim()) return results;
    const q = searchFilter.toLowerCase();
    return results.filter((r) => r.name.toLowerCase().includes(q) || r.styleName?.toLowerCase().includes(q));
  }, [results, searchFilter]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-2xl p-3.5 sm:p-5 shadow-sm mb-6 sm:mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 relative flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Type nickname (e.g. Kadir, Ghost, Shadow...)",
              maxLength: 25,
              autoCapitalize: "none",
              autoCorrect: "off",
              spellCheck: "false",
              className: "w-full pl-3.5 pr-20 py-2.5 sm:py-3 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] focus:border-sky-500 dark:focus:border-sky-500 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 text-sm sm:text-base outline-none transition-colors"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute right-2 flex items-center gap-1", children: [
            name && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setName(""),
                title: "Clear",
                className: "p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg transition-colors cursor-pointer",
                children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleRandomDice,
                title: "Random Name Idea",
                className: "p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-200/60 dark:hover:bg-[#1c2333] transition-colors cursor-pointer",
                children: /* @__PURE__ */ jsx(Dices, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-4", children: /* @__PURE__ */ jsx(
          "select",
          {
            value: selectedGameSlug,
            onChange: (e) => handleGameChange(e.target.value),
            className: "w-full px-3.5 py-2.5 sm:py-3 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] focus:border-sky-500 dark:focus:border-sky-500 rounded-xl text-neutral-900 dark:text-white text-xs sm:text-sm outline-none transition-colors cursor-pointer",
            children: initialGames.map((game) => /* @__PURE__ */ jsxs("option", { value: game.slug, children: [
              game.logo,
              " ",
              game.name,
              " (",
              game.rules?.maxLength || 14,
              " Chars Max)"
            ] }, game.id))
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2 flex", children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => executeGenerate({ offsetVal: 0 }),
            disabled: loading,
            className: "w-full py-2.5 sm:py-3 px-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm active:scale-95",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: `w-4 h-4 ${loading ? "animate-spin" : ""}` }),
              /* @__PURE__ */ jsx("span", { children: loading ? "Generating..." : "Generate" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3.5 pt-3.5 border-t border-neutral-100 dark:border-[#1c2333]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-neutral-400 dark:text-neutral-500 font-medium text-[10px] sm:text-[11px] uppercase tracking-wider", children: [
            "Styles & Fonts (",
            initialStyles.length + 1,
            "):"
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowAdvanced(!showAdvanced),
              className: "flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-xs font-medium cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(SlidersHorizontal, { className: "w-3.5 h-3.5" }),
                showAdvanced ? "Fewer Filters" : "More Filters"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1.5 max-w-full no-scrollbar smooth-scroll", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleStyleClick("all"),
              className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${selectedStyleSlug === "all" ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-sm" : "bg-neutral-100 dark:bg-[#151b27] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#1c2333]"}`,
              children: "✨ All Styles"
            }
          ),
          initialStyles.map((style) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleStyleClick(style.slug),
              className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 whitespace-nowrap cursor-pointer ${selectedStyleSlug === style.slug ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-sm" : "bg-neutral-100 dark:bg-[#151b27] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#1c2333]"}`,
              children: style.name
            },
            style.id
          ))
        ] })
      ] }),
      showAdvanced && /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-3 border-t border-neutral-100 dark:border-[#1c2333] grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs animate-fadeInFast", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase", children: "Category" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: gender,
              onChange: (e) => handleGenderChange(e.target.value),
              className: "px-2.5 py-2 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] rounded-lg text-neutral-800 dark:text-neutral-200 text-xs outline-none cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "All Genders & Squads" }),
                /* @__PURE__ */ jsx("option", { value: "boy", children: "Boys / Kings" }),
                /* @__PURE__ */ jsx("option", { value: "girl", children: "Girls / Queens" }),
                /* @__PURE__ */ jsx("option", { value: "clan", children: "Clan / Squad" }),
                /* @__PURE__ */ jsx("option", { value: "esports", children: "Esports Pro" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase", children: "Length" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: lengthCategory,
              onChange: (e) => {
                setLengthCategory(e.target.value);
                executeGenerate({ lengthVal: e.target.value, offsetVal: 0 });
              },
              className: "px-2.5 py-2 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] rounded-lg text-neutral-800 dark:text-neutral-200 text-xs outline-none cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "Any Length" }),
                /* @__PURE__ */ jsx("option", { value: "short", children: "Short (≤ 8 chars)" }),
                /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium (8 - 12 chars)" }),
                /* @__PURE__ */ jsx("option", { value: "long", children: "Long (12+ chars)" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase", children: "Batch Size" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: count,
              onChange: (e) => {
                const val = Number(e.target.value);
                setCount(val);
                executeGenerate({ countVal: val, offsetVal: 0 });
              },
              className: "px-2.5 py-2 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] rounded-lg text-neutral-800 dark:text-neutral-200 text-xs outline-none cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("option", { value: 24, children: "24 Names" }),
                /* @__PURE__ */ jsx("option", { value: 36, children: "36 Names" }),
                /* @__PURE__ */ jsx("option", { value: 48, children: "48 Names" }),
                /* @__PURE__ */ jsx("option", { value: 60, children: "60 Names" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase", children: "Special Symbols" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleSymbolsToggle,
              className: `py-2 px-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${includeSymbols ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : "border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#151b27] text-neutral-500"}`,
              children: includeSymbols ? "✓ Symbols (亗, ꧁꧂)" : "Letters Only"
            }
          )
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "p-3 mb-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("span", { children: error }),
      /* @__PURE__ */ jsx("button", { onClick: () => setError(null), className: "text-red-500 hover:text-red-700", children: "✕" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-sm sm:text-lg font-bold text-neutral-900 dark:text-white font-gaming", children: [
          "Generated Names (",
          filteredResults.length,
          ")"
        ] }),
        selectedGame && /* @__PURE__ */ jsxs("span", { className: "text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400", children: [
          "for ",
          selectedGame.name,
          " (max ",
          selectedGame.rules?.maxLength || 14,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Filter list...",
            value: searchFilter,
            onChange: (e) => setSearchFilter(e.target.value),
            className: "px-2.5 py-1.5 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-lg text-neutral-900 dark:text-white text-xs outline-none focus:border-sky-500 w-32 sm:w-44"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleCopyAll,
            className: "px-2.5 sm:px-3 py-1.5 bg-neutral-100 dark:bg-[#151b27] hover:bg-neutral-200 dark:hover:bg-[#1c2333] border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer",
            children: copiedAll ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }),
              " Copied"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
              " Copy All"
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => executeGenerate({ offsetVal: 0 }),
            disabled: loading,
            title: "Refresh Batch",
            className: "p-1.5 bg-neutral-100 dark:bg-[#151b27] border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-[#1c2333] transition-colors cursor-pointer",
            children: /* @__PURE__ */ jsx(RefreshCw, { className: `w-4 h-4 ${loading ? "animate-spin" : ""}` })
          }
        )
      ] })
    ] }),
    loading && results.length === 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 py-4", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-28 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl animate-pulse"
      },
      i
    )) }) : filteredResults.length > 0 ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5", children: filteredResults.map((item) => /* @__PURE__ */ jsx(
        ResultCard,
        {
          id: item.id,
          name: item.name,
          plainName: item.plainName,
          gameName: item.gameName,
          styleName: item.styleName,
          validation: item.validation,
          isFavorited: favoritedNames.has(item.name),
          onToggleFavorite: (name2, isFav) => {
            const next = new Set(favoritedNames);
            if (isFav) next.add(name2);
            else next.delete(name2);
            setFavoritedNames(next);
          }
        },
        item.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleLoadMore,
          disabled: loadingMore,
          className: "inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#111620] hover:bg-neutral-100 dark:hover:bg-[#151b27] border border-neutral-200 dark:border-[#1c2333] text-neutral-900 dark:text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-95",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: `w-4 h-4 ${loadingMore ? "animate-spin" : ""}` }),
            /* @__PURE__ */ jsx("span", { children: loadingMore ? "Generating 24 More Names..." : "✨ Load 24 More Names (Infinite)" })
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-16 bg-white dark:bg-[#111620] border border-dashed border-neutral-200 dark:border-[#1c2333] rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx(Layers, { className: "w-10 h-10 text-neutral-400 mx-auto mb-2" }),
      /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-neutral-900 dark:text-white mb-1", children: "No Matching Names" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 mb-4 max-w-sm mx-auto", children: "Try adjusting your search filter or clicking a different style above." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setSearchFilter("");
            setSelectedStyleSlug("all");
            executeGenerate({ styleVal: "all", offsetVal: 0 });
          },
          className: "px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs rounded-lg transition-colors cursor-pointer",
          children: "Reset Filters"
        }
      )
    ] })
  ] });
};

export { GeneratorApp as G };
