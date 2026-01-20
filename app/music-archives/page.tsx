import type { Metadata } from "next";
import AudioTrackList from "@/components/ui/audio-track-list";

export const metadata: Metadata = {
  title: "Music Archives",
};

export default function MusicArchives() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="w-full max-w-3xl py-12 px-12">
        <h1 className="text-center">Music Archives</h1>
        <p className="indent-6">
          One true mark of great musicianship is the ability to tell interesting
          stories through sound, not unlike how an author of a book uses natural
          language to evoke imagery and feelings in the mind of the reader. This
          is an archive of the pieces of music I created when I was actively
          practicing.
        </p>
        {/* Track Grid */}
        <AudioTrackList />
      </main>
    </div>
  );
}
