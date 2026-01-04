import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import { Providers } from "@/components/providers/Providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxJewels - Exquisite Jewellery Collection",
  description: "Discover timeless elegance with our handcrafted jewellery collection. Premium rings, necklaces, earrings, and bracelets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartSidebar />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
