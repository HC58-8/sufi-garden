"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useCmsPage } from "@/builder/useCmsPage";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const { getText } = useCmsPage('contact-us');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Erreur lors de l'envoi du message.");
      }

      setSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || "Impossible de contacter le serveur. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs font-bold tracking-[0.2em] text-bordeaux uppercase">
          {getText('contact_badge', "CONTACT")}
        </span>
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-spiritualGreen dark:text-cream-100 mt-2">
          {getText('contact_h1', "Une pensée, un élan…")}
        </h1>
        <p className="text-sm md:text-base text-darkGray/60 dark:text-cream-200/60 mt-4 leading-relaxed">
          {getText('contact_p', "Si vous ressentez l’appel, écrivez-nous. Nous serons heureux de vous lire et de vous répondre.")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info Column */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass p-8 rounded-3xl border border-bordeaux/15 space-y-6">
            <h3 className="font-playfair text-2xl font-bold text-spiritualGreen dark:text-cream-100">Nous rejoindre</h3>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-bordeaux/10 rounded-2xl text-bordeaux border border-bordeaux/20 flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-inter text-xs font-bold text-bordeaux uppercase tracking-wider">Adresse</h4>
                <p className="text-sm text-darkGray/80 dark:text-cream-200/80 mt-1">
                  The Sufi Garden Institute<br />Chénéville, Québec, Canada
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-bordeaux/10 rounded-2xl text-bordeaux border border-bordeaux/20 flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="font-inter text-xs font-bold text-bordeaux uppercase tracking-wider">Courriel</h4>
                <p className="text-sm text-darkGray/80 dark:text-cream-200/80 mt-1">
                  info@sufigarden.org
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          <div className="glass p-8 md:p-10 rounded-3xl border border-bordeaux/20">
            {success ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="flex justify-center text-bordeaux">
                  <CheckCircle size={56} className="animate-pulse" />
                </div>
                <h3 className="font-playfair text-3xl font-bold text-spiritualGreen dark:text-cream-100">Message envoyé</h3>
                <p className="text-sm text-darkGray/60 dark:text-cream-200/60 max-w-sm mx-auto">
                  Merci pour vos mots. Notre équipe vous répondra dans les meilleurs délais.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 border border-bordeaux text-bordeaux hover:bg-bordeaux hover:text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-smooth"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-500 font-semibold">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-bordeaux uppercase mb-2">Votre Nom</label>
                    <input
                      type="text"
                      {...register("name", { required: "Ce champ est requis" })}
                      className="w-full bg-white/5 dark:bg-black/5 border border-bordeaux/20 rounded-xl px-4 py-3 text-sm text-darkGray dark:text-cream-100 placeholder-darkGray/40 focus:outline-none focus:border-bordeaux transition-smooth"
                      placeholder="Nom complet"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-bordeaux uppercase mb-2">Votre Courriel</label>
                    <input
                      type="email"
                      {...register("email", { required: "Ce champ est requis" })}
                      className="w-full bg-white/5 dark:bg-black/5 border border-bordeaux/20 rounded-xl px-4 py-3 text-sm text-darkGray dark:text-cream-100 placeholder-darkGray/40 focus:outline-none focus:border-bordeaux transition-smooth"
                      placeholder="adresse@mail.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-bordeaux uppercase mb-2">Sujet</label>
                  <input
                    type="text"
                    {...register("subject", { required: "Ce champ est requis" })}
                    className="w-full bg-white/5 dark:bg-black/5 border border-bordeaux/20 rounded-xl px-4 py-3 text-sm text-darkGray dark:text-cream-100 placeholder-darkGray/40 focus:outline-none focus:border-bordeaux transition-smooth"
                    placeholder="Sujet de votre message"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-bordeaux uppercase mb-2">Message</label>
                  <textarea
                    rows={6}
                    {...register("message", { required: "Ce champ est requis" })}
                    className="w-full bg-white/5 dark:bg-black/5 border border-bordeaux/20 rounded-xl px-4 py-3 text-sm text-darkGray dark:text-cream-100 placeholder-darkGray/40 focus:outline-none focus:border-bordeaux transition-smooth resize-none"
                    placeholder="Écrivez votre message ici..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-spiritualGreen dark:bg-bordeaux text-cream-50 dark:text-spiritualGreen-dark py-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-smooth hover:scale-[1.02]"
                >
                  <Send size={14} />
                  <span>{loading ? "Envoi en cours..." : "Envoyer le message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
