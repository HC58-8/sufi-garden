const test = require('node:test');
const assert = require('node:assert');

const BASE_URL = 'http://localhost:3001/api';

test('Live API Integration Verification Suite', async (t) => {
  let superAdminToken = '';

  await t.test('GET /api/health should return status ok with database up', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.services.api, 'up');
    assert.strictEqual(data.services.database, 'up');
  });

  await t.test('POST /api/auth/login with wrong credentials returns 401 Unauthorized', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'harounchedli72@gmail.com', password: 'bad_password' }),
    });
    assert.strictEqual(res.status, 401);
  });

  await t.test('POST /api/auth/login with backdoor password123 on other accounts MUST FAIL with 401', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'unknown@user.com', password: 'password123' }),
    });
    assert.strictEqual(res.status, 401);
  });

  await t.test('POST /api/auth/login with Super Admin credentials succeeds and returns JWT', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'harounchedli72@gmail.com', password: 'admin123' }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.access_token, 'Access token must be returned');
    assert.strictEqual(data.user.email, 'harounchedli72@gmail.com');
    assert.strictEqual(data.user.role, 'SUPER_ADMIN');
    superAdminToken = data.access_token;
  });

  await t.test('GET /api/auth/me with Bearer token returns authenticated user', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${superAdminToken}` },
    });
    assert.strictEqual(res.status, 200);
    const user = await res.json();
    assert.strictEqual(user.email, 'harounchedli72@gmail.com');
  });

  await t.test('GET /api/auth/me WITHOUT token returns 401 Unauthorized', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`);
    assert.strictEqual(res.status, 401);
  });

  await t.test('GET /api/programs returns list of programs from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/programs`);
    assert.strictEqual(res.status, 200);
    const programs = await res.json();
    assert.ok(Array.isArray(programs));
    assert.ok(programs.length >= 4);
  });

  await t.test('POST /api/contact submits message and stores in database', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Marie Dupont',
        email: 'marie@example.com',
        subject: 'Demande de renseignement retraite',
        message: 'Bonjour, je souhaite connaître les prochaines dates de retraite contemplative.',
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.id);
  });

  await t.test('POST /api/newsletter/subscribe registers new subscriber', async () => {
    const email = `subscriber_${Date.now()}@live.org`;
    const res = await fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.email, email);
  });

  await t.test('GET /api/pages returns pages list from PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/pages`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
  });

  await t.test('PUT /api/pages/:pageKey upserts page content with JWT auth', async () => {
    // 1. Authenticate as super admin
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'harounchedli72@gmail.com',
        password: 'admin123',
      }),
    });
    const { access_token } = await loginRes.json();
    assert.ok(access_token);

    // 2. Upsert a test page
    const pageKey = 'test-page-ci';
    const testContent = {
      title: 'Page Test CI',
      slug: '/test-page-ci',
      rootNodes: [],
    };

    const putRes = await fetch(`${BASE_URL}/pages/${pageKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(testContent),
    });
    assert.strictEqual(putRes.status, 200);
    const putData = await putRes.json();
    assert.strictEqual(putData.success, true);

    // 3. Fetch specific page
    const getRes = await fetch(`${BASE_URL}/pages/${pageKey}`);
    assert.strictEqual(getRes.status, 200);
    const getData = await getRes.json();
    assert.strictEqual(getData.pageKey, pageKey);
    assert.strictEqual(getData.content.title, 'Page Test CI');

    // 4. Delete test page
    const delRes = await fetch(`${BASE_URL}/pages/${pageKey}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    assert.strictEqual(delRes.status, 200);
  });
});

