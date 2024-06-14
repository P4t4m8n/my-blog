import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";


export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" flex flex-col">
      <Header />
      <section suppressHydrationWarning className=" my-24 px-24 mobile:px-8 h-full ">{children}</section>
      <Footer />
    
    </main>
  );
}
