"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Lato } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Footer from "./components/Footer/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"], // choose weights you need
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
