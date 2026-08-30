import { c as createLucideIcon } from './createLucideIcon_BXIrLuf3.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';
import { X } from './x_CEN4oiZd.mjs';
import { C as Check } from './check_BKkbHLpp.mjs';

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$2 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("Copy", __iconNode$2);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$1 = [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
];
const Download = createLucideIcon("Download", __iconNode$1);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("Image", __iconNode);

const CanvasCardGenerator = ({
  name,
  gameName = "Esports Gaming",
  styleName = "Pro Tag",
  onClose
}) => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState("obsidian");
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;
    if (theme === "cyber") {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#0a0d14");
      grad.addColorStop(0.5, "#0e1626");
      grad.addColorStop(1, "#080a10");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "obsidian") {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#000000");
      grad.addColorStop(1, "#111318");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "cleanLight") {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#f8fafc");
      grad.addColorStop(1, "#e2e8f0");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#1c0f18");
      grad.addColorStop(1, "#090a10");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.strokeStyle = theme === "cleanLight" ? "rgba(0,0,0,0.1)" : "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);
    ctx.font = "600 24px Inter, sans-serif";
    ctx.fillStyle = theme === "cleanLight" ? "#64748b" : "#94a3b8";
    ctx.textAlign = "center";
    ctx.fillText(`${gameName.toUpperCase()} • ${styleName.toUpperCase()}`, width / 2, 180);
    ctx.font = "bold 72px Rajdhani, Inter, sans-serif";
    ctx.fillStyle = theme === "cleanLight" ? "#0f172a" : "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, width / 2, height / 2 + 10);
    ctx.font = "500 20px Inter, sans-serif";
    ctx.fillStyle = theme === "cleanLight" ? "#94a3b8" : "#64748b";
    ctx.fillText("GAMERTAG PRO • VERIFIED IGN", width / 2, height - 120);
  };
  useEffect(() => {
    drawCard();
  }, [name, gameName, styleName, theme]);
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);
    const link = document.createElement("a");
    link.download = `${name.replace(/[^a-zA-Z0-9]/g, "_")}_banner.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2e3);
    }, 500);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-neutral-900 dark:text-white font-gaming", children: "Gamer Tag Banner (1200x630)" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800",
          children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative w-full aspect-[1200/630] bg-neutral-950 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex items-center justify-center", children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "w-full h-full object-contain" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "text-neutral-400 mr-1", children: "Theme:" }),
        [
          { id: "obsidian", label: "Obsidian" },
          { id: "cyber", label: "Navy" },
          { id: "cleanLight", label: "Light" },
          { id: "sunset", label: "Ruby" }
        ].map((t) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setTheme(t.id),
            className: `px-2.5 py-1 rounded-lg text-xs font-medium transition ${theme === t.id ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"}`,
            children: t.label
          },
          t.id
        ))
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleDownload,
          disabled: downloading,
          className: "px-4 py-2 bg-neutral-900 dark:bg-white hover:opacity-90 text-white dark:text-neutral-900 font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer",
          children: [
            downloaded ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" }),
            downloaded ? "Downloaded" : "Download PNG"
          ]
        }
      ) })
    ] })
  ] }) });
};

export { Copy as C, Download as D, Image as I, CanvasCardGenerator as a };
