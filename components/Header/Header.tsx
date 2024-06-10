"use client";

import Image from "next/image";
import Link from "next/link";
import User from "./User/User";
import { useEffect, useRef, useState } from "react";
import ThemeSwitch from "@/hooks/useTheme";

export default function Header() {
  const [minimized, setMinimized] = useState(false);
  console.log("minimized:", minimized);
  const [animationPhase, setAnimationPhase] = useState(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const t = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          setAnimationPhase(1);
          setMinimized(true);
        } else if (t.current) {
          setAnimationPhase(3);
        }
      },
      {
        threshold: [1.0],
        rootMargin: "0px 0px 0px 0px",
      }
    );

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (animationPhase === 1) {
      setTimeout(() => {
        setAnimationPhase(2);
      }, 500);
    } else if (animationPhase === 2) {
      setTimeout(() => {
        t.current = true;
      }, 200);
    } else if (animationPhase === 3) {
      setTimeout(() => {
        setAnimationPhase(4);
      }, 500);
    } else if (animationPhase === 4) {
      setTimeout(() => {
        t.current = false;
        setMinimized(false);
        setAnimationPhase(0);
      }, 200);
    }
  }, [animationPhase]);
  console.log("animationPhase:", animationPhase);

  return (
    <>
      <div ref={sentinelRef} className="h-1 static top-0 w-full"></div>

      <header
        className={`fixed previewCard top-0 right-0 z-50 font-workSans p-4 transition-all flex justify-between   ease-in ${
          minimized ? "w-24 h-24 " : "w-full h-24"
        } ${
          animationPhase === 1 ? "w-24 h-24 transition-width duration-500" : ""
        } ${
          animationPhase === 2
            ? "h-full transition-height w-24 transition-width duration-500 flex-col"
            : ""
        } ${
          animationPhase === 3
            ? "h-24 transition-height w-24 transition-width duration-500 flex-col "
            : ""
        }
        ${
          animationPhase === 4
            ? "w-full transition-width duration-700 flex-row "
            : ""
        }
         flex  `}
      >
        <Image
          priority={true}
          src="/logo.png"
          alt="logo"
          width={64}
          height={64}
        />
        <nav
          className={`flex items-center ${
            animationPhase === 2 || animationPhase === 3
              ? "flex-col justify-center"
              : ""
          } opacity-1 justify-end gap-2 transition-opacity duration-500
          ${animationPhase === 3 || animationPhase === 1 ? "opacity-0" : ""}
          `}
        >
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <ThemeSwitch />
        </nav>

        <User />
      </header>
    </>
  );
}
