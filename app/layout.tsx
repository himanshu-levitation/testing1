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
  title: "Hiring Platform",
  description: "Automated hiring platform for job seekers and employers",
  generator: "v0.dev",
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
