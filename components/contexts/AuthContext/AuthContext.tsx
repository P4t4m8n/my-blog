"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/server/user.server";
import { getUserDataFromCookies } from "@/service/user.service";
import { UserSmallModel } from "@/models/user.model";

interface AuthContextModel {
  user: UserSmallModel | null;
  login: (formData: FormData) => Promise<void>;
  logout: () => void;
  register: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextModel | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSmallModel | null>(null);
  const router = useRouter();

  useEffect(() => {
  
    const data = getUserDataFromCookies();
    if (data) {
      setUser({ ...data.user });
    }
  }, []);

  const register = async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    const validateData = signupSchema.parse({
      firstName,
      lastName,
      email,
      password,
      username,
    });

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    const data = await res.json();

    if (res.status === 200) {
      router.push("/login");
      return data;
    } else {
      throw new Error(data.message);
    }
  };

  const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setUser(data.user);
      router.push("/");
    } else {
      throw new Error(data.message);
    }
  };

  const logout = async () => {
    await fetch("/api/logout");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
