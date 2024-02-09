
import Header from "@/components/Header";
import type { Metadata } from "next";
import "../styles/css/index.css";
import BarreRecherche from "@/components/BarreRecherche";



export const metadata: Metadata = {
  title: "Site vibz",
  description: "Vente de cartes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <BarreRecherche />
        {children}
      </body>
    </html>
  );
}
