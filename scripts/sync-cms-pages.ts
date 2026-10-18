import { PrismaClient } from '@prisma/client';
import {
  PAGE_HOME,
  PAGE_PROGRAMS,
  PAGE_GITE,
  PAGE_ABOUT,
  PAGE_CONTACT,
  PAGE_SUPPORT,
} from '../frontend/src/builder/richDefaultPages';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Synchronisation des pages réelles vers la table PageContent...');

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

  console.log('🎉 Synchronisation de toutes les pages réelles terminée avec succès !');
}

main()
  .catch((e) => {
    console.error('Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
