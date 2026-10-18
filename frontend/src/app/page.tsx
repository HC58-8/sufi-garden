"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, BookOpen, ArrowRight, Star } from "lucide-react";
import { useCmsPage } from "@/builder/useCmsPage";

export default function HomePage() {
  const { getText, getImage, getLink, getQuote } = useCmsPage('home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 60 } },
  };

  const programs = [
    {
      title: getText('home_p1_title', "Les Balades Méditatives"),
      date: getText('home_p1_date', "11 juillet • 15 août • 5 septembre"),
      desc: getText('home_p1_desc', "Ralentir. Respirer. Marcher ensemble. Retrouver notre ancrage terrestre dans la forêt."),
      link: getLink('home_p1_btn', "/programming-1"),
      image: getImage('home_p1_img', "https://static.wixstatic.com/media/9b3551_603242551bc04683b69990ca91ab0648~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Balade%20M%C3%A9ditative.png"),
    },
    {
      title: getText('home_p2_title', "Les Inspirations du Vendredi"),
      date: getText('home_p2_date', "À partir du 26 juin 2026"),
      desc: getText('home_p2_desc', "Un rendez-vous hebdomadaire pour explorer les Noms Divins à travers la contemplation."),
      link: getLink('home_p2_btn', "/programming-1"),
      image: getImage('home_p2_img', "https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png"),
    },
    {
      title: getText('home_p3_title', "The Friday In-Sights"),
      date: getText('home_p3_date', "Starting June 26, 2026"),
      desc: getText('home_p3_desc', "A weekly gathering exploring the Divine Names through contemplation, reflection, and presence."),
      link: getLink('home_p3_btn', "/programming-1"),
      image: getImage('home_p3_img', "https://static.wixstatic.com/media/9b3551_0467d6ae325f4c3e9fa96cd44ae8c8d2~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Insight_Banner.png"),
    },
    {
      title: getText('home_p4_title', "Nouveau Regard / New Gaze"),
      date: getText('home_p4_date', "À partir du 5 juillet 2026"),
      desc: getText('home_p4_desc', "Tradition, Meaning, and Renewal in the Twenty-First Century with Hamdi Ben Aissa."),
      link: getLink('home_p4_btn', "/programming-1"),
      image: getImage('home_p4_img', "https://static.wixstatic.com/media/9b3551_2496bff08ac54ad19f7cfb028377c146~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Les%20Inspirations%20du%20Vendredi.png"),
    },
  ];

  const testimonial = getQuote('home_testimonials_quote', {
    text: "« Le Domaine du Vivant m'a permis de me déconnecter complètement du stress urbain. La beauté de la nature sauvage et les partages spirituels m'ont reconnecté avec l'essentiel. Une expérience transformatrice. »",
    author: "Amine L. • Participant aux retraites",
  });

  return (
    <div className="relative w-full">
      {/* Background Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-bordeaux/5 via-transparent to-transparent pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-forestGreen/40 via-ivory/80 to-ivory dark:from-forestGreen-dark dark:via-forestGreen-dark/90 dark:to-forestGreen-dark z-10" />
          <Image
            src={getImage('home_hero_img', "https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg")}
            alt="Sanctuaire forestier"
            fill
            className="object-cover scale-105 filter blur-[1px]"
            priority
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-20 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center mb-6"
          >
            <span className="px-4 py-1.5 rounded-full border-2 border-bordeaux text-bordeaux font-bold text-xs tracking-[0.25em] uppercase bg-ivory/90 dark:bg-forestGreen-dark/90 shadow-md">
              {getText('home_hero_badge', "Méditer la nature • Habiter la présence")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold text-forestGreen dark:text-ivory tracking-tight leading-tight"
          >
            {getText('home_hero_h1', "Revenir au vivant.")}
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-forestGreen/90 dark:text-ivory/90 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {getText('home_hero_p', "L'Institut du Jardin Soufi tisse un dialogue vivant entre sagesse spirituelle, écologie profonde et pratiques méditatives.")}
          </motion.p>

          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link
              href={getLink('home_hero_btn1', "/programming-1")}
              className="w-full sm:w-auto bg-bordeaux text-ivory px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-smooth hover:scale-105 shadow-xl border border-softGold/30"
            >
              {getText('home_hero_btn1', "Découvrir nos programmes")}
            </Link>
            <Link
              href={getLink('home_hero_btn2', "/about")}
              className="w-full sm:w-auto bg-forestGreen text-ivory border border-sage/30 px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-smooth hover:bg-forestGreen-dark"
            >
              {getText('home_hero_btn2', "À Propos")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy / Mission Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] text-bordeaux uppercase">
              {getText('home_wisdom_badge', "NOTRE SAGESSE")}
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-spiritualGreen dark:text-cream-100 leading-tight">
              {getText('home_wisdom_h2', "« Ici, la nature n’est pas un décor. Elle est une enseignante. »")}
            </h2>
            <p className="text-darkGray/80 dark:text-cream-200/80 leading-relaxed">
              {getText('home_wisdom_p', "Nous croyons que la guérison du monde commence par la guérison du regard. Réapprendre à voir, réapprendre à écouter, réapprendre à habiter. Le Jardin Soufi accompagne cette renaissance par la méditation, la contemplation et le contact direct avec la forêt et ses cycles.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3">
                <Compass className="text-bordeaux mt-1" size={20} />
                <div>
                  <h4 className="font-playfair text-lg font-bold text-spiritualGreen dark:text-cream-100">Cercles de présence</h4>
                  <p className="text-xs text-darkGray/60 dark:text-cream-200/60">Échanges inspirants, méditations et prières.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BookOpen className="text-bordeaux mt-1" size={20} />
                <div>
                  <h4 className="font-playfair text-lg font-bold text-spiritualGreen dark:text-cream-100">École du Vivant</h4>
                  <p className="text-xs text-darkGray/60 dark:text-cream-200/60">Enseignements enracinés dans l'héritage traditionnel.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-bordeaux/20"
          >
            <Image
              src={getImage('home_wisdom_image', "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200")}
              alt="Forêt contemplative"
              fill
              className="object-cover transition-smooth hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-spiritualGreen-dark/40 via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Programs Section */}
      <section className="bg-beige/40 dark:bg-spiritualGreen/20 py-24 px-6 border-y border-bordeaux/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-bordeaux uppercase">
              {getText('home_prog_badge', "PROGRAMMES")}
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-spiritualGreen dark:text-cream-100 mt-2">
              {getText('home_prog_title', "Explorer le Jardin")}
            </h2>
            <p className="text-sm text-darkGray/60 dark:text-cream-200/60 mt-4">
              {getText('home_prog_subtitle', "Retraites, séjours contemplatifs, marches méditatives et rencontres au cœur de la nature.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((prog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-smooth hover:-translate-y-2 border border-bordeaux/20 group"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-spiritualGreen-dark/75 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[9px] uppercase font-bold tracking-widest text-bordeaux bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full border border-bordeaux/15">
                    {prog.date}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-spiritualGreen dark:text-cream-100 mb-3 leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-darkGray/75 dark:text-cream-200/75 leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>
                  <Link
                    href={prog.link}
                    className="flex items-center space-x-2 text-bordeaux font-semibold text-xs tracking-wider uppercase mt-6 hover:text-spiritualGreen dark:hover:text-white transition-smooth"
                  >
                    <span>Rejoindre</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-bordeaux/20 lg:order-last">
            <Image
              src={getImage('home_founder_img', "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/2147490754/images/7e341b1-4658-7f35-75f-2f5046e3fb44_2b2c03837df947d4ddb1be8f.png")}
              alt="Shaykh Hamdi Ben Aïssa"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-spiritualGreen-dark/40 via-transparent to-transparent" />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] text-bordeaux uppercase">
              {getText('home_founder_badge', "FONDATEUR & VISIONNAIRE")}
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-spiritualGreen dark:text-cream-100">
              {getText('home_founder_h2', "Shaykh Hamdi Ben Aïssa")}
            </h2>
            <p className="text-darkGray/80 dark:text-cream-200/80 leading-relaxed">
              {getText('home_founder_p', "Enseignant spirituel inspirant et guide de transmission, Shaykh Hamdi Ben Aïssa insuffle une vision d'écologie humaine et intérieure, tissant des liens profonds entre contemplation de la nature et épanouissement spirituel.")}
            </p>
            <Link
              href={getLink('home_founder_btn', "/about")}
              className="inline-flex items-center space-x-2 bg-spiritualGreen dark:bg-bordeaux text-cream-50 dark:text-spiritualGreen-dark px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-smooth hover:scale-105"
            >
              <span>{getText('home_founder_btn', "En savoir plus")}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-beige/40 dark:bg-spiritualGreen/20 py-24 px-6 border-t border-bordeaux/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-bordeaux uppercase">
            {getText('home_testimonials_badge', "TÉMOIGNAGES")}
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-spiritualGreen dark:text-cream-100 mt-2 mb-12">
            {getText('home_testimonials_h2', "La voix des voyageurs")}
          </h2>
          <div className="glass p-10 md:p-16 rounded-3xl relative">
            <div className="flex justify-center mb-6 text-bordeaux">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-current" />
              ))}
            </div>
            <p className="font-playfair text-lg md:text-xl italic text-spiritualGreen dark:text-cream-100 leading-relaxed">
              {testimonial.text}
            </p>
            {testimonial.author && (
              <div className="mt-8 font-inter text-sm font-semibold tracking-wide text-bordeaux uppercase">
                {testimonial.author}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2000"
            alt="Ciel étoilé sur la forêt"
            fill
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-spiritualGreen-dark/80 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10 space-y-8">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-cream-50 leading-tight">
            {getText('home_cta_h2', "Soutenir notre mission d’écologie intérieure")}
          </h2>
          <p className="text-sm md:text-base text-cream-200/80 max-w-xl mx-auto leading-relaxed">
            {getText('home_cta_p', "Chaque contribution participe directement au déploiement de nos retraites, séminaires, méditations et à la préservation du sanctuaire forestier.")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href={getLink('home_cta_btn1', "/support-us")}
              className="w-full sm:w-auto bg-bordeaux text-spiritualGreen-dark hover:bg-bordeaux-dark px-8 py-4 rounded-full font-semibold text-xs tracking-wider uppercase transition-smooth hover:scale-105"
            >
              {getText('home_cta_btn1', "Soutenir le Jardin")}
            </Link>
            <Link
              href={getLink('home_cta_btn2', "/contact-us")}
              className="w-full sm:w-auto border border-cream-200 text-cream-100 hover:bg-white hover:text-spiritualGreen-dark px-8 py-4 rounded-full font-semibold text-xs tracking-wider uppercase transition-smooth"
            >
              {getText('home_cta_btn2', "Nous Contacter")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
