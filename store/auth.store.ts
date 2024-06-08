import { create } from "zustand";
import { UserModel, UserSmallModel } from "@/models/user.model";
import { signupSchema } from "@/service/user.service";

interface AuthState {
  user: UserModel | null;
  login: (formData: FormData) => Promise<void>;
  logout: () => void;
  register: (formData: FormData) => Promise<void>;
  setUser: (user: UserModel | null) => void;
  setUserNoRender: (user: UserModel) => void;
}

export const useAuthStore = create<AuthState>((set, get, api) => ({
  user: null,
  login: async (formData: FormData) => {
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
      set({ user: data.userData });
    } else {
      throw new Error(data.message);
    }
  },
  logout: async () => {
    await fetch("/api/logout");
    set({ user: null });
  },
  register: async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    signupSchema.parse({
      firstName,
      lastName,
      email,
      password,
      username,
    });

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const data = await res.json();

      
      
    } catch (error) {
      throw new Error(`Error registering user: ${error}`);
    }
  },
  setUser: (user) => set({ user }),
  setUserNoRender: (user) => {
    api.setState({ user }, false); // Update state without causing a re-render
  },
}));
