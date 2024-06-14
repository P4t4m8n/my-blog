"use client";

import Image from "next/image";
import User from "./User/User";
import { useRef } from "react";
import PlusSVG from "../svgs/PlusSVG";
import LinkList from "./LinkList/LinkList";
import { useAnimationPhase } from "@/hooks/useAnimation";
import LangSwitch from "../LangSwitch/LangSwitch";
import { DictionaryModel } from "@/models/dictionary.model";

interface Props {
  dict: DictionaryModel;
  lang: string;
}

export default function Header({ dict, lang }: Props) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { minimized, setMinimized, animationPhase, isMobile } =
    useAnimationPhase({ sentinelRef });

  const links = [
    { name: dict.navigation.home, href: "/" },
    { name: dict.navigation.blog, href: "/blog" },
    { name: dict.navigation.about, href: "/about" },
  ];

  return (
    <>
      <div ref={sentinelRef} className="h-1 absolute top-0 w-[50%]"></div>

      <header
        className={`fixed  background-theme top-0 right-0 z-50 font-workSans  p-4 transition-all flex justify-between items-center ease-in ${
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
        <div className={`flex gap-2 ${minimized ? "flex-col" : ""}`}>
          <LinkList
            links={links}
            animationPhase={animationPhase}
            minimized={minimized}
          />
          <LangSwitch lang={lang} />
        </div>

        <User
          isMinimized={minimized}
          isMobile={isMobile.current}
          dict={dict}
          lang={lang}
        />
      </header>
    </>
  );
}
