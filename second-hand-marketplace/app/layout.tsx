import type { Metadata } from "next";
import { Inter, Righteous, Dancing_Script, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
});
const righteous = Righteous({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-righteous'
})
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing'
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: "REWEAR - Premium Second-Hand Fashion",
  description: "Discover unique pre-loved fashion pieces at amazing prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${righteous.variable} ${dancingScript.variable} ${playfair.variable} ${lato.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
