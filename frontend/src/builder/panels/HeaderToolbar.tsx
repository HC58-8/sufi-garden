'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../store';
import { BreakpointMode } from '../types';
import { SeoManagerModal } from './SeoManagerModal';
import { 
  Sparkles, Undo2, Redo2, Monitor, Laptop, Tablet, Smartphone, 
  Eye, EyeOff, Save, Send, Plus, Trash2, CheckCircle2, ChevronDown, 
  ExternalLink, HelpCircle, Search, Compass, BookOpen, Layers
} from 'lucide-react';

export const HeaderToolbar: React.FC = () => {
  const {
    pages,
    currentPageId,
    breakpoint,
    previewMode,
    isSaving,
    setBreakpoint,
    setPreviewMode,
    setCurrentPage,
    createPage,
    deletePage,
    undo,
    redo,
    canUndo,
    canRedo,
    saveDraft,
    publishPage,
    addCurrentPageToNav,
  } = useEditorStore();

  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSeoModal, setShowSeoModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreatePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle) return;
    const slug = newPageSlug || newPageTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    createPage(newPageTitle, slug);
    setShowNewPageModal(false);
    setNewPageTitle('');
    setNewPageSlug('');
    showToast(`Nouvelle page "${newPageTitle}" créée avec succès !`);
  };

  const openLiveTab = () => {
    const targetUrl = currentPage?.slug === 'home' || !currentPage?.slug ? '/' : currentPage.slug;
    window.open(targetUrl, '_blank');
  };

  // Group pages into Categories
  const generalPages = pages.filter(
    (p) => !p.slug.includes('/programming-1/') && !p.id.startsWith('page_prog_')
  );
  const programPages = pages.filter(
    (p) => p.slug.includes('/programming-1/') || p.id.startsWith('page_prog_')
  );

  return (
    <header className="bg-forestGreen-dark text-ivory border-b border-softGold/30 px-4 md:px-6 py-2.5 flex items-center justify-between shadow-xl relative z-50 font-inter">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-[250] bg-bordeaux text-ivory px-5 py-2.5 rounded-full shadow-2xl font-bold text-xs flex items-center space-x-2 border border-softGold/40 animate-bounce">
          <CheckCircle2 size={16} className="text-softGold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left: Brand & Page Selector */}
      <div className="flex items-center space-x-3 md:space-x-5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-bordeaux rounded-xl text-softGold border border-softGold/30 shadow">
            <Sparkles size={16} />
          </div>
          <div className="hidden sm:block">
            <span className="font-playfair text-lg font-bold tracking-widest text-ivory block leading-none">
              SG STUDIO CMS
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-softGold font-bold mt-0.5 block">
              Visual Control Builder
            </span>
          </div>
        </div>

        {/* Page Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
            className="flex items-center space-x-2 bg-ivory/10 hover:bg-ivory/20 px-3.5 py-2 rounded-xl text-xs font-bold text-ivory border border-ivory/20 transition-all max-w-[220px] md:max-w-[280px]"
          >
            <span className="text-softGold font-semibold">Page :</span>
            <span className="truncate">{currentPage?.title}</span>
            <ChevronDown size={14} className="text-softGold flex-shrink-0" />
          </button>

          {isPageDropdownOpen && (
            <div className="absolute top-12 left-0 w-80 max-h-[75vh] overflow-y-auto bg-forestGreen-dark border border-softGold/30 rounded-2xl shadow-2xl p-2.5 z-50 space-y-2">
              {/* Category 1: General Pages */}
              <div>
                <span className="text-[10px] uppercase font-extrabold text-softGold px-3 py-1 flex items-center space-x-1.5">
                  <Layers size={11} />
                  <span>Pages Principales ({generalPages.length})</span>
                </span>
                <div className="space-y-0.5 mt-1">
                  {generalPages.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setCurrentPage(p.id);
                        setIsPageDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        p.id === currentPageId
                          ? 'bg-bordeaux text-ivory font-bold border border-softGold/30'
                          : 'hover:bg-ivory/10 text-ivory/90'
                      }`}
                    >
                      <span className="truncate">{p.title}</span>
                      <span className="font-mono text-[9px] text-sage/70 truncate ml-2 max-w-[80px]">
                        {p.slug === 'home' ? '/' : p.slug}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Formations / Programmes Pages */}
              {programPages.length > 0 && (
                <div className="pt-2 border-t border-sage/20">
                  <span className="text-[10px] uppercase font-extrabold text-emerald-400 px-3 py-1 flex items-center space-x-1.5">
                    <BookOpen size={11} />
                    <span>Formations & Séminaires ({programPages.length})</span>
                  </span>
                  <div className="space-y-0.5 mt-1">
                    {programPages.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setCurrentPage(p.id);
                          setIsPageDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                          p.id === currentPageId
                            ? 'bg-bordeaux text-ivory font-bold border border-softGold/30'
                            : 'hover:bg-ivory/10 text-ivory/90'
                        }`}
                      >
                        <span className="truncate">{p.title}</span>
                        {pages.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePage(p.id);
                              showToast(`Page "${p.title}" supprimée`);
                            }}
                            className="p-1 text-red-400 hover:text-red-300 ml-2"
                            title="Supprimer la page"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setIsPageDropdownOpen(false);
                  setShowNewPageModal(true);
                }}
                className="w-full mt-2 flex items-center justify-center space-x-1.5 bg-softGold text-forestGreen-dark px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-softGold/90 transition-all shadow"
              >
                <Plus size={14} />
                <span>Créer une Nouvelle Page</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Button: Add current page to Navbar */}
        <button
          onClick={() => {
            addCurrentPageToNav();
            showToast(`Page "${currentPage.title}" ajoutée au menu Navbar !`);
          }}
          className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-ivory/10 hover:bg-ivory/20 text-softGold border border-softGold/30 transition-all"
          title="Ajouter immédiatement cette page au menu de navigation (Navbar)"
        >
          <Compass size={13} />
          <span>+ Au Menu</span>
        </button>

        {/* Quick Button: Open SEO Modal */}
        <button
          onClick={() => setShowSeoModal(true)}
          className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-ivory/10 hover:bg-ivory/20 text-ivory border border-ivory/20 transition-all"
          title="Configurer le titre SEO, la méta-description et l'aperçu Google"
        >
          <Search size={13} className="text-softGold" />
          <span>SEO & Méta</span>
        </button>
      </div>

      {/* Center: History & Breakpoints */}
      <div className="hidden md:flex items-center space-x-3">
        {/* Undo / Redo */}
        <div className="flex items-center space-x-1 bg-ivory/10 p-1 rounded-xl border border-ivory/20">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="p-1.5 rounded-lg text-ivory hover:text-softGold disabled:opacity-30 transition-all"
            title="Annuler (Undo)"
          >
            <Undo2 size={15} />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="p-1.5 rounded-lg text-ivory hover:text-softGold disabled:opacity-30 transition-all"
            title="Rétablir (Redo)"
          >
            <Redo2 size={15} />
          </button>
        </div>

        {/* Breakpoints Switcher */}
        <div className="flex items-center space-x-1 bg-ivory/10 p-1 rounded-xl border border-ivory/20">
          {[
            { id: 'desktop', label: 'Desktop', icon: Monitor },
            { id: 'laptop', label: 'Laptop', icon: Laptop },
            { id: 'tablet', label: 'Tablette', icon: Tablet },
            { id: 'mobile', label: 'Mobile', icon: Smartphone },
          ].map((bp) => {
            const Icon = bp.icon;
            const isActive = breakpoint === bp.id;
            return (
              <button
                key={bp.id}
                onClick={() => setBreakpoint(bp.id as BreakpointMode)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive ? 'bg-bordeaux text-ivory shadow border border-softGold/30' : 'text-ivory/70 hover:text-ivory'
                }`}
              >
                <Icon size={13} />
                <span className="hidden xl:inline text-[11px]">{bp.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Real-time Live Tab, Save, Help & Publish */}
      <div className="flex items-center space-x-2 sm:space-x-2.5">
        {/* Button to Open Live Synchronized Tab */}
        <button
          onClick={openLiveTab}
          className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-600 text-ivory px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold shadow-lg transition-all border border-emerald-400/40 animate-pulse"
          title="Ouvrir la page dans un nouvel onglet avec mise à jour en direct !"
        >
          <ExternalLink size={13} className="text-emerald-200" />
          <span className="hidden sm:inline">🔗 Page Live</span>
        </button>

        {/* Save Draft Button */}
        <button
          onClick={() => {
            saveDraft();
            showToast('Page enregistrée en direct !');
          }}
          disabled={isSaving}
          className="flex items-center space-x-1.5 bg-ivory/10 hover:bg-ivory/20 text-ivory px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold border border-ivory/20 transition-all"
          title="Sauvegarder le contenu de la page"
        >
          <Save size={13} className="text-softGold" />
          <span className="hidden md:inline">{isSaving ? '...' : 'Sauvegarder'}</span>
        </button>

        {/* Easy Help Guide Toggle */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="p-2 bg-ivory/10 hover:bg-ivory/20 rounded-xl text-softGold border border-softGold/30"
          title="Guide Rapide Admin"
        >
          <HelpCircle size={15} />
        </button>

        {/* Preview toggle */}
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all border ${
            previewMode ? 'bg-softGold text-forestGreen-dark border-softGold' : 'bg-ivory/10 text-ivory border-ivory/20 hover:bg-ivory/20'
          }`}
        >
          {previewMode ? <EyeOff size={13} /> : <Eye size={13} />}
          <span className="hidden sm:inline">{previewMode ? 'Éditer' : 'Aperçu'}</span>
        </button>

        {/* Publish Button */}
        <button
          onClick={() => {
            publishPage();
            showToast('🎉 Page publiée avec succès en direct !');
          }}
          className="flex items-center space-x-1.5 bg-bordeaux hover:bg-bordeaux-dark text-ivory px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all border border-softGold/40"
        >
          <Send size={13} className="text-softGold" />
          <span>Publier</span>
        </button>
      </div>

      {/* SEO Modal */}
      <SeoManagerModal
        isOpen={showSeoModal}
        onClose={() => setShowSeoModal(false)}
        onShowToast={showToast}
      />

      {/* Easy Admin Guide Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
          <div className="bg-forestGreen-dark border-2 border-softGold/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl text-left">
            <h3 className="font-playfair text-2xl font-bold text-softGold flex items-center space-x-2">
              <Sparkles size={20} />
              <span>Guide Rapide SG Studio CMS</span>
            </h3>

            <div className="space-y-4 text-xs text-ivory/90 leading-relaxed font-inter">
              <div className="p-3.5 bg-ivory/5 rounded-2xl border border-softGold/20 space-y-1">
                <span className="font-bold text-softGold block">1. Modifier n'importe quelle page du site</span>
                <p>
                  Sélectionnez la page dans le menu déroulant <strong>"Page :"</strong> en haut à gauche (Accueil, Programmes, Gîte, Contact, ou Formations).
                </p>
              </div>

              <div className="p-3.5 bg-ivory/5 rounded-2xl border border-softGold/20 space-y-1">
                <span className="font-bold text-softGold block">2. Modifier un texte ou un bouton</span>
                <p>
                  Double-cliquez sur n'importe quel texte ou bouton au centre de l'écran pour ouvrir son panneau de style et de propriétés à droite.
                </p>
              </div>

              <div className="p-3.5 bg-ivory/5 rounded-2xl border border-softGold/20 space-y-1">
                <span className="font-bold text-softGold block">3. Gérer les Formations & Billetterie Zeffy</span>
                <p>
                  Dans l'onglet <strong>"📜 Formulaire des Programmes"</strong>, créez vos formations : leur page CMS dédiée sera générée automatiquement !
                </p>
              </div>

              <div className="p-3.5 bg-ivory/5 rounded-2xl border border-softGold/20 space-y-1">
                <span className="font-bold text-softGold block">4. Gérer la Navigation & Menus</span>
                <p>
                  Utilisez l'onglet <strong>"🧭 Navigation & Menus"</strong> pour réorganiser les liens de la Navbar et du Footer.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-bordeaux text-ivory py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-bordeaux-dark transition-all border border-softGold/40"
            >
              Compris, j'ai fini !
            </button>
          </div>
        </div>
      )}

      {/* Create New Page Modal */}
      {showNewPageModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
          <form onSubmit={handleCreatePageSubmit} className="bg-forestGreen-dark border-2 border-softGold/50 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl text-left">
            <h3 className="font-playfair text-2xl font-bold text-ivory border-b border-sage/20 pb-3">
              Créer une Nouvelle Page
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-2">Titre de la Page</label>
                <input
                  type="text"
                  placeholder="Ex: Retraite d'Automne 2026"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-sage/30 bg-ivory/10 text-ivory font-bold text-xs focus:border-softGold outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-2">URL / Slug (Optionnel)</label>
                <input
                  type="text"
                  placeholder="Ex: /retraite-automne"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-sage/30 bg-ivory/10 text-ivory text-xs font-mono focus:border-softGold outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewPageModal(false)}
                className="flex-1 px-4 py-2.5 rounded-full text-xs font-bold text-ivory/70 hover:text-ivory hover:bg-ivory/10 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 bg-bordeaux text-ivory py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-bordeaux-dark transition-all border border-softGold/40"
              >
                Créer la Page
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default HeaderToolbar;
