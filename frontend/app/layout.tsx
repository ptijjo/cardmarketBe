import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BarreRecherche from "@/components/BarreRecherche";
import StoreProvider from "../providers/StoreProvider";


export const metadata: Metadata = {
  title: "card market",
  description: "Generated by ptijjo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <html lang="fr">
      <body className="flex flex-col justify-center max-w-7xl min-h-screen m-auto">
        <StoreProvider>
            <Header />
            <main className="flex-grow bg-black">
              {children}
            </main>
            <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
