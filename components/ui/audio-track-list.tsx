"use client";
import { tracks } from "@/data/tracks";
import { AudioTrackCard } from "@/components/ui/audio-track-card";
import { useAudioPlayer } from "@/contexts/audio-player-context";
import { useEffect } from "react";

export default function AudioTrackList() {
  const { setPlaylist } = useAudioPlayer();

  useEffect(() => {
    setPlaylist(tracks);
  }, [setPlaylist]);

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center items-center">
      {tracks.map((track) => (
        <AudioTrackCard
          key={track.id}
          id={track.id}
          title={track.title}
          album={track.album}
          year={track.year}
          image={track.image}
          audioSrc={track.audioSrc}
        />
      ))}
    </div>
  );
}
