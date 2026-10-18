"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Globe,
  Share2,
  UserCheck,
  HelpCircle
} from "lucide-react";

export default function EventSalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-ivory dark:bg-forestGreen-dark text-forestGreen dark:text-ivory transition-colors min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-sage/20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/9b3551_5d4f165471f64966af7fa4340333e892~mv2.jpg/v1/fill/w_1848,h_933,fp_0.48_0.42,q_85,usm_0.66_1.00_0.01,enc_auto/1000001617.jpg"
            alt="Sanctuaire forestier"
            fill
            className="object-cover opacity-20 dark:opacity-30 blur-[1px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/90 via-ivory/95 to-ivory dark:from-forestGreen-dark/90 dark:via-forestGreen-dark/95 dark:to-forestGreen-dark" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forestGreen text-ivory text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-sm"
          >
            <Sparkles size={14} className="text-softGold" />
            <span>Événement Majeur &bull; Rencontre Spirituelle</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-forestGreen dark:text-ivory"
          >
            L’Appel Universel : <br />
            <span className="text-bordeaux italic font-normal">Méditer le Vivant & Habiter le Cœur</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-forestGreen/80 dark:text-ivory/80 max-w-3xl mx-auto leading-relaxed font-inter"
          >
            Un séminaire immersif de contemplation, d’enseignement et de présence intérieure guidé par Shaykh Hamdi Ben Aïssa au cœur de la forêt sauvage.
          </motion.p>

          {/* Details Bar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto bg-ivory-dark/60 dark:bg-forestGreen/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-sage/30"
          >
            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="p-2.5 bg-bordeaux text-ivory rounded-xl">
                <Calendar size={20} />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sage">Date</span>
                <p className="text-sm font-semibold text-forestGreen dark:text-ivory">26 - 28 Juin 2026</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="p-2.5 bg-forestGreen text-ivory rounded-xl">
                <MapPin size={20} />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sage">Lieu</span>
                <p className="text-sm font-semibold text-forestGreen dark:text-ivory">Domaine du Vivant (Gîte)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="p-2.5 bg-bronze text-ivory rounded-xl">
                <Globe size={20} />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sage">Langues</span>
                <p className="text-sm font-semibold text-forestGreen dark:text-ivory">Français & English</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#zeffy-booking"
              className="w-full sm:w-auto bg-bordeaux text-ivory hover:bg-bordeaux-dark px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-smooth shadow-xl hover:scale-105 flex items-center justify-center space-x-2 border border-softGold/30"
            >
              <span>Réserver ma place (Zeffy)</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="#programme-details"
              className="w-full sm:w-auto bg-forestGreen text-ivory hover:bg-forestGreen-dark px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-smooth hover:scale-105 border border-sage/30"
            >
              Découvrir le programme
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. THE VISION & ESSENCE */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] text-bronze uppercase">L’ESSENCE DU RASSEMBLEMENT</span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-forestGreen dark:text-ivory leading-tight">
              Pourquoi répondre à l’Appel Universel ?
            </h2>
            <p className="text-base text-forestGreen/80 dark:text-ivory/80 leading-relaxed font-inter">
              Dans un monde en perpétuelle accélération, nous perdons trop souvent le fil du souffle et la conscience du vivant. L’Appel Universel est une invitation à marquer une pause sacrée au cœur de la nature préservée.
            </p>
            <p className="text-base text-forestGreen/80 dark:text-ivory/80 leading-relaxed font-inter">
              À travers la contemplation des Noms Divins, la marche silencieuse en forêt et des cercles d’enseignement profonds, cette rencontre offre un espace de régénération intérieure pour réaccorder l’âme avec la terre et le Ciel.
            </p>
          </div>

          <div className="lg:col-span-5 relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-bronze/20">
            <Image
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200"
              alt="Forêt sacrée"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forestGreen-dark/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-ivory/90 dark:bg-forestGreen-dark/90 backdrop-blur-md rounded-2xl border border-sage/20 text-center">
              <p className="font-playfair italic text-sm text-forestGreen dark:text-ivory">
                « La nature n’est pas un décor. Elle est un livre ouvert et une enseignante vivante. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU WILL EXPERIENCE (PILLARS) */}
      <section className="py-24 px-6 bg-ivory-dark/40 dark:bg-forestGreen/20 border-y border-sage/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] text-bordeaux uppercase">EXPÉRIENCE & TRANSMISSION</span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
              Les piliers de cette rencontre
            </h2>
            <p className="text-sm text-forestGreen/70 dark:text-ivory/70">
              Chaque journée est rythmée par la pratique, l'étude et le silence contemplatif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Contemplation des Noms",
                desc: "Méditer et approfondir les Noms Divins pour polir le miroir du cœur.",
                icon: Sparkles,
                color: "text-bordeaux"
              },
              {
                title: "Marche en Forêt",
                desc: "Balades silencieuses sous la canopée pour retrouver le rythme originel.",
                icon: MapPin,
                color: "text-forestGreen"
              },
              {
                title: "Cercles de Présence",
                desc: "Échanges profonds, questions-réponses et transmission avec Shaykh Hamdi.",
                icon: UserCheck,
                color: "text-bronze"
              },
              {
                title: "Recueillement & Dhikr",
                desc: "Invocations et chants contemplatifs pour nourrir l'esprit et apaiser l'âme.",
                icon: Heart,
                color: "text-softGold"
              }
            ].map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-ivory dark:bg-forestGreen-dark/80 p-8 rounded-3xl border border-sage/20 shadow-md hover:shadow-xl transition-smooth hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className={`p-3 bg-sage/10 w-fit rounded-2xl ${pillar.color}`}>
                      <IconComp size={24} />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-forestGreen dark:text-ivory">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-forestGreen/80 dark:text-ivory/80 leading-relaxed font-inter">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MEET YOUR GUIDE */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="bg-forestGreen text-ivory rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-softGold/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative h-[380px] rounded-2xl overflow-hidden border-2 border-softGold/40 shadow-xl">
              <Image
                src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/2147490754/images/7e341b1-4658-7f35-75f-2f5046e3fb44_2b2c03837df947d4ddb1be8f.png"
                alt="Shaykh Hamdi Ben Aïssa"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-[0.25em] text-softGold uppercase">VOTRE GUIDE SPIRITUEL</span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-ivory">
                Shaykh Hamdi Ben Aïssa
              </h2>
              <p className="text-sm sm:text-base text-ivory/90 leading-relaxed font-inter">
                Enseignant spirituel inspirant et guide de transmission, Shaykh Hamdi Ben Aïssa insuffle une vision d'écologie humaine et intérieure, tissant des liens profonds entre contemplation de la nature et épanouissement spirituel.
              </p>
              <div className="p-4 bg-forestGreen-dark/60 rounded-xl border border-sage/30">
                <p className="font-playfair italic text-xs text-softGold">
                  « Transmettre n'est pas remplir un vase, c'est allumer une flamme de présence consciente. »
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DETAILED PROGRAMME SCHEDULE */}
      <section id="programme-details" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-bronze uppercase">DERROULEMENT DE LA RETRAITE</span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-forestGreen dark:text-ivory">
            Le Programme du Séminaire
          </h2>
        </div>

        <div className="space-y-6">
          {[
            {
              day: "JOUR 1 &bull; Vendredi",
              title: "Accueil & Cercle de Connexion",
              details: [
                "17h00 - Arrivée au Gîte & Installation",
                "18h30 - Repas partagé & Discours d’ouverture",
                "20h30 - Méditation du soir : L’Appel de la Présence"
              ]
            },
            {
              day: "JOUR 2 &bull; Samedi",
              title: "La Marée du Silence & Enseignement",
              details: [
                "07h00 - Pratique matinale du souffle & Méditation",
                "09h30 - Marches contemplatives en forêt sauvage",
                "14h30 - Session d’étude sur les Noms Divins avec Shaykh Hamdi",
                "20h00 - Veillée de Dhikr & Chants contemplatifs"
              ]
            },
            {
              day: "JOUR 3 &bull; Dimanche",
              title: "Intégration & Cercle de Départ",
              details: [
                "08h30 - Échanges interactifs & Questions-Réponses",
                "11h00 - Rituel d’ancrage et bénédiction de clôture",
                "14h00 - Départ des participants l’âme apaisée"
              ]
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-ivory dark:bg-forestGreen-dark/90 p-8 rounded-3xl border border-sage/20 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-sage/20 pb-4">
                <span className="text-xs font-bold tracking-widest text-bordeaux uppercase" dangerouslySetInnerHTML={{ __html: item.day }} />
                <h3 className="font-playfair text-xl font-bold text-forestGreen dark:text-ivory mt-1 sm:mt-0">
                  {item.title}
                </h3>
              </div>
              <ul className="space-y-2 pt-2">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-center space-x-3 text-sm text-forestGreen/80 dark:text-ivory/80">
                    <CheckCircle2 size={16} className="text-forestGreen flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ZEFFY TICKETING & REGISTRATION SECTION */}
      <section id="zeffy-booking" className="py-24 px-6 bg-ivory-dark/60 dark:bg-forestGreen/30 border-t border-sage/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-bordeaux text-ivory text-xs font-bold tracking-wider uppercase shadow-md">
            <ShieldCheck size={16} className="text-softGold" />
            <span>Billetterie 100% Gratuite via Zeffy (Sans Frais)</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-forestGreen dark:text-ivory">
            Réservez votre place pour l'événement
          </h2>

          <p className="text-base text-forestGreen/80 dark:text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Nous utilisons la plateforme partenaire **Zeffy**, la seule plateforme de billetterie et de don 100% gratuite dédiée aux organismes à but non lucratif. 100% de votre contribution va directement soutenir le Jardin Soufi.
          </p>

          {/* Embedded Zeffy Mockup / Direct Button Container */}
          <div className="bg-ivory dark:bg-forestGreen-dark p-8 sm:p-12 rounded-3xl border-2 border-bordeaux/30 shadow-2xl max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <h3 className="font-playfair text-2xl font-bold text-forestGreen dark:text-ivory">
                Billet Séminaire & Retraite Complet
              </h3>
              <p className="text-xs text-sage uppercase font-bold tracking-widest">
                Accès aux 3 jours &bull; Repas compris &bull; Enseignements
              </p>
            </div>

            <div className="p-6 bg-sage/10 rounded-2xl border border-sage/20 text-center space-y-2">
              <span className="text-xs text-forestGreen/70 dark:text-ivory/70 font-semibold uppercase">Tarif Solidaire & Contribution Libérale</span>
              <p className="font-playfair text-3xl font-bold text-bordeaux">
                À partir de 150 €
              </p>
              <p className="text-[11px] text-forestGreen/60 dark:text-ivory/60">
                Possibilité de contribution libre pour soutenir les participants aux revenus modestes.
              </p>
            </div>

            {/* Direct Zeffy Link Button */}
            <a
              href="https://www.zeffy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-3 bg-bordeaux hover:bg-bordeaux-dark text-ivory font-bold py-4 px-8 rounded-full text-sm uppercase tracking-wider transition-smooth shadow-lg hover:scale-105"
            >
              <span>Accéder à la billetterie sécurisée Zeffy</span>
              <ArrowRight size={18} />
            </a>

            <div className="flex items-center justify-center space-x-4 text-xs text-sage pt-2">
              <span className="flex items-center space-x-1">
                <ShieldCheck size={14} className="text-forestGreen" />
                <span>Paiement Sécurisé</span>
              </span>
              <span>&bull;</span>
              <span>Reçu fiscal immédiat</span>
              <span>&bull;</span>
              <span>0% de frais de plateforme</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-bronze uppercase">QUESTIONS FRÉQUENTES</span>
          <h2 className="font-playfair text-3xl font-bold text-forestGreen dark:text-ivory">
            Besoin d’informations complémentaires ?
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Comment fonctionne le règlement via Zeffy ?",
              a: "Zeffy est une plateforme 100% gratuite pour les associations. Lors de la validation de votre billet, Zeffy propose une contribution facultative pour leur fonctionnement. Vous pouvez ajuster ou mettre cette contribution à 0 € selon votre choix."
            },
            {
              q: "Le logement et la nourriture sont-ils inclus ?",
              a: "Oui, le gîte du Domaine du Vivant offre l'hébergement en chambre partagée et des repas végétariens cuisinés sur place avec des produits locaux et biologiques."
            },
            {
              q: "Faut-il avoir une expérience préalable de la méditation ?",
              a: "Aucune expérience n'est requise. Les retraites du Jardin Soufi sont ouvertes à toute personne animée par un désir sincère de présence et d'exploration intérieure."
            },
            {
              q: "Puis-je annuler ma réservation en cas d'impératif ?",
              a: "Oui, les annulations effectuées jusqu'à 14 jours avant le début de l'événement donnent droit à un remboursement intégral."
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-ivory dark:bg-forestGreen-dark/80 rounded-2xl border border-sage/20 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 text-left font-playfair font-bold text-base sm:text-lg text-forestGreen dark:text-ivory flex justify-between items-center hover:bg-sage/5 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-bordeaux transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-forestGreen/80 dark:text-ivory/80 leading-relaxed font-inter border-t border-sage/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
