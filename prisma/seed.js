const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database sufigarden_db...');

  // 1. Super Admin & Admin users
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'harounchedli72@gmail.com' },
    update: {
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      status: 'Actif',
    },
    create: {
      email: 'harounchedli72@gmail.com',
      password: hashedPassword,
      name: 'Haroun Chedli',
      role: 'SUPER_ADMIN',
      status: 'Actif',
    },
  });
  console.log('Super Admin user seeded:', superAdmin.email);

  const admin2 = await prisma.user.upsert({
    where: { email: 'admin@sufigarden.org' },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      status: 'Actif',
    },
    create: {
      email: 'admin@sufigarden.org',
      password: hashedPassword,
      name: 'Shaykh Hamdi Ben Aïssa',
      role: 'ADMIN',
      status: 'Actif',
    },
  });
  console.log('Admin user seeded:', admin2.email);

  // 2. Initial Programs
  const programs = [
    {
      slug: 'balades-meditatives',
      title: 'Les Balades Méditatives',
      subtitle: 'Marcher ensemble. Respirer la forêt. Habiter le silence.',
      description: 'Ralentir. Respirer. Marcher ensemble. Une expérience d’écoute et de contact direct avec la forêt.',
      datesListText: '11 juillet • 15 août • 5 septembre',
      montrealTime: '09h30 – 14h00',
      parisTime: '15h30 – 20h00',
      location: 'Domaine du Vivant (Gîte & Forêt Sauvage)',
      replayNotice: '❗ Séminaire immersif en plein air au cœur du Domaine du Vivant',
      priceLabel: 'Donation libre / Zeffy',
      freeOptionText: '🆓 Envie de participer ? Accès ouvert à tous.',
      freeOptionLink: '/contact-us',
      englishNotice: 'Want to participate in English? Find the English program here:',
      englishLink: '/programming-1/friday-in-sights',
      mainButtonLabel: 'Je veux participer',
      zeffyUrl: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
      type: 'Présentiel',
      bannerImage: 'https://static.wixstatic.com/media/9b3551_603242551bc04683b69990ca91ab0648~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Balade%20M%C3%A9ditative.png',
      visible: true,
    },
    {
      slug: 'inspirations-du-vendredi',
      title: 'Les Inspirations du Vendredi',
      subtitle: 'Explorer les Noms Divins à travers la contemplation, la réflexion et la présence intérieure.',
      description: 'Un rendez-vous hebdomadaire pour explorer les Noms Divins à travers la contemplation, la réflexion et la présence intérieure.',
      datesListText: 'À partir du 26 juin 2026',
      montrealTime: '13h – 13h30 (Montréal)',
      parisTime: '19h – 19h30 (Paris)',
      location: 'En ligne (Zoom)',
      replayNotice: '❗ Si vous ne pouvez pas joindre certaines sessions, un replay sera disponible',
      priceLabel: 'FREE / Gratuit sur demande',
      freeOptionText: "🆓 Vous n'avez pas les moyens de payer ? Cliquez ici",
      freeOptionLink: '/contact-us',
      englishNotice: 'Want to participate in English? Find the English program here:',
      englishLink: '/programming-1/friday-in-sights',
      mainButtonLabel: 'Je veux participer',
      zeffyUrl: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
      type: 'En ligne / Français',
      bannerImage: 'https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png',
      visible: true,
    },
    {
      slug: 'friday-in-sights',
      title: 'The Friday In-Sights',
      subtitle: 'A weekly gathering exploring the Divine Names through contemplation.',
      description: 'A weekly gathering exploring the Divine Names through contemplation, reflection, and inner presence.',
      datesListText: 'Starting June 26, 2026',
      montrealTime: '20:00 – 20:45 (Montreal)',
      parisTime: '02:00 – 02:45 (Paris)',
      location: 'Online (Zoom)',
      replayNotice: '❗ If you cannot join live, session replays will be provided',
      priceLabel: 'FREE / Open Contribution',
      freeOptionText: '🆓 Financial aid available if needed. Click here.',
      freeOptionLink: '/contact-us',
      englishNotice: 'Vous souhaitez participer en français ? Cliquez ici :',
      englishLink: '/programming-1/inspirations-du-vendredi',
      mainButtonLabel: 'Join in English',
      zeffyUrl: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
      type: 'Online / English',
      bannerImage: 'https://static.wixstatic.com/media/9b3551_0467d6ae325f4c3e9fa96cd44ae8c8d2~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Insight_Banner.png',
      visible: true,
    },
    {
      slug: 'universal-call',
      title: 'L’Appel Universel (Universal Call)',
      subtitle: 'Séminaire immersif de contemplation et de présence guidé par Shaykh Hamdi Ben Aïssa.',
      description: 'Séminaire immersif de contemplation et de présence guidé par Shaykh Hamdi Ben Aïssa au cœur de la forêt sauvage.',
      datesListText: '26 - 28 Juin 2026',
      montrealTime: '09h00 – 17h00 (Montréal)',
      parisTime: '15h00 – 23h00 (Paris)',
      location: 'Domaine du Vivant (Gîte) & Zoom Live',
      replayNotice: '❗ Replay disponible pour tous les abonnés inscrits',
      priceLabel: 'Inscription Sécurisée Zeffy',
      freeOptionText: "🆓 Bourses d'études disponibles sur demande.",
      freeOptionLink: '/contact-us',
      englishNotice: 'Want to participate in English? Find the English program here:',
      englishLink: '/programming-1/friday-in-sights',
      mainButtonLabel: 'Je veux participer',
      zeffyUrl: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
      type: 'Présentiel & En Ligne',
      bannerImage: 'https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg',
      visible: true,
    },
  ];

  for (const prog of programs) {
    await prisma.program.upsert({
      where: { slug: prog.slug },
      update: prog,
      create: prog,
    });
  }
  console.log(`Seeded ${programs.length} programs.`);

  // 3. Initial Settings
  const settings = [
    { key: 'siteName', value: 'L’Institut du Jardin Soufi' },
    { key: 'siteDescription', value: 'Méditer la nature - Habiter la présence. - Revenir au vivant.' },
    { key: 'logoUrl', value: '/images/logo.png' },
    { key: 'contactEmail', value: 'info@sufigarden.org' },
    { key: 'address', value: 'The Sufi Garden Institute, Chénéville, Québec, Canada' },
    { key: 'facebookUrl', value: 'https://www.facebook.com/wix' },
    { key: 'instagramUrl', value: 'https://www.instagram.com/wix' },
    { key: 'youtubeUrl', value: 'https://www.youtube.com' },
    { key: 'donationLink', value: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log(`Seeded ${settings.length} site settings.`);

  // 4. Initial Category & Articles
  const cat = await prisma.category.upsert({
    where: { slug: 'spiritualite' },
    update: { name: 'Spiritualité' },
    create: { name: 'Spiritualité', slug: 'spiritualite' },
  });

  await prisma.article.upsert({
    where: { slug: 'mediter-la-nature-revenir-au-vivant' },
    update: {},
    create: {
      slug: 'mediter-la-nature-revenir-au-vivant',
      title: 'Méditer la nature - Revenir au vivant',
      content: 'Nous croyons que la guérison du monde commence par la guérison du regard. Le Jardin Soufi accompagne cette renaissance par la méditation, la contemplation, l’écoute et le contact direct avec la forêt et ses cycles.',
      published: true,
      categoryId: cat.id,
      authorId: superAdmin.id,
    },
  });
  console.log('Seeded initial article and category.');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
