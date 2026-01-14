"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { useAudioPlayer, Track } from "@/contexts/audio-player-context";
import Link from "next/link";

interface AudioTrackCardProps {
  id: string;
  title: string;
  album: string;
  year: string;
  image: string;
  audioSrc: string;
}

export function AudioTrackCard({
  id,
  title,
  album,
  year,
  image,
  audioSrc,
}: AudioTrackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentTrack, isPlaying, playTrack, togglePlayPause } =
    useAudioPlayer();

  const track: Track = {
    id,
    title,
    album,
    year,
    image,
    audioSrc,
  };

  const isCurrentTrack = currentTrack?.id === id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handleClick = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  const showPlayButton = isHovered || isCurrentlyPlaying;

  return (
    <div
      className="group relative w-full cursor-pointer rounded-md p-4 transition-colors transition-opacity duration-300 hover:bg-muted/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-md bg-neutral-900">
        <Image
          src={image}
          alt={`${title} album art`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 256px"
        />

        {/* Play/Pause Button (bottom-right) */}
        <div
          className={`absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-black shadow-lg transition-all duration-300 ${
            showPlayButton
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          {isCurrentlyPlaying ? (
            <Icon name="pause" size={20} />
          ) : (
            <Icon name="play" size={20} />
          )}
        </div>
      </div>

      {/* Track Info */}

      <div>
        <p className="text-lg font-medium text-foreground mb-0">{title}</p>
        <p className="text-sm text-muted-foreground mb-0">
          {album} ({year})
        </p>
      </div>
    </div>
  );
}
