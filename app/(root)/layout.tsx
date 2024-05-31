import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" min-h-screen relative grid gap-6 p-4">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
