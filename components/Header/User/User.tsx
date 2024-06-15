"use client";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { getSessionUser } from "@/server/user.server";
import LoginModel from "@/components/Login/LoginModel/LoginModel";
import { DictionaryModel } from "@/models/dictionary.model";

interface Props {
  isMinimized: boolean;
  isMobile: boolean;
  dict: DictionaryModel;
  lang: string;
}

export default function User({ isMinimized, isMobile, dict, lang }: Props) {
  const { user, logout, setUser } = useAuthStore();
  const modelRef = useRef(null);
  const [isModel, setModel] = useModal(modelRef, null);
  const router = useRouter();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUser = async () => {
    const _user = await getSessionUser();
    if (_user) setUser(_user);
  };

  const handleNavigation = (path: string) => {
    setModel(false);
    if (path === "/") logout();
    router.push(path);
  };

  return user ? (
    <div
      ref={modelRef}
      className={`flex items-center relative gap-4  border p-2 z-15 rounded ${
        isMinimized ? "mobile:hidden" : ""
      }`}
      onClick={() => setModel(true)}
    >
      <h3 className="hover:cursor-pointer">{user?.username}</h3>

      {isModel && (
        <div
          className={`background-theme border shadow-md  -left-4 rounded-lg gap-4 flex flex-col items-start p-2 w-fit absolute h-fit ${
            isMinimized
              ? ` -top-[6rem] `
              : ` top-[3rem] ${
                  isMobile ? `mobile:-top-[6rem] mobile:-left-[1rem]` : ""
                }`
          } z-20`}
        >
          <button
            onClick={() => handleNavigation("/profile")}
            className="hover:animate-text-color-slide"
          >
            {dict.navigation.profile}
          </button>

          {user.role === "ADMIN" && (
            <>
              <button
                className="hover:animate-text-color-slide"
                onClick={() => handleNavigation("/blog/edit/new")}
              >
                {dict.navigation.editor}
              </button>
            </>
          )}
          <button
            onClick={() => handleNavigation("/")}
            className="hover:animate-text-color-slide "
          >
            {dict.navigation.logout}
          </button>
        </div>
      )}
    </div>
  ) : (
    <LoginModel dict={dict} />
  );
}
