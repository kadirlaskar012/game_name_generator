import { e as createComponent, r as renderTemplate, n as renderHead, u as unescapeHTML, g as addAttribute, h as createAstro } from './astro/server_BsBWdKrh.mjs';
import 'piccolore';
import 'clsx';
import { forwardRef, createElement } from 'react';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const $$SeoHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SeoHead;
  const {
    title,
    description,
    canonical = Astro2.url.href,
    ogImage = "/images/og/default.jpg",
    ogType = "website",
    robots = "index, follow",
    schemaJson
  } = Astro2.props;
  const siteName = "GamerTag Pro";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  return renderTemplate(_b || (_b = __template(['<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Primary Meta Tags --><title>', '</title><meta name="title"', '><meta name="description"', '><meta name="robots"', '><link rel="canonical"', '><!-- Google Fonts: Inter & Rajdhani --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet"><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- PWA & Mobile Icons --><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#0ea5e9"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- JSON-LD Structured Data -->', "<!-- Bulletproof Zero-FOUC Theme Script --><script>\n    (function () {\n      try {\n        const storedTheme = localStorage.getItem('theme');\n        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n        const theme = storedTheme ? storedTheme : (prefersDark ? 'dark' : 'dark');\n        \n        if (theme === 'light') {\n          document.documentElement.classList.add('light');\n          document.documentElement.classList.remove('dark');\n        } else {\n          document.documentElement.classList.add('dark');\n          document.documentElement.classList.remove('light');\n        }\n      } catch (e) {\n        document.documentElement.classList.add('dark');\n      }\n    })();\n  <\/script>", "</head>"])), fullTitle, addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(robots, "content"), addAttribute(canonical, "href"), addAttribute(ogType, "content"), addAttribute(canonical, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(siteName, "content"), addAttribute(canonical, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), schemaJson && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(Array.isArray(schemaJson) ? schemaJson : [schemaJson]))), renderHead());
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/components/SeoHead.astro", void 0);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

export { $$SeoHead as $, createLucideIcon as c };
