const test = require('node:test');
const assert = require('node:assert');
const { PrismaClient } = require('@prisma/client');

test('Database & Prisma Persistence Test Suite', async (t) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:postgres@localhost:5432/sufigarden_db?schema=public',
      },
    },
  });

  t.after(async () => {
    await prisma.$disconnect();
  });

  await t.test('Database connection should be alive and healthy', async () => {
    const res = await prisma.$queryRawUnsafe('SELECT 1 as result;');
    assert.strictEqual(Number(res[0].result), 1);
  });

  await t.test('Super Admin user must exist in PostgreSQL with correct role', async () => {
    const admin = await prisma.user.findUnique({
      where: { email: 'harounchedli72@gmail.com' },
    });
    assert.ok(admin, 'Super admin harounchedli72@gmail.com must exist');
    assert.strictEqual(admin.role, 'SUPER_ADMIN');
  });

  await t.test('Programs must be queryable and properly structured', async () => {
    const programs = await prisma.program.findMany();
    assert.ok(programs.length >= 4, 'Must have at least 4 seeded programs');
    const balades = programs.find((p) => p.slug === 'balades-meditatives');
    assert.ok(balades, 'Balades Méditatives must exist');
    assert.ok(balades.title.includes('Balades Méditatives'));
  });

  await t.test('Newsletter must enforce unique email constraint', async () => {
    const testEmail = `test_${Date.now()}@domain.org`;
    const sub1 = await prisma.newsletter.create({ data: { email: testEmail } });
    assert.strictEqual(sub1.email, testEmail);

    // Duplicate creation must fail with unique constraint
    await assert.rejects(
      async () => {
        await prisma.newsletter.create({ data: { email: testEmail } });
      },
      /Unique constraint failed/
    );

    // Cleanup
    await prisma.newsletter.delete({ where: { id: sub1.id } });
  });

  await t.test('ContactMessage must persist messages into PostgreSQL', async () => {
    const msg = await prisma.contactMessage.create({
      data: {
        name: 'Automated Test User',
        email: 'testuser@qa.org',
        subject: 'Demande de test',
        message: 'Message de test automatisé de fin de sprint.',
      },
    });

    assert.ok(msg.id);
    assert.strictEqual(msg.read, false);

    // Update read status
    const updated = await prisma.contactMessage.update({
      where: { id: msg.id },
      data: { read: true },
    });
    assert.strictEqual(updated.read, true);

    // Cleanup
    await prisma.contactMessage.delete({ where: { id: msg.id } });
  });
});
