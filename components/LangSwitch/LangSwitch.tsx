import Link from "next/link";

interface Props {
  dict: any;
  lang: string;
}

export default function LangSwitch({ dict, lang }: Props) {
  return (
    <Link
      href={lang === "en" ? "/he" : "/en"}
      className="lang-switch"
      onClick={() => console.log("switched")}
    >
      {lang === "en" ? "עברית" : "English"}
    </Link>
  );
}
