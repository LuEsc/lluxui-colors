import type { Metadata } from "next";
import { montserrat } from "./config/fonts";
import "./globals.css";
import Header from "./palette-generator/Header";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <body
          className={`${montserrat.className} antialiased  bg-gray-50`}
        >
          <header>
            <Header />
          </header>
          {children}
        </body>
      </html>
    </TooltipProvider>
  );
}
