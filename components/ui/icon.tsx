// Brand Icons
import Brands_Github from "@/icons/github-brands-solid-full.svg";
import Brands_Linkedin from "@/icons/linkedin-brands-solid-full.svg";

// Nav Icons
import File_Audio from "@/icons/file-audio-regular-full.svg";
import Circle_User from "@/icons/circle-user-solid-full.svg";
import House from "@/icons/house-solid-full.svg";
import Terminal from "@/icons/terminal-solid-full.svg";
import Book from "@/icons/book-solid-full.svg";

// Audio Player Icons
import Play from "@/icons/play-solid-full.svg";
import CirclePlay from "@/icons/circle-play-solid-full.svg";
import Pause from "@/icons/pause-solid-full.svg";
import CirclePause from "@/icons/circle-pause-solid-full.svg";
import Volume_High from "@/icons/volume-high-solid-full.svg";
import Volume_Low from "@/icons/volume-low-solid-full.svg";
import Volume_Off from "@/icons/volume-off-solid-full.svg";
import Volume_XMark from "@/icons/volume-xmark-solid-full.svg";
import Forward_Step from "@/icons/forward-step-solid-full.svg";
import Backward_Step from "@/icons/backward-step-solid-full.svg";
import Shuffle from "@/icons/shuffle-solid-full.svg";
import Repeat from "@/icons/repeat-solid-full.svg";
import Download from "@/icons/download-solid-full.svg";

// Footer Icons
import Sun from "@/icons/sun-solid-full.svg";
import Moon from "@/icons/moon-solid-full.svg";
import Desktop from "@/icons/desktop-solid-full.svg";

import { cn } from "@/lib/utils";

const icons = {
  // Brands
  "brands-github": Brands_Github,
  "brands-linkedin": Brands_Linkedin,

  // Navigation
  "file-audio": File_Audio,
  "circle-user": Circle_User,
  house: House,
  terminal: Terminal,
  book: Book,

  // Audio player
  play: Play,
  pause: Pause,
  "circle-play": CirclePlay,
  "circle-pause": CirclePause,
  "volume-high": Volume_High,
  "volume-low": Volume_Low,
  "volume-off": Volume_Off,
  "volume-xmark": Volume_XMark,
  "forward-step": Forward_Step,
  "backward-step": Backward_Step,
  shuffle: Shuffle,
  repeat: Repeat,
  download: Download,

  // Footer
  sun: Sun,
  moon: Moon,
  desktop: Desktop,
};

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 24, className }: IconProps) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={cn("text-foreground", className)}
    />
  );
}
