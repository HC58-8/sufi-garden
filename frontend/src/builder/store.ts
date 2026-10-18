import { useSyncExternalStore } from 'react';
import { BreakpointMode, ComponentNode, PageSchema, NavLinkItem, FooterLinkItem } from './types';
import { COMPONENT_REGISTRY } from './registry';
import { ALL_INITIAL_PAGES, generateProgramPageSchema } from './defaultPages';

const API_BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001';

export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { id: 'nav_1', label: 'Accueil', href: '/', active: true, order: 1 },
  { id: 'nav_2', label: 'Programmes', href: '/programming-1', active: true, order: 2 },
  { id: 'nav_3', label: 'Le Gîte', href: '/domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi', active: true, order: 3 },
  { id: 'nav_4', label: 'À propos', href: '/about', active: true, order: 4 },
  { id: 'nav_5', label: 'Contact', href: '/contact-us', active: true, order: 5 },
  { id: 'nav_6', label: 'Faire un don', href: '/support-us', active: true, order: 6 },
];

export const DEFAULT_FOOTER_LINKS: FooterLinkItem[] = [
  { id: 'foot_1', column: 'Navigation', label: 'Accueil', href: '/' },
  { id: 'foot_2', column: 'Navigation', label: 'Programmes & Séminaires', href: '/programming-1' },
  { id: 'foot_3', column: 'Navigation', label: 'Le Gîte du Vivant', href: '/domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi' },
  { id: 'foot_4', column: 'Ressources', label: 'À Propos & Vision', href: '/about' },
  { id: 'foot_5', column: 'Ressources', label: 'Contactez-Nous', href: '/contact-us' },
  { id: 'foot_6', column: 'Soutien', label: 'Faire un don (Zeffy)', href: '/support-us' },
];

// Broadcast helper for real-time live sync across browser tabs
function broadcastState(state: any) {
  if (typeof window !== 'undefined') {
    try {
      const channel = new BroadcastChannel('sg_cms_live_sync');
      channel.postMessage({ type: 'SYNC_STATE', payload: state });
      localStorage.setItem('sg_cms_active_schema', JSON.stringify(state.pages));
      localStorage.setItem('sg_header_nav_links', JSON.stringify(state.headerNavLinks));
      if (Array.isArray(state.pages)) {
        for (const p of state.pages) {
          const key = p.slug === 'home' || !p.slug ? 'home' : p.slug.replace(/^\//, '').replace(/\//g, '-');
          localStorage.setItem(`sg_page_${key}`, JSON.stringify(p));
        }
      }
    } catch (err) {
      // Fallback
    }
  }
}

// Self-contained Zustand-compatible store creator with Real-Time Cross-Tab Broadcast Sync
function createStore<T>(createState: (set: (partial: any) => void, get: () => T) => T) {
  let state: T;
  const listeners = new Set<() => void>();

  const get = () => state;
  const set = (partial: any) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (nextState && typeof nextState === 'object') {
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener());
      broadcastState(state);
    }
  };

  state = createState(set, get);

  const useStore = () => {
    return useSyncExternalStore(
      (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      () => state,
      () => state
    );
  };

  Object.assign(useStore, {
    getState: get,
    setState: set,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  });

  return useStore as () => T;
}


export interface EditorState {
  pages: PageSchema[];
  currentPageId: string;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  breakpoint: BreakpointMode;
  previewMode: boolean;
  isSaving: boolean;
  history: {
    past: ComponentNode[][];
    future: ComponentNode[][];
  };

  // Actions
  setBreakpoint: (mode: BreakpointMode) => void;
  setPreviewMode: (enabled: boolean) => void;
  setCurrentPage: (pageId: string) => void;
  selectNode: (nodeId: string | null) => void;
  hoverNode: (nodeId: string | null) => void;

  // History Actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Node Mutation Actions
  updateNodeProps: (nodeId: string, props: Record<string, any>) => void;
  updateNodeStyle: (nodeId: string, style: Record<string, any>, breakpoint?: BreakpointMode) => void;
  updateNodeSettings: (nodeId: string, settings: Partial<ComponentNode['settings']>) => void;
  updateNodeActions: (nodeId: string, actions: ComponentNode['actions']) => void;
  updateNodeAnimation: (nodeId: string, animation: ComponentNode['animation']) => void;
  addNode: (type: string, parentId?: string | null, targetIndex?: number) => void;
  removeNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  moveNode: (nodeId: string, direction: 'up' | 'down') => void;
  toggleNodeVisible: (nodeId: string) => void;
  toggleNodeLock: (nodeId: string) => void;

