'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../store';
import { NodeRenderer } from '../renderers/NodeRenderer';
import { ComponentNode } from '../types';
import { Monitor, Laptop, Tablet, Smartphone, ZoomIn, ZoomOut, Maximize2, Grid, Sliders, ChevronDown } from 'lucide-react';

export const CenterCanvas: React.FC = () => {
  const { pages, currentPageId, breakpoint, previewMode, selectNode } = useEditorStore();
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [showRulers, setShowRulers] = useState<boolean>(true);

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const rootNodes = currentPage?.rootNodes || [];

  // Device frame width and resolution specs
  const getCanvasSpecs = () => {
    switch (breakpoint) {
      case 'mobile':
        return { width: 'w-[375px]', label: 'iPhone 15 / Mobile', res: '375 x 812 px', icon: Smartphone };
      case 'tablet':
        return { width: 'w-[768px]', label: 'iPad Air / Tablette', res: '768 x 1024 px', icon: Tablet };
      case 'laptop':
        return { width: 'w-[1024px]', label: 'MacBook Pro 13" / Laptop', res: '1024 x 768 px', icon: Laptop };
      case 'desktop':
      default:
        return { width: 'w-full max-w-[1280px]', label: 'iMac / Desktop Ultra-Wide', res: '1280 x 900 px', icon: Monitor };
    }
  };

  const specs = getCanvasSpecs();
  const IconComp = specs.icon;

  return (
    <main
      onClick={() => selectNode(null)}
      className="flex-1 bg-[#111A0E] overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-start h-[calc(100vh-65px)] relative select-none font-inter scrollbar-thin scrollbar-thumb-softGold/30 scrollbar-track-forestGreen-dark/40"
    >
      {/* Canvas Studio Bar: Resolution Badge & Zoom Controls */}
      <div className="w-full max-w-[1280px] mb-4 flex items-center justify-between px-4 py-2 rounded-2xl bg-forestGreen-dark/90 border border-softGold/30 text-ivory text-xs shadow-lg backdrop-blur-md sticky top-0 z-40">
        {/* Device & Resolution Indicator */}
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-lg bg-bordeaux text-softGold border border-softGold/30">
            <IconComp size={14} />
          </div>
          <div>
            <span className="font-bold text-xs text-ivory block leading-none">{specs.label}</span>
            <span className="text-[10px] text-softGold font-mono mt-0.5 block">{specs.res}</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex items-center space-x-2 bg-ivory/10 px-3 py-1 rounded-full border border-ivory/20 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-ivory">Défilement Complet (Full Screen Scroll)</span>
          <ChevronDown size={12} className="text-softGold animate-bounce" />
        </div>

        {/* Zoom & Ruler Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowRulers(!showRulers)}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all border ${
              showRulers ? 'bg-softGold text-forestGreen-dark border-softGold' : 'bg-ivory/10 text-ivory border-ivory/20'
            }`}
            title="Afficher/Masquer les guides visuels"
          >
            <Grid size={14} />
          </button>

          <div className="flex items-center space-x-1 bg-ivory/10 px-2 py-1 rounded-lg border border-ivory/20 font-mono text-[11px]">
            <button
              onClick={() => setZoomScale((prev) => Math.max(50, prev - 10))}
              className="p-0.5 hover:text-softGold text-ivory/80"
              title="Zoom Arrière"
            >
              <ZoomOut size={13} />
            </button>
            <span className="px-1.5 font-bold text-softGold">{zoomScale}%</span>
            <button
              onClick={() => setZoomScale((prev) => Math.min(150, prev + 10))}
              className="p-0.5 hover:text-softGold text-ivory/80"
              title="Zoom Avant"
            >
              <ZoomIn size={13} />
            </button>
            <button
              onClick={() => setZoomScale(100)}
              className="p-0.5 hover:text-softGold text-ivory/80 ml-1 border-l border-ivory/20 pl-1"
              title="Reinitialiser Zoom 100%"
            >
              <Maximize2 size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Full Height Responsive Frame Container with Scrollable Page Content */}
      <div
        style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: 'top center' }}
        className={`bg-ivory dark:bg-forestGreen-dark shadow-2xl rounded-3xl transition-all duration-300 min-h-full h-auto overflow-y-auto relative border-2 border-softGold/40 ${specs.width} ${
          showRulers ? 'bg-grid-pattern' : ''
        }`}
      >
        {rootNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center px-6 space-y-4">
            <div className="p-5 bg-bordeaux text-softGold rounded-3xl border border-softGold/40 shadow-2xl animate-bounce">
              <Sliders size={28} />
            </div>
            <h3 className="font-playfair text-3xl font-extrabold text-forestGreen dark:text-ivory">
              Page prête pour le Builder
            </h3>
            <p className="text-xs text-sage max-w-md leading-relaxed font-medium">
              Glissez ou cliquez sur un composant dans la palette latérale gauche pour composer votre page en direct.
            </p>
          </div>
        ) : (
          rootNodes.map((node: ComponentNode) => <NodeRenderer key={node.id} node={node} />)
        )}
      </div>
    </main>
  );
};
