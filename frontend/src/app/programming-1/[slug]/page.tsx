"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, Clock, MapPin, CheckCircle2, Heart, Sparkles, ArrowRight, ShieldCheck, Globe, HelpCircle, ArrowLeft, Video, HelpCircle as InfoIcon, ExternalLink
} from "lucide-react";

// Reusable program detail dataset
const programCatalog: Record<string, {
  title: string;
  subtitle: string;
  type: string;
  bannerImage: string;
  secondaryImage?: string;
  datesList: string[];
  montrealTime: string;
  parisTime: string;
  location: string;
  replayNotice: string;
  priceLabel: string;
  freeOptionText: string;
  freeOptionLink: string;
  englishNotice: string;
  englishLink: string;
  mainButtonLabel: string;
  zeffyUrl: string;
  bodyParagraphs: string[];
  highlights: string[];
}> = {
  "inspirations-du-vendredi": {
    title: "Les Inspirations du Vendredi",
    subtitle: "Explorer les Noms Divins à travers la contemplation, la réflexion et la présence intérieure.",
    type: "En ligne / Français",
    bannerImage: "https://static.wixstatic.com/media/9b3551_b313bfafa1d24cccb7143e9f9432c199~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Inspiration_Banner.png",
    secondaryImage: "https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg",
    datesList: [
      "19 juin", "26 juin", "3 juillet", "10 juillet", "17 juillet", "31 juillet",
      "7 août", "14 août", "21 août", "28 août", "4 septembre", "11 septembre", "25 septembre", "2 octobre"
    ],
    montrealTime: "13h – 13h30 (Montréal)",
    parisTime: "19h – 19h30 (Paris)",
    location: "En ligne (Zoom)",
    replayNotice: "❗ Si vous ne pouvez pas joindre certaines sessions, un replay sera disponible",
    priceLabel: "FREE / Gratuit sur demande",
    freeOptionText: "🆓 Vous n'avez pas les moyens de payer ? Cliquez ici",
    freeOptionLink: "/contact-us",
    englishNotice: "Want to participate in English? Find the English program here:",
    englishLink: "/programming-1/friday-in-sights",
    mainButtonLabel: "Je veux participer",
    zeffyUrl: "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world",
    bodyParagraphs: [
      "Un rendez-vous hebdomadaire en ligne pour explorer les Noms Divins à travers la contemplation et le savoir vivant guidé par Shaykh Hamdi Ben Aïssa.",
      "Chaque séance est une invitation à ralentir, écouter la résonance des Noms Divins dans notre quotidien et cultiver la cohérence spirituelle.",
      "Accessible à tous les chercheurs de vérité, quel que soit leur parcours."
    ],
    highlights: [
      "24 séances en direct sur Zoom avec replay illimité",
      "Fiches de méditation et textes contemplatifs hebdomadaires",
      "Cercle de partage et de présence bienveillante"
    ]
  },
  "balades-meditatives": {
    title: "Les Balades Méditatives",
    subtitle: "Marcher ensemble. Respirer la forêt. Habiter le silence.",
    type: "Présentiel",
    bannerImage: "https://static.wixstatic.com/media/9b3551_603242551bc04683b69990ca91ab0648~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner_Balade%20M%C3%A9ditative.png",
    datesList: ["11 juillet", "15 août", "5 septembre 2026"],
    montrealTime: "09h30 – 14h00 (Heure Locale)",
    parisTime: "15h30 – 20h00 (Heure de Paris)",
    location: "Domaine du Vivant (Gîte & Forêt Sauvage)",
    replayNotice: "❗ Séminaire immersif en plein air au cœur du Domaine du Vivant",
    priceLabel: "Donation libre / Zeffy",
    freeOptionText: "🆓 Envie de participer ? Accès ouvert à tous.",
    freeOptionLink: "/contact-us",
    englishNotice: "Want to participate in English? Find the English program here:",
    englishLink: "/programming-1/friday-in-sights",
    mainButtonLabel: "Je veux participer",
    zeffyUrl: "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world",
    bodyParagraphs: [
      "Les Balades Méditatives proposent une immersion silencieuse au cœur des grands arbres de la forêt.",
      "Chaque marche associe respiration consciente, écoute des sons sacrés de la nature et temps de partage autour d'une infusion chaude."
    ],
    highlights: [
      "Marche méditative guidée en silence",
      "Exercices de souffle (Nafas) et d'enracinement",
      "Partage et échange chaleureux au gîte"
    ]
  },
  "friday-in-sights": {
    title: "The Friday In-Sights",
    subtitle: "A weekly gathering exploring the Divine Names through contemplation.",
    type: "Online / English",
    bannerImage: "https://static.wixstatic.com/media/9b3551_0467d6ae325f4c3e9fa96cd44ae8c8d2~mv2.png/v1/fill/w_1048,h_589,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Insight_Banner.png",
    datesList: ["June 26", "July 3", "July 10", "July 17", "August 7", "August 14"],
    montrealTime: "20:00 – 20:45 (Montreal)",
    parisTime: "02:00 – 02:45 (Paris)",
    location: "Online (Zoom)",
    replayNotice: "❗ If you cannot join live, session replays will be provided",
    priceLabel: "FREE / Open Contribution",
    freeOptionText: "🆓 Financial aid available if needed. Click here.",
    freeOptionLink: "/contact-us",
    englishNotice: "Vous souhaitez participer en français ? Cliquez ici :",
    englishLink: "/programming-1/inspirations-du-vendredi",
    mainButtonLabel: "Join in English",
    zeffyUrl: "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world",
    bodyParagraphs: [
      "Weekly gathering exploring the Divine Names through contemplation, reflection, and inner presence.",
      "A sacred pause in your week to cultivate heart presence and spiritual maturity."
    ],
    highlights: [
      "Live teaching & meditation with Shaykh Hamdi Ben Aïssa",
      "Q&A session and weekly study resources",
      "Replays available for all registered participants"
    ]
  },
  "universal-call": {
    title: "L’Appel Universel (Universal Call)",
    subtitle: "Séminaire immersif de contemplation et de présence guidé par Shaykh Hamdi Ben Aïssa.",
    type: "Présentiel & En Ligne",
    bannerImage: "https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg",
    datesList: ["26 Juin", "27 Juin", "28 Juin 2026"],
    montrealTime: "09h00 – 17h00 (Montréal)",
    parisTime: "15h00 – 23h00 (Paris)",
    location: "Domaine du Vivant (Gîte) & Zoom Live",
    replayNotice: "❗ Replay disponible pour tous les abonnés inscrits",
    priceLabel: "Inscription Sécurisée Zeffy",
    freeOptionText: "🆓 Bourses d'études disponibles sur demande.",
    freeOptionLink: "/contact-us",
    englishNotice: "Want to participate in English? Find the English program here:",
    englishLink: "/programming-1/friday-in-sights",
    mainButtonLabel: "Je veux participer",
    zeffyUrl: "https://www.zeffy.com/en-CA/donation-form/a-garden-for-the-soul-a-refuge-for-the-living-world",
    bodyParagraphs: [
      "Trois jours d'immersion complète entre forêt sauvage, enseignements contemplatifs et cercles de présence.",
      "Un rendez-vous majeur pour approfondir la vision d'une écologie humaine et intérieure."
    ],
    highlights: [
      "Enseignements fondamentaux et méditations du cœur",
      "Repas communautaires et marches en forêt",
      "Espace de questionnement et d'éveil intérieur"
    ]
  }
};

