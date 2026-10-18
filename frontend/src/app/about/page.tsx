"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, Heart, Compass, BookOpen, ExternalLink, ShieldCheck, UserCheck } from "lucide-react";
import { useCmsPage } from "@/builder/useCmsPage";

export default function AboutPage() {
  const { getText, getImage, getLink } = useCmsPage('about');

  return (
    <div className="bg-ivory dark:bg-forestGreen-dark text-forestGreen dark:text-ivory transition-colors min-h-screen">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto text-center border-b border-sage/20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forestGreen text-ivory text-xs font-bold tracking-[0.25em] uppercase mb-6 shadow-sm"
        >
          <Sparkles size={14} className="text-softGold" />
          <span>{getText('about_hero_badge', "Institut de la contemplation du vivant et de l’écologie intérieure")}</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold text-forestGreen dark:text-ivory tracking-tight leading-tight"
        >
          {getText('about_hero_h1', "Le Jardin Soufi")}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl font-playfair italic text-bordeaux dark:text-softGold mt-4 max-w-2xl mx-auto font-medium"
        >
          {getText('about_hero_p', "Méditer la nature. Habiter la présence. Revenir au vivant.")}
        </motion.p>
      </section>

      {/* 2. VISION & MISSION SECTION (with image slot 1000001613.jpg) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Space for 1000001613.jpg */}
          <div className="lg:col-span-5 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-bronze/30 group">
            <Image
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200"
              alt="Notre Vision & Mission - 1000001613.jpg"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forestGreen-dark/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-ivory/90 dark:bg-forestGreen-dark/90 backdrop-blur-md rounded-2xl border border-sage/30 text-center">
              <p className="font-playfair italic text-xs text-forestGreen dark:text-ivory">
                « Réapprendre à voir. Réapprendre à écouter. Réapprendre à habiter. »
              </p>
            </div>
          </div>

          {/* Cards for Vision & Mission */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-ivory dark:bg-forestGreen-dark/90 p-8 rounded-3xl border border-sage/30 shadow-lg space-y-4"
            >
              <div className="flex items-center space-x-3 text-bordeaux border-b border-sage/20 pb-3">
                <div className="p-2.5 bg-bordeaux/10 text-bordeaux rounded-xl">
                  <Eye size={22} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory">Notre Vision</h3>
              </div>
              <p className="text-base font-semibold text-forestGreen dark:text-ivory italic">
                « Nous croyons que la guérison du monde commence par la guérison du regard. »
              </p>
              <div className="space-y-2 text-sm text-forestGreen/85 dark:text-ivory/85 leading-relaxed font-inter">
                <p className="font-semibold text-bordeaux">
                  Réapprendre à voir. &bull; Réapprendre à écouter. &bull; Réapprendre à habiter.
                </p>
                <p>
                  Le Jardin Soufi accompagne cette renaissance par la méditation, la contemplation, l’écoute et le contact direct avec la forêt et ses cycles.
                </p>
                <p className="font-playfair italic text-bronze font-medium">
                  Une école du souffle et du silence, où la nature devient miroir de l’âme et source de connaissance.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-ivory dark:bg-forestGreen-dark/90 p-8 rounded-3xl border border-sage/30 shadow-lg space-y-4"
            >
              <div className="flex items-center space-x-3 text-forestGreen border-b border-sage/20 pb-3">
                <div className="p-2.5 bg-forestGreen text-ivory rounded-xl">
                  <Sparkles size={22} className="text-softGold" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory">Notre Mission</h3>
              </div>
              <p className="text-base font-bold text-forestGreen dark:text-ivory">
                Cultiver une écologie intérieure et spirituelle.
              </p>
              <p className="text-sm text-forestGreen/85 dark:text-ivory/85 leading-relaxed font-inter">
                À travers retraites, ateliers immersifs, séminaires d’étude et programmes éducatifs, le Jardin Soufi tisse un dialogue vivant entre sagesse spirituelle, écologie profonde et pratiques méditatives.
              </p>
              <p className="text-sm text-forestGreen/85 dark:text-ivory/85 leading-relaxed font-inter font-medium text-bordeaux">
                L’Institut accueille adultes, jeunes et enfants dans une démarche de présence, de beauté, de responsabilité et de gratitude envers le vivant.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. À PROPOS SECTION (with image slot 1000001610.jpg) */}
      <section className="py-20 px-6 bg-ivory-dark/40 dark:bg-forestGreen/20 border-y border-sage/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] text-bronze uppercase">ENRACINEMENT DANS LA FORÊT</span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory leading-tight">
              À propos du Jardin Soufi
            </h2>
            <p className="text-base sm:text-lg text-forestGreen/90 dark:text-ivory/90 leading-relaxed font-inter">
              Le Jardin Soufi est un espace d’étude, de contemplation et de méditation enraciné dans la nature.
            </p>
            <p className="text-sm sm:text-base text-forestGreen/85 dark:text-ivory/85 leading-relaxed font-inter">
              Né au cœur de la forêt, il invite à retrouver le lien entre l’âme humaine et la terre, entre le souffle et la sève, entre la prière et la présence.
            </p>
            <div className="p-6 bg-forestGreen text-ivory rounded-2xl border border-softGold/30 shadow-xl space-y-2">
              <h3 className="font-playfair text-xl font-bold text-softGold">
                Ici, la nature n’est pas un décor. Elle est une enseignante.
              </h3>
              <p className="font-playfair italic text-sm text-ivory/90">
                Chaque arbre, chaque silence, chaque respiration devient un verset du Livre du Vivant.
              </p>
            </div>
          </div>

          {/* Image Space for 1000001610.jpg */}
          <div className="lg:col-span-5 relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border-2 border-bronze/30 group">
            <Image
              src="https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg"
              alt="À propos du Jardin Soufi - 1000001610.jpg"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forestGreen-dark/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 4. HAMDI BEN AÏSSA - FONDATEUR & VISIONNAIRE (with image slot 11.png) */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-ivory dark:bg-forestGreen-dark/90 rounded-3xl p-8 sm:p-14 border-2 border-sage/30 shadow-2xl space-y-12">
          {/* Header & Portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image Space for 11.png */}
            <div className="lg:col-span-5 relative h-[480px] rounded-3xl overflow-hidden border-2 border-bordeaux/30 shadow-xl group">
              <Image
                src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/2147490754/images/7e341b1-4658-7f35-75f-2f5046e3fb44_2b2c03837df947d4ddb1be8f.png"
                alt="Hamdi Ben Aïssa - Fondateur 11.png"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forestGreen-dark/60 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-[0.25em] text-bordeaux uppercase">NOTRE FONDATION</span>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
                Hamdi Ben Aïssa
              </h2>
              <h3 className="font-playfair text-xl italic text-bronze font-semibold">
                Notre Fondateur & Visionnaire
              </h3>
              <p className="text-base text-forestGreen/90 dark:text-ivory/90 leading-relaxed font-inter font-medium">
                Né le 15 avril 1979, Hamdi Ben Aïssa est enseignant, accompagnant spirituel et guide communautaire. Son travail tisse un lien vivant entre les dimensions juridiques, sociales et spirituelles de l’existence humaine.
              </p>
              <div className="p-4 bg-sage/10 rounded-2xl border border-sage/30">
                <p className="font-playfair italic text-xs text-forestGreen dark:text-ivory">
                  « Une invitation à embrasser notre humanité commune tout en nous éveillant à notre origine divine. »
                </p>
              </div>
            </div>
          </div>

          {/* Full Detailed Biography Paragraphs */}
          <div className="space-y-6 text-sm sm:text-base text-forestGreen/85 dark:text-ivory/85 leading-relaxed font-inter pt-6 border-t border-sage/20">
            <p>
              Il entame son parcours académique en Tunisie, où il obtient un diplôme en Droit et Sciences sociales à l’Université de Tunis en 2002. Il poursuit ensuite une maîtrise en Droit international à l’Université Laval, à Québec, dont il est diplômé en 2005, avant de compléter un diplôme en Droit à l’Université d’Ottawa en 2009.
            </p>
            <p>
              Entre 2009 et 2013, Hamdi travaille dans le domaine du droit familial et de la médiation, accompagnant les familles dans des périodes de transition avec compassion et rigueur juridique. En 2013, il rejoint les Services correctionnels du Canada en tant qu’aumônier, au service de personnes incarcérées jusqu’en 2017. Cette expérience intensifie son engagement pour la transformation intérieure et éveille en lui un appel à servir au-delà des structures institutionnelles.
            </p>
            <p>
              Depuis 2017, il se consacre à plein temps à l’enseignement et à l’accompagnement spirituel au sein du Rhoda Institute à Ottawa – un espace qu’il a contribué à façonner comme un sanctuaire de réflexion, de guérison et d’éveil du potentiel humain. Son approche s’ancre dans la spiritualité islamique, les principes universels de sagesse, et une attention particulière portée à la confiance intérieure, l’éveil du cœur et la présence sacrée.
            </p>
            <p>
              Le cheminement spirituel de Hamdi s’intensifie à partir de 2003, lorsqu’il commence à étudier et transmettre la sagesse de la tradition soufie. Au fil des années, il bénéficie de rencontres et de formations prolongées auprès de maîtres et enseignants du chemin soufi – des rencontres qui marquent son âme et façonnent son art d’accompagner. Sa pratique allie silence méditatif, sons sacrés, contemplation coranique et présence du cœur enracinée dans la compassion prophétique.
            </p>
            <p>
              En 2022, il fonde l’Institut Alchemya des Études Contemplatives, une initiative enracinée dans la tradition soufie mais ouverte à tous les chercheurs de vérité. L’Institut propose un espace où les sagesses anciennes rencontrent les urgences du monde contemporain : guérison intérieure, cohérence, maturité spirituelle et responsabilité éthique.
            </p>
            <p>
              Le style d’enseignement de Hamdi est à la fois contemplatif et incarné. Il parle depuis l’expérience vécue, et non depuis la théorie abstraite. Il invite à ralentir, écouter profondément, et renouer avec la Source originelle. Son message est un appel à la confiance radicale, à l’intégrité spirituelle et à une évolution consciente – une invitation à embrasser notre humanité commune tout en nous éveillant à notre origine divine.
            </p>
            <p className="font-medium text-forestGreen dark:text-ivory">
              Aujourd’hui, il continue à accompagner des individus et des communautés sur leur chemin de reconnexion – à eux-mêmes, au Divin et au Tout – dans un monde assoiffé de sens, d’enracinement et de plénitude.
            </p>
          </div>

          {/* Direct Link to Alchemya Thought Blog */}
          <div className="pt-6 border-t border-sage/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-semibold text-forestGreen dark:text-ivory font-playfair">
              Découvrez son cheminement et sa vision en profondeur :
            </span>
            <a
              href="https://www.alchemya-institute.com/blog/ma-pensee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-bordeaux hover:bg-bordeaux-dark text-ivory px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-smooth shadow-lg border border-softGold/30"
            >
              <span>Lire sa pensée sur Alchemya Institute</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* 5. SOUTENIR NOTRE MISSION D'ÉCOLOGIE INTÉRIEURE (with image slot 12.png) */}
      <section className="py-24 px-6 bg-ivory-dark/40 dark:bg-forestGreen/20 border-t border-sage/20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-bordeaux text-ivory text-xs font-bold tracking-widest uppercase">
            <Heart size={14} className="fill-current text-softGold" />
            <span>Soutenir le Jardin</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
            Soutenir notre mission d’écologie intérieure
          </h2>

          <p className="text-base sm:text-lg text-forestGreen/85 dark:text-ivory/85 max-w-2xl mx-auto leading-relaxed font-inter">
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
