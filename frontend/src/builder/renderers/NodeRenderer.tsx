'use client';

import React, { useState } from 'react';
import { ComponentNode } from '../types';
import { useEditorStore } from '../store';
import { 
  ArrowRight, Heart, ChevronLeft, ChevronRight, Play, CheckCircle2, 
  Trash2, Copy, MoveUp, MoveDown, Lock, Unlock, Eye, EyeOff, Layers, ExternalLink, Edit3
} from 'lucide-react';

interface NodeRendererProps {
  node: ComponentNode;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({ node }) => {
  const {
    selectedNodeId,
    hoveredNodeId,
    breakpoint,
    previewMode,
    selectNode,
    hoverNode,
    moveNode,
    duplicateNode,
    removeNode,
    toggleNodeLock,
    toggleNodeVisible,
  } = useEditorStore();

  const [activeSlide, setActiveSlide] = useState(0);

  if (!node.settings.visible && previewMode) {
    return null;
  }

  const isSelected = selectedNodeId === node.id;
  const isHovered = hoveredNodeId === node.id;

  // Merge style per breakpoint hierarchy (desktop -> laptop -> tablet -> mobile)
  const getStyleForBreakpoint = (): React.CSSProperties => {
    const desktopStyle = node.style.desktop || {};
    const laptopStyle = breakpoint === 'laptop' || breakpoint === 'tablet' || breakpoint === 'mobile' ? node.style.laptop || {} : {};
    const tabletStyle = breakpoint === 'tablet' || breakpoint === 'mobile' ? node.style.tablet || {} : {};
    const mobileStyle = breakpoint === 'mobile' ? node.style.mobile || {} : {};

    const merged = {
      ...desktopStyle,
      ...laptopStyle,
      ...tabletStyle,
      ...mobileStyle,
    };

    if (!node.settings.visible) {
      merged.opacity = 0.4;
    }

    return merged as React.CSSProperties;
  };

  const currentStyle = getStyleForBreakpoint();

  const handlePointerDown = (e: React.MouseEvent) => {
    if (previewMode || node.settings.locked) return;
    e.stopPropagation();
    selectNode(node.id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (previewMode || node.settings.locked) return;
    e.stopPropagation();
    selectNode(node.id);
  };

  const handlePointerOver = (e: React.MouseEvent) => {
    if (previewMode) return;
    e.stopPropagation();
    hoverNode(node.id);
  };

  const handlePointerOut = (e: React.MouseEvent) => {
    if (previewMode) return;
    e.stopPropagation();
    if (hoveredNodeId === node.id) {
      hoverNode(null);
    }
  };

  // Render node content by type
  const renderContent = () => {
    switch (node.type) {
      // 1. LAYOUT
      case 'section':
      case 'container':
      case 'flex':
      case 'grid':
      case 'card':
        return (
          <div style={currentStyle} className={`relative transition-all ${node.settings.customClass || ''}`}>
            {node.children && node.children.length > 0 ? (
              node.children.map((child) => <NodeRenderer key={child.id} node={child} />)
            ) : (
              <div className="p-6 border-2 border-dashed border-sage/40 rounded-xl text-center text-xs font-semibold text-sage bg-ivory/5">
                Glissez ou cliquez sur un composant pour ajouter du contenu ici ({node.name})
              </div>
            )}
          </div>
        );

      case 'spacer':
        return <div style={currentStyle} className="w-full" />;

      case 'divider':
        return <hr style={currentStyle} className="border-t" />;

      // 2. TEXT
      case 'heading': {
        const Tag = (node.props.level || 'h2') as React.ElementType;
        return (
          <Tag style={currentStyle} className={node.settings.customClass || ''}>
            {node.props.text}
          </Tag>
        );
      }

      case 'paragraph':
        return (
          <p style={currentStyle} className={node.settings.customClass || ''}>
            {node.props.text}
          </p>
        );

      case 'richText':
        return (
          <div
            style={currentStyle}
            dangerouslySetInnerHTML={{ __html: node.props.html || '' }}
            className={node.settings.customClass || ''}
          />
        );

      case 'badge':
        return (
          <span style={currentStyle} className={node.settings.customClass || ''}>
            {node.props.text}
          </span>
        );

      case 'quote':
        return (
          <blockquote style={currentStyle} className={node.settings.customClass || ''}>
            <p className="italic">{node.props.text}</p>
            {node.props.author && <cite className="block text-xs uppercase font-bold mt-2 text-softGold">&mdash; {node.props.author}</cite>}
          </blockquote>
        );

      // 3. BUTTONS
      case 'button':
        return (
          <button style={currentStyle} className={node.settings.customClass || ''}>
            <span>{node.props.text}</span>
            {node.props.icon === 'ArrowRight' && <ArrowRight size={16} />}
          </button>
        );

      case 'iconButton':
        return (
          <button style={currentStyle} className={node.settings.customClass || ''}>
            <Heart size={18} />
          </button>
        );

      // 4. MEDIA
      case 'image':
        return (
          <img
            src={node.props.url}
            alt={node.props.alt || ''}
            style={currentStyle}
            className={`object-cover ${node.settings.customClass || ''}`}
          />
        );

      case 'gallery':
        return (
          <div style={currentStyle} className="grid gap-4">
            {(node.props.images || []).map((imgUrl: string, idx: number) => (
              <img key={idx} src={imgUrl} alt={`Galerie ${idx + 1}`} className="w-full h-48 object-cover rounded-xl border border-sage/20" />
            ))}
          </div>
        );

      case 'video':
        return (
          <div style={currentStyle} className="relative overflow-hidden bg-black flex items-center justify-center">
            <iframe
              src={node.props.url}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      // 5. CAROUSEL / SLIDER PRO
      case 'carousel': {
        const slides = node.props.slides || [];
        const currentSlideData = slides[activeSlide] || slides[0];

        return (
          <div style={currentStyle} className="relative overflow-hidden rounded-2xl border-2 border-softGold/30 bg-forestGreen text-ivory p-6 sm:p-10 shadow-2xl">
            {currentSlideData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-softGold uppercase tracking-widest">{currentSlideData.subtitle}</span>
                  <h3 className="font-playfair text-2xl sm:text-4xl font-extrabold text-ivory leading-tight">{currentSlideData.title}</h3>
                  <p className="text-sm text-ivory/85 leading-relaxed">{currentSlideData.description}</p>
                  {currentSlideData.buttonText && (
                    <a
                      href={currentSlideData.buttonUrl || '#'}
                      className="inline-flex items-center space-x-2 bg-bordeaux text-ivory px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-bordeaux-dark transition-all border border-softGold/40 mt-2"
                    >
                      <span>{currentSlideData.buttonText}</span>
                      <ArrowRight size={14} />
                    </a>
                  )}
                </div>

                <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-sage/30 shadow-md">
                  <img src={currentSlideData.image} alt={currentSlideData.title} className="w-full h-full object-cover" />
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-sage">Aucune diapositive configurée.</div>
            )}

            {/* Slider Controls */}
            {slides.length > 1 && (
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-sage/20">
                <div className="flex space-x-2">
                  {slides.map((_: any, sIdx: number) => (
                    <button
                      key={sIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(sIdx);
                      }}
                      className={`h-2.5 rounded-full transition-all ${sIdx === activeSlide ? 'w-8 bg-softGold' : 'w-2.5 bg-ivory/40'}`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
                    }}
                    className="p-2 rounded-full bg-ivory/10 hover:bg-bordeaux text-ivory border border-ivory/20"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
                    }}
                    className="p-2 rounded-full bg-ivory/10 hover:bg-bordeaux text-ivory border border-ivory/20"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      }

      // 6. NAVIGATION
      case 'navbar':
        return (
          <header style={currentStyle} className="px-6 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <img src={node.props.logoUrl} alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <span className="font-playfair text-xl font-bold tracking-widest text-ivory block">{node.props.logoText}</span>
                <span className="text-[9px] uppercase tracking-widest text-softGold font-bold">{node.props.subtitle}</span>
              </div>
            </div>

            <nav className="hidden md:flex space-x-6 text-xs font-semibold text-ivory">
              {(node.props.items || []).map((item: any) => (
                <a key={item.id} href={item.path} className="hover:text-softGold transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
          </header>
        );

      // 7. ADVANCED
      case 'accordion':
        return (
          <div style={currentStyle} className="space-y-4">
            {(node.props.items || []).map((accItem: any) => (
              <details key={accItem.id} className="bg-ivory dark:bg-forestGreen-dark/95 border border-sage/30 rounded-xl p-4 shadow-sm group">
                <summary className="font-playfair font-bold text-sm text-forestGreen dark:text-ivory cursor-pointer flex justify-between items-center">
                  <span>{accItem.title}</span>
                  <span className="text-bordeaux font-bold group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="text-xs text-forestGreen/80 dark:text-ivory/80 mt-3 pt-3 border-t border-sage/20 leading-relaxed">
                  {accItem.content}
                </p>
              </details>
            ))}
          </div>
        );

      case 'testimonialCard':
        return (
          <div style={currentStyle} className="space-y-4">
            <p className="font-playfair italic text-sm text-forestGreen dark:text-ivory">« {node.props.quote} »</p>
            <div className="flex items-center space-x-3 pt-2">
              <img src={node.props.avatar} alt={node.props.name} className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <span className="font-bold text-xs text-forestGreen dark:text-ivory block">{node.props.name}</span>
                <span className="text-[10px] text-sage">{node.props.role}</span>
              </div>
            </div>
          </div>
        );

      case 'pricingTable':
        return (
          <div style={currentStyle} className="space-y-6">
            <h4 className="font-playfair text-xl font-bold text-softGold">{node.props.title}</h4>
            <div className="text-3xl font-extrabold font-mono text-ivory">{node.props.price}</div>
            <p className="text-xs text-ivory/80">{node.props.subtitle}</p>
            <ul className="space-y-2 text-xs text-left max-w-xs mx-auto text-ivory/90">
              {(node.props.features || []).map((f: string, fIdx: number) => (
                <li key={fIdx} className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-softGold" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={node.props.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-bordeaux text-ivory px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-softGold/30 hover:bg-bordeaux-dark transition-all"
            >
              {node.props.buttonText}
            </a>
          </div>
        );

      // 8. FORMS
      case 'formInput':
        return (
          <div style={currentStyle} className="space-y-1 text-left">
            <label className="block text-xs font-bold uppercase text-sage">
              {node.props.label} {node.props.required && <span className="text-bordeaux">*</span>}
            </label>
            <input
              type={node.props.inputType || 'text'}
              placeholder={node.props.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory dark:bg-forestGreen-dark text-xs"
              readOnly={!previewMode}
            />
          </div>
        );

      case 'formSubmit':
        return (
          <button style={currentStyle} className={node.settings.customClass || ''}>
            {node.props.text}
          </button>
        );

      // 9. DATA DRIVEN
      case 'dataCollection':
        return (
          <div style={currentStyle} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((itemNum) => (
              <div key={itemNum} className="bg-ivory dark:bg-forestGreen-dark border border-sage/30 rounded-2xl p-4 space-y-3 shadow">
                <div className="h-32 rounded-xl bg-sage/20 flex items-center justify-center text-xs font-bold text-sage">
                  Donnée Dynamique #{itemNum}
                </div>
                <h5 className="font-playfair font-bold text-sm text-forestGreen dark:text-ivory">Séminaire #{itemNum}</h5>
                <p className="text-xs text-sage">Filtre automatique depuis la collection {node.props.dataSource}</p>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div style={currentStyle} className="p-4 border rounded text-xs">
            Composant {node.type} ({node.name})
          </div>
        );
    }
  };

  if (previewMode) {
    return renderContent();
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      className={`relative transition-all group cursor-pointer ${
        isSelected
          ? 'ring-2 ring-bordeaux ring-offset-2 ring-offset-ivory z-30'
          : isHovered
          ? 'ring-2 ring-softGold z-20'
          : ''
      }`}
    >
      {/* Editor Highlight Badge & Controls Toolbar */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-7 left-0 right-0 flex justify-between items-center z-40 pointer-events-auto">
          {/* Badge Label with Double-Click Hint */}
          <div className="bg-bordeaux text-ivory text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-t-md shadow-md flex items-center space-x-1.5 border-t border-x border-softGold/40">
            <Edit3 size={12} className="text-softGold" />
            <span>{node.name} (Double-clic pour éditer)</span>
          </div>

          {/* Quick Action Toolbar on Selected Component */}
          {isSelected && (
            <div className="bg-forestGreen-dark text-ivory px-2 py-1 rounded-t-md border-t border-x border-softGold/40 shadow-lg flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveNode(node.id, 'up');
                }}
                className="p-1 hover:text-softGold text-ivory/80"
                title="Monter"
              >
                <MoveUp size={13} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveNode(node.id, 'down');
                }}
                className="p-1 hover:text-softGold text-ivory/80"
                title="Descendre"
              >
                <MoveDown size={13} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateNode(node.id);
                }}
                className="p-1 hover:text-softGold text-ivory/80"
                title="Dupliquer"
              >
                <Copy size={13} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNodeLock(node.id);
                }}
                className="p-1 hover:text-softGold text-ivory/80"
                title={node.settings.locked ? 'Déverrouiller' : 'Verrouiller'}
              >
                {node.settings.locked ? <Lock size={13} className="text-softGold" /> : <Unlock size={13} />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeNode(node.id);
                }}
                className="p-1 text-red-400 hover:text-red-300"
                title="Supprimer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          )}
        </div>
      )}

      {renderContent()}
    </div>
  );
};
