"use client";
import { useAuth } from "@/components/contexts/AuthContext/AuthContext";
import { useModal } from "@/components/hooks/useModal";
import { AvatarSVG } from "@/components/svgs/AvatarSVG";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function User() {
  const { user, logout } = useAuth();
  const modelRef = useRef(null);
  const [isModel, setModel] = useModal(modelRef, null);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (path === "/") logout();
    router.push(path);
    setModel(false);
  };

  return user ? (
    <div
      ref={modelRef}
      className=" flex items-center relative space-x-4 border p-2 z-15  rounded "
      onClick={() => setModel(true)}
    >
      <h3 className=" hover:cursor-pointer">{user.username}</h3>
      <AvatarSVG />
      {isModel && (
        <div
          className="bg-customDark border  shadow-md rounded-lg gap-4 flex flex-col items-start p-2 w-full absolute h-fit -left-[1rem] top-[4rem] z-20
        "
        >
          <button
            onClick={() => handleNavigation("/profile")}
            className=" hover:animate-text-color-slide"
          >
            Profile
          </button>

          {user.role === "admin" && (
            <>
            <button
              className=" hover:animate-text-color-slide"
              onClick={() => handleNavigation("/blog/edit")}
              >
              Editor
            </button>
            <button
              className=" hover:animate-text-color-slide"
              onClick={() => handleNavigation("/profile/admin")}
              >
              Dashboard
            </button>
              </>
          )}
          <button
            onClick={() => handleNavigation("/")}
            className=" hover:animate-text-color-slide   "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className=" space-x-4">
      <button>English</button>
      <Link href={{ pathname: "/login", query: "login" }}>Login</Link>
    </div>
  );
}
