"use client";

import { useRef } from "react";
import { SocialMediaTypes } from "../svgs/SocialMediaSVGS";
import LinkList from "../Header/LinkList/LinkList";
import PlusSVG from "../svgs/PlusSVG";
import { useAnimationPhase } from "@/hooks/useAnimation";
import { DictionaryModel } from "@/models/dictionary.model";
interface Props {
  dict: DictionaryModel;
}
export default function Footer({ dict }: Props) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { minimized, setMinimized, animationPhase, isMobile } =
    useAnimationPhase({ sentinelRef });

  const links: { href: string; name?: string; svg?: SocialMediaTypes }[] = [
    { href: "mailto:michaelieran@gmail.com", svg: "email" },
    { href: "https://www.linkedin.com/in/michaelieran/", svg: "linkedin" },
    { href: "https://x.com/", svg: "twitter" },
    { href: "https://github.com/P4t4m8n", svg: "github" },
  ];

  return (
    <>
      <footer
        className={`background-theme fixed bottom-0 left-0 z-50 font-workSans gap-4 p-4 transition-width flex items-center justify-center ease-in ${
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
        } flex bg-customDark text-customLight `}
      >
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
              ? "mobile:flex w-12 h-12 background-theme mobile:absolute mobile:top-[50%] mobile:rounded-r-lg -right-12 z-50  items-center justify-center "
              : ""
          } `}
        >
          <PlusSVG isRemove={isMobile.current} />
        </button>
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
            <LinkList
              links={links}
              animationPhase={animationPhase}
              minimized={minimized}
            />
          </div>
          <h1
            className={`text-center ${
              (minimized || isMobile.current) && "hidden"
            }`}
          >
            {dict.footer.copy}
          </h1>
        </div>
      </footer>
      <div ref={sentinelRef} className="h-1 absolute top-0 w-[50%]"></div>
    </>
  );
}
