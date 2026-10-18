'use client';

import { useEffect, useState } from 'react';
import { PageSchema } from './types';

export function useLiveSync(pageSlug: string = 'home') {
  const [livePages, setLivePages] = useState<PageSchema[] | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load initial schema from localStorage
    try {
      const saved = localStorage.getItem('sg_cms_active_schema');
      if (saved) {
        setLivePages(JSON.parse(saved));
      }
    } catch (err) {}

    // Listen to BroadcastChannel for real-time zero-latency updates
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('sg_cms_live_sync');
      channel.onmessage = (event) => {
        if (event.data && event.data.payload && event.data.payload.pages) {
          setLivePages(event.data.payload.pages);
        }
      };
    } catch (e) {}

    // Listen to localStorage storage events
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'sg_cms_active_schema' && e.newValue) {
        try {
          setLivePages(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const activePage = livePages?.find((p) => p.slug === pageSlug || (pageSlug === 'home' && p.id === 'page_home'));
  return { livePages, activePage };
}
