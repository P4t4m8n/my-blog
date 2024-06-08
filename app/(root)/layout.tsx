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
    <main className=" min-h-screen relative grid   p-4">
        <Header />
        {children}
        <Footer />
        <Suspense fallback={<div>Loading...</div>}>
          <LoginModel />
        </Suspense>
    </main>
  );
}
