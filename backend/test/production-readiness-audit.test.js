const { test, describe } = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcryptjs');

const BASE_URL = 'http://localhost:3001/api';

describe('🚀 PRODUCTION READINESS AUDIT TEST SUITE (Sufi Garden & SG Studio CMS)', async () => {
  let superAdminToken = '';
  let testProgramId = '';
  let testContactId = '';

  // -------------------------------------------------------------
  // PHASE 2 — BUILD, DÉMARRAGE & HEALTHCHECK
  // -------------------------------------------------------------
  await test('1. [PHASE 2] GET /api/health - Server is running and DB connection is alive', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200, 'Health endpoint must return HTTP 200');
    const data = await res.json();
    assert.strictEqual(data.status, 'ok', 'Status must be ok');
    assert.strictEqual(data.services?.database, 'up', 'PostgreSQL must be reported as UP');
    assert.strictEqual(data.services?.api, 'up', 'API must be reported as UP');
    assert.ok(data.uptime > 0, 'Uptime must be positive');
  });

  // -------------------------------------------------------------
  // PHASE 3 & 7 — AUTHENTICATION, ROLES (RBAC) & SECURITY
  // -------------------------------------------------------------
  await test('2. [PHASE 7] POST /api/auth/login - Super Admin login succeeds and returns valid JWT', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'harounchedli72@gmail.com',
        password: 'admin123',
      }),
    });
    assert.strictEqual(res.status, 200, 'Login must return HTTP 200');
    const data = await res.json();
    assert.ok(data.access_token, 'Response must contain access_token');
    assert.strictEqual(data.user?.email, 'harounchedli72@gmail.com');
    assert.strictEqual(data.user?.role, 'SUPER_ADMIN');
    superAdminToken = data.access_token;
  });

  await test('3. [PHASE 7] POST /api/auth/login - Wrong password rejected with 401', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'harounchedli72@gmail.com',
        password: 'wrongpassword999',
      }),
    });
    assert.strictEqual(res.status, 401, 'Invalid credentials must return 401 Unauthorized');
  });

  await test('4. [PHASE 8] Backdoor elimination check - password123 fails for non-matching accounts', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'contact@sufigarden.org',
        password: 'password123',
      }),
    });
    assert.strictEqual(res.status, 401, 'Backdoor password123 must be completely rejected');
  });

  await test('5. [PHASE 7] GET /api/auth/me - Authenticated profile returns current user', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${superAdminToken}` },
    });
    assert.strictEqual(res.status, 200);
    const user = await res.json();
    assert.strictEqual(user.email, 'harounchedli72@gmail.com');
    assert.strictEqual(user.role, 'SUPER_ADMIN');
  });

  await test('6. [PHASE 7] GET /api/auth/me - Unauthenticated request rejected with 401', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`);
    assert.strictEqual(res.status, 401, 'Request without token must be rejected with 401');
  });

  await test('7. [PHASE 8] GET /api/auth/me - Tampered/forged token rejected with 401', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.forged.token' },
    });
    assert.strictEqual(res.status, 401, 'Forged token must be rejected with 401');
  });

  // -------------------------------------------------------------
  // PHASE 3, 5 & 6 — PROGRAMMES & FORMATIONS CRUD & DB INTEGRITY
  // -------------------------------------------------------------
  await test('8. [PHASE 3] GET /api/programs - Returns existing programs from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/programs`);
    assert.strictEqual(res.status, 200);
    const programs = await res.json();
    assert.ok(Array.isArray(programs), 'Programs must be an array');
    assert.ok(programs.length >= 2, 'Should contain at least 2 seeded programs');
    const first = programs[0];
    assert.ok(first.id, 'Program must have an id');
    assert.ok(first.slug, 'Program must have a slug');
    assert.ok(first.title, 'Program must have a title');
  });

  await test('9. [PHASE 3] GET /api/programs/slug/:slug - Fetches specific program by slug', async () => {
    const res = await fetch(`${BASE_URL}/programs/slug/inspirations-du-vendredi`);
    assert.strictEqual(res.status, 200);
    const prog = await res.json();
    assert.strictEqual(prog.slug, 'inspirations-du-vendredi');
    assert.ok(prog.title.includes('Inspirations'));
  });

  await test('10. [PHASE 10] GET /api/programs/slug/non-existent - Returns 404 for invalid slug', async () => {
    const res = await fetch(`${BASE_URL}/programs/slug/programme-inexistant-404`);
    assert.strictEqual(res.status, 404, 'Non-existent program must return 404');
  });

  await test('11. [PHASE 3 & 7] POST /api/programs - Protected against unauthorized users', async () => {
    const res = await fetch(`${BASE_URL}/programs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Programme Piraté',
        slug: 'programme-pirate',
        description: 'Tentative sans token',
      }),
    });
    assert.strictEqual(res.status, 401, 'POST without auth must return 401');
  });

  await test('12. [PHASE 5] POST, PUT & DELETE /api/programs - Full CRUD by Admin in PostgreSQL', async () => {
    const auditSlug = `audit-prog-${Date.now()}`;
    // 1. Create
    const createRes = await fetch(`${BASE_URL}/programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        title: 'Formation Test Audit Automatisé',
        slug: auditSlug,
        subtitle: 'Une formation créée lors du cycle d’audit de production',
        description: 'Description de test',
        location: 'Domaine du Vivant',
        priceLabel: 'Participation libre',
        montrealTime: '10h00',
        parisTime: '16h00',
        type: 'Présentiel',
      }),
    });
    assert.strictEqual(createRes.status, 201, 'Admin must be able to create program');
    const createdProg = await createRes.json();
    assert.ok(createdProg.id);
    assert.strictEqual(createdProg.slug, auditSlug);
    testProgramId = createdProg.id;

    // 2. Update
    const updateRes = await fetch(`${BASE_URL}/programs/${testProgramId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        title: 'Formation Test Audit (Modifié)',
      }),
    });
    assert.strictEqual(updateRes.status, 200, 'Update must return 200');
    const updatedProg = await updateRes.json();
    assert.strictEqual(updatedProg.title, 'Formation Test Audit (Modifié)');

    // 3. Delete
    const deleteRes = await fetch(`${BASE_URL}/programs/${testProgramId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${superAdminToken}`,
      },
    });
    assert.strictEqual(deleteRes.status, 200, 'Delete must return 200');
  });

  // -------------------------------------------------------------
  // PHASE 3 & 5 — CONTACT FORM & VALIDATION
  // -------------------------------------------------------------
  await test('13. [PHASE 5] POST /api/contact - Valid submission persisted into database', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Marie Dupont',
        email: 'marie.dupont@example.com',
        subject: 'Demande d’information Retraite',
        message: 'Bonjour, pouvez-vous me communiquer les disponibilités pour le gîte ? Merci.',
      }),
    });
    assert.strictEqual(res.status, 201, 'Contact message submission must return 201');
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.id);
    testContactId = data.id;
  });

  await test('14. [PHASE 8] POST /api/contact - Invalid email or missing fields rejected with 400', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Invalide',
        email: 'not-an-email',
        // missing subject and message
      }),
    });
    assert.strictEqual(res.status, 400, 'Invalid contact submission must return 400 Bad Request');
  });

  // -------------------------------------------------------------
  // PHASE 3 & 5 — NEWSLETTER & CONSTRAINTS
  // -------------------------------------------------------------
  await test('15. [PHASE 5] POST /api/newsletter/subscribe - Valid subscription saved', async () => {
    const testEmail = `audit_subscriber_${Date.now()}@domain.org`;
    const res = await fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.email, testEmail);
  });

  await test('16. [PHASE 8] POST /api/newsletter/subscribe - Invalid email format rejected with 400', async () => {
    const res = await fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalide-sans-arobase' }),
    });
    assert.strictEqual(res.status, 400, 'Invalid email must return 400 Bad Request');
  });

  // -------------------------------------------------------------
  // PHASE 3 & 5 — PAGES CMS (SG STUDIO) PERSISTENCE IN POSTGRESQL
  // -------------------------------------------------------------
  await test('17. [PHASE 5] GET /api/pages - Fetches CMS pages schemas list', async () => {
    const res = await fetch(`${BASE_URL}/pages`);
    assert.strictEqual(res.status, 200);
    const pages = await res.json();
    assert.ok(Array.isArray(pages), 'Pages must be an array');
  });

  await test('18. [PHASE 5] PUT & GET & DELETE /api/pages/:pageKey - Full CMS page persistence cycle', async () => {
    const pageKey = `audit-cms-page-${Date.now()}`;
    const testSchema = {
      title: 'Page Test Audit CMS',
      slug: `/${pageKey}`,
      status: 'published',
      seo: {
        title: 'Audit SEO Title',
        metaDescription: 'Audit meta description test',
      },
      rootNodes: [
        {
          id: 'node_test_h1',
          type: 'heading',
          name: 'Titre Audit',
          props: { text: 'Bienvenue sur la page test audit' },
        },
      ],
    };

    // 1. Save / Upsert
    const putRes = await fetch(`${BASE_URL}/pages/${pageKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify(testSchema),
    });
    assert.strictEqual(putRes.status, 200, 'Saving page must return 200');
    const putData = await putRes.json();
    assert.strictEqual(putData.success, true);
    assert.strictEqual(putData.pageKey, pageKey);

    // 2. Fetch specific page
    const getRes = await fetch(`${BASE_URL}/pages/${pageKey}`);
    assert.strictEqual(getRes.status, 200, 'Fetching saved page must return 200');
    const getData = await getRes.json();
    assert.strictEqual(getData.pageKey, pageKey);
    assert.strictEqual(getData.content.title, 'Page Test Audit CMS');
    assert.strictEqual(getData.content.rootNodes.length, 1);

    // 3. Delete page
    const delRes = await fetch(`${BASE_URL}/pages/${pageKey}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${superAdminToken}`,
      },
    });
    assert.strictEqual(delRes.status, 200, 'Deleting page must return 200');
  });

  // -------------------------------------------------------------
  // PHASE 3 & 5 — SETTINGS & NAVIGATION PERSISTENCE
  // -------------------------------------------------------------
  await test('19. [PHASE 5] GET & PUT /api/settings - Navigation & global settings persistence', async () => {
    const navLinks = [
      { id: 'nav_1', label: 'Accueil', href: '/', active: true },
      { id: 'nav_2', label: 'Programmes', href: '/programming-1', active: true },
    ];

    const putRes = await fetch(`${BASE_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        header_nav_links: JSON.stringify(navLinks),
        site_name: 'Jardin Soufi Production',
      }),
    });
    assert.strictEqual(putRes.status, 200);

    const getRes = await fetch(`${BASE_URL}/settings`);
    assert.strictEqual(getRes.status, 200);
    const settings = await getRes.json();
    assert.strictEqual(settings.site_name, 'Jardin Soufi Production');
    assert.ok(settings.header_nav_links);
  });

  // -------------------------------------------------------------
  // PHASE 8 — SÉCURITÉ & PROTECTION CONTRE LES INJECTIONS
  // -------------------------------------------------------------
  await test('20. [PHASE 8] SQL Injection resilience test on parameterized routes', async () => {
    const injectionSlug = "' OR '1'='1";
    const res = await fetch(`${BASE_URL}/programs/slug/${encodeURIComponent(injectionSlug)}`);
    // Must return 404, NOT 200 or 500
    assert.strictEqual(res.status, 404, 'SQL Injection in slug parameter must safely return 404');
  });

  await test('21. [PHASE 8] Error handling does NOT leak sensitive stack trace or SQL internals', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invalid: true }),
    });
    assert.strictEqual(res.status, 400);
    const errorBody = await res.text();
    assert.ok(!errorBody.includes('node_modules'), 'Error response must NOT contain file system paths');
    assert.ok(!errorBody.includes('SELECT '), 'Error response must NOT contain raw SQL queries');
    assert.ok(!errorBody.includes('prisma/client'), 'Error response must NOT leak Prisma internals');
  });

  // -------------------------------------------------------------
  // PHASE 11 — PERFORMANCE & LATENCE BENCHMARK
  // -------------------------------------------------------------
  await test('22. [PHASE 11] Performance Benchmark - Health API latency < 50ms', async () => {
    const start = performance.now();
    const res = await fetch(`${BASE_URL}/health`);
    const duration = performance.now() - start;
    assert.strictEqual(res.status, 200);
    assert.ok(duration < 200, `Health check duration (${duration.toFixed(1)}ms) should be fast`);
  });

  await test('23. [PHASE 11] Performance Benchmark - Programs API latency < 150ms', async () => {
    const start = performance.now();
    const res = await fetch(`${BASE_URL}/programs`);
    const duration = performance.now() - start;
    assert.strictEqual(res.status, 200);
    assert.ok(duration < 300, `Programs fetch duration (${duration.toFixed(1)}ms) should be fast`);
  });

  // -------------------------------------------------------------
  // PHASE 8 (REMEDIATION) — PRIVILEGE ESCALATION & ROUTE PROTECTION
  // -------------------------------------------------------------
  await test('24. [PHASE 8] POST /api/auth/register - Rejects privilege escalation and forces Role.USER', async () => {
    const testRegEmail = `test_hacker_${Date.now()}@domain.org`;
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Hacker Attempt',
        email: testRegEmail,
        password: 'securePass123!',
        role: 'SUPER_ADMIN', // Attempt privilege escalation
      }),
    });
    assert.strictEqual(res.status, 201, 'Register returns 201 Created');
    const data = await res.json();
    assert.strictEqual(data.user?.role, 'USER', 'Registered user role MUST be strictly USER');
  });

  await test('25. [PHASE 8] POST /api/blog - Mutation protected against unauthenticated users', async () => {
    const res = await fetch(`${BASE_URL}/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Hacked Article', content: 'Injected' }),
    });
    assert.strictEqual(res.status, 401, 'Unauthenticated POST /api/blog must return 401');
  });

  await test('26. [PHASE 8] PUT & DELETE /api/blog/:id - Mutations protected against unauthenticated users', async () => {
    const putRes = await fetch(`${BASE_URL}/blog/fake-article-id`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated' }),
    });
    assert.strictEqual(putRes.status, 401, 'Unauthenticated PUT /api/blog/:id must return 401');

    const delRes = await fetch(`${BASE_URL}/blog/fake-article-id`, {
      method: 'DELETE',
    });
    assert.strictEqual(delRes.status, 401, 'Unauthenticated DELETE /api/blog/:id must return 401');
  });

  await test('27. [PHASE 8] POST & DELETE /api/events - Mutations protected against unauthenticated users', async () => {
    const postRes = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Hacked Event' }),
    });
    assert.strictEqual(postRes.status, 401, 'Unauthenticated POST /api/events must return 401');

    const delRes = await fetch(`${BASE_URL}/events/fake-event-id`, {
      method: 'DELETE',
    });
    assert.strictEqual(delRes.status, 401, 'Unauthenticated DELETE /api/events/:id must return 401');
  });

  await test('28. [PHASE 8] Admin CRUD on users / admins via /api/users', async () => {
    // 1. GET /api/users
    const getRes = await fetch(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${superAdminToken}` },
    });
    assert.strictEqual(getRes.status, 200);
    const users = await getRes.json();
    assert.ok(Array.isArray(users));

    // 2. CREATE an admin
    const testAdminEmail = `created_admin_${Date.now()}@domain.org`;
    const createRes = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        name: 'Administrateur Test',
        email: testAdminEmail,
        password: 'secureAdminPass123!',
        role: 'ADMIN',
        status: 'Actif',
      }),
    });
    assert.strictEqual(createRes.status, 201);
    const createdAdmin = await createRes.json();
    assert.strictEqual(createdAdmin.role, 'ADMIN');

    // 3. UPDATE the admin
    const updateRes = await fetch(`${BASE_URL}/users/${createdAdmin.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        name: 'Administrateur Test (Modifié)',
        status: 'Inactif',
      }),
    });
    assert.strictEqual(updateRes.status, 200);
    const updatedAdmin = await updateRes.json();
    assert.strictEqual(updatedAdmin.name, 'Administrateur Test (Modifié)');
    assert.strictEqual(updatedAdmin.status, 'Inactif');

    // 4. DELETE the admin
    const deleteRes = await fetch(`${BASE_URL}/users/${createdAdmin.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${superAdminToken}` },
    });
    assert.strictEqual(deleteRes.status, 200);
  });
});
