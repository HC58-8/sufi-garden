import { PageSchema, ComponentNode } from './types';
import { COMPONENT_REGISTRY } from './registry';

// Helper to construct a standard section with container
export function createSection(
  id: string,
  name: string,
  bgColor: string,
  textColor: string,
  children: ComponentNode[],
  paddingY: string = '80px'
): ComponentNode {
  return {
    id,
    type: 'section',
    name,
    category: 'layout',
    props: {},
    style: {
      desktop: {
        backgroundColor: bgColor,
        color: textColor,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: '24px',
        paddingRight: '24px',
      },
    },
    settings: { visible: true, locked: false },
    children: [
      {
        id: `${id}_container`,
        type: 'container',
        name: `${name} Container`,
        category: 'layout',
        props: {},
        style: {
          desktop: {
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        },
        settings: { visible: true, locked: false },
        children,
      },
    ],
  };
}

import {
  PAGE_HOME,
  PAGE_PROGRAMS,
  PAGE_GITE,
  PAGE_ABOUT,
  PAGE_CONTACT,
  PAGE_SUPPORT,
} from './richDefaultPages';

export {
  PAGE_HOME,
  PAGE_PROGRAMS,
  PAGE_GITE,
  PAGE_ABOUT,
  PAGE_CONTACT,
  PAGE_SUPPORT,
};

// 7. PROGRAMME : INSPIRATIONS DU VENDREDI
export const PAGE_PROG_INSPIRATIONS: PageSchema = {
  id: 'page_prog_inspirations',
  title: 'Formation: Les Inspirations du Vendredi',
  slug: '/programming-1/inspirations-du-vendredi',
  status: 'published',
  createdAt: '2026-08-01T00:00:00Z',
  updatedAt: '2026-08-31T00:00:00Z',
  seo: {
    title: 'Les Inspirations du Vendredi | Jardin Soufi',
    metaDescription: 'Explorer les Noms Divins à travers la contemplation, la réflexion et la présence intérieure.',
    ogImage: 'https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png',
  },
  rootNodes: [
    {
      id: 'insp_hero_sec',
      type: 'section',
      name: 'Bannière Programme',
      category: 'layout',
      props: {},
      style: {
        desktop: {
          backgroundColor: '#365024',
          color: '#FDFBF6',
          paddingTop: '70px',
          paddingBottom: '60px',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
      settings: { visible: true, locked: false },
      children: [
        {
          id: 'insp_hero_container',
          type: 'container',
          name: 'Container',
          category: 'layout',
          props: {},
          style: { desktop: { maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } },
          settings: { visible: true, locked: false },
          children: [
            {
              id: 'insp_hero_badge',
              type: 'badge',
              name: 'Badge Format',
              category: 'text',
              props: { text: 'EN LIGNE (ZOOM) • TOUS LES VENDREDIS' },
              style: {
                desktop: {
                  backgroundColor: '#651011',
                  color: '#FDFBF6',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  marginBottom: '16px',
                },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'insp_hero_h1',
              type: 'heading',
              name: 'Titre H1',
              category: 'text',
              props: { text: 'Les Inspirations du Vendredi', level: 'h1' },
              style: {
                desktop: {
                  fontSize: '42px',
                  fontFamily: 'Playfair Display, serif',
                  color: '#FDFBF6',
                  marginBottom: '16px',
                },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'insp_hero_p',
              type: 'paragraph',
              name: 'Pitch',
              category: 'text',
              props: { text: 'Explorer les Noms Divins à travers la contemplation, la réflexion et la présence intérieure.' },
              style: {
                desktop: { fontSize: '16px', color: '#FDFBF6', opacity: '0.9', marginBottom: '28px' },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'insp_hero_cta',
              type: 'button',
              name: 'Bouton Zeffy Inscription',
              category: 'buttons',
              props: { text: 'Je veux participer (Billetterie Zeffy)', icon: 'ArrowRight' },
              actions: {
                type: 'url',
                value: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
                target: '_blank',
              },
              style: {
                desktop: {
                  backgroundColor: '#C9A35A',
                  color: '#1B2E15',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  fontSize: '13px',
                },
              },
              settings: { visible: true, locked: false },
            },
          ],
        },
      ],
    },
  ],
};

// 8. PROGRAMME : LES BALADES MÉDITATIVES
export const PAGE_PROG_BALADES: PageSchema = {
  id: 'page_prog_balades',
  title: 'Formation: Les Balades Méditatives',
  slug: '/programming-1/balades-meditatives',
  status: 'published',
  createdAt: '2026-08-01T00:00:00Z',
  updatedAt: '2026-08-31T00:00:00Z',
  seo: {
    title: 'Les Balades Méditatives | Jardin Soufi',
    metaDescription: 'Marcher ensemble. Respirer la forêt. Habiter le silence au Domaine du Vivant.',
    ogImage: 'https://static.wixstatic.com/media/9b3551_603242551bc04683b69990ca91ab0648~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Balade%20M%C3%A9ditative.png',
  },
  rootNodes: [
    {
      id: 'bal_hero_sec',
      type: 'section',
      name: 'Hero Balades',
      category: 'layout',
      props: {},
      style: {
        desktop: {
          backgroundColor: '#365024',
          color: '#FDFBF6',
          paddingTop: '70px',
          paddingBottom: '60px',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
      settings: { visible: true, locked: false },
      children: [
        {
          id: 'bal_hero_container',
          type: 'container',
          name: 'Container',
          category: 'layout',
          props: {},
          style: { desktop: { maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } },
          settings: { visible: true, locked: false },
          children: [
            {
              id: 'bal_hero_badge',
              type: 'badge',
              name: 'Badge Présentiel',
              category: 'text',
              props: { text: 'PRÉSENTIEL EN FORÊT • DOMAINE DU VIVANT' },
              style: {
                desktop: {
                  backgroundColor: '#651011',
                  color: '#FDFBF6',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  marginBottom: '16px',
                },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'bal_hero_h1',
              type: 'heading',
              name: 'Titre H1 Balades',
              category: 'text',
              props: { text: 'Les Balades Méditatives', level: 'h1' },
              style: {
                desktop: {
                  fontSize: '42px',
                  fontFamily: 'Playfair Display, serif',
                  color: '#FDFBF6',
                  marginBottom: '16px',
                },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'bal_hero_p',
              type: 'paragraph',
              name: 'Pitch Balades',
              category: 'text',
              props: { text: 'Marcher ensemble. Respirer la forêt. Habiter le silence.' },
              style: {
                desktop: { fontSize: '16px', color: '#FDFBF6', opacity: '0.9', marginBottom: '28px' },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'bal_hero_cta',
              type: 'button',
              name: 'Bouton Zeffy Inscription',
              category: 'buttons',
              props: { text: 'Je veux participer (Billetterie Zeffy)', icon: 'ArrowRight' },
              actions: {
                type: 'url',
                value: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
                target: '_blank',
              },
              style: {
                desktop: {
                  backgroundColor: '#C9A35A',
                  color: '#1B2E15',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  fontSize: '13px',
                },
              },
              settings: { visible: true, locked: false },
            },
          ],
        },
      ],
    },
  ],
};

// 9. PROGRAMME : THE FRIDAY IN-SIGHTS (ANGLAIS)
export const PAGE_PROG_INSIGHTS: PageSchema = {
  id: 'page_prog_insights',
  title: 'Formation: Friday In-Sights (English)',
  slug: '/programming-1/friday-in-sights',
  status: 'published',
  createdAt: '2026-08-01T00:00:00Z',
  updatedAt: '2026-08-31T00:00:00Z',
  seo: {
    title: 'The Friday In-Sights | Sufi Garden',
    metaDescription: 'A weekly gathering exploring the Divine Names through contemplation and living wisdom.',
    ogImage: 'https://static.wixstatic.com/media/9b3551_0467d6ae325f4c3e9fa96cd44ae8c8d2~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Insight_Banner.png',
  },
  rootNodes: [
    {
      id: 'ins_hero_sec',
      type: 'section',
      name: 'Hero Friday In-Sights',
      category: 'layout',
      props: {},
      style: {
        desktop: {
          backgroundColor: '#365024',
          color: '#FDFBF6',
          paddingTop: '70px',
          paddingBottom: '60px',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
      settings: { visible: true, locked: false },
      children: [
        {
          id: 'ins_hero_container',
          type: 'container',
          name: 'Container',
          category: 'layout',
          props: {},
          style: { desktop: { maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } },
          settings: { visible: true, locked: false },
          children: [
            {
              id: 'ins_hero_badge',
              type: 'badge',
              name: 'Badge Language',
              category: 'text',
              props: { text: 'ONLINE (ZOOM) • ENGLISH PROGRAM' },
              style: {
                desktop: {
                  backgroundColor: '#651011',
                  color: '#FDFBF6',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  marginBottom: '16px',
                },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'ins_hero_h1',
              type: 'heading',
              name: 'Title H1',
              category: 'text',
              props: { text: 'The Friday In-Sights', level: 'h1' },
              style: {
                desktop: {
                  fontSize: '42px',
                  fontFamily: 'Playfair Display, serif',
                  color: '#FDFBF6',
                  marginBottom: '16px',
                },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'ins_hero_p',
              type: 'paragraph',
              name: 'Pitch',
              category: 'text',
              props: { text: 'A weekly gathering exploring the Divine Names through contemplation and living wisdom.' },
              style: {
                desktop: { fontSize: '16px', color: '#FDFBF6', opacity: '0.9', marginBottom: '28px' },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'ins_hero_cta',
              type: 'button',
              name: 'Ticket Button',
              category: 'buttons',
              props: { text: 'Register via Zeffy Ticketing', icon: 'ArrowRight' },
              actions: {
                type: 'url',
                value: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
                target: '_blank',
              },
              style: {
                desktop: {
                  backgroundColor: '#C9A35A',
                  color: '#1B2E15',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  fontSize: '13px',
                },
              },
              settings: { visible: true, locked: false },
            },
          ],
        },
      ],
    },
  ],
};

// 10. PROGRAMME : L'APPEL UNIVERSEL
export const PAGE_PROG_UNIVERSAL_CALL: PageSchema = {
  id: 'page_prog_universal_call',
  title: "Formation: L'Appel Universel",
  slug: '/programming-1/universal-call',
  status: 'published',
  createdAt: '2026-08-01T00:00:00Z',
  updatedAt: '2026-08-31T00:00:00Z',
  seo: {
    title: "L'Appel Universel | Jardin Soufi",
    metaDescription: 'Répondre à l’appel du cœur et s’engager sur le chemin du retour au vivant.',
  },
  rootNodes: [
    {
      id: 'uc_hero_sec',
      type: 'section',
      name: 'Hero Section Appel Universel',
      category: 'layout',
      props: {},
      style: {
        desktop: {
          backgroundColor: '#365024',
          color: '#FDFBF6',
          paddingTop: '70px',
          paddingBottom: '60px',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
      settings: { visible: true, locked: false },
      children: [
        {
          id: 'uc_hero_container',
          type: 'container',
          name: 'Container',
          category: 'layout',
          props: {},
          style: { desktop: { maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } },
          settings: { visible: true, locked: false },
          children: [
            {
              id: 'uc_hero_badge',
              type: 'badge',
              name: 'Badge Séminaire',
              category: 'text',
              props: { text: "SÉMINAIRE ANNUEL MAJEUR" },
              style: {
                desktop: {
                  backgroundColor: '#651011',
                  color: '#FDFBF6',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  marginBottom: '16px',
                },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'uc_hero_h1',
              type: 'heading',
              name: 'Titre H1',
              category: 'text',
              props: { text: "L'Appel Universel du Cœur", level: 'h1' },
              style: {
                desktop: {
                  fontSize: '42px',
                  fontFamily: 'Playfair Display, serif',
                  color: '#FDFBF6',
                  marginBottom: '16px',
                },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'uc_hero_p',
              type: 'paragraph',
              name: 'Pitch',
              category: 'text',
              props: { text: "Répondre à l'appel intérieur et s’engager sur le chemin du retour au vivant." },
              style: {
                desktop: { fontSize: '16px', color: '#FDFBF6', opacity: '0.9', marginBottom: '28px' },
              },
              settings: { visible: true, locked: false },
            },
            {
              id: 'uc_hero_cta',
              type: 'button',
              name: 'Bouton Zeffy Inscription',
              category: 'buttons',
              props: { text: 'Je veux participer (Billetterie Zeffy)', icon: 'ArrowRight' },
              actions: {
                type: 'url',
                value: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
                target: '_blank',
              },
              style: {
                desktop: {
                  backgroundColor: '#C9A35A',
                  color: '#1B2E15',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  fontSize: '13px',
                },
              },
              settings: { visible: true, locked: false },
            },
          ],
        },
      ],
    },
  ],
};

// Array of all initial default pages
export const ALL_INITIAL_PAGES: PageSchema[] = [
  PAGE_HOME,
  PAGE_PROGRAMS,
  PAGE_GITE,
  PAGE_ABOUT,
  PAGE_CONTACT,
  PAGE_SUPPORT,
  PAGE_PROG_INSPIRATIONS,
  PAGE_PROG_BALADES,
  PAGE_PROG_INSIGHTS,
  PAGE_PROG_UNIVERSAL_CALL,
];

// DYNAMIC GENERATOR FOR NEW FORMATIONS / PROGRAMMES
export function generateProgramPageSchema(program: {
  title: string;
  slug: string;
  subtitle?: string;
  datesListText?: string;
  montrealTime?: string;
  parisTime?: string;
  location?: string;
  replayNotice?: string;
  freeOptionText?: string;
  mainButtonLabel?: string;
  zeffyUrl?: string;
  bannerImage?: string;
  secondaryImage?: string;
}): PageSchema {
  const pageId = `page_prog_${program.slug.replace(/[^a-z0-9]/g, '_')}`;
  const now = new Date().toISOString();

  return {
    id: pageId,
    title: `Formation: ${program.title}`,
    slug: `/programming-1/${program.slug}`,
    status: 'published',
    createdAt: now,
    updatedAt: now,
    seo: {
      title: `${program.title} | Jardin Soufi`,
      metaDescription: program.subtitle || `Découvrez le programme ${program.title} du Jardin Soufi.`,
      ogImage: program.bannerImage || '',
    },
    rootNodes: [
      // Hero Section
      {
        id: `hero_sec_${program.slug}`,
        type: 'section',
        name: 'En-tête du Programme',
        category: 'layout',
        props: {},
        style: {
          desktop: {
            backgroundColor: '#365024',
            color: '#FDFBF6',
            paddingTop: '70px',
            paddingBottom: '60px',
            paddingLeft: '24px',
            paddingRight: '24px',
            borderBottomWidth: '2px',
            borderBottomColor: '#C9A35A',
          },
        },
        settings: { visible: true, locked: false },
        children: [
          {
            id: `hero_cont_${program.slug}`,
            type: 'container',
            name: 'Conteneur En-tête',
            category: 'layout',
            props: {},
            style: {
              desktop: {
                maxWidth: '900px',
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
              },
            },
            settings: { visible: true, locked: false },
            children: [
              {
                id: `badge_loc_${program.slug}`,
                type: 'badge',
                name: 'Badge Format & Lieu',
                category: 'text',
                props: { text: program.location || 'En ligne (Zoom)' },
                style: {
                  desktop: {
                    backgroundColor: '#651011',
                    color: '#FDFBF6',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginBottom: '16px',
                  },
                },
                settings: { visible: true, locked: false },
              },
              {
                id: `title_h1_${program.slug}`,
                type: 'heading',
                name: 'Titre Principal',
                category: 'text',
                props: { text: program.title, level: 'h1' },
                style: {
                  desktop: {
                    fontSize: '40px',
                    fontFamily: 'Playfair Display, serif',
                    color: '#FDFBF6',
                    marginBottom: '16px',
                    lineHeight: '1.2',
                  },
                },
                settings: { visible: true, locked: false },
              },
              {
                id: `sub_p_${program.slug}`,
                type: 'paragraph',
                name: 'Sous-titre / Pitch',
                category: 'text',
                props: {
                  text: program.subtitle || 'Une expérience de méditation, de contemplation et d’écoute au cœur du vivant.',
                },
                style: {
                  desktop: {
                    fontSize: '16px',
                    color: '#FDFBF6',
                    opacity: '0.9',
                    maxWidth: '750px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '28px',
                  },
                },
                settings: { visible: true, locked: false },
              },
              {
                id: `cta_btn_${program.slug}`,
                type: 'button',
                name: 'Bouton Inscription Zeffy',
                category: 'buttons',
                props: {
                  text: program.mainButtonLabel || 'Je veux participer (Billetterie Zeffy)',
                  icon: 'ArrowRight',
                  iconPosition: 'right',
                },
                actions: {
                  type: 'url',
                  value: program.zeffyUrl || 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
                  target: '_blank',
                },
                style: {
                  desktop: {
                    backgroundColor: '#C9A35A',
                    color: '#1B2E15',
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    borderRadius: '9999px',
                    fontWeight: '700',
                    fontSize: '13px',
                  },
                },
                settings: { visible: true, locked: false },
              },
            ],
          },
        ],
      },
      // Practical Details Section
      {
        id: `details_sec_${program.slug}`,
        type: 'section',
        name: 'Détails & Horaires',
        category: 'layout',
        props: {},
        style: {
          desktop: {
            backgroundColor: '#FDFBF6',
            color: '#365024',
            paddingTop: '60px',
            paddingBottom: '60px',
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        },
        settings: { visible: true, locked: false },
        children: [
          {
            id: `details_cont_${program.slug}`,
            type: 'container',
            name: 'Conteneur Détails',
            category: 'layout',
            props: {},
            style: {
              desktop: {
                maxWidth: '900px',
                marginLeft: 'auto',
                marginRight: 'auto',
              },
            },
            settings: { visible: true, locked: false },
            children: [
              {
                id: `dates_box_${program.slug}`,
                type: 'container',
                name: 'Boîte Horaires & Dates',
                category: 'layout',
                props: {},
                style: {
                  desktop: {
                    backgroundColor: '#FFFFFF',
                    borderWidth: '1px',
                    borderColor: 'rgba(118, 134, 103, 0.3)',
                    paddingTop: '28px',
                    paddingBottom: '28px',
                    paddingLeft: '28px',
                    paddingRight: '28px',
                    borderRadius: '20px',
                    marginBottom: '24px',
                  },
                },
                settings: { visible: true, locked: false },
                children: [
                  {
                    id: `dates_h2_${program.slug}`,
                    type: 'heading',
                    name: 'Titre Dates',
                    category: 'text',
                    props: { text: '🗓️ Calendrier des Rencontres', level: 'h2' },
                    style: {
                      desktop: {
                        fontSize: '22px',
                        fontFamily: 'Playfair Display, serif',
                        color: '#365024',
                        marginBottom: '12px',
                      },
                    },
                    settings: { visible: true, locked: false },
                  },
                  {
                    id: `dates_p_${program.slug}`,
                    type: 'paragraph',
                    name: 'Texte des Dates',
                    category: 'text',
                    props: {
                      text: program.datesListText || 'Dates communiquées lors de l’inscription.',
                    },
                    style: {
                      desktop: {
                        fontSize: '14px',
                        color: '#365024',
                        lineHeight: '1.6',
                        marginBottom: '16px',
                      },
                    },
                    settings: { visible: true, locked: false },
                  },
                  {
                    id: `hours_p_${program.slug}`,
                    type: 'paragraph',
                    name: 'Heures Montréal & Paris',
                    category: 'text',
                    props: {
                      text: `⏰ Horaires : ${program.montrealTime || '13h Montréal'} • ${program.parisTime || '19h Paris'}`,
                    },
                    style: {
                      desktop: {
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#651011',
                      },
                    },
                    settings: { visible: true, locked: false },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
