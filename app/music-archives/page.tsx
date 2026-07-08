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
          One true mark of great musicianship is the ability to tell
          sophisticated stories through sound by evoking complicated and unique
          emotions within the listener. Music is a powerful form of
          self-expression and is something I have a longstanding relationship
          with. This is an archive of the pieces of music I created when I was
          actively practicing and writing.
        </p>
        {/* Track Grid */}
        <AudioTrackList />
      </main>
    </div>
  );
}
