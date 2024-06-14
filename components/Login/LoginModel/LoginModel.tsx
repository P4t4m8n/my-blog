"use client";

import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/store/auth.store";
import { FormEvent, useRef, useState } from "react";

export default function LoginModel() {
  const [isLogin, setIsLogin] = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useModal(modelRef, null);
  const { login, register } = useAuthStore();

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    try {
      if (isLogin) {
        const user = await login(formData);
        setModel(false);
      } else {
        await register(formData);
        setIsLogin(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <button onClick={() => setModel(true)} suppressHydrationWarning>Login</button>
      {model && (
        <section suppressHydrationWarning
          ref={modelRef}
          className="model background-theme flex z-30 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  fixed min-h-screen-minus-sticky rounded p-4 items-center bg-customDark font-workSans"
        >
          <form
            className="flex flex-col gap-2 h-[65vh] max-w-[30rem] bg-customLight rounded-lg p-8  "
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <>
                <h3 className=" text-sm font-semibold">First Name</h3>
                <input
                  className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
                  placeholder="Enter your First name"
                  name="firstName"
                  type="text"
                  required
                />
                <h3 className=" text-sm font-semibold">Last Name</h3>
                <input
                  className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
                  placeholder="Enter your Last name"
                  name="lastName"
                  type="text"
                  required
                />
                <h3 className=" text-sm font-semibold">User Name</h3>
                <input
                  className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
                  placeholder="User name"
                  name="username"
                  type="text"
                  required
                />
              </>
            )}
            <h3 className=" text-sm font-semibold">Email</h3>
            <input
              className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
              placeholder="Email"
              name="email"
              type="email"
              required
            />
            <h3 className=" text-sm font-semibold">Password</h3>
            <input
              className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
              placeholder="Password"
              name="password"
              type="password"
              required
            />
            <div className=" pt-1 flex justify-between">
              <button onClick={() => setIsLogin(!isLogin)}>
                {!isLogin ? "Already a member? Login" : "Not a member? Sign-Up"}
              </button>
              <button className=" " type="submit">
                Submit
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
