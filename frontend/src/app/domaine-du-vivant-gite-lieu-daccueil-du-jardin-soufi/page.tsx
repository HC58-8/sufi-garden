"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Trees,
  Compass,
  Clock,
  Sparkles,
  Heart,
  ArrowRight,
  Maximize2,
  X,
  CheckCircle2,
  Home,
  Feather,
  BookOpen,
  Coffee,
  Bed,
  Sun
} from "lucide-react";
import { useCmsPage } from "@/builder/useCmsPage";

export default function GitePage() {
  const { getText, getImage, getLink } = useCmsPage('domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi');
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const essentials = [
    { title: "Le Silence", desc: "Une denrée rare, préservée ici avec soin.", icon: Clock },
    { title: "L'Espace", desc: "L'immensité de la forêt pour retrouver le sien.", icon: Trees },
    { title: "Le Temps", desc: "Ralentir pour habiter chaque instant.", icon: Sun },
    { title: "La Présence", desc: "Être là, tout simplement.", icon: Compass },
    { title: "La Sobriété", desc: "La beauté du pur et de l'essentiel.", icon: Sparkles },
  ];

  const experiences = [
    {
      title: "Immersion forestière",
      desc: "Vivre au rythme de la forêt, écouter le vent dans les cimes et retrouver son ancrage terrestre.",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Silence et présence",
      desc: "Le luxe de ne rien faire, de simplement être là, attentif à la beauté qui nous entoure.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Sagesse partagée",
      desc: "Des échanges inspirants au coin du feu, nourris par les enseignements de la tradition soufie.",
      image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Rythmes naturels",
      desc: "Se reconnecter aux cycles du jour et des saisons pour retrouver son équilibre intérieur.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Marches méditatives",
      desc: "Parcourir les sentiers du domaine comme un chemin vers soi, pas après pas.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Repos de l'âme",
      desc: "Un espace protégé pour déposer ses fardeaux et laisser l'âme respirer à nouveau.",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const spaces = [
    { title: "Grande salle de pratique lumineuse", icon: Sun },
    { title: "Bibliothèque contemplative", icon: BookOpen },
    { title: "Cuisine collective et foyer central", icon: Coffee },
    { title: "Sentiers de méditation sauvage", icon: Trees },
    { title: "Petit lac privé pour le recueillement", icon: Compass }
  ];

  const lodging = [
    { title: "Gîte chaleureux et authentique", icon: Home },
    { title: "Chambres simples et doubles à l’esprit monastique", icon: Bed },
    { title: "Dortoir pour une expérience partagée", icon: Feather },
    { title: "Literie naturelle et matières nobles", icon: Sparkles },
    { title: "Vue sur la forêt ou le lac", icon: Trees }
  ];

  const galleryImages = [
    {
      src: "/images/c4583881-c102-4b4f-81b4-814a66e75cbc.avif",
      category: "gite",
      title: "Le Domaine du Vivant - Vue Principale"
    },
    {
      src: "https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg",
      category: "gite",
      title: "Façade du Gîte & Nature"
    },
    {
      src: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1200",
      category: "lac",
      title: "Le Lac Privé de Recueillement"
    },
    {
      src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
      category: "chambres",
      title: "Chambre à l'Esprit Monastique"
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200",
      category: "foret",
      title: "Sentiers de Méditation Sauvage"
    },
    {
      src: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&q=80&w=1200",
      category: "pratique",
      title: "Foyer Central & Salle de Pratique"
    }
  ];

  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  return (
    <div className="bg-ivory dark:bg-forestGreen-dark text-forestGreen dark:text-ivory transition-colors min-h-screen">
      {/* 1. HERO HEADER SECTION WITH SPECIFIC AVIF IMAGE */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-sage/20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/c4583881-c102-4b4f-81b4-814a66e75cbc.avif"
            alt="Domaine du Vivant - Sanctuaire de silence"
            fill
            className="object-cover opacity-35 dark:opacity-45 blur-[0.5px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/90 to-ivory dark:from-forestGreen-dark/85 dark:via-forestGreen-dark/90 dark:to-forestGreen-dark" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forestGreen text-ivory text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-sm"
          >
            <Trees size={14} className="text-softGold" />
            <span>{getText('gite_hero_badge', "Le Domaine du Vivant • Lieu d'accueil")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-forestGreen dark:text-ivory"
          >
            {getText('gite_hero_h1', "Une porte ouverte sur l’essentiel")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 space-y-6 text-base sm:text-lg text-forestGreen/90 dark:text-ivory/90 max-w-3xl mx-auto leading-relaxed font-inter font-normal"
          >
            <p>
              {getText('gite_hero_p1', "Le Domaine du Vivant est bien plus qu’un simple gîte. C’est un sanctuaire de silence, conçu pour offrir aux individus et aux groupes un espace de retrait loin du tumulte du monde. Ici, chaque sentier, chaque recoin de la forêt invite au recueillement.")}
            </p>
            <p>
              {getText('gite_hero_p2', "Né de la vision du Jardin Soufi, ce lieu d’accueil incarne une écologie du cœur : un retour à la terre qui est aussi une remontée vers le Soi. Nous vous accueillons dans une atmosphère de simplicité et de beauté, où le luxe réside dans la qualité du silence et la profondeur de la présence.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. LES RICHESSES DE L'ESSENTIEL */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-bronze uppercase">VALEURS DU SANCTUAIRE</span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
            Les richesses de l’essentiel
          </h2>
          <p className="text-sm text-forestGreen/80 dark:text-ivory/80 font-inter">
            Ce que le Domaine préserve précieusement pour chaque visiteur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {essentials.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-ivory dark:bg-forestGreen-dark/90 p-6 rounded-3xl border border-sage/30 shadow-md hover:shadow-xl transition-smooth hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-bordeaux text-ivory rounded-2xl w-fit mb-4 shadow-sm">
                    <IconComp size={20} className="text-softGold" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-forestGreen dark:text-ivory mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-forestGreen/85 dark:text-ivory/85 leading-relaxed font-inter">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. UNE EXPÉRIENCE DE RESSOURCEMENT */}
      <section className="py-24 px-6 bg-ivory-dark/40 dark:bg-forestGreen/20 border-y border-sage/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] text-bordeaux uppercase">VOIE INTÉRIEURE</span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
              Une expérience de ressourcement
            </h2>
            <p className="text-sm text-forestGreen/80 dark:text-ivory/80">
              Des moments privilégiés pour réaligner le corps, le souffle et l'esprit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="bg-ivory dark:bg-forestGreen-dark/90 rounded-3xl overflow-hidden border border-sage/25 shadow-md hover:shadow-2xl transition-smooth hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forestGreen-dark/70 via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-3 flex-grow">
                  <h3 className="font-playfair text-xl font-bold text-forestGreen dark:text-ivory">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-forestGreen/85 dark:text-ivory/85 leading-relaxed font-inter">
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Philosophy Banner */}
          <div className="mt-16 bg-forestGreen text-ivory p-8 sm:p-12 rounded-3xl border border-softGold/30 text-center shadow-xl max-w-4xl mx-auto">
            <p className="font-playfair italic text-lg sm:text-2xl text-softGold leading-relaxed">
              « Le Domaine du Vivant est bien plus qu'un gîte : c'est un laboratoire de présence où chaque expérience devient une porte vers l'essentiel. »
            </p>
          </div>
        </div>
      </section>

      {/* 4. DES ESPACES CONÇUS POUR LA PRÉSENCE */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-bronze uppercase">INFRASTRUCTURES ET LIEUX</span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
            Des espaces conçus pour soutenir la présence et le ressourcement
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Column 1: Espaces */}
          <div className="bg-ivory dark:bg-forestGreen-dark/90 p-8 sm:p-10 rounded-3xl border border-sage/25 shadow-lg space-y-6">
            <div className="flex items-center space-x-3 border-b border-sage/20 pb-4">
              <div className="p-3 bg-forestGreen text-ivory rounded-2xl">
                <Trees size={22} className="text-softGold" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory">
                Espaces
              </h3>
            </div>
            <ul className="space-y-4">
              {spaces.map((sp, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm text-forestGreen/90 dark:text-ivory/90">
                  <CheckCircle2 size={18} className="text-forestGreen flex-shrink-0" />
                  <span className="font-medium font-inter">{sp.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Hébergement */}
          <div className="bg-ivory dark:bg-forestGreen-dark/90 p-8 sm:p-10 rounded-3xl border border-sage/25 shadow-lg space-y-6">
            <div className="flex items-center space-x-3 border-b border-sage/20 pb-4">
              <div className="p-3 bg-bordeaux text-ivory rounded-2xl">
                <Home size={22} className="text-softGold" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory">
                Hébergement
              </h3>
            </div>
            <ul className="space-y-4">
              {lodging.map((lg, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm text-forestGreen/90 dark:text-ivory/90">
                  <CheckCircle2 size={18} className="text-bordeaux flex-shrink-0" />
                  <span className="font-medium font-inter">{lg.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. POUR LES ORGANISATIONS & ENSEIGNANTS */}
      <section className="py-20 px-6 bg-forestGreen text-ivory border-y border-softGold/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold tracking-[0.25em] text-softGold uppercase">ACCUEIL DE GROUPES & RETRAITES</span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-ivory">
            Pour les organisations, enseignants et accompagnateurs
          </h2>
          <p className="text-base sm:text-lg text-ivory/90 leading-relaxed max-w-3xl mx-auto font-inter">
            Le Domaine du Vivant peut être mis à disposition pour l’organisation de retraites, formations, séminaires ou événements en accord avec la vision du lieu. Nous privilégions les projets favorisant la conscience, l’écologie intérieure, l’apprentissage, la créativité et le respect du vivant.
          </p>
          <div className="pt-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center space-x-2 bg-bordeaux hover:bg-bordeaux-dark text-ivory px-8 py-4 rounded-full font-bold text-xs tracking-wider uppercase transition-smooth shadow-lg border border-softGold/30"
            >
              <span>Faire une demande de privatisation</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. GALERIE PHOTO INTERACTIVE MODERNE */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-bronze uppercase">GALERIE INTERACTIVE</span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
            Découvrir le Domaine en images
          </h2>
          <p className="text-sm text-forestGreen/80 dark:text-ivory/80">
            Filtrez les vues pour explorer l'architecture du gîte, la forêt et le lac privé.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: "all", label: "Tous les lieux" },
              { id: "gite", label: "Le Gîte" },
              { id: "lac", label: "Le Lac Privé" },
              { id: "chambres", label: "Les Chambres" },
              { id: "foret", label: "La Forêt" },
              { id: "pratique", label: "Lieux de Pratique" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-smooth ${
                  activeTab === tab.id
                    ? "bg-bordeaux text-ivory shadow-md"
                    : "bg-sage/10 text-forestGreen dark:text-ivory hover:bg-sage/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={idx}
                onClick={() => setSelectedImage(img.src)}
                className="relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-smooth group border border-sage/20"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forestGreen-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-softGold uppercase tracking-widest">{img.title}</span>
                  <div className="flex items-center space-x-1.5 text-ivory text-xs mt-1">
                    <Maximize2 size={14} />
                    <span>Agrandir</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-3 text-ivory bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="relative w-full max-w-4xl h-[75vh] rounded-2xl overflow-hidden border border-white/20">
                <Image src={selectedImage} alt="Agrandissement" fill className="object-contain" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 7. FINAL CALL TO ACTION (SOUTENIR LE JARDIN) */}
      <section className="py-24 px-6 text-center border-t border-sage/20 bg-ivory-dark/40 dark:bg-forestGreen/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-bordeaux text-ivory text-xs font-bold tracking-widest uppercase">
            <Heart size={14} className="fill-current text-softGold" />
            <span>Soutenir le Domaine</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
            Soutenir notre mission d’écologie intérieure
          </h2>

          <p className="text-base text-forestGreen/80 dark:text-ivory/80 max-w-xl mx-auto leading-relaxed font-inter">
            Le Jardin Soufi vit grâce à celles et ceux qui participent à préserver un espace de présence, de contemplation et de transmission enraciné dans la nature.
          </p>

          <div className="pt-2">
            <Link
              href="/support-us"
              className="inline-flex items-center space-x-2 bg-bordeaux hover:bg-bordeaux-dark text-ivory px-9 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-smooth shadow-xl hover:scale-105 border border-softGold/30"
            >
              <span>Soutenir le Jardin →</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
