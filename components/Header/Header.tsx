"use client";

import Image from "next/image";
import Link from "next/link";
import User from "./User/User";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ThemeSwitch from "@/hooks/useTheme";
import { usePathname } from "next/navigation";
import PlusSVG from "../svgs/PlusSVG";
import LinkList from "./LinkList/LinkList";

export default function Header() {
  const [minimized, setMinimized] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const isMobile = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollUpCheck = useRef(false);
  const pathname = usePathname();

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
        isMobile.current = false;
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

  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <div ref={sentinelRef} className="h-1 absolute top-0 w-[50%]"></div>

      <header
        className={`fixed background-theme top-0 right-0 z-50 font-workSans  p-4 transition-all flex justify-between items-center ease-in ${
          minimized
            ? "w-24 h-24 mobile:w-4"
            : `w-full h-24 ${isMobile.current ? "mobile:w-24" : "w-full"} `
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
        <button
          onClick={() => {
            isMobile.current = !isMobile.current;
            setMinimized(!minimized);
          }}
          className={`hidden transition-all ease-in-out ${
            minimized ? "mobile:block" : " "
          }
          ${
            isMobile.current
              ? "mobile:flex w-12 h-12 background-theme mobile:absolute mobile:top-[50%] rounded-s-lg -left-12 z-50  items-center justify-center "
              : ""
          } `}
        >
          <PlusSVG isRemove={isMobile.current} />
        </button>
        <LinkList
          links={links}
          pathname={pathname}
          animationPhase={animationPhase}
          minimized={minimized}
        />

        <User isMinimized={minimized} />
      </header>
    </>
  );
}
