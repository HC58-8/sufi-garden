import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Clock, CheckCircle2, Heart, Trees } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface DynamicPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: DynamicPageProps) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");
  const formattedTitle = slugPath
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${formattedTitle} | Jardin Soufi`,
    description: `Découvrez la page ${formattedTitle} de l'Institut du Jardin Soufi. Retraites, méditation et écologie intérieure en forêt.`,
  };
}

export default async function DynamicCmsPage({ params }: DynamicPageProps) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");
  const formattedTitle = slugPath
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <main className="bg-ivory dark:bg-forestGreen-dark text-forestGreen dark:text-ivory min-h-screen font-inter flex flex-col justify-between">
      <Navbar />

      <article className="pt-28 pb-20 space-y-16">
        {/* Dynamic Hero Header Section */}
        <section className="relative bg-forestGreen text-ivory py-20 px-6 overflow-hidden border-b-2 border-softGold/30">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-ivory/10 border border-softGold/30 text-softGold text-xs font-bold uppercase tracking-widest">
              <Trees size={14} />
              <span>Jardin Soufi — Page Dynamique CMS</span>
            </div>

            <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-ivory tracking-tight leading-tight">
              {formattedTitle}
            </h1>

            <p className="text-sm sm:text-lg text-ivory/90 max-w-3xl mx-auto font-playfair italic">
              « Bienvenue sur cette page créée en direct via SG Studio CMS. Méditer la nature. Habiter la présence. Revenir au vivant. »
            </p>

            <div className="pt-4 flex justify-center space-x-4">
              <Link
                href="/programming-1"
                className="inline-flex items-center space-x-2 bg-bordeaux text-ivory px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-bordeaux-dark transition-smooth border border-softGold/30"
              >
                <span>Explorer tous nos programmes</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Dynamic Content Section */}
        <section className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="bg-ivory dark:bg-forestGreen-dark/95 p-8 sm:p-12 rounded-3xl border border-sage/30 shadow-xl space-y-8">
            <div className="space-y-4 border-b border-sage/20 pb-6">
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-forestGreen dark:text-ivory">
                Contenu de la Page : {formattedTitle}
              </h2>
              <p className="text-sm text-forestGreen/80 dark:text-ivory/80 leading-relaxed font-inter">
                Cette page est dynamiquement enregistrée et administrable depuis le **SG Studio CMS** (`/admin`). Vous pouvez à tout moment modifier ses titres, paragraphes, images et liens en 1 clic sans développeur.
              </p>
            </div>

            {/* Simulated Dynamic Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-sage/30 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200"
                  alt={formattedTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 text-xs font-bold text-bordeaux uppercase tracking-wider">
                  <CheckCircle2 size={16} />
                  <span>Statut : Page Publiée en Direct</span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-forestGreen dark:text-ivory">
                  Une expérience enracinée dans le vivant
                </h3>
                <p className="text-xs sm:text-sm text-forestGreen/80 dark:text-ivory/80 leading-relaxed">
                  À travers nos séminaires, balades en forêt et retraites silencieuses au Domaine du Vivant, chaque moment est conçu pour favoriser le retour à l'essentiel et l'écoute profonde.
                </p>
                <div>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center space-x-2 text-xs font-bold text-bordeaux hover:underline uppercase tracking-wider"
                  >
                    <span>Nous contacter pour cette page →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
