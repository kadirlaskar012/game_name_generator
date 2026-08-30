async function testLiveEndpoints() {
  const baseUrl = 'http://localhost:4321';
  console.log('🚀 Running Live Server Verification on', baseUrl);

  const checks: { name: string; url: string; method?: string; body?: any; headers?: any; expectStatus: number; checkBody?: (data: any) => boolean }[] = [
    {
      name: 'Homepage SSR',
      url: `${baseUrl}/`,
      expectStatus: 200,
      checkBody: (text) => text.includes('GAMERTAG') && text.includes('Gaming Name Generator'),
    },
    {
      name: 'Games Directory',
      url: `${baseUrl}/games/`,
      expectStatus: 200,
      checkBody: (text) => text.includes('Free Fire') && text.includes('BGMI'),
    },
    {
      name: 'Free Fire Name Generator Page',
      url: `${baseUrl}/free-fire-name-generator/`,
      expectStatus: 200,
      checkBody: (text) => text.includes('Free Fire') && text.includes('Max'),
    },
    {
      name: 'AMP Game Content Route',
      url: `${baseUrl}/amp/free-fire-name-generator/`,
      expectStatus: 200,
      checkBody: (text) => text.includes('amp') && text.includes('Free Fire'),
    },
    {
      name: 'Dynamic XML Sitemap',
      url: `${baseUrl}/sitemap.xml`,
      expectStatus: 200,
      checkBody: (text) => text.includes('<urlset') && text.includes('free-fire-name-generator'),
    },
    {
      name: 'Dynamic Robots.txt',
      url: `${baseUrl}/robots.txt`,
      expectStatus: 200,
      checkBody: (text) => text.includes('User-agent:') && text.includes('Disallow: /admin/'),
    },
    {
      name: 'POST /api/generate API',
      url: `${baseUrl}/api/generate`,
      method: 'POST',
      body: { name: 'Kadir', gameSlug: 'free-fire', count: 5 },
      expectStatus: 200,
      checkBody: (data) => data.success === true && data.data.length === 5 && data.data[0].validation.isValid !== undefined,
    },
    {
      name: 'GET /api/search API',
      url: `${baseUrl}/api/search?q=valorant`,
      expectStatus: 200,
      checkBody: (data) => data.success === true && data.data.games.length > 0,
    },
    {
      name: 'GET /api/trending API',
      url: `${baseUrl}/api/trending`,
      expectStatus: 200,
      checkBody: (data) => data.success === true && data.data.length > 0,
    },
    {
      name: 'POST /api/admin/auth (Master login)',
      url: `${baseUrl}/api/admin/auth`,
      method: 'POST',
      body: { email: 'admin@gamertagpro.com', password: 'admin123' },
      expectStatus: 200,
      checkBody: (data) => data.success === true && data.token.length > 0,
    },
  ];

  let passed = 0;
  for (const check of checks) {
    try {
      const options: RequestInit = {
        method: check.method || 'GET',
        headers: {
          ...(check.body ? { 'Content-Type': 'application/json' } : {}),
          ...check.headers,
        },
        body: check.body ? JSON.stringify(check.body) : undefined,
      };

      const res = await fetch(check.url, options);
      const isJson = res.headers.get('content-type')?.includes('application/json');
      const body = isJson ? await res.json() : await res.text();

      const statusMatch = res.status === check.expectStatus;
      const bodyMatch = check.checkBody ? check.checkBody(body) : true;

      if (statusMatch && bodyMatch) {
        console.log(`  ✅ ${check.name} (${res.status} OK)`);
        passed++;
      } else {
        console.error(`  ❌ ${check.name} failed: Status ${res.status}, body check: ${bodyMatch}`);
      }
    } catch (err: any) {
      console.error(`  ❌ ${check.name} error:`, err.message);
    }
  }

  console.log(`\n🎉 Verification Complete: ${passed}/${checks.length} checks passed!`);
  if (passed !== checks.length) {
    process.exit(1);
  }
}

testLiveEndpoints();
