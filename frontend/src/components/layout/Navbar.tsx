"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Heart, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/programming-1", label: "Programmes" },
  { href: "/domaine-du-vivant-gite-lieu-daccueil-du-jardin-soufi", label: "Le Gite" },
  { href: "/about", label: "À propos" },
  { href: "/contact-us", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [navLinks, setNavLinks] = useState(DEFAULT_NAV_LINKS);
  const pathname = usePathname();

  useEffect(() => {
    // Initial load from localStorage
    try {
      const stored = localStorage.getItem("sg_header_nav_links");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNavLinks(parsed.filter((l: any) => l.active !== false));
        }
      }
    } catch {}

    // Live sync across tabs
    try {
      const channel = new BroadcastChannel("sg_cms_live_sync");
      channel.onmessage = (event) => {
        if (event.data?.type === "SYNC_STATE" && event.data?.payload?.headerNavLinks) {
          const nav = event.data.payload.headerNavLinks;
          if (Array.isArray(nav)) {
            setNavLinks(nav.filter((l: any) => l.active !== false));
          }
        }
      };
      return () => channel.close();
    } catch {}
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/images/logo.png"
            alt="Jardin Soufi Logo"
            width={48}
            height={48}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="flex flex-col">
            <span className="font-playfair text-lg md:text-xl font-bold tracking-widest text-forestGreen dark:text-ivory transition-colors">
              JARDIN SOUFI
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-bordeaux font-inter -mt-1 font-bold">
              L'Institut du Vivant
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-inter text-sm tracking-wide font-medium transition-smooth hover:text-bordeaux relative ${
                  isActive ? "text-bordeaux" : "text-darkGray dark:text-cream-200"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-bordeaux"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-beige/40 dark:hover:bg-spiritualGreen-light/40 text-bordeaux transition-smooth"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Toggle */}
          <button className="flex items-center space-x-1.5 text-xs font-bold tracking-wider text-forestGreen dark:text-ivory bg-sage/10 dark:bg-forestGreen-dark px-3 py-1.5 rounded-full border border-sage/20 hover:border-bronze transition-smooth">
            <Globe size={14} className="text-bronze" />
            <span>FR</span>
            <span className="text-sage">|</span>
            <span className="text-sage/60 hover:text-forestGreen">EN</span>
          </button>

          {/* Donation Button (Zeffy Link) */}
          <Link
            href="/support-us"
            className="flex items-center space-x-2 bg-bordeaux text-ivory px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-smooth hover:scale-105 hover:shadow-lg border border-transparent hover:border-softGold"
          >
            <Heart size={14} className="fill-current text-softGold" />
            <span>Faire un don</span>
          </Link>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-bordeaux"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-forestGreen dark:text-ivory"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-[70px] bg-ivory dark:bg-forestGreen-dark z-40 px-6 py-10 flex flex-col space-y-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-playfair text-2xl font-semibold text-forestGreen dark:text-ivory hover:text-bordeaux transition-smooth"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-[1px] bg-sage/20 my-6" />

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 text-lg font-medium text-forestGreen dark:text-ivory">
                <Globe size={18} className="text-bronze" />
                <span>Langue / Language:</span>
                <span className="font-bold text-bordeaux underline">FR</span>
                <span className="text-sage">/</span>
                <span className="font-medium text-sage hover:text-bordeaux">EN</span>
              </div>
              <Link
                href="/support-us"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 bg-bordeaux text-ivory py-4 rounded-xl font-bold tracking-wider uppercase transition-smooth"
              >
                <Heart size={16} className="fill-current text-softGold" />
                <span>Faire un don (Zeffy)</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
