import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className=" pt-4 sticky top-0 max-h-16 flex justify-between items-center">
      <Image
        priority={true}
        src="/logo.png"
        alt="logo"
        width={64}
        height={64}
      />
      <nav className=" space-x-4">
        <Link href="/">Home</Link>
        <Link href="/Blog">Blog</Link>
        <Link href="/about">About</Link>
      </nav>
      <div className=" space-x-4">
        <button>English</button>
        <Link href="/blog/edit/">Login</Link>
      </div>
    </header>
  );
}
