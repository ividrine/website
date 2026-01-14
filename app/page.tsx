"use client";

import { Icon } from "@/components/ui/icon";
import Link from "next/link";

export default function Home() {
  const title = "Full-Stack Software Engineer";

  return (
    <div className="flex items-center justify-center font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center py-16 px-16">
        <h1 className="mb-0">Isaac Vidrine</h1>
        <p className="text-md font-semibold text-accent-foreground mb-0">
          {title.split("").map((char, index) => (
            <span
              key={index}
              className="inline-block animate-fade-in"
              style={{
                animationDelay: `${index * 0.02}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex gap-2 mt-4 justify-center">
            <Link href="https://github.com/ividrine" target="_blank">
              <Icon name="brands-github" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/isaac-vidrine-b5a865112/"
              target="_blank"
            >
              <Icon name="brands-linkedin" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
