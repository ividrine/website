"use client";

import { Separator } from "@/components/ui/separator";
import { useAudioPlayer } from "@/contexts/audio-player-context";
import Link from "next/link";

export function Footer() {
  const { currentTrack } = useAudioPlayer();
  return (
    <div className={`max-w-3xl px-12 mx-auto ${currentTrack ? "pb-20" : ""}`}>
      <Separator orientation="horizontal" className="w-full" />
      <footer className="w-full py-6 text-sm text-muted-foreground">
        <div className="grid grid-cols-2">
          <div>
            <p className="text-left">
              © {new Date().getFullYear()} Isaac Vidrine.
            </p>
          </div>
          <div className="text-right">
            <Link href="/web-ring" className="text-right">
              Web Ring
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
