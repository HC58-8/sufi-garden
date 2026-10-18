"use client";

import { motion } from "framer-motion";
import { Heart, Compass, BookOpen, Gift } from "lucide-react";
import Link from "next/link";
import { useCmsPage } from "@/builder/useCmsPage";

export default function SupportUsPage() {
  const { getText, getLink } = useCmsPage('support-us');

  const supportOptions = [
    {
      title: getText('support_opt1_title', "Soutenir le Jardin"),
      desc: getText('support_opt1_desc', "Participer à préserver un espace de contemplation, de transmission et de présence enraciné dans la nature."),
      actionLabel: getText('support_opt1_btn', "Faire un don sur Zeffy"),
      link: getLink('support_opt1_btn', "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world"),
    },
    {
      title: getText('support_opt2_title', "Soutenir les rencontres"),
      desc: getText('support_opt2_desc', "Contribuer au déploiement des retraites, séminaires, méditations et espaces d’apprentissage du vivant."),
      actionLabel: getText('support_opt2_btn', "Voir les programmes"),
      link: getLink('support_opt2_btn', "/programming-1"),
    },
    {
      title: getText('support_opt3_title', "Soutenir notre mission d’écologie intérieure"),
      desc: getText('support_opt3_desc', "Votre soutien nous permet de faire vivre des espaces de présence, de transformation intérieure et de lien avec la nature. Chaque contribution participe directement à nos programmes et à la préservation du lieu."),
      actionLabel: getText('support_opt3_btn', "Faire un don"),
      link: getLink('support_opt3_btn', "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world"),
    }
  ];

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-bold tracking-[0.2em] text-bordeaux uppercase">
          {getText('support_badge', "SÉCURISÉ VIA ZEFFY")}
        </span>
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-spiritualGreen dark:text-cream-100 mt-2">
          {getText('support_h1', "Soutenir le Jardin Soufi")}
        </h1>
        <p className="text-sm md:text-base text-darkGray/60 dark:text-cream-200/60 mt-4 leading-relaxed">
          {getText('support_p', "Le Jardin Soufi est un espace d’étude, de contemplation et de méditation enraciné dans la nature. Votre contribution préserve ce sanctuaire unique de paix et d'écologie humaine.")}
        </p>
      </div>

      {/* Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {supportOptions.map((opt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass p-8 rounded-3xl border border-bordeaux/15 flex flex-col justify-between hover:shadow-2xl transition-smooth"
          >
            <div>
              <div className="p-3 bg-bordeaux/10 rounded-2xl w-fit text-bordeaux mb-6 border border-bordeaux/20">
                <Gift size={20} />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-spiritualGreen dark:text-cream-100 mb-4">
                {opt.title}
              </h3>
              <p className="text-xs md:text-sm text-darkGray/70 dark:text-cream-200/70 leading-relaxed mb-8">
                {opt.desc}
              </p>
            </div>
            <Link
              href={opt.link}
              target={opt.link.startsWith("http") ? "_blank" : "_self"}
              className="block text-center bg-spiritualGreen dark:bg-bordeaux text-cream-50 dark:text-spiritualGreen-dark py-3.5 rounded-full font-bold text-xs tracking-wider uppercase transition-smooth hover:scale-105"
            >
              {opt.actionLabel}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Info Boxes */}
      <section className="mt-28 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass p-10 rounded-3xl border border-bordeaux/20">
          <h3 className="font-playfair text-2xl font-bold text-spiritualGreen dark:text-cream-100 mb-4">Notre Vision</h3>
          <p className="text-sm text-darkGray/80 dark:text-cream-200/80 leading-relaxed">
            Nous croyons que la guérison du monde commence par la guérison du regard. Réapprendre à voir. Réapprendre à écouter. Réapprendre à habiter. Le Jardin Soufi accompagne cette renaissance par la méditation, la contemplation, l’écoute et le contact direct avec la forêt.
          </p>
        </div>

        <div className="glass p-10 rounded-3xl border border-bordeaux/20">
          <h3 className="font-playfair text-2xl font-bold text-spiritualGreen dark:text-cream-100 mb-4">Notre Mission</h3>
          <p className="text-sm text-darkGray/80 dark:text-cream-200/80 leading-relaxed">
            Cultiver une écologie intérieure et spirituelle. À travers retraites, ateliers immersifs et séminaires d’étude, le Jardin Soufi tisse un dialogue vivant entre sagesse spirituelle, écologie profonde et pratiques méditatives.
          </p>
        </div>
      </section>
    </div>
  );
}
