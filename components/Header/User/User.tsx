"use client";
import { useModal } from "@/hooks/useModal";
import { AvatarSVG } from "@/components/svgs/AvatarSVG";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { getSessionUser } from "@/server/user.server";

export default function User() {
  const { user, logout, setUser } = useAuthStore();
  const modelRef = useRef(null);
  const [isModel, setModel] = useModal(modelRef, null);
  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const _user = await getSessionUser();
    if (_user) setUser(_user);
  };

  const handleNavigation = (path: string) => {
    if (path === "/") logout();
    router.push(path);
    setModel(false);
  };

  return user ? (
    <div
      ref={modelRef}
      className="flex items-center relative space-x-4 border p-2 z-15 rounded"
      onClick={() => setModel(true)}
    >
      <h3 className="hover:cursor-pointer">{user?.username}</h3>
      <AvatarSVG />
      {isModel && (
        <div className="bg-customDark border shadow-md rounded-lg gap-4 flex flex-col items-start p-2 w-full absolute h-fit -left-[1rem] top-[4rem] z-20">
          <button
            onClick={() => handleNavigation("/profile")}
            className="hover:animate-text-color-slide"
          >
            Profile
          </button>

          {user.role === "ADMIN" && (
            <>
              <button
                className="hover:animate-text-color-slide"
                onClick={() => handleNavigation("/blog/edit/new")}
              >
                Editor
              </button>
              <button
                className="hover:animate-text-color-slide"
                onClick={() => handleNavigation("/profile/admin")}
              >
                Dashboard
              </button>
            </>
          )}
          <button
            onClick={() => handleNavigation("/")}
            className="hover:animate-text-color-slide"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="space-x-4">
      <button>English</button>
      <Link href={{ pathname: "/login", query: "login" }}>Login</Link>
    </div>
  );
}
