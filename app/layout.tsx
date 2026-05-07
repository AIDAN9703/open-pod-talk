import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-opt",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Open Pod Talk",
    template: "%s — Open Pod Talk",
  },
  description:
    "all views, just bring it! Open Pod Talk (OPT): live podcast with real callers.",
  icons: {
    icon: [{ url: "/logo.webp", type: "image/webp" }],
    apple: [{ url: "/logo.webp", type: "image/webp" }],
    shortcut: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-[#050505] font-[family-name:var(--font-geist-sans)]">
        {children}
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            classNames: {
              toast:
                "rounded-xl border border-white/15 bg-neutral-950 text-white shadow-lg",
              title: "text-white",
              description: "text-white/70",
            },
          }}
        />
      </body>
    </html>
  );
}
