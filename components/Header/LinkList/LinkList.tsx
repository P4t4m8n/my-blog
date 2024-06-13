import SocialMediaSVGS, {
  SocialMediaTypes,
} from "@/components/svgs/SocialMediaSVGS";
import ThemeSwitch from "@/hooks/useTheme";
import Link from "next/link";

interface Props {
  links: { href: string; name?: string; svg?: SocialMediaTypes }[];
  pathname: string;
  animationPhase: number;
  minimized: boolean;
}
export default function LinkList({
  links,
  pathname,
  animationPhase,
  minimized,
}: Props) {
  return (
    <nav
      className={`flex items-center nav-links ${
        animationPhase === 2 || animationPhase === 3
          ? "flex-col justify-center"
          : ""
      } opacity-1 justify-end gap-2 transition-opacity duration-500 ${
        animationPhase === 3 || animationPhase === 1 ? "opacity-0" : ""
      }`}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          className={`${pathname === link.href ? "nav-underline" : ""} ${
            minimized ? "mobile:hidden" : "mobile:block"
          } `}
          href={link.href}
        >
          {link.name ? link.name : <SocialMediaSVGS type={link.svg!} />}
        </Link>
      ))}
      <div className={` ${minimized ? "mobile:hidden" : "mobile:block"}`}>
        <ThemeSwitch />
      </div>
    </nav>
  );
}
