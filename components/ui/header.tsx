"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => setScrolled(window.scrollY > 0);
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <header
        className={`flex w-full justify-center bg-transparent pt-0 transition-all ${
          scrolled ? "pt-0" : "sm:pt-4"
        }`}
      >
        <NavigationMenu className="flex p-2 sm:rounded-full bg-background border-b sm:border border-border shadow-md gap-2">
          <NavigationMenuItem className="list-none">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
              data-active={pathname === "/"}
            >
              <Link href="/">
                <div className="flex items-center">
                  <Icon name="house" />
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <Separator className="mx-2" orientation="vertical" />

          <NavigationMenuItem className="list-none">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
              data-active={pathname === "/about"}
            >
              <Link href="/about">
                <div className="flex items-center gap-2">
                  <Icon name="circle-user" />
                  <span className="hidden sm:inline">About</span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="list-none">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
              data-active={pathname === "/projects"}
            >
              <Link href="/projects">
                <div className="flex items-center gap-2">
                  <Icon name="terminal" />
                  <span className="hidden sm:inline">Projects</span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="list-none">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
              data-active={pathname === "/blog"}
            >
              <Link href="/blog">
                <div className="flex items-center gap-2">
                  <Icon name="book" />
                  <span className="hidden sm:inline">Blog</span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="list-none">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
              data-active={pathname === "/music-archives"}
            >
              <Link href="/music-archives">
                <div className="flex items-center gap-2">
                  <Icon name="file-audio" />
                  <span className="hidden sm:inline">Music Archives</span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenu>
      </header>
    </div>
  );
}
