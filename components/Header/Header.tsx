import Image from "next/image";
import Link from "next/link";
import User from "./User/User";

export default function Header() {
  return (
    <header className="  z-50 after-header-bg font-workSans bg-customDark text-customLight pt-4 sticky mb-8 p-4 top-[1rem] max-h-16 flex justify-between items-center rounded-t-lg">
      <Image
        priority={true}
        src="/logo.png"
        alt="logo"
        width={64}
        height={64}
      />
      <nav className="nav-links space-x-4">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </nav>
      <User />
    </header>
  );
}