  // Carousel Slide Actions
  addCarouselSlide: (nodeId: string) => void;
  removeCarouselSlide: (nodeId: string, slideId: string) => void;
  updateCarouselSlide: (nodeId: string, slideId: string, slideData: Record<string, any>) => void;
  reorderCarouselSlides: (nodeId: string, fromIndex: number, toIndex: number) => void;

  // Page Management
  createPage: (title: string, slug: string) => void;
  deletePage: (pageId: string) => void;
  updatePageSeo: (pageId: string, seo: Partial<PageSchema['seo']>) => void;
  saveDraft: () => void;
  publishPage: () => void;

  // Formations / Programmes CMS Generation
  addOrUpdateProgramPage: (program: any) => PageSchema;

  // Backend Persistence
  savePageToBackend: (pageId?: string) => Promise<boolean>;
  loadPagesFromBackend: () => Promise<void>;

  // Navigation & Menus Manager
  headerNavLinks: NavLinkItem[];
  footerNavLinks: FooterLinkItem[];
  setHeaderNavLinks: (links: NavLinkItem[]) => void;
  addHeaderNavLink: (link: Omit<NavLinkItem, 'id' | 'order'>) => void;
  updateHeaderNavLink: (id: string, updates: Partial<NavLinkItem>) => void;
  removeHeaderNavLink: (id: string) => void;
  reorderHeaderNavLinks: (fromIndex: number, toIndex: number) => void;
  saveNavigationToBackend: () => Promise<boolean>;
  addCurrentPageToNav: () => void;
}

// Helper to deeply update a node in the component tree
function updateNodeInTree(
  nodes: ComponentNode[],
  nodeId: string,
  updater: (node: ComponentNode) => ComponentNode
): ComponentNode[] {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return updater(node);
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateNodeInTree(node.children, nodeId, updater),
      };
    }
    return node;
  });
}

// Helper to remove a node from the component tree
function removeNodeFromTree(nodes: ComponentNode[], nodeId: string): ComponentNode[] {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: removeNodeFromTree(node.children, nodeId),
        };
      }
      return node;
    });
}

// Helper to find a parent array & index
function findNodeAndParent(
  nodes: ComponentNode[],
  nodeId: string,
  parentNodes: ComponentNode[] = nodes
): { node: ComponentNode; parent: ComponentNode[]; index: number } | null {
  for (let i = 0; i < nodes.length; i++) {
    const current = nodes[i];
    if (current.id === nodeId) {
      return { node: current, parent: nodes, index: i };
    }
    const currentChildren = current.children;
    if (currentChildren && currentChildren.length > 0) {
      const result = findNodeAndParent(currentChildren, nodeId, currentChildren);
      if (result) return result;
    }
  }
  return null;
}

