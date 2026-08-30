import { a as getGames, b as getStyles, G as getSeoPages } from '../chunks/repository_CQmdAj9R.mjs';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const [games, styles, seoPages] = await Promise.all([
    getGames(),
    getStyles(),
    getSeoPages()
  ]);
  const baseUrl = "https://gamertagpro.com";
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const staticUrls = [
    { loc: `${baseUrl}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${baseUrl}/games/`, priority: "0.9", changefreq: "weekly" },
    { loc: `${baseUrl}/trending/`, priority: "0.9", changefreq: "hourly" },
    { loc: `${baseUrl}/clan-name-generator/`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/esports-name-generator/`, priority: "0.8", changefreq: "weekly" }
  ];
  const gameUrls = games.map((g) => ({
    loc: `${baseUrl}/${g.slug}-name-generator/`,
    priority: "0.9",
    changefreq: "daily"
  }));
  const gameStyleUrls = [];
  for (const game of games.slice(0, 4)) {
    for (const style of styles.slice(0, 4)) {
      gameStyleUrls.push({
        loc: `${baseUrl}/${game.slug}-names/${style.slug}/`,
        priority: "0.7",
        changefreq: "weekly"
      });
    }
  }
  const seoUrls = seoPages.map((p) => ({
    loc: `${baseUrl}/${p.slug}/`,
    priority: "0.8",
    changefreq: "weekly"
  }));
  const allUrls = [...staticUrls, ...gameUrls, ...gameStyleUrls, ...seoUrls];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  ).join("\n")}
</urlset>`;
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
