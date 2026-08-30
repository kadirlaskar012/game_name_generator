import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Dy4iOOvW.mjs';
import { manifest } from './manifest_D9YU9FJA.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/500.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/admin.astro.mjs');
const _page5 = () => import('./pages/amp/_game_-name-generator.astro.mjs');
const _page6 = () => import('./pages/api/admin/auth.astro.mjs');
const _page7 = () => import('./pages/api/admin/faqs.astro.mjs');
const _page8 = () => import('./pages/api/admin/games.astro.mjs');
const _page9 = () => import('./pages/api/admin/seo.astro.mjs');
const _page10 = () => import('./pages/api/admin/settings.astro.mjs');
const _page11 = () => import('./pages/api/admin/styles.astro.mjs');
const _page12 = () => import('./pages/api/admin/symbols.astro.mjs');
const _page13 = () => import('./pages/api/favorites.astro.mjs');
const _page14 = () => import('./pages/api/generate.astro.mjs');
const _page15 = () => import('./pages/api/search.astro.mjs');
const _page16 = () => import('./pages/api/track.astro.mjs');
const _page17 = () => import('./pages/api/trending.astro.mjs');
const _page18 = () => import('./pages/clan-name-generator.astro.mjs');
const _page19 = () => import('./pages/esports-name-generator.astro.mjs');
const _page20 = () => import('./pages/favorites.astro.mjs');
const _page21 = () => import('./pages/games.astro.mjs');
const _page22 = () => import('./pages/robots.txt.astro.mjs');
const _page23 = () => import('./pages/search.astro.mjs');
const _page24 = () => import('./pages/sitemap.xml.astro.mjs');
const _page25 = () => import('./pages/trending.astro.mjs');
const _page26 = () => import('./pages/_game_-names/_style_.astro.mjs');
const _page27 = () => import('./pages/_game_-name-generator.astro.mjs');
const _page28 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/500.astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/admin/index.astro", _page4],
    ["src/pages/amp/[game]-name-generator.astro", _page5],
    ["src/pages/api/admin/auth.ts", _page6],
    ["src/pages/api/admin/faqs.ts", _page7],
    ["src/pages/api/admin/games.ts", _page8],
    ["src/pages/api/admin/seo.ts", _page9],
    ["src/pages/api/admin/settings.ts", _page10],
    ["src/pages/api/admin/styles.ts", _page11],
    ["src/pages/api/admin/symbols.ts", _page12],
    ["src/pages/api/favorites.ts", _page13],
    ["src/pages/api/generate.ts", _page14],
    ["src/pages/api/search.ts", _page15],
    ["src/pages/api/track.ts", _page16],
    ["src/pages/api/trending.ts", _page17],
    ["src/pages/clan-name-generator.astro", _page18],
    ["src/pages/esports-name-generator.astro", _page19],
    ["src/pages/favorites.astro", _page20],
    ["src/pages/games/index.astro", _page21],
    ["src/pages/robots.txt.ts", _page22],
    ["src/pages/search.astro", _page23],
    ["src/pages/sitemap.xml.ts", _page24],
    ["src/pages/trending.astro", _page25],
    ["src/pages/[game]-names/[style].astro", _page26],
    ["src/pages/[game]-name-generator/index.astro", _page27],
    ["src/pages/index.astro", _page28]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "33eb6a1f-9823-4115-891d-20048390ae17",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