export const useEditorStore = createStore<EditorState>((set, get) => ({
  pages: ALL_INITIAL_PAGES,
  headerNavLinks: DEFAULT_NAV_LINKS,
  footerNavLinks: DEFAULT_FOOTER_LINKS,
  currentPageId: 'page_home',
  selectedNodeId: 'home_hero_h1',
  hoveredNodeId: null,
  breakpoint: 'desktop',
  previewMode: false,
  isSaving: false,
  history: {
    past: [],
    future: [],
  },

  setBreakpoint: (mode) => set({ breakpoint: mode }),
  setPreviewMode: (enabled) => set({ previewMode: enabled }),
  setCurrentPage: (pageId) => {
    const page = get().pages.find((p) => p.id === pageId);
    if (page) {
      set({
        currentPageId: pageId,
        selectedNodeId: page.rootNodes[0]?.id || null,
        history: { past: [], future: [] },
      });
    }
  },
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  hoverNode: (nodeId) => set({ hoveredNodeId: nodeId }),

  canUndo: () => get().history.past.length > 0,
  canRedo: () => get().history.future.length > 0,

  undo: () => {
    const { history, pages, currentPageId } = get();
    if (history.past.length === 0) return;
    const previousNodes = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    const currentPage = pages.find((p) => p.id === currentPageId);

    if (currentPage) {
      const newFuture = [currentPage.rootNodes, ...history.future];
      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, rootNodes: previousNodes } : p
      );
      set({
        pages: updatedPages,
        history: { past: newPast, future: newFuture },
      });
    }
  },

  redo: () => {
    const { history, pages, currentPageId } = get();
    if (history.future.length === 0) return;
    const nextNodes = history.future[0];
    const newFuture = history.future.slice(1);
    const currentPage = pages.find((p) => p.id === currentPageId);

    if (currentPage) {
      const newPast = [...history.past, currentPage.rootNodes];
      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, rootNodes: nextNodes } : p
      );
      set({
        pages: updatedPages,
        history: { past: newPast, future: newFuture },
      });
    }
  },

  updateNodeProps: (nodeId, newProps) => {
    const { pages, currentPageId, history } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const newPast = [...history.past, currentPage.rootNodes];
    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => ({
      ...node,
      props: { ...node.props, ...newProps },
    }));

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
      history: { past: newPast, future: [] },
    });
  },

  updateNodeStyle: (nodeId, styleOverride, breakpoint) => {
    const { pages, currentPageId, history, breakpoint: currentBreakpoint } = get();
    const targetBreakpoint = breakpoint || currentBreakpoint;
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const newPast = [...history.past, currentPage.rootNodes];
    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => ({
      ...node,
      style: {
        ...node.style,
        [targetBreakpoint]: {
          ...(node.style[targetBreakpoint] || {}),
          ...styleOverride,
        },
      },
    }));

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
      history: { past: newPast, future: [] },
    });
  },

  updateNodeSettings: (nodeId, settingsOverride) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => ({
      ...node,
      settings: { ...node.settings, ...settingsOverride },
    }));

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  updateNodeActions: (nodeId, actionsConfig) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => ({
      ...node,
      actions: actionsConfig,
    }));

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  updateNodeAnimation: (nodeId, animationConfig) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => ({
      ...node,
      animation: animationConfig,
    }));

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  addNode: (type, parentId, targetIndex) => {
    const meta = COMPONENT_REGISTRY[type];
    if (!meta) return;

    const { pages, currentPageId, history, selectedNodeId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const newNode: ComponentNode = {
      id: `node_${type}_${Date.now()}`,
      type: meta.type,
      name: meta.name,
      category: meta.category,
      props: JSON.parse(JSON.stringify(meta.defaultProps)),
      style: JSON.parse(JSON.stringify(meta.defaultStyle)),
      settings: { visible: true, locked: false },
      children: meta.allowedChildren ? [] : undefined,
    };

    const newPast = [...history.past, currentPage.rootNodes];
    let updatedNodes: ComponentNode[];

    const effectiveParentId = parentId !== undefined ? parentId : selectedNodeId;

    if (effectiveParentId) {
      const parentResult = findNodeAndParent(currentPage.rootNodes, effectiveParentId);
      if (parentResult && parentResult.node.children) {
        updatedNodes = updateNodeInTree(currentPage.rootNodes, effectiveParentId, (pNode) => ({
          ...pNode,
          children: [...(pNode.children || []), newNode],
        }));
      } else {
        updatedNodes = [...currentPage.rootNodes, newNode];
      }
    } else {
      updatedNodes = [...currentPage.rootNodes, newNode];
    }

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
      selectedNodeId: newNode.id,
      history: { past: newPast, future: [] },
    });
  },

  removeNode: (nodeId) => {
    const { pages, currentPageId, history } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const newPast = [...history.past, currentPage.rootNodes];
    const updatedNodes = removeNodeFromTree(currentPage.rootNodes, nodeId);

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
      selectedNodeId: null,
      history: { past: newPast, future: [] },
    });
  },

  duplicateNode: (nodeId) => {
    const { pages, currentPageId, history } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const target = findNodeAndParent(currentPage.rootNodes, nodeId);
    if (!target) return;

    const duplicateDeep = (node: ComponentNode): ComponentNode => ({
      ...JSON.parse(JSON.stringify(node)),
      id: `node_${node.type}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: `${node.name} (Copy)`,
      children: node.children ? node.children.map(duplicateDeep) : undefined,
    });

    const duplicated = duplicateDeep(target.node);
    const newPast = [...history.past, currentPage.rootNodes];

    target.parent.splice(target.index + 1, 0, duplicated);

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: [...currentPage.rootNodes] } : p)),
      selectedNodeId: duplicated.id,
      history: { past: newPast, future: [] },
    });
  },

  moveNode: (nodeId, direction) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const target = findNodeAndParent(currentPage.rootNodes, nodeId);
    if (!target) return;

    const newIdx = direction === 'up' ? target.index - 1 : target.index + 1;
    if (newIdx < 0 || newIdx >= target.parent.length) return;

    const temp = target.parent[target.index];
    target.parent[target.index] = target.parent[newIdx];
    target.parent[newIdx] = temp;

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: [...currentPage.rootNodes] } : p)),
    });
  },

  toggleNodeVisible: (nodeId) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => ({
      ...node,
      settings: { ...node.settings, visible: !node.settings.visible },
    }));

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  toggleNodeLock: (nodeId) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => ({
      ...node,
      settings: { ...node.settings, locked: !node.settings.locked },
    }));

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  addCarouselSlide: (nodeId) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => {
      const slides = node.props.slides || [];
      const newSlide = {
        id: `slide_${Date.now()}`,
        title: `Nouvelle Diapositive ${slides.length + 1}`,
        subtitle: 'Sous-titre explicatif',
        description: 'Description détaillée de votre retraite ou inspiration.',
        image: 'https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png',
        buttonText: 'Je veux participer',
        buttonUrl: '/programming-1',
      };
      return {
        ...node,
        props: {
          ...node.props,
          slides: [...slides, newSlide],
        },
      };
    });

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  removeCarouselSlide: (nodeId, slideId) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => {
      const slides = (node.props.slides || []).filter((s: any) => s.id !== slideId);
      return {
        ...node,
        props: { ...node.props, slides },
      };
    });

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  updateCarouselSlide: (nodeId, slideId, slideData) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => {
      const slides = (node.props.slides || []).map((s: any) =>
        s.id === slideId ? { ...s, ...slideData } : s
      );
      return {
        ...node,
        props: { ...node.props, slides },
      };
    });

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  reorderCarouselSlides: (nodeId, fromIndex, toIndex) => {
    const { pages, currentPageId } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;

    const updatedNodes = updateNodeInTree(currentPage.rootNodes, nodeId, (node) => {
      const slides = [...(node.props.slides || [])];
      if (fromIndex >= 0 && fromIndex < slides.length && toIndex >= 0 && toIndex < slides.length) {
        const item = slides.splice(fromIndex, 1)[0];
        slides.splice(toIndex, 0, item);
      }
      return {
        ...node,
        props: { ...node.props, slides },
      };
    });

    set({
      pages: pages.map((p) => (p.id === currentPageId ? { ...p, rootNodes: updatedNodes } : p)),
    });
  },

  createPage: (title, slug) => {
    const newPage: PageSchema = {
      id: `page_${Date.now()}`,
      title,
      slug: slug.startsWith('/') ? slug : `/${slug}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        title: `${title} | Jardin Soufi`,
        metaDescription: `Découvrez la page ${title} du Jardin Soufi.`,
      },
      rootNodes: [
        {
          id: `node_sec_${Date.now()}`,
          type: 'section',
          name: 'Hero Section',
          category: 'layout',
          props: {},
          style: {
            desktop: {
              backgroundColor: '#365024',
              color: '#FDFBF6',
              paddingTop: '60px',
              paddingBottom: '60px',
              paddingLeft: '24px',
              paddingRight: '24px',
            },
          },
          settings: { visible: true, locked: false },
          children: [
            {
              id: `node_h_${Date.now()}`,
              type: 'heading',
              name: 'Heading',
              category: 'text',
              props: { text: title, level: 'h1' },
              style: {
                desktop: {
                  fontSize: '36px',
                  fontFamily: 'Playfair Display, serif',
                  color: '#FDFBF6',
                  textAlign: 'center',
                },
              },
              settings: { visible: true, locked: false },
            },
          ],
        },
      ],
    };

    set({
      pages: [...get().pages, newPage],
      currentPageId: newPage.id,
      selectedNodeId: newPage.rootNodes[0]?.id || null,
    });
  },

  deletePage: (pageId) => {
    const { pages, currentPageId } = get();
    if (pages.length <= 1) return;
    const remaining = pages.filter((p) => p.id !== pageId);
    const nextActive = currentPageId === pageId ? remaining[0].id : currentPageId;
    set({
      pages: remaining,
      currentPageId: nextActive,
    });
  },

  updatePageSeo: (pageId, seoOverride) => {
    set({
      pages: get().pages.map((p) =>
        p.id === pageId ? { ...p, seo: { ...p.seo, ...seoOverride } } : p
      ),
    });
  },

  saveDraft: () => {
    set({ isSaving: true });
    get().savePageToBackend();
    setTimeout(() => {
      set({ isSaving: false });
    }, 600);
  },

  publishPage: () => {
    const { pages, currentPageId } = get();
    set({
      pages: pages.map((p) =>
        p.id === currentPageId ? { ...p, status: 'published', updatedAt: new Date().toISOString() } : p
      ),
    });
    get().savePageToBackend();
  },

  addOrUpdateProgramPage: (program) => {
    const newPage = generateProgramPageSchema(program);
    const { pages } = get();
    const existingIndex = pages.findIndex(
      (p) => p.id === newPage.id || p.slug === newPage.slug
    );

    let updatedPages: PageSchema[];
    if (existingIndex >= 0) {
      updatedPages = [...pages];
      updatedPages[existingIndex] = {
        ...updatedPages[existingIndex],
        title: newPage.title,
        seo: newPage.seo,
        rootNodes: newPage.rootNodes,
        updatedAt: new Date().toISOString(),
      };
    } else {
      updatedPages = [...pages, newPage];
    }

    set({
      pages: updatedPages,
      currentPageId: newPage.id,
      selectedNodeId: newPage.rootNodes[0]?.id || null,
    });

    // Save automatically to backend
    get().savePageToBackend(newPage.id);

    return newPage;
  },

  savePageToBackend: async (pageId) => {
    const { pages, currentPageId } = get();
    const targetId = pageId || currentPageId;
    const page = pages.find((p) => p.id === targetId);
    if (!page) return false;

    set({ isSaving: true });
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('sg_admin_token') : null;
      const pageKey =
        page.slug === 'home' || !page.slug
          ? 'home'
          : page.slug.replace(/^\//, '').replace(/\//g, '-');

      const res = await fetch(`${API_BASE_URL}/api/pages/${pageKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(page),
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem(`sg_page_${pageKey}`, JSON.stringify(page));
      }

      set({ isSaving: false });
      return res.ok;
    } catch (err) {
      console.warn('Erreur sauvegarde API page:', err);
      set({ isSaving: false });
      return false;
    }
  },

  loadPagesFromBackend: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/pages`);
      if (res.ok) {
        const dbPages = await res.json();
        if (Array.isArray(dbPages) && dbPages.length > 0) {
          const { pages } = get();
          const pageMap = new Map(pages.map((p) => [p.slug, p]));
          for (const item of dbPages) {
            if (item.content && item.content.slug) {
              pageMap.set(item.content.slug, item.content);
            }
          }
          set({ pages: Array.from(pageMap.values()) });
        }
      }
    } catch (err) {
      console.warn('Fallback local pages:', err);
    }
  },

  setHeaderNavLinks: (links) => {
    set({ headerNavLinks: links });
    if (typeof window !== 'undefined') {
      localStorage.setItem('sg_header_nav_links', JSON.stringify(links));
    }
  },

  addHeaderNavLink: (link) => {
    const { headerNavLinks } = get();
    const newLink: NavLinkItem = {
      id: `nav_${Date.now()}`,
      order: headerNavLinks.length + 1,
      ...link,
    };
    const updated = [...headerNavLinks, newLink];
    set({ headerNavLinks: updated });
    get().saveNavigationToBackend();
  },

  updateHeaderNavLink: (id, updates) => {
    const { headerNavLinks } = get();
    const updated = headerNavLinks.map((l) => (l.id === id ? { ...l, ...updates } : l));
    set({ headerNavLinks: updated });
    get().saveNavigationToBackend();
  },

  removeHeaderNavLink: (id) => {
    const { headerNavLinks } = get();
    const updated = headerNavLinks.filter((l) => l.id !== id);
    set({ headerNavLinks: updated });
    get().saveNavigationToBackend();
  },

  reorderHeaderNavLinks: (fromIndex, toIndex) => {
    const { headerNavLinks } = get();
    const links = [...headerNavLinks];
    if (fromIndex >= 0 && fromIndex < links.length && toIndex >= 0 && toIndex < links.length) {
      const item = links.splice(fromIndex, 1)[0];
      links.splice(toIndex, 0, item);
      const reordered = links.map((l, i) => ({ ...l, order: i + 1 }));
      set({ headerNavLinks: reordered });
      get().saveNavigationToBackend();
    }
  },

  saveNavigationToBackend: async () => {
    const { headerNavLinks, footerNavLinks } = get();
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('sg_admin_token') : null;
      const res = await fetch(`${API_BASE_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          header_nav_links: JSON.stringify(headerNavLinks),
          footer_nav_links: JSON.stringify(footerNavLinks),
        }),
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('sg_header_nav_links', JSON.stringify(headerNavLinks));
        localStorage.setItem('sg_footer_nav_links', JSON.stringify(footerNavLinks));
      }
      return res.ok;
    } catch (err) {
      console.warn('Erreur sauvegarde navigation:', err);
      return false;
    }
  },

  addCurrentPageToNav: () => {
    const { pages, currentPageId, headerNavLinks } = get();
    const currentPage = pages.find((p) => p.id === currentPageId);
    if (!currentPage) return;
    const exists = headerNavLinks.some((l) => l.href === currentPage.slug);
    if (!exists) {
      get().addHeaderNavLink({
        label: currentPage.title.replace(/^Formation:\s*/, ''),
        href: currentPage.slug,
        active: true,
      });
    }
  },
}));
