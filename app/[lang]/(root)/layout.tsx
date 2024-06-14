import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { getDictionary } from "../dictionaries";

interface Props {
  children: React.ReactNode;
  params: { lang: string };
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
      <section
        suppressHydrationWarning
        className=" my-24 px-24 mobile:px-8 h-full "
      >
        {children}
      </section>
      <Footer />
    </main>
  );
}
