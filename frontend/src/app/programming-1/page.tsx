"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, Laptop, MapPin, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCmsPage } from "@/builder/useCmsPage";

export default function ProgrammingPage() {
  const { getText, getImage, getLink } = useCmsPage('programming-1');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70 } },
  };

  const programs = [
    {
      slug: "balades-meditatives",
      title: getText('prog_title_1', "Les Balades Méditatives"),
      date: getText('prog_date_1', "11 juillet • 15 août • 5 septembre"),
      desc: getText('prog_desc_1', "Ralentir. Respirer. Marcher ensemble. Une exploration silencieuse de la nature sauvage."),
      type: "Présentiel",
      icon: MapPin,
      link: getLink('prog_link_1', "/programming-1/balades-meditatives"),
      image: getImage('prog_img_1', "https://static.wixstatic.com/media/9b3551_603242551bc04683b69990ca91ab0648~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Balade%20M%C3%A9ditative.png")
    },
    {
      slug: "inspirations-du-vendredi",
      title: getText('prog_title_2', "Les Inspirations du Vendredi"),
      date: getText('prog_date_2', "À partir du 26 juin 2026"),
      desc: getText('prog_desc_2', "Un rendez-vous hebdomadaire pour explorer les Noms Divins à travers la contemplation, la réflexion et la présence intérieure."),
      type: "En ligne / Français",
      icon: Laptop,
      link: getLink('prog_link_2', "/programming-1/inspirations-du-vendredi"),
      image: getImage('prog_img_2', "https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png")
    },
    {
      slug: "friday-in-sights",
      title: getText('prog_title_3', "The Friday In-Sights"),
      date: getText('prog_date_3', "Starting June 26, 2026"),
      desc: getText('prog_desc_3', "A weekly gathering exploring the Divine Names through contemplation, reflection, and inner presence."),
      type: "Online / English",
      icon: Laptop,
      link: getLink('prog_link_3', "/programming-1/friday-in-sights"),
      image: getImage('prog_img_3', "https://static.wixstatic.com/media/9b3551_0467d6ae325f4c3e9fa96cd44ae8c8d2~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Insight_Banner.png")
    },
    {
      slug: "nouveau-regard",
      title: getText('prog_title_4', "Nouveau Regard"),
      date: getText('prog_date_4', "À partir du 5 juillet 2026"),
      desc: getText('prog_desc_4', "Pour une lecture renouvelée de notre héritage spirituel avec Hamdi Ben Aissa."),
      type: "Présentiel / Français",
      icon: MapPin,
      link: getLink('prog_link_4', "/programming-1/nouveau-regard"),
      image: getImage('prog_img_4', "https://static.wixstatic.com/media/9b3551_2496bff08ac54ad19f7cfb028377c146~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Les%20Inspirations%20du%20Vendredi.png")
    },
    {
      slug: "new-gaze",
      title: getText('prog_title_5', "New Gaze"),
      date: getText('prog_date_5', "Starting July 12, 2026"),
      desc: getText('prog_desc_5', "Tradition, Meaning, and Renewal in the Twenty-First Century with Hamdi Ben Aissa."),
      type: "Online / English",
      icon: Laptop,
      link: getLink('prog_link_5', "/programming-1/nouveau-regard"),
      image: getImage('prog_img_5', "https://static.wixstatic.com/media/9b3551_5b5035c8655d45dcbe4737729cef5502~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/ANGLAIS%20-%20Banner_New%20Gaze.png")
    },
    {
      slug: "universal-call",
      title: getText('prog_title_6', "L’Appel Universel (Universal Call)"),
      date: getText('prog_date_6', "26 - 28 Juin 2026"),
      desc: getText('prog_desc_6', "Séminaire immersif de contemplation et de présence guidé par Shaykh Hamdi Ben Aïssa au cœur de la forêt sauvage."),
      type: "Présentiel & En Ligne",
      icon: Compass,
      link: getLink('prog_link_6', "/programming-1/universal-call"),
      image: getImage('prog_img_6', "https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg")
    }
  ];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forestGreen text-ivory text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <Sparkles size={12} className="text-softGold" />
          <span>{getText('prog_hero_badge', "Séminaires & Retraites Contemplatives")}</span>
        </motion.span>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-playfair text-4xl sm:text-6xl font-bold text-spiritualGreen dark:text-cream-100"
        >
          {getText('prog_hero_h1', "Explorer le Jardin")}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-darkGray/60 dark:text-cream-200/60 mt-4 text-base md:text-lg font-inter"
        >
          {getText('prog_hero_p', "Retraites, séjours contemplatifs, marches méditatives, cercles de présence et rencontres au cœur de la nature.")}
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {programs.map((prog, index) => {
          const IconComponent = prog.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-smooth border border-bordeaux/15 group bg-ivory dark:bg-forestGreen-dark/90"
            >
              {/* Clickable Image Banner */}
              <Link href={prog.link} className="relative h-56 w-full overflow-hidden block">
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spiritualGreen-dark/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/60 text-bordeaux border border-bordeaux/20 backdrop-blur-md">
                    <IconComponent size={10} />
                    <span>{prog.type}</span>
                  </span>
                  <div className="bg-black/60 p-1.5 rounded-full border border-bordeaux/25 text-bordeaux backdrop-blur-md">
                    <Calendar size={12} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-xs font-semibold text-bordeaux bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-bordeaux/15">
                  {prog.date}
                </div>
              </Link>

              {/* Card Details & Navigation Button */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <Link href={prog.link}>
                    <h3 className="font-playfair text-xl font-bold text-spiritualGreen dark:text-cream-100 mb-3 leading-snug hover:text-bordeaux transition-colors">
                      {prog.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-darkGray/75 dark:text-cream-200/75 leading-relaxed font-inter">
                    {prog.desc}
                  </p>
                </div>
                <Link
                  href={prog.link}
                  className="flex items-center justify-between border-t border-sage/20 mt-6 pt-5 group text-xs font-bold tracking-wider uppercase text-forestGreen dark:text-ivory hover:text-bordeaux transition-smooth"
                >
                  <span>Découvrir l'événement & Billetterie</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-bronze" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dynamic Accompaniment section */}
      <section className="mt-32 glass p-10 md:p-16 rounded-3xl border border-bordeaux/20 relative overflow-hidden bg-ivory dark:bg-forestGreen-dark/90">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] text-bordeaux uppercase">
              {getText('prog_acc_badge', "DEUX MODES D’ACCOMPAGNEMENT")}
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-spiritualGreen dark:text-cream-100">
              {getText('prog_acc_h2', "Des programmes adaptés à votre rythme")}
            </h2>
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <Compass className="text-bordeaux mt-1 flex-shrink-0" size={18} />
                <p className="text-sm text-darkGray/80 dark:text-cream-200/80 leading-relaxed font-inter">
                  <strong>Programmes en présentiel :</strong> Retraites, cercles de présence, séjours contemplatifs et rencontres au cœur de la nature.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Compass className="text-bordeaux mt-1 flex-shrink-0" size={18} />
                <p className="text-sm text-darkGray/80 dark:text-cream-200/80 leading-relaxed font-inter">
                  <strong>Programmes en ligne :</strong> Méditations, séminaires d’étude, enseignements et espaces de transmission accessibles à distance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-forestGreen dark:bg-forestGreen-dark p-8 md:p-12 rounded-3xl text-ivory border border-bordeaux/20 flex flex-col justify-between shadow-2xl">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-softGold mb-4">
                {getText('prog_support_h3', "Soutenir l’écologie intérieure")}
              </h3>
              <p className="text-sm text-ivory/85 leading-relaxed font-inter">
                {getText('prog_support_p', "Le Jardin Soufi vit grâce à celles et ceux qui participent à préserver un espace de présence, de contemplation et de transmission enraciné dans la nature.")}
              </p>
            </div>
            <Link
              href={getLink('prog_support_btn', "/support-us")}
              className="mt-8 text-center bg-bordeaux hover:bg-bordeaux-dark text-ivory py-4 rounded-full font-bold text-xs tracking-wider uppercase transition-smooth shadow-lg border border-softGold/30"
            >
              {getText('prog_support_btn', "Soutenir la mission →")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
