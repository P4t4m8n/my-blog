"use client";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNav() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="w-full h-8 bg-customGray flex rounded px-4 items-center justify-between">
      <Link
        href="/profile"
        className={`hover:text-customCardBgOrange ${
          isActive("/profile") ? "highlight-theme-text font-semibold" : ""
        }`}
      >
        Settings
      </Link>
      <Link
        href="/profile/saved-posts"
        className={`hover:text-customCardBgOrange ${
          isActive("/profile/saved-posts")
            ? "text-customHighlight font-semibold"
            : ""
        }`}
      >
        Likes
      </Link>
      <Link
        href="/profile/comments"
        className={`hover:text-customCardBgOrange ${
          isActive("/profile/comments")
            ? "text-customHighlight font-semibold"
            : ""
        }`}
      >
        Comments
      </Link>
      {user?.role === "ADMIN" && (
        <>
          <Link
            href="/profile/users"
            className={`hover:text-customCardBgOrange ${
              isActive("/profile/users")
                ? "text-customHighlight font-semibold"
                : ""
            }`}
          >
            Users
          </Link>
          <Link
            href="/profile/blog-posts"
            className={`hover:text-customCardBgOrange ${
              isActive("/profile/posts")
                ? "text-customHighlight font-semibold"
                : ""
            }`}
          >
            Posts
          </Link>
        </>
      )}
    </nav>
  );
}
