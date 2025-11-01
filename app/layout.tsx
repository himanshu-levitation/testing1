import type React from "react";
import "./globals.css";
import { Albert_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { QueryProvider } from "@/components/query-provider";
import { Header } from "@/components/header";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-albert-sans",
});

export const metadata = {
  title: "Feedback Management System | GOG Platform",
  description: "Comprehensive feedback management system for collecting, tracking, and resolving user feedback with file attachments and status management.",
  keywords: "feedback management, user feedback, bug reports, feature requests, customer support, feedback tracking",
  authors: [{ name: "GOG Team" }],
  creator: "GOG Platform",
  publisher: "GOG Platform",
  robots: "index, follow",
  openGraph: {
    title: "Feedback Management System | GOG Platform",
    description: "Streamline your feedback collection and management process with our comprehensive platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedback Management System | GOG Platform",
    description: "Comprehensive feedback management system for collecting and tracking user feedback.",
  },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${albertSans.variable} font-albert-sans min-h-screen bg-background text-foreground`}>
        <ThemeProvider defaultTheme="system">
          <QueryProvider>
            <Toaster position="top-right" richColors />
            <ErrorBoundary>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </ErrorBoundary>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
