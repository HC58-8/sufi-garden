const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Read rich pages JSON from compiled or direct definitions
async function sync() {
  console.log('🔄 Synchronisation des pages réelles vers la table PageContent...');

  // Import rich default pages
  // We can evaluate TS or write the schema objects directly
  const { PAGE_HOME, PAGE_PROGRAMS, PAGE_GITE, PAGE_ABOUT, PAGE_CONTACT, PAGE_SUPPORT } = require('../frontend/src/builder/richDefaultPages.js');

  const pagesToSync = [
    { key: 'home', schema: PAGE_HOME },
    { key: 'programming-1', schema: PAGE_PROGRAMS },
    { key: 'programs', schema: PAGE_PROGRAMS },
    { key: 'domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi', schema: PAGE_GITE },
    { key: 'gite', schema: PAGE_GITE },
    { key: 'about', schema: PAGE_ABOUT },
    { key: 'contact-us', schema: PAGE_CONTACT },
    { key: 'support-us', schema: PAGE_SUPPORT },
  ];

  for (const page of pagesToSync) {
    const serialized = JSON.stringify(page.schema);
    await prisma.pageContent.upsert({
      where: { pageKey: page.key },
      update: {
        contentJson: serialized,
        updatedAt: new Date(),
      },
      create: {
        pageKey: page.key,
        contentJson: serialized,
      },
    });
    console.log(`✅ Page synchronisée : "${page.key}" (${page.schema.title})`);
  }

  console.log('🎉 Synchronisation terminée avec succès !');
  process.exit(0);
}

sync().catch(err => {
  console.error('Erreur synchronisation:', err);
  process.exit(1);
});
