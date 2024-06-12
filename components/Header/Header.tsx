"use client";

import Image from "next/image";
import Link from "next/link";
import User from "./User/User";
import { useEffect, useRef, useState, useCallback } from "react";
import ThemeSwitch from "@/hooks/useTheme";
import { usePathname } from "next/navigation";

export default function Header() {
  const [minimized, setMinimized] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollUpCheck = useRef(false);
  const pathname = usePathname();

  // Observer callback function
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!entries[0].isIntersecting) {
        setAnimationPhase(1);
        setMinimized(true);
      } else if (scrollUpCheck.current) {
        setAnimationPhase(3);
      }
    },
    []
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: [1.0],
      rootMargin: "0px 0px 0px 0px",
    });

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      observer.disconnect();
    };
  }, [handleIntersect]);

  useEffect(() => {
    if (animationPhase === 1) {
      setTimeout(() => {
        setAnimationPhase(2);
      }, 500);
    } else if (animationPhase === 2) {
      setTimeout(() => {
        scrollUpCheck.current = true;
      }, 200);
    } else if (animationPhase === 3) {
      setTimeout(() => {
        setAnimationPhase(4);
      }, 500);
    } else if (animationPhase === 4) {
      setTimeout(() => {
        scrollUpCheck.current = false;
        setMinimized(false);
        setAnimationPhase(0);
      }, 200);
    }
  }, [animationPhase]);

  return (
    <>
      <div ref={sentinelRef} className="h-1 absolute top-0 w-[50%]"></div>

      <header
        className={`fixed background-theme top-0 right-0 z-50 font-workSans p-4 transition-all flex justify-between items-center ease-in ${
          minimized ? "w-24 h-24" : "w-full h-24"
        } ${
          animationPhase === 1 ? "w-24 h-24 transition-width duration-500" : ""
        } ${
          animationPhase === 2
            ? "h-full transition-height w-24 transition-width duration-500 flex-col"
            : ""
        } ${
          animationPhase === 3
            ? "h-24 transition-height w-24 transition-width duration-500 flex-col"
            : ""
        } ${
          animationPhase === 4
            ? "w-full transition-width duration-700 flex-row"
            : ""
        }`}
      >
        <Image
          priority={true}
          src="/logo.png"
          alt="logo"
          width={64}
          height={64}
        />
        <nav
          className={`flex items-center nav-links ${
            animationPhase === 2 || animationPhase === 3
              ? "flex-col justify-center"
              : ""
          } opacity-1 justify-end gap-2 transition-opacity duration-500 ${
            animationPhase === 3 || animationPhase === 1 ? "opacity-0" : ""
          }`}
        >
          <Link className={pathname === "/" ? "nav-underline" : ""} href="/">
            Home
          </Link>
          <Link
            className={pathname === "/blog" ? "nav-underline" : ""}
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className={pathname === "/about" ? "nav-underline" : ""}
            href="/about"
          >
            About
          </Link>
          <ThemeSwitch />
        </nav>

        <User isMinimized={minimized} />
      </header>
    </>
  );
}
