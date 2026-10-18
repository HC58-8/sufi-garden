'use client';

import React, { useState, useEffect } from 'react';
import { HeaderToolbar } from './panels/HeaderToolbar';
import { LeftPanel } from './panels/LeftPanel';
import { CenterCanvas } from './panels/CenterCanvas';
import { RightPropertiesPanel } from './panels/RightPropertiesPanel';
import { NavigationManager } from './panels/NavigationManager';
import { AdminsManager } from './panels/AdminsManager';
import { useEditorStore } from './store';
import { 
  Calendar, Home, Users, Upload, Save, Edit, Trash2, ExternalLink, 
  MousePointer, ShieldCheck, CheckCircle2, Plus, Clock, MapPin, Globe, Compass, Sparkles
} from 'lucide-react';

export const SGStudioEditor: React.FC = () => {
  const {
    previewMode,
    setCurrentPage,
    addOrUpdateProgramPage,
    loadPagesFromBackend,
    addHeaderNavLink,
  } = useEditorStore();

  const [currentView, setCurrentView] = useState<'builder' | 'programs' | 'gite' | 'navigation' | 'admins'>('builder');
  const [notification, setNotification] = useState<string | null>(null);

  // Load pages from backend on mount
  useEffect(() => {
    loadPagesFromBackend();
  }, [loadPagesFromBackend]);

  // Programs Form State
  const [programs, setPrograms] = useState([
    {
      id: "1",
      slug: "inspirations-du-vendredi",
      title: "Les Inspirations du Vendredi",
      subtitle: "Explorer les Noms Divins à travers la contemplation, la réflexion et la présence intérieure.",
      datesListText: "19 juin, 26 juin, 3 juillet, 10 juillet, 17 juillet, 31 juillet, 7 août, 14 août, 21 août, 28 août, 4 septembre, 11 septembre, 25 septembre, 2 octobre",
      montrealTime: "13h – 13h30 (Montréal)",
      parisTime: "19h – 19h30 (Paris)",
      location: "En ligne (Zoom)",
      replayNotice: "❗ Si vous ne pouvez pas joindre certaines sessions, un replay sera disponible",
      freeOptionText: "🆓 Vous n'avez pas les moyens de payer ? Cliquez ici",
      mainButtonLabel: "Je veux participer",
      zeffyUrl: "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world",
      bannerImage: "https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png",
      secondaryImage: "https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg",
      clicks: 142,
      visible: true
    },
    {
      id: "2",
      slug: "balades-meditatives",
      title: "Les Balades Méditatives",
      subtitle: "Marcher ensemble. Respirer la forêt. Habiter le silence.",
      datesListText: "11 juillet, 15 août, 5 septembre 2026",
      montrealTime: "09h30 – 14h00 (Heure Locale)",
      parisTime: "15h30 – 20h00 (Heure de Paris)",
      location: "Domaine du Vivant (Gîte & Forêt Sauvage)",
      replayNotice: "❗ Séminaire immersif en plein air au Domaine du Vivant",
      freeOptionText: "🆓 Envie de participer ? Accès ouvert à tous.",
      mainButtonLabel: "Je veux participer",
      zeffyUrl: "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world",
      bannerImage: "https://static.wixstatic.com/media/9b3551_603242551bc04683b69990ca91ab0648~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Balade%20M%C3%A9ditative.png",
      secondaryImage: "",
      clicks: 98,
      visible: true
    }
  ]);

  const [editingProgId, setEditingProgId] = useState<string | null>(null);
  const [progForm, setProgForm] = useState({
    title: "",
    subtitle: "",
    datesListText: "19 juin, 26 juin, 3 juillet, 10 juillet, 17 juillet, 31 juillet, 7 août...",
    montrealTime: "13h – 13h30 (Montréal)",
    parisTime: "19h – 19h30 (Paris)",
    location: "En ligne (Zoom)",
    replayNotice: "❗ Si vous ne pouvez pas joindre certaines sessions, un replay sera disponible",
    freeOptionText: "🆓 Vous n'avez pas les moyens de payer ? Cliquez ici",
    mainButtonLabel: "Je veux participer",
    zeffyUrl: "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world",
    bannerImage: "",
    secondaryImage: ""
  });

  // Admins CRUD State
  const [admins, setAdmins] = useState([
    { id: "1", name: "Haroun Chedli", email: "harounchedli72@gmail.com", role: "Super Admin", status: "Actif" },
    { id: "2", name: "Équipe Transmission", email: "contact@sufigarden.org", role: "Éditeur", status: "Actif" }
  ]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProgForm((prev) => ({ ...prev, bannerImage: reader.result as string }));
        showToast("Bannière principale téléversée !");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSecondaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProgForm((prev) => ({ ...prev, secondaryImage: reader.result as string }));
        showToast("Visuel secondaire téléversé !");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progForm.title) return;
    const slug = progForm.title.toLowerCase().replace(/[^a-z0-9]/g, "-");

    // Automatically generate and sync CMS page for this formation!
    addOrUpdateProgramPage({
      slug,
      ...progForm,
    });

    if (editingProgId) {
      setPrograms(programs.map((p) => (p.id === editingProgId ? { ...p, ...progForm, slug } : p)));
      showToast("Programme et page CMS détaillée mis à jour !");
      setEditingProgId(null);
    } else {
      const newP = {
        id: String(Date.now()),
        slug,
        ...progForm,
        clicks: 0,
        visible: true
      };
      setPrograms([newP, ...programs]);
      showToast("Nouveau programme créé et page CMS générée en direct !");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-forestGreen-dark text-ivory font-inter select-none">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-[100] bg-bordeaux text-ivory px-6 py-3 rounded-full shadow-2xl font-semibold text-xs flex items-center space-x-2 border border-softGold/40">
          <CheckCircle2 size={16} className="text-softGold" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Top Header Toolbar */}
      <HeaderToolbar />

      {/* Secondary Dashboard Navigation Bar */}
      <div className="bg-forestGreen-dark border-b border-softGold/20 px-4 md:px-6 py-2 flex items-center justify-between z-40 overflow-x-auto">
        <div className="flex space-x-2">
          {[
            { id: 'builder', label: '🎨 Éditeur Visuel Builder', icon: MousePointer },
            { id: 'programs', label: '📜 Formulaire des Programmes', icon: Calendar },
            { id: 'navigation', label: '🧭 Navigation & Menus', icon: Compass },
            { id: 'gite', label: '🏡 Le Gîte du Vivant', icon: Home },
            { id: 'admins', label: '👥 Administrateurs (CRUD)', icon: Users },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = currentView === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setCurrentView(mode.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-bordeaux text-ivory shadow border border-softGold/40'
                    : 'bg-ivory/5 text-ivory/80 hover:bg-ivory/15 hover:text-ivory'
                }`}
              >
                <Icon size={14} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-[10px] uppercase font-bold text-softGold tracking-widest hidden lg:inline">
          Super Admin: harounchedli72@gmail.com
        </span>
      </div>

      {/* Main View Area */}
      {currentView === 'builder' && (
        <div className="flex flex-1 overflow-hidden relative">
          {!previewMode && <LeftPanel />}
          <CenterCanvas />
          {!previewMode && <RightPropertiesPanel />}
        </div>
      )}

      {/* NAVIGATION & MENUS MANAGEMENT VIEW */}
      {currentView === 'navigation' && (
        <NavigationManager onOpenToast={showToast} />
      )}

      {/* PROGRAMS MANAGEMENT FORM VIEW */}
      {currentView === 'programs' && (
        <div className="flex-1 overflow-y-auto p-6 md:p-8 max-w-6xl mx-auto space-y-8 w-full">
          <div className="bg-ivory dark:bg-forestGreen-dark p-6 sm:p-8 rounded-3xl border border-softGold/30 shadow-2xl space-y-6">
            <div className="border-b border-sage/20 pb-4">
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-forestGreen dark:text-ivory">
                Formulaire de Saisie des Programmes & Billetterie Zeffy
              </h2>
              <p className="text-xs text-sage mt-1">
                Toute formation enregistrée ici génère automatiquement sa page CMS visuelle avec Hero, dates, horaires et bouton billetterie.
              </p>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">Titre du Programme</label>
                  <input
                    type="text"
                    value={progForm.title}
                    onChange={(e) => setProgForm({ ...progForm, title: e.target.value })}
                    placeholder="Les Inspirations du Vendredi"
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen font-bold text-sm outline-none focus:border-softGold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">Sous-titre / Pitch</label>
                  <input
                    type="text"
                    value={progForm.subtitle}
                    onChange={(e) => setProgForm({ ...progForm, subtitle: e.target.value })}
                    placeholder="Explorer les Noms Divins..."
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs outline-none focus:border-softGold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-sage/20">
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">🗓️ Liste des Dates (séparées par des virgules)</label>
                  <input
                    type="text"
                    value={progForm.datesListText}
                    onChange={(e) => setProgForm({ ...progForm, datesListText: e.target.value })}
                    placeholder="19 juin, 26 juin, 3 juillet..."
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen font-mono text-xs outline-none focus:border-softGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">📍 Format / Lieu</label>
                  <input
                    type="text"
                    value={progForm.location}
                    onChange={(e) => setProgForm({ ...progForm, location: e.target.value })}
                    placeholder="En ligne (Zoom)"
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs outline-none focus:border-softGold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">⏰ Heure Montréal</label>
                  <input
                    type="text"
                    value={progForm.montrealTime}
                    onChange={(e) => setProgForm({ ...progForm, montrealTime: e.target.value })}
                    placeholder="13h – 13h30 (Montréal)"
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold outline-none focus:border-softGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">⏰ Heure Paris</label>
                  <input
                    type="text"
                    value={progForm.parisTime}
                    onChange={(e) => setProgForm({ ...progForm, parisTime: e.target.value })}
                    placeholder="19h – 19h30 (Paris)"
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold outline-none focus:border-softGold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-sage/20">
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">❗ Notice Replay</label>
                  <input
                    type="text"
                    value={progForm.replayNotice}
                    onChange={(e) => setProgForm({ ...progForm, replayNotice: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs outline-none focus:border-softGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">🆓 Texte Option Gratuité</label>
                  <input
                    type="text"
                    value={progForm.freeOptionText}
                    onChange={(e) => setProgForm({ ...progForm, freeOptionText: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs outline-none focus:border-softGold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">Intitulé Bouton Principal</label>
                  <input
                    type="text"
                    value={progForm.mainButtonLabel}
                    onChange={(e) => setProgForm({ ...progForm, mainButtonLabel: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen font-bold text-xs outline-none focus:border-softGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-sage mb-2">Lien Billetterie (Zeffy)</label>
                  <input
                    type="text"
                    value={progForm.zeffyUrl}
                    onChange={(e) => setProgForm({ ...progForm, zeffyUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-ivory text-forestGreen font-mono text-xs outline-none focus:border-softGold"
                  />
                </div>
              </div>

              {/* Upload Visuels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-sage/20">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-sage">📤 Image Banner Principale</label>
                  <label className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-forestGreen text-ivory text-xs font-bold cursor-pointer hover:bg-forestGreen-dark shadow">
                    <Upload size={14} className="text-softGold" />
                    <span>Téléverser Image Banner</span>
                    <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                  </label>
                  {progForm.bannerImage && (
                    <img src={progForm.bannerImage} alt="Banner" className="h-28 w-full object-cover rounded-xl border" />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-sage">📤 Visuel Secondaire</label>
                  <label className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-sage/20 text-forestGreen dark:text-ivory text-xs font-bold cursor-pointer hover:bg-sage/30 shadow">
                    <Upload size={14} className="text-bordeaux" />
                    <span>Téléverser Visuel Secondaire</span>
                    <input type="file" accept="image/*" onChange={handleSecondaryUpload} className="hidden" />
                  </label>
                  {progForm.secondaryImage && (
                    <img src={progForm.secondaryImage} alt="Secondaire" className="h-28 w-full object-cover rounded-xl border" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-bordeaux text-ivory py-4 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl hover:bg-bordeaux-dark transition-all border border-softGold/30 flex items-center justify-center space-x-2"
              >
                <Save size={16} className="text-softGold" />
                <span>Enregistrer & Générer la Page CMS du Programme</span>
              </button>
            </form>
          </div>

          {/* List of Registered Programs */}
          <div className="bg-ivory dark:bg-forestGreen-dark p-6 sm:p-8 rounded-3xl border border-softGold/30 shadow-2xl space-y-6">
            <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory border-b border-sage/20 pb-4">
              Programmes Enregistrés ({programs.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((p) => (
                <div key={p.id} className="bg-ivory dark:bg-forestGreen-dark border border-sage/30 p-5 rounded-2xl space-y-3 shadow">
                  <img src={p.bannerImage} alt={p.title} className="h-32 w-full object-cover rounded-xl border" />
                  <h4 className="font-bold text-base text-forestGreen dark:text-ivory">{p.title}</h4>
                  <p className="text-xs text-bordeaux font-bold">{p.montrealTime} • {p.parisTime}</p>
                  
                  {/* Action Buttons: CMS Editor, Navbar Adder, Live Page */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sage/20">
                    <button
                      onClick={() => {
                        const page = addOrUpdateProgramPage(p);
                        setCurrentPage(page.id);
                        setCurrentView('builder');
                        showToast(`Page CMS "${p.title}" ouverte dans le Builder !`);
                      }}
                      className="bg-bordeaux hover:bg-bordeaux-dark text-ivory px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow transition-all flex items-center justify-center space-x-1.5 border border-softGold/30"
                    >
                      <Sparkles size={12} className="text-softGold" />
                      <span>Éditer Page CMS</span>
                    </button>

                    <button
                      onClick={() => {
                        addHeaderNavLink({
                          label: p.title,
                          href: `/programming-1/${p.slug}`,
                          active: true,
                        });
                        showToast(`"${p.title}" ajouté au Menu Navbar !`);
                      }}
                      className="bg-ivory/10 hover:bg-ivory/20 text-softGold border border-softGold/30 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1"
                    >
                      <Compass size={12} />
                      <span>+ Menu Nav</span>
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[11px]">
                    <a
                      href={`/programming-1/${p.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-sage hover:text-softGold flex items-center space-x-1"
                    >
                      <span>Voir la page publique</span>
                      <ExternalLink size={11} />
                    </a>
                    <span className="font-mono text-softGold">{p.clicks} clics</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LE GITE MANAGEMENT VIEW */}
      {currentView === 'gite' && (
        <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto space-y-8 w-full">
          <div className="bg-ivory dark:bg-forestGreen-dark p-8 rounded-3xl border border-softGold/30 shadow-2xl space-y-6">
            <h2 className="font-playfair text-3xl font-bold text-forestGreen dark:text-ivory border-b border-sage/20 pb-4">
              Gestion du Gîte du Vivant (Lieu d'Accueil)
            </h2>
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-2">Titre de la Page Gîte</label>
                <input type="text" defaultValue="Le Gîte du Vivant — Havre de Paix en Forêt" className="w-full p-3 rounded-xl border bg-ivory text-forestGreen font-bold text-xs outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-sage mb-2">Description & Présentation</label>
                <textarea rows={4} defaultValue="Un espace préservé au cœur de la nature pour accueillir retraites, méditations et séminaires silencieux." className="w-full p-3 rounded-xl border bg-ivory text-forestGreen text-xs outline-none" />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCurrentPage('page_gite');
                    setCurrentView('builder');
                    showToast("Page Gîte chargée dans le Builder visuel !");
                  }}
                  className="bg-bordeaux text-ivory px-6 py-3 rounded-full text-xs font-bold uppercase border border-softGold/30 flex items-center space-x-2"
                >
                  <Sparkles size={14} className="text-softGold" />
                  <span>Éditer la page Gîte dans le Builder Visuel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMINS CRUD MANAGEMENT VIEW */}
      {currentView === 'admins' && (
        <AdminsManager onOpenToast={showToast} />
      )}
    </div>
  );
};

export default SGStudioEditor;
