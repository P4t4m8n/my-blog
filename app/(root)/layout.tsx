import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import LoginModel from "@/components/Login/LoginModel/LoginModel";
import { Suspense } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" flex flex-col gap-12   p-4">
      <Header />
      <section className="mt-12">{children}</section>
      <Footer />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginModel />
      </Suspense>
    </main>
  );
}
