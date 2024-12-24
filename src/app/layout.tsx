import type { Metadata } from "next";
import { montserrat } from "./config/fonts";
import "./globals.css";
import Header from "./palette-generator/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "./palette-generator/Footer";

export const metadata: Metadata = {
  title: "lluxui-colors",
  description: "Generate palette color",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <html lang="en">
        <body className={`${montserrat.className} antialiased bg-gray-50 flex flex-col min-h-screen`}>
          <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Header />
          </header>
          <main className="flex-1 container mx-auto">{children}</main>
          <footer className="m-auto supports-[backdrop-filter]:bg-background/60 text-center py-4">
            <Footer />
          </footer>
        </body>
      </html>
    </TooltipProvider>
  );
}
