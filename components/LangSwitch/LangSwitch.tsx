import Link from "next/link";
import {  usePathname } from "next/navigation";

interface Props {
  lang: string;
}

export default function LangSwitch({ lang }: Props) {
  const pathname = usePathname()
  const fixedPath = pathname.replace("/he", "").replace("/en", "");

  const href = (lang === "en" ? "/he" : "/en") + fixedPath;
  return (
    <Link
      href={href}
      className="lang-switch"
    >
      {lang === "en" ? "עברית" : "English"}
    </Link>
  );
}
