import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthContextProvider } from "@/context/AuthContext"

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIT Degree Navigator",
  description: "Degree navigator application for students attending Calgary Institute of Technology (CIT).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
