import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" min-h-screen grid gap-4 px-8">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
