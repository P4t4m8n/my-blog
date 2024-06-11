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
    <main className=" flex flex-col">
      <Header />
      <section className=" my-24 px-24 max-h-screen-minus-sticky">{children}</section>
      <Footer />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginModel />
      </Suspense>
    </main>
  );
}
