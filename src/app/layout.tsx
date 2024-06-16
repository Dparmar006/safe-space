import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find your community, your way, with Untold.",
  description:
    "Experience a social media platform like no other, where your preferences and interests take center stage. With Untold, you're in control. Discover, connect, and share in an environment designed exclusively for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
