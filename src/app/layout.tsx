import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/ui/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { DEFAULT_SITE_DESCRIPTION } from "@/utils/constants";
import { getServerSession } from "next-auth";
import NextSessionProvider from "@/components/providers/NextSessionProvider";
import { authOptions } from "@/auth";
export const metadata: Metadata = {
  title: "Find your community, your way, with Untold.",
  description: DEFAULT_SITE_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <NextSessionProvider>
          <ReactQueryProvider>
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </NextSessionProvider>
      </body>
    </html>
  );
}
