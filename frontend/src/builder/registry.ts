import { ComponentMeta, ComponentCategory } from './types';

export const COMPONENT_REGISTRY: Record<string, ComponentMeta> = {
  // 1. LAYOUT COMPONENTS
  section: {
    type: 'section',
    name: 'Section',
    category: 'layout',
    icon: 'LayoutSelect',
    description: 'Enclosure section with full-width or boxed background.',
    defaultProps: {
      tag: 'section',
    },
    defaultStyle: {
      desktop: {
        paddingTop: '60px',
        paddingBottom: '60px',
        paddingLeft: '24px',
        paddingRight: '24px',
        backgroundColor: '#365024',
        color: '#FDFBF6',
        width: '100%',
        minHeight: '200px',
      },
    },
    allowedChildren: true,
  },
  container: {
    type: 'container',
    name: 'Container',
    category: 'layout',
    icon: 'Box',
    description: 'Centered content container with max-width limits.',
    defaultProps: {},
    defaultStyle: {
      desktop: {
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '16px',
        paddingRight: '16px',
        width: '100%',
      },
    },
    allowedChildren: true,
  },
  flex: {
    type: 'flex',
    name: 'Flex Container',
    category: 'layout',
    icon: 'Columns3',
    description: 'Flexbox container for row/column layouts.',
    defaultProps: {
      direction: 'row',
      wrap: 'wrap',
    },
    defaultStyle: {
      desktop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
      },
      mobile: {
        flexDirection: 'column',
      },
    },
    allowedChildren: true,
  },
  grid: {
    type: 'grid',
    name: 'Grid',
    category: 'layout',
    icon: 'Grid3X3',
    description: 'CSS Grid container with configurable columns.',
    defaultProps: {
      columns: 3,
    },
    defaultStyle: {
      desktop: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        width: '100%',
      },
      tablet: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      mobile: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
    allowedChildren: true,
  },
  card: {
    type: 'card',
    name: 'Card Wrapper',
    category: 'layout',
    icon: 'CreditCard',
    description: 'Bordered card box with shadow and rounded corners.',
    defaultProps: {},
    defaultStyle: {
      desktop: {
        padding: '24px',
        backgroundColor: '#FDFBF6',
        color: '#365024',
        borderRadius: '16px',
        borderWidth: '1px',
        borderColor: 'rgba(118, 134, 103, 0.3)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      },
    },
    allowedChildren: true,
  },
  spacer: {
    type: 'spacer',
    name: 'Spacer',
    category: 'layout',
    icon: 'ArrowUpDown',
    description: 'Vertical spacing block.',
    defaultProps: {},
    defaultStyle: {
      desktop: {
        height: '40px',
        width: '100%',
      },
    },
    allowedChildren: false,
  },
  divider: {
    type: 'divider',
    name: 'Divider Line',
    category: 'layout',
    icon: 'Minus',
    description: 'Horizontal separator line.',
    defaultProps: {},
    defaultStyle: {
      desktop: {
        marginTop: '24px',
        marginBottom: '24px',
        borderTopWidth: '1px',
        borderTopColor: 'rgba(201, 163, 90, 0.4)',
        width: '100%',
      },
    },
    allowedChildren: false,
  },

  // 2. TEXT COMPONENTS
  heading: {
    type: 'heading',
    name: 'Heading (H1-H6)',
    category: 'text',
    icon: 'Heading',
    description: 'SEO Heading title tag.',
    defaultProps: {
      text: 'Méditer la nature. Habiter la présence.',
      level: 'h2',
    },
    defaultStyle: {
      desktop: {
        fontFamily: 'Playfair Display, serif',
        fontSize: '36px',
        fontWeight: '700',
        color: '#FDFBF6',
        lineHeight: '1.2',
        textAlign: 'left',
        marginBottom: '16px',
      },
      tablet: {
        fontSize: '28px',
      },
      mobile: {
        fontSize: '24px',
      },
    },
  },
  paragraph: {
    type: 'paragraph',
    name: 'Paragraph',
    category: 'text',
    icon: 'AlignLeft',
    description: 'Body text paragraph.',
    defaultProps: {
      text: 'Le Jardin Soufi accompagne cette renaissance par la méditation, la contemplation, l’écoute et le contact direct avec la forêt et ses cycles.',
    },
    defaultStyle: {
      desktop: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        color: '#FDFBF6',
        lineHeight: '1.6',
        textAlign: 'left',
        marginBottom: '16px',
        opacity: '0.9',
      },
    },
  },
  richText: {
    type: 'richText',
    name: 'Rich Text',
    category: 'text',
    icon: 'FileText',
    description: 'HTML formatted text block with links & bold styling.',
    defaultProps: {
      html: '<p>Un rendez-vous hebdomadaire en ligne pour <strong>explorer la beauté des Noms Divins</strong> à travers la contemplation.</p>',
    },
    defaultStyle: {
      desktop: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
        color: '#FDFBF6',
        lineHeight: '1.6',
      },
    },
  },
  badge: {
    type: 'badge',
    name: 'Badge / Pill',
    category: 'text',
    icon: 'Tag',
    description: 'Category label or status pill.',
    defaultProps: {
      text: 'PROGRAMME EN LIGNE',
    },
    defaultStyle: {
      desktop: {
        display: 'inline-block',
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '12px',
        paddingRight: '12px',
        backgroundColor: '#651011',
        color: '#FDFBF6',
        borderRadius: '9999px',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      },
    },
  },
  quote: {
    type: 'quote',
    name: 'Quote Block',
    category: 'text',
    icon: 'Quote',
    description: 'Spiritual citation or highlight quote.',
    defaultProps: {
      text: '« Nous croyons que la guérison du monde commence par la guérison du regard. »',
      author: 'Shaykh Hamdi Ben Aïssa',
    },
    defaultStyle: {
      desktop: {
        fontFamily: 'Playfair Display, serif',
        fontStyle: 'italic',
        fontSize: '20px',
        color: '#C9A35A',
        borderLeftWidth: '4px',
        borderLeftColor: '#C9A35A',
        paddingLeft: '20px',
        marginTop: '20px',
        marginBottom: '20px',
      },
    },
  },

  // 3. BUTTONS & ACTIONS
  button: {
    type: 'button',
    name: 'Action Button',
    category: 'buttons',
    icon: 'MousePointerClick',
    description: 'Interactive button with link/modal action.',
    defaultProps: {
      text: 'Je veux participer',
      icon: 'ArrowRight',
      iconPosition: 'right',
    },
    defaultStyle: {
      desktop: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        paddingTop: '14px',
        paddingBottom: '14px',
        paddingLeft: '28px',
        paddingRight: '28px',
        backgroundColor: '#651011',
        color: '#FDFBF6',
        borderRadius: '9999px',
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        borderWidth: '1px',
        borderColor: 'rgba(201, 163, 90, 0.4)',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
      },
    },
  },
  iconButton: {
    type: 'iconButton',
    name: 'Icon Button',
    category: 'buttons',
    icon: 'CircleDot',
    description: 'Circular icon button.',
    defaultProps: {
      icon: 'Heart',
    },
    defaultStyle: {
      desktop: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: '#9A5C19',
        color: '#FDFBF6',
        cursor: 'pointer',
      },
    },
  },

  // 4. MEDIA COMPONENTS
  image: {
    type: 'image',
    name: 'Image',
    category: 'media',
    icon: 'Image',
    description: 'High-res image with alt text and aspect ratio controls.',
    defaultProps: {
      url: 'https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg',
      alt: 'Forêt du Domaine du Vivant',
      objectFit: 'cover',
      aspectRatio: '16/9',
    },
    defaultStyle: {
      desktop: {
        width: '100%',
        height: 'auto',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      },
    },
  },
  gallery: {
    type: 'gallery',
    name: 'Image Gallery',
    category: 'media',
    icon: 'Images',
    description: 'Multi-image grid gallery.',
    defaultProps: {
      images: [
        'https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg',
        'https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png',
        'https://static.wixstatic.com/media/9b3551_603242551bc04683b69990ca91ab0648~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Balade%20M%C3%A9ditative.png',
      ],
      columns: 3,
    },
    defaultStyle: {
      desktop: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        width: '100%',
      },
      mobile: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
  },
  video: {
    type: 'video',
    name: 'Video Player',
    category: 'media',
    icon: 'Video',
    description: 'YouTube / Vimeo / MP4 Video player.',
    defaultProps: {
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      autoplay: false,
      loop: false,
    },
    defaultStyle: {
      desktop: {
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '16px',
        overflow: 'hidden',
      },
    },
  },

  // 5. CAROUSEL / SLIDER
  carousel: {
    type: 'carousel',
    name: 'Carousel / Slider Pro',
    category: 'carousel',
    icon: 'SlidersHorizontal',
    description: 'Configurable slider with slide management and animations.',
    defaultProps: {
      autoplay: true,
      autoplayDelay: 4000,
      loop: true,
      arrows: true,
      dots: true,
      animation: 'slide',
      slidesPerViewDesktop: 3,
      slidesPerViewTablet: 2,
      slidesPerViewMobile: 1,
      slides: [
        {
          id: 'slide_1',
          title: 'Les Inspirations du Vendredi',
          subtitle: 'En ligne (Zoom) • 13h Montréal / 19h Paris',
          description: 'Explorer les Noms Divins à travers la contemplation et le silence.',
          image: 'https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png',
          buttonText: 'Je veux participer',
          buttonUrl: '/programming-1/inspirations-du-vendredi',
        },
        {
          id: 'slide_2',
          title: 'Les Balades Méditatives',
          subtitle: 'Présentiel au Domaine du Vivant',
          description: 'Marcher ensemble. Respirer la forêt. Habiter le silence.',
          image: 'https://static.wixstatic.com/media/9b3551_603242551bc04683b69990ca91ab0648~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Balade%20M%C3%A9ditative.png',
          buttonText: 'Découvrir la Balade',
          buttonUrl: '/programming-1/balades-meditatives',
        },
        {
          id: 'slide_3',
          title: 'Nouveau Regard sur la Création',
          subtitle: 'Séminaire Immersif',
          description: 'Une école du souffle et du silence où la nature devient miroir de l’âme.',
          image: 'https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg',
          buttonText: 'Voir les Détails',
          buttonUrl: '/programming-1/nouveau-regard',
        },
      ],
    },
    defaultStyle: {
      desktop: {
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '20px',
      },
    },
  },

  // 6. NAVIGATION COMPONENTS
  navbar: {
    type: 'navbar',
    name: 'Navbar Header',
    category: 'navigation',
    icon: 'Menu',
    description: 'Header navigation bar with logo and menu items.',
    defaultProps: {
      logoText: 'JARDIN SOUFI',
      subtitle: "L'Institut du Vivant",
      logoUrl: '/images/logo.png',
      items: [
        { id: 'n1', label: 'Accueil', path: '/' },
        { id: 'n2', label: 'Programmes', path: '/programming-1' },
        { id: 'n3', label: 'Le Gîte', path: '/domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi' },
        { id: 'n4', label: 'À Propos', path: '/about' },
        { id: 'n5', label: 'Contact', path: '/contact-us' },
      ],
    },
    defaultStyle: {
      desktop: {
        width: '100%',
        backgroundColor: '#365024',
        color: '#FDFBF6',
        paddingTop: '16px',
        paddingBottom: '16px',
        borderBottomWidth: '1px',
        borderBottomColor: 'rgba(201, 163, 90, 0.3)',
      },
    },
  },

  // 7. ADVANCED COMPONENTS
  accordion: {
    type: 'accordion',
    name: 'Accordion / FAQ',
    category: 'advanced',
    icon: 'ListCollapse',
    description: 'Collapsible accordion items.',
    defaultProps: {
      items: [
        {
          id: 'acc_1',
          title: 'Qu’est-ce que le Jardin Soufi ?',
          content: 'Le Jardin Soufi est un institut de la contemplation du vivant et de l’écologie intérieure, proposant retraites, séminaires et balades méditatives.',
        },
        {
          id: 'acc_2',
          title: 'Comment participer aux sessions en ligne ?',
          content: 'Toutes nos sessions en ligne ont lieu via Zoom. Les liens de connexion et rediffusions replays sont transmis dès l’inscription sur Zeffy.',
        },
        {
          id: 'acc_3',
          title: 'Avez-vous des options d’aide financière ?',
          content: 'Oui ! Nous croyons que la transmission doit être accessible à tous. Vous pouvez choisir la donation libre ou demander un accès libre.',
        },
      ],
    },
    defaultStyle: {
      desktop: {
        width: '100%',
        backgroundColor: '#FDFBF6',
        color: '#365024',
        borderRadius: '16px',
        padding: '24px',
      },
    },
  },
  testimonialCard: {
    type: 'testimonialCard',
    name: 'Testimonial Card',
    category: 'advanced',
    icon: 'UserCheck',
    description: 'Participant review card.',
    defaultProps: {
      name: 'Claire L.',
      role: 'Participante aux Balades',
      quote: 'Une expérience de paix profonde. Respirer la forêt sauvage du Domaine du Vivant m’a reconnectée à l’essentiel.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    defaultStyle: {
      desktop: {
        padding: '24px',
        backgroundColor: '#FDFBF6',
        color: '#365024',
        borderRadius: '16px',
        borderLeftWidth: '4px',
        borderLeftColor: '#C9A35A',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      },
    },
  },
  pricingTable: {
    type: 'pricingTable',
    name: 'Pricing / Donation Card',
    category: 'advanced',
    icon: 'DollarSign',
    description: 'Donation card with tier features and Zeffy action button.',
    defaultProps: {
      title: 'Donation Libre & Consciente',
      price: 'Don Libre',
      subtitle: 'Billetterie Zeffy (0% de commission)',
      features: [
        'Accès complet aux sessions live Zoom',
        'Accès illimité aux replays vidéo',
        'Support au Domaine du Vivant et la forêt',
        'Bourse d’accès gratuit sur demande',
      ],
      buttonText: 'Soutenir via Zeffy',
      buttonUrl: 'https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world',
    },
    defaultStyle: {
      desktop: {
        padding: '32px',
        backgroundColor: '#365024',
        color: '#FDFBF6',
        borderRadius: '24px',
        borderWidth: '2px',
        borderColor: '#C9A35A',
        textAlign: 'center',
      },
    },
  },

  // 8. FORMS
  formInput: {
    type: 'formInput',
    name: 'Form Field',
    category: 'forms',
    icon: 'SquareCheck',
    description: 'Configurable form text or email input.',
    defaultProps: {
      label: 'Adresse Email',
      placeholder: 'votre@email.com',
      inputType: 'email',
      required: true,
    },
    defaultStyle: {
      desktop: {
        marginBottom: '16px',
        width: '100%',
      },
    },
  },
  formSubmit: {
    type: 'formSubmit',
    name: 'Form Submit Button',
    category: 'forms',
    icon: 'Send',
    description: 'Submit button for custom forms.',
    defaultProps: {
      text: 'Envoyer le Message',
    },
    defaultStyle: {
      desktop: {
        width: '100%',
        paddingTop: '14px',
        paddingBottom: '14px',
        backgroundColor: '#651011',
        color: '#FDFBF6',
        borderRadius: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      },
    },
  },

  // 9. DATA DRIVEN
  dataCollection: {
    type: 'dataCollection',
    name: 'Data Collection Feed',
    category: 'data',
    icon: 'Database',
    description: 'Dynamic database feed for Programs or Blog Posts.',
    defaultProps: {
      dataSource: 'programs', // 'programs' | 'articles' | 'events'
      limit: 6,
      layout: 'grid', // 'grid' | 'list' | 'carousel'
    },
    defaultStyle: {
      desktop: {
        width: '100%',
      },
    },
  },
};
