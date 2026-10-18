'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../store';
import { 
  Compass, ArrowUp, ArrowDown, Trash2, Plus, CheckCircle2, 
  ExternalLink, Layers, Link as LinkIcon, Eye, EyeOff, Save, Globe
} from 'lucide-react';

export const NavigationManager: React.FC<{ onOpenToast: (msg: string) => void }> = ({ onOpenToast }) => {
  const {
    pages,
    headerNavLinks,
    footerNavLinks,
    addHeaderNavLink,
    updateHeaderNavLink,
    removeHeaderNavLink,
    reorderHeaderNavLinks,
    saveNavigationToBackend,
  } = useEditorStore();

  const [selectedPageSlug, setSelectedPageSlug] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Filter pages not yet in header nav
  const availablePagesToAdd = pages.filter(
    (p) => !headerNavLinks.some((nav) => nav.href === (p.slug.startsWith('/') ? p.slug : `/${p.slug}`))
  );

  const handleAddPageToNav = () => {
    if (!selectedPageSlug) return;
    const page = pages.find((p) => p.slug === selectedPageSlug);
    if (!page) return;

    addHeaderNavLink({
      label: page.title.replace(/^Formation:\s*/, ''),
      href: page.slug.startsWith('/') ? page.slug : `/${page.slug}`,
      active: true,
    });
    setSelectedPageSlug('');
    onOpenToast(`Page "${page.title}" ajoutée au menu Navbar !`);
  };

  const handleAddCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLabel || !customUrl) return;

    addHeaderNavLink({
      label: customLabel,
      href: customUrl,
      active: true,
      isExternal: customUrl.startsWith('http'),
    });
    setCustomLabel('');
    setCustomUrl('');
    onOpenToast(`Lien "${customLabel}" ajouté avec succès !`);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    const ok = await saveNavigationToBackend();
    setIsSaving(false);
    if (ok) {
      onOpenToast('✅ Navigation & Menus sauvegardés en direct dans PostgreSQL !');
    } else {
      onOpenToast('⚠️ Menus enregistrés localement (mode hors-ligne)');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-6xl mx-auto space-y-8 w-full font-inter">
      {/* Page Title Card */}
      <div className="bg-ivory dark:bg-forestGreen-dark p-6 rounded-3xl border border-softGold/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <div className="p-2 bg-bordeaux rounded-xl text-softGold border border-softGold/30 shadow">
              <Compass size={20} />
            </div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-forestGreen dark:text-ivory">
              Gestionnaire Professionnel de Navigation & Menus
            </h2>
          </div>
          <p className="text-xs text-sage">
            Organisez en temps réel l'ordre, les liens et la visibilité des menus d'en-tête (Navbar) et de pied de page (Footer).
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center justify-center space-x-2 bg-bordeaux hover:bg-bordeaux-dark text-ivory px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl transition-all border border-softGold/40 disabled:opacity-50"
        >
          <Save size={15} className="text-softGold" />
          <span>{isSaving ? 'Enregistrement...' : 'Sauvegarder les Menus'}</span>
        </button>
      </div>

      {/* HEADER NAVBAR LINKS LIST */}
      <div className="bg-ivory dark:bg-forestGreen-dark p-6 md:p-8 rounded-3xl border border-softGold/30 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-sage/20 pb-4">
          <div>
            <h3 className="font-playfair text-xl font-bold text-forestGreen dark:text-ivory">
              Menu Principal de Navigation (Navbar)
            </h3>
            <span className="text-[11px] text-sage">
              {headerNavLinks.length} lien(s) configuré(s) pour la barre de navigation
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-softGold bg-forestGreen px-3 py-1.5 rounded-full border border-softGold/30">
            Synchronisation en Direct
          </span>
        </div>

        {/* Links list */}
        <div className="space-y-2.5">
          {headerNavLinks.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === headerNavLinks.length - 1;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-ivory/5 border border-sage/20 hover:border-softGold/40 transition-all gap-3"
              >
                {/* Reorder Buttons & Position */}
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-sage/20 text-forestGreen dark:text-ivory text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div className="flex flex-col">
                    <button
                      onClick={() => reorderHeaderNavLinks(index, index - 1)}
                      disabled={isFirst}
                      className="p-1 hover:text-softGold text-ivory/60 disabled:opacity-20 transition-colors"
                      title="Monter d'une position"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      onClick={() => reorderHeaderNavLinks(index, index + 1)}
                      disabled={isLast}
                      className="p-1 hover:text-softGold text-ivory/60 disabled:opacity-20 transition-colors"
                      title="Descendre d'une position"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>
                </div>

                {/* Link Label & URL Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sage block mb-1">Intitulé</span>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateHeaderNavLink(item.id, { label: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-ivory/10 border border-ivory/20 text-xs font-bold text-forestGreen dark:text-ivory focus:border-softGold outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sage block mb-1">URL / Slug</span>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateHeaderNavLink(item.id, { href: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-ivory/10 border border-ivory/20 text-xs font-mono text-forestGreen dark:text-ivory focus:border-softGold outline-none"
                    />
                  </div>
                </div>

                {/* Actions: Toggle Active & Delete */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateHeaderNavLink(item.id, { active: !item.active })}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                      item.active
                        ? 'bg-emerald-700/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-900/20 text-red-400 border-red-500/30'
                    }`}
                    title={item.active ? 'Lien actif (visible)' : 'Lien masqué'}
                  >
                    {item.active ? <Eye size={13} /> : <EyeOff size={13} />}
                    <span className="text-[10px] hidden sm:inline">{item.active ? 'Actif' : 'Masqué'}</span>
                  </button>

                  <button
                    onClick={() => removeHeaderNavLink(item.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                    title="Supprimer du menu"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ADD LINK TO NAVBAR: Fast CMS Page Picker or Custom Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-sage/20">
          {/* Method 1: Add existing CMS page */}
          <div className="p-5 rounded-2xl bg-ivory/5 border border-sage/20 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-softGold block">
              🌿 Ajouter une page existante du CMS
            </span>
            <p className="text-[11px] text-sage">
              Sélectionnez une page générale ou une formation pour l'insérer immédiatement dans le menu :
            </p>
            <div className="flex space-x-2">
              <select
                value={selectedPageSlug}
                onChange={(e) => setSelectedPageSlug(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-ivory dark:bg-forestGreen-dark border border-sage/30 text-xs font-bold text-forestGreen dark:text-ivory outline-none"
              >
                <option value="">-- Choisir une page du CMS --</option>
                {availablePagesToAdd.map((p) => (
                  <option key={p.id} value={p.slug}>
                    {p.title} ({p.slug})
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddPageToNav}
                disabled={!selectedPageSlug}
                className="bg-bordeaux hover:bg-bordeaux-dark text-ivory px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider disabled:opacity-40 transition-all border border-softGold/30 flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Ajouter</span>
              </button>
            </div>
          </div>

          {/* Method 2: Add custom link */}
          <form onSubmit={handleAddCustomLink} className="p-5 rounded-2xl bg-ivory/5 border border-sage/20 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-softGold block">
              🔗 Ajouter un lien personnalisé ou externe
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Intitulé (ex: Boutique)"
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                className="px-3 py-2 rounded-xl bg-ivory dark:bg-forestGreen-dark border border-sage/30 text-xs font-bold text-forestGreen dark:text-ivory outline-none"
              />
              <input
                type="text"
                placeholder="URL (ex: /boutique ou https://...)"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="px-3 py-2 rounded-xl bg-ivory dark:bg-forestGreen-dark border border-sage/30 text-xs font-mono text-forestGreen dark:text-ivory outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!customLabel || !customUrl}
              className="w-full bg-softGold hover:bg-softGold/90 text-forestGreen-dark py-2 rounded-xl text-xs font-bold uppercase tracking-wider disabled:opacity-40 transition-all flex items-center justify-center space-x-1"
            >
              <Plus size={14} />
              <span>Créer le lien personnalisé</span>
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER LINKS OVERVIEW */}
      <div className="bg-ivory dark:bg-forestGreen-dark p-6 md:p-8 rounded-3xl border border-softGold/30 shadow-2xl space-y-6">
        <div className="border-b border-sage/20 pb-4">
          <h3 className="font-playfair text-xl font-bold text-forestGreen dark:text-ivory">
            Liens du Pied de Page (Footer)
          </h3>
          <span className="text-[11px] text-sage">
            Liens organisés par colonnes dans le pied de page du site
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Navigation', 'Ressources', 'Soutien'].map((col) => {
            const colLinks = footerNavLinks.filter((l) => l.column === col);
            return (
              <div key={col} className="p-4 rounded-2xl bg-ivory/5 border border-sage/20 space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-softGold border-b border-sage/20 pb-1.5 block">
                  Colonne : {col}
                </span>
                <div className="space-y-2">
                  {colLinks.map((l) => (
                    <div key={l.id} className="flex justify-between items-center text-xs p-2 rounded-lg bg-ivory/5">
                      <span className="font-semibold text-forestGreen dark:text-ivory">{l.label}</span>
                      <span className="font-mono text-[10px] text-sage truncate max-w-[120px]">{l.href}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationManager;
