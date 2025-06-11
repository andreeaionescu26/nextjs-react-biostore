import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import { CartProvider  } from "@/context/CartContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bioethanol Fireplace Shop - Premium Bio Fireplaces",
  description: "Discover our collection of premium bioethanol fireplaces. Clean-burning, eco-friendly fireplaces for modern homes.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
          <Navbar />

          <main>
            {children}
          </main>

          <Footer />
        
      </body>
    </html>
  );
}
