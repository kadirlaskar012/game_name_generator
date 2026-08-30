import { e as createComponent, r as renderTemplate, g as addAttribute, n as renderHead, m as maybeRenderHead, h as createAstro } from '../../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import 'clsx';
import { g as getGameBySlug, a as getGames, c as getFaqs, e as getSeoPageBySlug } from '../../chunks/repository_CQmdAj9R.mjs';
/* empty css                                                    */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$gameNameGenerator = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$gameNameGenerator;
  const { game: gameSlug } = Astro2.params;
  const game = await getGameBySlug(gameSlug || "free-fire") || (await getGames())[0];
  const faqs = await getFaqs(game.id);
  const seoPage = await getSeoPageBySlug(`${game.slug}-name-generator`);
  const canonicalUrl = `https://gamertagpro.com/${game.slug}-name-generator/`;
  const pageTitle = `AMP: ${game.name} Name Rules & Nickname Ideas 2025`;
  return renderTemplate(_a || (_a = __template(['<html amp lang="en" data-astro-cid-mcxabfxp> <head><meta charset="utf-8"><title>', '</title><link rel="canonical"', '><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><script async src="https://cdn.ampproject.org/v0.js"><\/script>', "<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>", '</head> <body data-astro-cid-mcxabfxp> <div class="header" data-astro-cid-mcxabfxp> <a href="/" class="logo" data-astro-cid-mcxabfxp>\u26A1 GAMERTAG PRO (AMP)</a> <a', ' class="tag" data-astro-cid-mcxabfxp>Open Full Generator \u2192</a> </div> <h1 data-astro-cid-mcxabfxp>', ' Gaming Nickname Guide</h1> <p style="color: #9ca3af; font-size: 14px;" data-astro-cid-mcxabfxp>\nOfficial character limits, popular symbols, and rules for ', '.\n</p> <div class="box" data-astro-cid-mcxabfxp> <h2 style="font-size: 16px; margin-top: 0; color: #00f0ff;" data-astro-cid-mcxabfxp>Game Rules Summary</h2> <p data-astro-cid-mcxabfxp><strong data-astro-cid-mcxabfxp>Max Length:</strong> ', " Characters</p> <p data-astro-cid-mcxabfxp><strong data-astro-cid-mcxabfxp>Min Length:</strong> ", " Characters</p> <p data-astro-cid-mcxabfxp><strong data-astro-cid-mcxabfxp>Preferred Symbols:</strong> ", "</p> <a", ' class="cta-btn" data-astro-cid-mcxabfxp>Generate Interactive Names \u2192</a> </div> ', " ", " </body> </html>"])), pageTitle, addAttribute(canonicalUrl, "href"), maybeRenderHead(), renderHead(), addAttribute(canonicalUrl, "href"), game.name, game.name, game.rules?.maxLength || 14, game.rules?.minLength || 3, game.rules?.preferredSymbols?.join(" ") || "\u4E97 \u30E1 \u3005 \u4E48", addAttribute(canonicalUrl, "href"), seoPage?.content && renderTemplate`<div class="box" data-astro-cid-mcxabfxp> <div style="font-size: 14px; color: #d1d5db;" data-astro-cid-mcxabfxp> ${seoPage.content} </div> </div>`, faqs.length > 0 && renderTemplate`<div class="box" data-astro-cid-mcxabfxp> <h2 style="font-size: 16px; margin-top: 0; color: #00f0ff;" data-astro-cid-mcxabfxp>Frequently Asked Questions</h2> ${faqs.map((faq) => renderTemplate`<div class="faq-item" data-astro-cid-mcxabfxp> <div class="faq-q" data-astro-cid-mcxabfxp>${faq.question}</div> <div class="faq-a" data-astro-cid-mcxabfxp>${faq.answer}</div> </div>`)} </div>`);
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/amp/[game]-name-generator.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/amp/[game]-name-generator.astro";
const $$url = "/amp/[game]-name-generator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$gameNameGenerator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
