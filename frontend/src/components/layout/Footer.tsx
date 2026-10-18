"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, ArrowRight, Heart, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("http://localhost:3001/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setEmail("");
    } catch {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-forestGreen-dark text-ivory border-t-2 border-softGold/30 pt-20 pb-12 relative overflow-hidden font-inter">
      {/* Background Subtle Gradient & Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-forestGreen-dark via-forestGreen-dark to-[#13220E] opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Column 1: Brand Logo & Mission Statement */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Jardin Soufi Logo"
              width={56}
              height={56}
              className="object-contain filter drop-shadow-md"
            />
            <div>
              <span className="font-playfair text-2xl font-bold tracking-widest text-ivory block leading-none">
                JARDIN SOUFI
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-softGold font-bold mt-1 block">
                L'Institut du Vivant
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-playfair italic pr-2">
            « Ici, la nature n’est pas un décor. Elle est une enseignante. Chaque arbre, chaque silence, chaque respiration devient un verset du Livre du Vivant. »
          </p>

          {/* Social Icons with High Contrast */}
          <div className="flex items-center space-x-3 pt-2">
            {[
              { icon: Facebook, href: "https://www.facebook.com/wix", label: "Facebook" },
              { icon: Instagram, href: "https://www.instagram.com/wix", label: "Instagram" },
              { icon: Youtube, href: "https://www.youtube.com", label: "Youtube" },
            ].map((soc, idx) => {
              const IconComp = soc.icon;
              return (
                <Link
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-ivory/10 hover:bg-bordeaux text-ivory hover:text-softGold border border-ivory/20 transition-all shadow-sm"
                  aria-label={soc.label}
                >
                  <IconComp size={16} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-playfair text-xl font-bold tracking-wide text-softGold border-b border-softGold/20 pb-2">
            Navigation
          </h4>
          <ul className="space-y-3 text-sm font-medium text-ivory/90">
            <li>
              <Link href="/" className="hover:text-softGold transition-colors flex items-center space-x-2">
                <span className="text-softGold">&bull;</span>
                <span>Accueil</span>
              </Link>
            </li>
            <li>
              <Link href="/programming-1" className="hover:text-softGold transition-colors flex items-center space-x-2">
                <span className="text-softGold">&bull;</span>
                <span>Programmes & Retraites</span>
              </Link>
            </li>
            <li>
              <Link href="/domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi" className="hover:text-softGold transition-colors flex items-center space-x-2">
                <span className="text-softGold">&bull;</span>
                <span>Le Gîte du Vivant</span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-softGold transition-colors flex items-center space-x-2">
                <span className="text-softGold">&bull;</span>
                <span>À Propos de L'Institut</span>
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-softGold transition-colors flex items-center space-x-2">
                <span className="text-softGold">&bull;</span>
                <span>Contact & Accès</span>
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-softGold transition-colors flex items-center space-x-2 text-xs opacity-75">
                <span className="text-softGold">&bull;</span>
                <span>Administration Admin</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Notre Mission & Soutien */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-playfair text-xl font-bold tracking-wide text-softGold border-b border-softGold/20 pb-2">
            Soutenir la Mission
          </h4>
          <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed">
            Le Jardin Soufi vit grâce à celles et ceux qui participent à préserver un espace de présence, de contemplation et de transmission enraciné dans la nature.
          </p>

          <div className="pt-2">
            <Link
              href="/support-us"
              className="inline-flex items-center space-x-2.5 bg-bordeaux hover:bg-bordeaux-dark text-ivory px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md border border-softGold/30 group"
            >
              <Heart size={15} className="fill-current text-softGold group-hover:scale-110 transition-transform" />
              <span>Soutenir le Jardin</span>
            </Link>
          </div>
        </div>

        {/* Column 4: Lettre d'Information / Newsletter */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-playfair text-xl font-bold tracking-wide text-softGold border-b border-softGold/20 pb-2">
            Lettre de Présence
          </h4>
          <p className="text-xs text-ivory/85 leading-relaxed">
            Inscrivez-vous pour recevoir nos inspirations hebdomadaires et les nouvelles des retraites en forêt.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-bordeaux/40 border border-softGold/30 rounded-2xl flex items-center space-x-2 text-xs font-bold text-ivory"
            >
              <CheckCircle2 size={16} className="text-softGold flex-shrink-0" />
              <span>Merci pour votre présence et votre inscription !</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative flex flex-col space-y-3 mt-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Votre adresse email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-ivory/10 border border-ivory/30 rounded-xl px-4 py-3 text-xs text-ivory placeholder-ivory/50 focus:outline-none focus:border-softGold transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-softGold hover:bg-softGold/90 text-forestGreen-dark font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>S'abonner aux inspirations</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyrights and Terms */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-ivory/15 flex flex-col sm:flex-row justify-between items-center text-xs text-ivory/70 space-y-4 sm:space-y-0 relative z-10 font-medium">
        <div>
          <span>© {new Date().getFullYear()} L'Institut du Jardin Soufi. Tous droits réservés.</span>
        </div>
        <div className="flex space-x-6">
          <Link href="/terms" className="hover:text-softGold transition-colors">Conditions générales</Link>
          <Link href="/privacy" className="hover:text-softGold transition-colors">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
