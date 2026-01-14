import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/ui/header";
import "./globals.css";
import { AudioPlayerProvider } from "@/contexts/audio-player-context";
import { NowPlayingBar } from "@/components/ui/now-playing-bar";
import { Footer } from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isaac Vidrine",
  description: "Dad, Software Engineer, Tinkerer, Lifelong Learner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AudioPlayerProvider>
          <Header />
          {children}
          <Footer />
          <NowPlayingBar />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
