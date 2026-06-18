import type { Metadata } from "next";
import "./globals.css";

import { ColourNotationProvider } from "@/components/colour-notation-provider";
import { Navbar } from "@/components/navbar";
import SkipLink from "@/components/ui/skip-link";

export const metadata: Metadata = {
  title: "bench. - small tools, sorted.",
  description:
    "A clean, professional collection of developer and designer utilities. Everything runs locally in your browser.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <ColourNotationProvider>
          <SkipLink />
          <Navbar />
          <main
            className="flex-1 overflow-auto w-full focus:outline-none"
            id="main-content"
            tabIndex={-1}
          >
            {children}
          </main>
        </ColourNotationProvider>
      </body>
    </html>
  );
}
