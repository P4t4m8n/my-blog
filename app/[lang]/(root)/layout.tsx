import React from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { getDictionary } from "../dictionaries";
import { LanguageType } from "@/models/dictionary.model";

interface Props {
  children: React.ReactNode;
  params: { lang: LanguageType };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "he" }];
}

export default async function layout({
  children,
  params: { lang },
}: Readonly<Props>) {
  const dict = await getDictionary(lang);
  return (
    <main className=" flex flex-col">
      <Header lang={lang} dict={dict} />
      <section className=" my-24 px-24 mobile:px-8 h-full ">{children}</section>
      <Footer dict={dict} />
    </main>
  );
}
