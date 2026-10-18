'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../store';
import { COMPONENT_REGISTRY } from '../registry';
import { ComponentCategory, ComponentNode } from '../types';
import { 
  Search, Grid, Layers, Plus, Trash2, Copy, MoveUp, MoveDown, 
  Lock, Unlock, Eye, EyeOff, ChevronRight, ChevronDown, Sparkles
} from 'lucide-react';

export const LeftPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'palette' | 'tree'>('palette');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const {
    pages,
    currentPageId,
    selectedNodeId,
    selectNode,
    addNode,
    removeNode,
    duplicateNode,
    moveNode,
    toggleNodeVisible,
    toggleNodeLock,
  } = useEditorStore();

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const rootNodes = currentPage?.rootNodes || [];

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'layout', label: 'Mise en page' },
    { id: 'text', label: 'Textes & Titres' },
    { id: 'buttons', label: 'Boutons' },
    { id: 'media', label: 'Médias & Images' },
    { id: 'carousel', label: 'Carrousel / Slider' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'advanced', label: 'Composants Pro' },
    { id: 'forms', label: 'Formulaires' },
    { id: 'data', label: 'Données' },
  ];

  const filteredComponents = Object.values(COMPONENT_REGISTRY).filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Render Component Tree Item Recursively
  const renderTreeNode = (node: ComponentNode, level: number = 0) => {
    const isSelected = selectedNodeId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.id] !== false; // Default expanded

    return (
      <div key={node.id} className="space-y-1">
        <div
          onClick={(e) => {
            e.stopPropagation();
            selectNode(node.id);
          }}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          className={`flex items-center justify-between py-2 pr-2 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
            isSelected
              ? 'bg-bordeaux text-ivory border-softGold/40 shadow-sm font-bold'
              : 'hover:bg-ivory/10 text-ivory/90 border-transparent'
          }`}
        >
          <div className="flex items-center space-x-2 truncate">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(node.id);
                }}
                className="text-ivory/70 hover:text-softGold p-0.5"
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            ) : (
              <span className="w-3" />
            )}
            <span className="truncate">{node.name}</span>
          </div>

          <div className="flex items-center space-x-1 opacity-80 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNodeVisible(node.id);
              }}
              className="p-1 hover:text-softGold text-ivory/70"
              title={node.settings.visible ? 'Masquer' : 'Afficher'}
            >
              {node.settings.visible ? <Eye size={12} /> : <EyeOff size={12} className="text-red-400" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNodeLock(node.id);
              }}
              className="p-1 hover:text-softGold text-ivory/70"
              title={node.settings.locked ? 'Déverrouiller' : 'Verrouiller'}
            >
              {node.settings.locked ? <Lock size={12} className="text-softGold" /> : <Unlock size={12} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateNode(node.id);
              }}
              className="p-1 hover:text-softGold text-ivory/70"
              title="Dupliquer"
            >
              <Copy size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNode(node.id);
              }}
              className="p-1 text-red-400 hover:text-red-300"
              title="Supprimer"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {node.children!.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-80 bg-forestGreen-dark text-ivory border-r border-softGold/30 flex flex-col h-[calc(100vh-65px)] font-inter">
      {/* Panel Header Tabs */}
      <div className="flex border-b border-sage/20 bg-ivory/5 p-2 gap-2">
        <button
          onClick={() => setActiveTab('palette')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'palette' ? 'bg-bordeaux text-ivory shadow border border-softGold/30' : 'text-ivory/70 hover:text-ivory'
          }`}
        >
          <Grid size={14} />
          <span>Composants</span>
        </button>
        <button
          onClick={() => setActiveTab('tree')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'tree' ? 'bg-bordeaux text-ivory shadow border border-softGold/30' : 'text-ivory/70 hover:text-ivory'
          }`}
        >
          <Layers size={14} />
          <span>Arborescence ({rootNodes.length})</span>
        </button>
      </div>

      {/* Tab 1: Component Palette */}
      {activeTab === 'palette' && (
        <div className="flex-1 flex flex-col overflow-hidden p-4 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-3 text-sage" />
            <input
              type="text"
              placeholder="Rechercher un composant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-ivory/10 border border-ivory/20 text-xs text-ivory placeholder-ivory/50 focus:outline-none focus:border-softGold transition-all"
            />
          </div>

          {/* Categories Selector */}
          <div className="flex space-x-1.5 overflow-x-auto pb-2 border-b border-sage/20 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id ? 'bg-softGold text-forestGreen-dark font-extrabold' : 'bg-ivory/10 text-ivory/70 hover:text-ivory'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Component Items List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {filteredComponents.length === 0 ? (
              <div className="text-center py-10 text-xs text-sage">Aucun composant trouvé.</div>
            ) : (
              filteredComponents.map((c) => (
                <div
                  key={c.type}
                  onClick={() => addNode(c.type)}
                  className="p-3.5 rounded-2xl bg-ivory/5 hover:bg-ivory/15 border border-sage/20 hover:border-softGold/50 transition-all cursor-pointer group shadow-sm flex items-start space-x-3"
                >
                  <div className="p-2 rounded-xl bg-bordeaux/40 text-softGold border border-softGold/20 group-hover:scale-105 transition-transform">
                    <Plus size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-ivory block truncate group-hover:text-softGold transition-colors">
                      {c.name}
                    </span>
                    <p className="text-[10px] text-sage line-clamp-2 mt-0.5">{c.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Component Tree */}
      {activeTab === 'tree' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-sage/20 mb-2">
            <span className="text-[10px] uppercase font-bold text-sage">Composants de la Page</span>
            <button
              onClick={() => addNode('section')}
              className="text-[10px] font-bold text-softGold uppercase hover:underline flex items-center space-x-1"
            >
              <Plus size={12} />
              <span>Section</span>
            </button>
          </div>

          {rootNodes.length === 0 ? (
            <div className="text-center py-10 text-xs text-sage">La page est vide. Ajoutez un composant depuis la palette.</div>
          ) : (
            rootNodes.map((node) => renderTreeNode(node))
          )}
        </div>
      )}
    </aside>
  );
};
