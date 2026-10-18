'use client';

import { useState, useEffect } from 'react';
import { PageSchema, ComponentNode } from './types';
import { PAGE_HOME, PAGE_ABOUT, PAGE_GITE, PAGE_PROGRAMS, PAGE_CONTACT, PAGE_SUPPORT } from './richDefaultPages';

const FALLBACK_MAP: Record<string, PageSchema> = {
  home: PAGE_HOME,
  about: PAGE_ABOUT,
  gite: PAGE_GITE,
  'domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi': PAGE_GITE,
  programs: PAGE_PROGRAMS,
  'programming-1': PAGE_PROGRAMS,
  'contact-us': PAGE_CONTACT,
  'support-us': PAGE_SUPPORT,
};

const API_BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001';

// Recursively find a node by ID in the tree
function findNodeById(nodes: ComponentNode[], id: string): ComponentNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function useCmsPage(pageKey: string = 'home') {
  const fallback = FALLBACK_MAP[pageKey] || PAGE_HOME;
  const [page, setPage] = useState<PageSchema>(fallback);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check localStorage first
    try {
      const cached = localStorage.getItem(`sg_page_${pageKey}`);
      if (cached) {
        setPage(JSON.parse(cached));
      }
    } catch {}

    // 2. Fetch from backend API
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/pages/${pageKey}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.content && data.content.rootNodes) {
            setPage(data.content);
            localStorage.setItem(`sg_page_${pageKey}`, JSON.stringify(data.content));
          }
        }
      } catch (e) {
        // Fallback silently kept
      }
    };

    fetchPage();

    // 3. Listen to live sync broadcast
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('sg_cms_live_sync');
      channel.onmessage = (event) => {
        if (event.data?.payload?.pages) {
          const cleanTarget = pageKey.replace(/^\//, '');
          const matched = event.data.payload.pages.find((p: PageSchema) => {
            const cleanSlug = p.slug ? p.slug.replace(/^\//, '') : '';
            if (cleanTarget === 'home') return cleanSlug === 'home' || cleanSlug === '' || p.id === 'page_home';
            if (cleanTarget === 'programming-1' || cleanTarget === 'programs') {
              return cleanSlug === 'programming-1' || cleanSlug === 'programs' || p.id === 'page_programs';
            }
            if (cleanTarget === 'domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi' || cleanTarget === 'gite') {
              return cleanSlug === 'domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi' || cleanSlug === 'gite' || p.id === 'page_gite';
            }
            if (cleanTarget === 'about') return cleanSlug === 'about' || p.id === 'page_about';
            if (cleanTarget === 'contact-us') return cleanSlug === 'contact-us' || p.id === 'page_contact';
            if (cleanTarget === 'support-us') return cleanSlug === 'support-us' || p.id === 'page_support';
            return cleanSlug === cleanTarget || p.id === `page_${cleanTarget.replace(/-/g, '_')}`;
          });
          if (matched) {
            setPage(matched);
          }
        }
      };
    } catch {}

    return () => {
      if (channel) channel.close();
    };
  }, [pageKey]);

  // Helper getters
  const getText = (nodeId: string, defaultText: string): string => {
    if (!page?.rootNodes) return defaultText;
    const node = findNodeById(page.rootNodes, nodeId);
    return node?.props?.text !== undefined ? node.props.text : defaultText;
  };

  const getImage = (nodeId: string, defaultUrl: string): string => {
    if (!page?.rootNodes) return defaultUrl;
    const node = findNodeById(page.rootNodes, nodeId);
    return node?.props?.url !== undefined ? node.props.url : defaultUrl;
  };

  const getLink = (nodeId: string, defaultLink: string): string => {
    if (!page?.rootNodes) return defaultLink;
    const node = findNodeById(page.rootNodes, nodeId);
    return node?.actions?.value || node?.props?.link || defaultLink;
  };

  const getQuote = (nodeId: string, defaultQuote: { text: string; author?: string }) => {
    if (!page?.rootNodes) return defaultQuote;
    const node = findNodeById(page.rootNodes, nodeId);
    if (!node) return defaultQuote;
    return {
      text: node.props?.text || defaultQuote.text,
      author: node.props?.author || defaultQuote.author,
    };
  };

  return {
    page,
    getText,
    getImage,
    getLink,
    getQuote,
  };
}
