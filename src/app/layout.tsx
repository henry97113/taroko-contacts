"use client";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/Toast";

import "@/styles/globals.css";
import "@/styles/variables.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