export default function UniversalProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const program = programCatalog[slug] || programCatalog["inspirations-du-vendredi"];

  return (
    <div className="bg-ivory dark:bg-forestGreen-dark text-forestGreen dark:text-ivory transition-colors min-h-screen pt-28 pb-20 px-6 font-inter">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation Back Link */}
        <Link
          href="/programming-1"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sage hover:text-bordeaux transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Retour au catalogue des programmes</span>
        </Link>

        {/* 1. HERO HEADER SECTION */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-forestGreen text-ivory text-[10px] font-bold tracking-widest uppercase">
              {program.type}
            </span>
            <span className="px-3 py-1 rounded-full bg-bordeaux text-ivory text-[10px] font-bold tracking-widest uppercase shadow-sm">
              {program.priceLabel}
            </span>
          </div>

          <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-forestGreen dark:text-ivory leading-tight">
            {program.title}
          </h1>

          <p className="font-playfair italic text-lg sm:text-xl text-bordeaux dark:text-softGold font-medium">
            {program.subtitle}
          </p>
        </div>

        {/* 2. MAIN BANNER VISUAL IMAGE */}
        <div className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-sage/30 group">
          <Image
            src={program.bannerImage}
            alt={program.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forestGreen-dark/70 via-transparent to-transparent" />
        </div>

        {/* 3. DATES & TIMEZONES GRID BOX */}
        <div className="bg-ivory dark:bg-forestGreen-dark/90 p-8 rounded-3xl border-2 border-sage/30 shadow-xl space-y-6">
          <div className="border-b border-sage/20 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-bordeaux">Dates officielles de la session</span>
            <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory mt-1">
              Calendrier des Rencontres
            </h3>
          </div>

          {/* Dates Badge List */}
          <div className="flex flex-wrap gap-2.5">
            {program.datesList.map((d, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sage/15 dark:bg-forestGreen/40 border border-sage/30 text-xs font-bold text-forestGreen dark:text-ivory shadow-sm"
              >
                <span>🗓️</span>
                <span>{d}</span>
              </span>
            ))}
          </div>

          {/* Times & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-sage/20">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-sage/10">
              <Clock size={18} className="text-bordeaux" />
              <div>
                <span className="text-[10px] font-bold uppercase text-sage">Heure Montréal</span>
                <p className="text-xs font-bold text-forestGreen dark:text-ivory">⏰ {program.montrealTime}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-xl bg-sage/10">
              <Clock size={18} className="text-bordeaux" />
              <div>
                <span className="text-[10px] font-bold uppercase text-sage">Heure Paris</span>
                <p className="text-xs font-bold text-forestGreen dark:text-ivory">⏰ {program.parisTime}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-xl bg-sage/10">
              <MapPin size={18} className="text-forestGreen" />
              <div>
                <span className="text-[10px] font-bold uppercase text-sage">Format / Lieu</span>
                <p className="text-xs font-bold text-forestGreen dark:text-ivory">📍 {program.location}</p>
              </div>
            </div>
          </div>

          {/* Replay Notice */}
          <div className="p-4 bg-bordeaux/10 border border-bordeaux/20 rounded-2xl flex items-center space-x-3 text-xs font-bold text-bordeaux">
            <Video size={18} className="flex-shrink-0" />
            <span>{program.replayNotice}</span>
          </div>
        </div>

        {/* 4. MAIN BODY PRESENTATION & SECONDARY IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-ivory dark:bg-forestGreen-dark/90 p-8 rounded-3xl border border-sage/25 shadow-lg space-y-4">
              <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory border-b border-sage/20 pb-3">
                À propos de ce programme
              </h3>
              {program.bodyParagraphs.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base text-forestGreen/85 dark:text-ivory/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Optional Secondary Uploaded Image */}
            {program.secondaryImage && (
              <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-sage/30">
                <Image src={program.secondaryImage} alt="Visuel secondaire" fill className="object-cover" />
              </div>
            )}

            {/* Highlights List */}
            <div className="bg-ivory dark:bg-forestGreen-dark/90 p-8 rounded-3xl border border-sage/25 shadow-lg space-y-4">
              <h3 className="font-playfair text-xl font-bold text-forestGreen dark:text-ivory border-b border-sage/20 pb-3">
                Points Forts & Accompagnement :
              </h3>
              <ul className="space-y-3">
                {program.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-forestGreen/85 dark:text-ivory/85">
                    <CheckCircle2 size={18} className="text-bordeaux flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. SIDEBAR REGISTRATION & OPTIONS BOX */}
          <div className="lg:col-span-4 sticky top-32 space-y-6">
            <div className="bg-ivory dark:bg-forestGreen-dark/90 p-8 rounded-3xl border-2 border-bordeaux/30 shadow-2xl space-y-6 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-bordeaux">Formulaire de Participation</span>
              
              <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory">
                Rejoindre la Session
              </h3>

              {/* Main Participation Button */}
              <a
                href={program.zeffyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-bordeaux hover:bg-bordeaux-dark text-ivory py-4 rounded-full font-bold text-xs tracking-wider uppercase transition-smooth shadow-xl border border-softGold/30"
              >
                <span>{program.mainButtonLabel}</span>
                <ArrowRight size={16} />
              </a>

              {/* Financial Aid / Free Option Box */}
              <div className="p-4 bg-sage/10 rounded-2xl border border-sage/20 text-xs text-left space-y-2">
                <p className="font-semibold text-forestGreen dark:text-ivory">{program.freeOptionText}</p>
                <Link href={program.freeOptionLink} className="inline-flex items-center space-x-1 text-bordeaux font-bold hover:underline">
                  <span>Cliquez ici</span>
                  <ExternalLink size={12} />
                </Link>
              </div>

              {/* English Version Notice Box */}
              <div className="p-4 bg-forestGreen/10 dark:bg-forestGreen/30 rounded-2xl border border-forestGreen/20 text-xs text-left space-y-2">
                <p className="font-medium text-forestGreen dark:text-ivory">{program.englishNotice}</p>
                <Link href={program.englishLink} className="inline-flex items-center space-x-1 text-forestGreen dark:text-softGold font-bold hover:underline">
                  <span>Join in English →</span>
                </Link>
              </div>

              <div className="pt-2 border-t border-sage/20 flex items-center justify-center space-x-2 text-[10px] text-sage">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Paiement sécurisé via Zeffy (0% de commission)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
