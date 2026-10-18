'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../store';
import { ComponentNode, CarouselSlide } from '../types';
import { 
  Sliders, FileText, Database, Palette, Layout, Smartphone, Sparkles, 
  MousePointerClick, Wrench, Plus, Trash2, Copy, MoveUp, MoveDown, Image as ImageIcon, Check,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Type, Layers
} from 'lucide-react';

export const RightPropertiesPanel: React.FC = () => {
  const {
    pages,
    currentPageId,
    selectedNodeId,
    breakpoint,
    updateNodeProps,
    updateNodeStyle,
    updateNodeSettings,
    updateNodeActions,
    updateNodeAnimation,
    addCarouselSlide,
    removeCarouselSlide,
    updateCarouselSlide,
    reorderCarouselSlides,
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState<'general' | 'content' | 'data' | 'style' | 'layout' | 'responsive' | 'animation' | 'actions'>('content');

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const rootNodes = currentPage?.rootNodes || [];

  // Helper to find selected node in tree
  const findNode = (nodes: ComponentNode[], id: string): ComponentNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedNode = selectedNodeId ? findNode(rootNodes, selectedNodeId) : null;

  // Brand Palette Swatches
  const BRAND_SWATCHES = [
    { name: 'Vert Forêt', color: '#365024' },
    { name: 'Bordeaux', color: '#651011' },
    { name: 'Bronze', color: '#9A5C19' },
    { name: 'Or Doux', color: '#C9A35A' },
    { name: 'Sauge', color: '#768667' },
    { name: 'Ivoire', color: '#FDFBF6' },
  ];

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-forestGreen-dark text-ivory border-l border-softGold/30 p-6 flex flex-col items-center justify-center text-center font-inter h-[calc(100vh-65px)]">
        <div className="p-5 bg-bordeaux/40 rounded-3xl text-softGold mb-3 border border-softGold/30 shadow-lg">
          <Sliders size={26} />
        </div>
        <h4 className="font-playfair text-xl font-bold text-ivory">Inspecteur de Propriétés</h4>
        <p className="text-xs text-sage mt-2 leading-relaxed font-medium">
          Cliquez sur n'importe quel élément dans l'aperçu ou l'arborescence pour modifier son texte, ses couleurs, ses espacements et ses actions.
        </p>
      </aside>
    );
  }

  const currentStyle = selectedNode.style[breakpoint] || selectedNode.style.desktop || {};

  const handleStyleChange = (key: string, value: any) => {
    updateNodeStyle(selectedNode.id, { [key]: value }, breakpoint);
  };

  return (
    <aside className="w-80 bg-forestGreen-dark text-ivory border-l border-softGold/30 flex flex-col h-[calc(100vh-65px)] font-inter">
      {/* Header Symbol Info */}
      <div className="p-4 border-b border-sage/20 bg-ivory/5 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Layers size={14} className="text-softGold" />
            <span className="font-playfair font-bold text-sm text-ivory block truncate">{selectedNode.name}</span>
          </div>
          <span className="text-[9px] uppercase font-bold text-softGold font-mono mt-0.5 block">
            Type: {selectedNode.type} &bull; Breakpoint: {breakpoint.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Dynamic Tabs Bar */}
      <div className="flex overflow-x-auto border-b border-sage/20 bg-ivory/5 p-1.5 gap-1 scrollbar-none">
        {[
          { id: 'content', label: 'Contenu', icon: FileText },
          { id: 'style', label: 'Style Pro', icon: Palette },
          { id: 'layout', label: 'Mise en Page', icon: Layout },
          { id: 'actions', label: 'Actions', icon: MousePointerClick },
          { id: 'responsive', label: 'Responsive', icon: Smartphone },
          { id: 'general', label: 'Général', icon: Wrench },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center space-x-1 ${
                isActive ? 'bg-bordeaux text-ivory border border-softGold/40 shadow-sm' : 'text-ivory/70 hover:text-ivory'
              }`}
            >
              <Icon size={12} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* 1. CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* Text Inputs */}
            {selectedNode.props.text !== undefined && (
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-1.5">Texte / Titre</label>
                <textarea
                  value={selectedNode.props.text}
                  onChange={(e) => updateNodeProps(selectedNode.id, { text: e.target.value })}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-semibold focus:outline-none focus:border-softGold"
                />
              </div>
            )}

            {/* Heading Level (H1-H6) */}
            {selectedNode.type === 'heading' && (
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-1.5">Niveau de Titre HTML (SEO)</label>
                <select
                  value={selectedNode.props.level || 'h2'}
                  onChange={(e) => updateNodeProps(selectedNode.id, { level: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold"
                >
                  <option value="h1">H1 — Titre Principal de la Page</option>
                  <option value="h2">H2 — Titre de Section</option>
                  <option value="h3">H3 — Titre de Sous-Bloc</option>
                  <option value="h4">H4 — Titre de Carte</option>
                </select>
              </div>
            )}

            {/* Rich Text HTML */}
            {selectedNode.props.html !== undefined && (
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-1.5">Éditeur HTML Enrichi</label>
                <textarea
                  value={selectedNode.props.html}
                  onChange={(e) => updateNodeProps(selectedNode.id, { html: e.target.value })}
                  rows={6}
                  className="w-full p-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
                />
              </div>
            )}

            {/* Image URL & Alt Text */}
            {selectedNode.props.url !== undefined && selectedNode.type === 'image' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-1.5">URL de l'Image</label>
                  <input
                    type="text"
                    value={selectedNode.props.url}
                    onChange={(e) => updateNodeProps(selectedNode.id, { url: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-1.5">Texte Alt (Accessibilité & SEO)</label>
                  <input
                    type="text"
                    value={selectedNode.props.alt || ''}
                    onChange={(e) => updateNodeProps(selectedNode.id, { alt: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-medium"
                  />
                </div>
              </div>
            )}

            {/* CAROUSEL SLIDES MANAGER */}
            {selectedNode.type === 'carousel' && (
              <div className="space-y-4 pt-2 border-t border-sage/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-softGold">Diapositives du Carrousel</span>
                  <button
                    onClick={() => addCarouselSlide(selectedNode.id)}
                    className="bg-bordeaux text-ivory px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 shadow"
                  >
                    <Plus size={12} />
                    <span>Ajouter Slide</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(selectedNode.props.slides || []).map((slide: CarouselSlide, sIdx: number) => (
                    <div key={slide.id} className="bg-ivory/10 border border-sage/30 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center border-b border-sage/20 pb-2">
                        <span className="font-bold text-xs text-softGold">Slide {sIdx + 1}</span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => reorderCarouselSlides(selectedNode.id, sIdx, sIdx - 1)}
                            disabled={sIdx === 0}
                            className="p-1 text-ivory/70 hover:text-softGold disabled:opacity-30"
                          >
                            <MoveUp size={12} />
                          </button>
                          <button
                            onClick={() => reorderCarouselSlides(selectedNode.id, sIdx, sIdx + 1)}
                            disabled={sIdx === (selectedNode.props.slides || []).length - 1}
                            className="p-1 text-ivory/70 hover:text-softGold disabled:opacity-30"
                          >
                            <MoveDown size={12} />
                          </button>
                          <button
                            onClick={() => removeCarouselSlide(selectedNode.id, slide.id)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Titre de la slide"
                          value={slide.title || ''}
                          onChange={(e) => updateCarouselSlide(selectedNode.id, slide.id, { title: e.target.value })}
                          className="w-full text-xs p-2 rounded border border-sage/30 bg-ivory text-forestGreen font-bold"
                        />
                        <input
                          type="text"
                          placeholder="URL Image"
                          value={slide.image || ''}
                          onChange={(e) => updateCarouselSlide(selectedNode.id, slide.id, { image: e.target.value })}
                          className="w-full text-[11px] p-2 rounded border border-sage/30 bg-ivory text-forestGreen font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. STYLE TAB */}
        {activeTab === 'style' && (
          <div className="space-y-6">
            {/* Brand Color Palette Swatches */}
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-2">Nuancier de Marque Le Jardin Soufi</label>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {BRAND_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.color}
                    onClick={() => handleStyleChange('backgroundColor', swatch.color)}
                    style={{ backgroundColor: swatch.color }}
                    className="w-8 h-8 rounded-full border-2 border-ivory/40 shadow hover:scale-110 transition-transform"
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>

            {/* Background Color Custom Picker */}
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Couleur d'Arrière-plan</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={currentStyle.backgroundColor || '#365024'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={currentStyle.backgroundColor || ''}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
                  placeholder="#365024"
                />
              </div>
            </div>

            {/* Text Color Custom Picker */}
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Couleur du Texte</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={currentStyle.color || '#FDFBF6'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={currentStyle.color || ''}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
                  placeholder="#FDFBF6"
                />
              </div>
            </div>

            {/* Font Alignment Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Alignement du Texte</label>
              <div className="flex space-x-1 bg-ivory/10 p-1 rounded-xl border border-ivory/20">
                {[
                  { align: 'left', icon: AlignLeft },
                  { align: 'center', icon: AlignCenter },
                  { align: 'right', icon: AlignRight },
                  { align: 'justify', icon: AlignJustify },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = currentStyle.textAlign === item.align;
                  return (
                    <button
                      key={item.align}
                      onClick={() => handleStyleChange('textAlign', item.align)}
                      className={`flex-1 p-2 rounded-lg text-center flex justify-center transition-all ${
                        isActive ? 'bg-bordeaux text-ivory shadow' : 'text-ivory/70 hover:text-ivory'
                      }`}
                    >
                      <Icon size={14} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Size & Weight */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-1.5">Taille de Police</label>
                <input
                  type="text"
                  value={currentStyle.fontSize || ''}
                  onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                  placeholder="36px"
                  className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-1.5">Famille de Police</label>
                <select
                  value={currentStyle.fontFamily || 'Inter, sans-serif'}
                  onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold"
                >
                  <option value="Playfair Display, serif">Playfair Display (Sérif)</option>
                  <option value="Inter, sans-serif">Inter (Sans-sérif)</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>
            </div>

            {/* Padding Controls */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-1.5">Padding Haut</label>
                <input
                  type="text"
                  value={currentStyle.paddingTop || ''}
                  onChange={(e) => handleStyleChange('paddingTop', e.target.value)}
                  placeholder="60px"
                  className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-1.5">Padding Bas</label>
                <input
                  type="text"
                  value={currentStyle.paddingBottom || ''}
                  onChange={(e) => handleStyleChange('paddingBottom', e.target.value)}
                  placeholder="60px"
                  className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
                />
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Rayon de Bordure (Border Radius)</label>
              <input
                type="text"
                value={currentStyle.borderRadius || ''}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                placeholder="16px"
                className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
              />
            </div>
          </div>
        )}

        {/* 3. LAYOUT TAB */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Largeur (Width)</label>
              <input
                type="text"
                value={currentStyle.width || '100%'}
                onChange={(e) => handleStyleChange('width', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Largeur Maximale (Max Width)</label>
              <input
                type="text"
                value={currentStyle.maxWidth || ''}
                onChange={(e) => handleStyleChange('maxWidth', e.target.value)}
                placeholder="1200px"
                className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
              />
            </div>
          </div>
        )}

        {/* 4. ACTIONS TAB */}
        {activeTab === 'actions' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Type d'Action au Clic</label>
              <select
                value={selectedNode.actions?.type || 'none'}
                onChange={(e) =>
                  updateNodeActions(selectedNode.id, {
                    type: e.target.value as any,
                    value: selectedNode.actions?.value || '',
                  })
                }
                className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold"
              >
                <option value="none">Aucune Action</option>
                <option value="url">Rediriger vers une URL External / Zeffy</option>
                <option value="page">Ouvrir une Page Interne</option>
                <option value="modal">Ouvrir une Fenêtre Modal</option>
              </select>
            </div>

            {selectedNode.actions?.type !== 'none' && (
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-1.5">URL / Cible de Redirection</label>
                <input
                  type="text"
                  value={selectedNode.actions?.value || ''}
                  onChange={(e) =>
                    updateNodeActions(selectedNode.id, {
                      type: selectedNode.actions?.type || 'url',
                      value: e.target.value,
                    })
                  }
                  placeholder="https://zeffy.com/..."
                  className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
                />
              </div>
            )}
          </div>
        )}

        {/* 5. RESPONSIVE OVERRIDES TAB */}
        {activeTab === 'responsive' && (
          <div className="space-y-4">
            <div className="p-3 bg-bordeaux/20 border border-softGold/30 rounded-xl text-xs text-ivory">
              <span className="font-bold text-softGold block">Mode Actif: {breakpoint.toUpperCase()}</span>
              Toutes les modifications appliquées dans cette section écrasent les valeurs par défaut pour cet écran uniquement.
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Masquer ce Composant sur {breakpoint}</label>
              <button
                onClick={() => handleStyleChange('display', currentStyle.display === 'none' ? 'block' : 'none')}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase ${
                  currentStyle.display === 'none' ? 'bg-red-600 text-white' : 'bg-sage/20 text-ivory'
                }`}
              >
                {currentStyle.display === 'none' ? 'Composant Masqué sur ' + breakpoint : 'Composant Visible'}
              </button>
            </div>
          </div>
        )}

        {/* 6. GENERAL SETTINGS TAB */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Nom du Composant</label>
              <input
                type="text"
                value={selectedNode.name}
                onChange={(e) => updateNodeSettings(selectedNode.id, { customId: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-1.5">Classe CSS Personnalisée</label>
              <input
                type="text"
                value={selectedNode.settings.customClass || ''}
                onChange={(e) => updateNodeSettings(selectedNode.id, { customClass: e.target.value })}
                placeholder="my-custom-class"
                className="w-full p-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
