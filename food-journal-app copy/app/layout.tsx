import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bento - Your Beautiful Nutrition Companion",
  description:
    "A beautiful, AI-powered nutrition tracking app to help you achieve your health goals",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-oid="9l99h0p">
      <body className={inter.className} data-oid="0s9a2w9">
        {children}
      </body>
    </html>
  );
}
