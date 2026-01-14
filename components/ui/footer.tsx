"use client";

import { Separator } from "@/components/ui/separator";
import { useAudioPlayer } from "@/contexts/audio-player-context";

export function Footer() {
  const audioPlayer = useAudioPlayer();
  return (
    <div className="max-w-3xl px-16 mx-auto">
      <Separator orientation="horizontal" className="w-full" />
      <footer
        className={`w-full pt-4 text-sm text-muted-foreground ${
          audioPlayer.currentTrack ? "pb-24" : "pb-4"
        }`}
      >
        <div className="grid grid-cols-2">
          <div>
            <p className="text-left">
              © {new Date().getFullYear()} Isaac Vidrine.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
