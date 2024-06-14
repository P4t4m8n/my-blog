import type { Metadata } from "next";
import { Bitter, Work_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Life in a box",
  description: "My personal blog about life and technology.",
};

const bitter = Bitter({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "100"],
  display: "swap",
  variable: "--font-bitter",
  subsets: ["cyrillic-ext", "cyrillic", "latin-ext", "latin", "vietnamese"],
});

const work_sans = Work_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "100"],
  display: "swap",
  variable: "--font-work-sans",
  subsets: ["latin", "latin-ext"],
});

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "he" }];
}
export default function RootLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  return (
    <html lang={lang}>
      <body
        className={` max-w-screen  ${bitter.variable} ${work_sans.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
