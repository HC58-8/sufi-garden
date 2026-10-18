'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../store';
import { Search, Globe, Share2, X, Check, Save } from 'lucide-react';

interface SeoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const SeoManagerModal: React.FC<SeoManagerModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const { pages, currentPageId, updatePageSeo, savePageToBackend } = useEditorStore();
  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];

  const [title, setTitle] = useState(currentPage?.seo?.title || currentPage?.title || '');
  const [description, setDescription] = useState(currentPage?.seo?.metaDescription || '');
  const [keywords, setKeywords] = useState(currentPage?.seo?.keywords || '');
  const [ogImage, setOgImage] = useState(
    currentPage?.seo?.ogImage ||
      'https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg'
  );

  if (!isOpen || !currentPage) return null;

  const handleSave = async () => {
    updatePageSeo(currentPage.id, {
      title,
      metaDescription: description,
      keywords,
      ogImage,
    });
    await savePageToBackend(currentPage.id);
    onShowToast('✅ Métadonnées SEO enregistrées avec succès !');
    onClose();
  };

  const pageSlugClean =
    currentPage.slug === 'home' || !currentPage.slug ? '' : currentPage.slug.replace(/^\//, '');

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-forestGreen-dark text-ivory w-full max-w-4xl max-h-[90vh] rounded-3xl border border-softGold/40 shadow-2xl overflow-hidden flex flex-col font-inter">
        {/* Modal Header */}
        <div className="p-6 border-b border-softGold/20 flex items-center justify-between bg-ivory/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-bordeaux rounded-xl text-softGold border border-softGold/30">
              <Search size={18} />
            </div>
            <div>
              <h3 className="font-playfair text-xl font-bold text-ivory">
                Configuration SEO & Référencement Pro
              </h3>
              <p className="text-xs text-sage">
                Optimisation pour Google, réseaux sociaux et moteurs de recherche — Page :{' '}
                <span className="text-softGold font-bold">{currentPage.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ivory/60 hover:text-ivory hover:bg-ivory/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SEO Form Inputs */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-sage">
                  Balise Titre (Title SEO)
                </label>
                <span className={`text-[11px] font-mono ${title.length > 60 ? 'text-amber-400' : 'text-sage'}`}>
                  {title.length}/60 caractères recommandés
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Les Inspirations du Vendredi | Institut du Jardin Soufi"
                className="w-full px-4 py-2.5 rounded-xl bg-ivory/10 border border-ivory/20 text-xs font-bold text-ivory focus:border-softGold outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-sage">
                  Méta-Description (Meta Description)
                </label>
                <span className={`text-[11px] font-mono ${description.length > 160 ? 'text-amber-400' : 'text-sage'}`}>
                  {description.length}/160 caractères recommandés
                </span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Découvrez nos retraites silencieuses et ateliers de méditation en forêt au Québec..."
                className="w-full px-4 py-2.5 rounded-xl bg-ivory/10 border border-ivory/20 text-xs text-ivory focus:border-softGold outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-sage block mb-1.5">
                  Mots-clés (Keywords)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="soufisme, nature, méditation, québec"
                  className="w-full px-4 py-2.5 rounded-xl bg-ivory/10 border border-ivory/20 text-xs text-ivory focus:border-softGold outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-sage block mb-1.5">
                  Image de Partage (OpenGraph / Facebook / Twitter)
                </label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-ivory/10 border border-ivory/20 text-xs font-mono text-ivory focus:border-softGold outline-none"
                />
              </div>
            </div>
          </div>

          {/* PREVIEWS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-sage/20">
            {/* Google SERP Card Preview */}
            <div className="p-5 rounded-2xl bg-white text-gray-800 shadow-md space-y-2 border">
              <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <Globe size={13} className="text-blue-500" />
                <span>Aperçu sur Google (Recherche Mobile & Desktop)</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-gray-600 font-mono block">
                  https://www.jardinsoufi.org {pageSlugClean ? `› ${pageSlugClean}` : ''}
                </span>
                <h4 className="text-base text-[#1a0dab] hover:underline font-semibold leading-snug cursor-pointer line-clamp-1">
                  {title || 'Titre de la Page | Jardin Soufi'}
                </h4>
                <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                  {description || 'Aucune méta-description définie. Saisissez un résumé attrayant pour inciter aux clics.'}
                </p>
              </div>
            </div>

            {/* Social Media Card Preview */}
            <div className="p-5 rounded-2xl bg-ivory/5 border border-sage/20 space-y-2">
              <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-softGold tracking-wider">
                <Share2 size={13} />
                <span>Aperçu Réseaux Sociaux (Facebook, X, LinkedIn)</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-sage/30 bg-black/20">
                {ogImage ? (
                  <img src={ogImage} alt="Social Preview" className="h-28 w-full object-cover" />
                ) : (
                  <div className="h-28 w-full bg-forestGreen flex items-center justify-center text-xs text-sage">
                    Aucun visuel défini
                  </div>
                )}
                <div className="p-3 bg-forestGreen-dark text-left space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-sage block font-mono">
                    jardinsoufi.org
                  </span>
                  <h5 className="text-xs font-bold text-ivory line-clamp-1">
                    {title || currentPage.title}
                  </h5>
                  <p className="text-[10px] text-sage line-clamp-1">
                    {description || 'Institut de la contemplation du vivant.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-softGold/20 bg-ivory/5 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-ivory/70 hover:text-ivory hover:bg-ivory/10 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-bordeaux hover:bg-bordeaux-dark text-ivory px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-all border border-softGold/40"
          >
            <Save size={14} className="text-softGold" />
            <span>Enregistrer le SEO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeoManagerModal;
