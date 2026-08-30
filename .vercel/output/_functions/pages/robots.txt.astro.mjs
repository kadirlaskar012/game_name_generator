export { renderers } from '../renderers.mjs';

const GET = async () => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

Sitemap: https://gamertagpro.com/sitemap.xml
`;
  return new Response(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, s-maxage=86400"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
