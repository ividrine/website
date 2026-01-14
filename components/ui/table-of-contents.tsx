"use client";

import { TocItem } from "@/types";
import { useEffect, useState } from "react";

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    const headings = items.map((item) => document.getElementById(item.id));
    headings.forEach((heading) => {
      if (heading) observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        if (heading) observer.unobserve(heading);
      });
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 h-fit">
      <h2 className="text-sm font-semibold mb-4">On this page</h2>
      <ul className="space-y-2 text-sm border-l-2 border-accent">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 0.75 + 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={`block hover:text-foreground transition-colors ${
                activeId === item.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
