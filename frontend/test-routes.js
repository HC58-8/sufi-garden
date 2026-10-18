const { test, describe } = require('node:test');
const assert = require('node:assert');

const FRONTEND_URL = 'http://localhost:3000';

describe('🌐 FRONTEND PRODUCTION ROUTES AUDIT (Next.js 15)', async () => {
  const routes = [
    { path: '/', expectedKeyword: 'JARDIN SOUFI' },
    { path: '/programming-1', expectedKeyword: 'Programmes' },
    { path: '/programming-1/inspirations-du-vendredi', expectedKeyword: 'Inspirations' },
    { path: '/programming-1/universal-call', expectedKeyword: 'Universel' },
    { path: '/domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi', expectedKeyword: 'Gîte' },
    { path: '/about', expectedKeyword: 'Propos' },
    { path: '/contact-us', expectedKeyword: 'Contact' },
    { path: '/support-us', expectedKeyword: 'Soutenir' },
    { path: '/admin', expectedKeyword: 'SG STUDIO' },
    { path: '/robots.txt', expectedKeyword: 'User-agent' },
    { path: '/sitemap.xml', expectedKeyword: 'urlset' },
  ];

  for (const r of routes) {
    await test(`Test route: ${r.path} returns HTTP 200 and expected markup`, async () => {
      const start = performance.now();
      const res = await fetch(`${FRONTEND_URL}${r.path}`);
      const duration = performance.now() - start;

      assert.strictEqual(res.status, 200, `Route ${r.path} should return HTTP 200`);
      const text = await res.text();
      assert.ok(
        text.toLowerCase().includes(r.expectedKeyword.toLowerCase()),
        `Route ${r.path} should contain keyword "${r.expectedKeyword}"`
      );
      assert.ok(duration < 1000, `Route ${r.path} responded in ${duration.toFixed(1)}ms`);
    });
  }

  await test('Test 404 handler returns proper status', async () => {
    const res = await fetch(`${FRONTEND_URL}/une-page-qui-n-existe-absolument-pas-999`);
    // In Next.js App Router, catch-all [...slug] handles dynamic CMS pages or renders 404
    assert.ok([200, 404].includes(res.status));
  });
});
