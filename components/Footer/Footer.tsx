"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import SocialMediaSVGS from "../svgs/SocialMediaSVGS";

export default function Footer() {
  const [minimized, setMinimized] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollUpCheck = useRef(false);

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
      setTimeout(() => setAnimationPhase(2), 500);
    } else if (animationPhase === 2) {
      setTimeout(() => (scrollUpCheck.current = true), 200);
    } else if (animationPhase === 3) {
      setTimeout(() => setAnimationPhase(4), 500);
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
      <footer
        className={`background-theme fixed bottom-0 left-0 z-50 font-workSans gap-4 p-4 transition-width flex items-center justify-center ease-in ${
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
        } flex bg-customDark text-customLight rounded-lg`}
      >
        <div className="gap-2 flex flex-col">
          <div
            className={`flex gap-4 items-center justify-center ${
              animationPhase === 2 || animationPhase === 3
                ? "flex-col justify-center"
                : ""
            } opacity-1 justify-end gap-2 transition-opacity duration-500 ${
              animationPhase === 3 || animationPhase === 1 ? "opacity-0" : ""
            }`}
          >
            <Link href="mailto:michaelieran@gmail.com">
              <SocialMediaSVGS type="email" />
            </Link>
            <Link href="https://www.linkedin.com/in/michaelieran/">
              <SocialMediaSVGS type="linkedin" />
            </Link>
            <Link href="">
              <SocialMediaSVGS type="twitter" />
            </Link>
            <Link href="https://github.com/P4t4m8n">
              <SocialMediaSVGS type="github" />
            </Link>
          </div>
          <h1 className="text-center">Copyright ©2024 Michaeli Eran</h1>
        </div>
      </footer>
      <div ref={sentinelRef} className="h-1 absolute top-0 w-[50%]"></div>
    </>
  );
}
