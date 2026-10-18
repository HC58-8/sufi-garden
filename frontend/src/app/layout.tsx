import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "L’Institut du Jardin Soufi | Accueil",
  description: "Méditer la nature - Habiter la présence. - Revenir au vivant. Un sanctuaire d’études, de retraites et d’écologie intérieure.",
  keywords: "Sufi Garden, Jardin Soufi, Méditation, Écologie intérieure, Spiritualité, Chénéville, Québec, Canada, Hamdi Ben Aissa",
  openGraph: {
    title: "L’Institut du Jardin Soufi",
    description: "Méditer la nature - Habiter la présence. - Revenir au vivant.",
    url: "https://www.sufigarden.org",
    siteName: "L’Institut du Jardin Soufi",
    locale: "fr_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen flex flex-col bg-cream-50 dark:bg-spiritualGreen-dark">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow pt-[80px]">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
