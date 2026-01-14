"use client";
import { tracks } from "@/data/tracks";
import { AudioTrackCard } from "@/components/ui/audio-track-card";
import { useAudioPlayer } from "@/contexts/audio-player-context";
import { useEffect } from "react";

export default function MusicArchives() {
  const { setPlaylist } = useAudioPlayer();

  useEffect(() => {
    setPlaylist(tracks);
  }, [setPlaylist]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="w-full max-w-3xl py-12 px-12">
        <h1 className="text-center">Music Archives</h1>
        <p className="indent-6">
          One true mark of great musicianship is the ability to capture a set of
          emotions and express them in the form of sound in order to tell a
          story - not unlike how an author of a book uses natural language to
          evoke imagery and feelings in the mind of the reader.
        </p>
        <p className="indent-6">
          This is an archive of the pieces of music I created throughout the
          years. Some of them are just ideas, some are full length pieces and
          the rest are somewhere in between.
        </p>

        {/* Track Grid */}
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
      </main>
    </div>
  );
}
