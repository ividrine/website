"use client";

import { useAudioPlayer } from "@/contexts/audio-player-context";
import { Icon, IconName } from "@/components/ui/icon";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getVolumeIcon(volume: number): IconName {
  if (volume === 0) return "volume-xmark";
  if (volume < 50) return "volume-low";
  return "volume-high";
}

export function NowPlayingBar() {
  const {
    currentTrack,
    isPlaying,
    isBuffering,
    bufferedAmount,
    currentTime,
    duration,
    volume,
    isShuffle,
    isRepeat,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = useAudioPlayer();

  const handleProgressChange = (value: number[]) => {
    seek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <div
      className={`transition-height duration-300 ease-in-out fixed bottom-0 left-0 right-0 z-50 bg-background ${
        currentTrack ? "h-20 border-t border-border" : "h-0"
      }`}
    >
      {currentTrack && (
        <div className="grid grid-cols-8 gap-4 px-4 h-full">
          {/* Left: Track Info */}
          <div className="flex items-center gap-3 col-span-3 sm:col-span-2">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-neutral-900">
              <Image
                src={currentTrack.image}
                alt={currentTrack.title}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-bg-foreground">
                {currentTrack.title}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {currentTrack.album} ({currentTrack.year})
              </span>
            </div>
          </div>

          {/* Center: Player Controls */}
          <div className="flex flex-col items-center justify-center gap-2 col-span-5 sm:col-span-4">
            {/* Control Buttons */}
            <div className="flex items-center gap-6">
              {/* Shuffle */}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={toggleShuffle} aria-label="Toggle shuffle">
                    <Icon
                      name="shuffle"
                      size={18}
                      className={`transition-colors duration-200 ${
                        isShuffle
                          ? "text-highlight"
                          : "hover:text-foreground text-muted-foreground"
                      }`}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isShuffle ? "Disable Shuffle" : "Enable Shuffle"}
                </TooltipContent>
              </Tooltip>

              {/* Previous */}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={playPrevious} aria-label="Previous track">
                    <Icon
                      name="backward-step"
                      size={18}
                      className="transition-colors duration-200 text-muted-foreground hover:text-foreground"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Previous</TooltipContent>
              </Tooltip>

              {/* Play/Pause */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={togglePlayPause}
                    aria-label={isBuffering ? "Loading" : isPlaying ? "Pause" : "Play"}
                    disabled={isBuffering}
                  >
                    {isBuffering ? (
                      <Spinner className="size-8" />
                    ) : isPlaying ? (
                      <Icon name="pause" size={32} />
                    ) : (
                      <Icon name="play" size={32} />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{isBuffering ? "Loading" : isPlaying ? "Pause" : "Play"}</TooltipContent>
              </Tooltip>

              {/* Next */}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={playNext} aria-label="Next track">
                    <Icon
                      name="forward-step"
                      size={18}
                      className="transition-colors duration-200 text-muted-foreground hover:text-foreground"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Next</TooltipContent>
              </Tooltip>

              {/* Repeat */}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={toggleRepeat} aria-label="Toggle repeat">
                    <Icon
                      name="repeat"
                      size={18}
                      className={`transition-colors duration-200 ${
                        isRepeat
                          ? "text-highlight"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isRepeat ? "Disable Repeat" : "Enable Repeat"}
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Progress Bar */}
            <div className="flex w-full max-w-2xl items-center gap-2">
              <span className="min-w-[40px] text-xs text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleProgressChange}
                bufferedPercent={bufferedAmount}
                className="flex-1"
              />
              <span className="min-w-[40px] text-right text-xs text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Volume Control */}
          <div className="hidden sm:flex items-center justify-end gap-2 col-span-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setVolume(volume === 0 ? 70 : 0)}
                  className="w-8"
                  aria-label="Toggle mute"
                >
                  <Icon
                    name={getVolumeIcon(volume)}
                    size={20}
                    className="text-foreground align-left"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>{volume == 0 ? "Unmute" : "Mute"}</TooltipContent>
            </Tooltip>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      )}
    </div>
  );
}
