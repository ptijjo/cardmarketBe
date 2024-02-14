import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StoreProvider from "./StoreProvider";
import "../style/index.scss";


export const metadata: Metadata = {
  title: "Card seller by vibz",
  description: "vente de carte, pokemon, dragon ball ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <StoreProvider>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}
