"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

export interface Track {
  id: string;
  title: string;
  album: string;
  year: string;
  image: string;
  audioSrc: string;
}

interface AudioPlayerContextType {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  setPlaylist: (tracks: Track[]) => void;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Update audio element volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track.audioSrc;
      audioRef.current.play();
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const playNext = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    let nextIndex: number;

    if (isShuffle) {
      // Random track (but not the current one)
      const availableIndices = playlist
        .map((_, i) => i)
        .filter((i) => i !== currentIndex);
      nextIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      // Next track in order
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    playTrack(playlist[nextIndex]);
  }, [currentTrack, playlist, isShuffle, playTrack]);

  const playPrevious = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;

    // If more than 3 seconds into the song, restart it
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const previousIndex =
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;

    playTrack(playlist[previousIndex]);
  }, [currentTrack, playlist, playTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    const playPause = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    window.addEventListener("keydown", playPause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("keydown", playPause);
    };
  }, [isRepeat, playNext, togglePlayPause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        playlist,
        isPlaying,
        currentTime,
        duration,
        volume,
        isShuffle,
        isRepeat,
        setPlaylist,
        playTrack,
        togglePlayPause,
        playNext,
        playPrevious,
        seek,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        audioRef,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }
  return context;
}
