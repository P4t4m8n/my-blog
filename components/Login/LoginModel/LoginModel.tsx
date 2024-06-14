"use client";

import { useModal } from "@/hooks/useModal";
import { DictionaryModel } from "@/models/dictionary.model";
import { useAuthStore } from "@/store/auth.store";
import { FormEvent, useRef, useState } from "react";

interface Props {
  dict: DictionaryModel;
}

export default function LoginModel({ dict }: Props) {
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
      <button onClick={() => setModel(true)} suppressHydrationWarning>
        {dict.navigation.login}
      </button>
      {model && (
        <section
          suppressHydrationWarning
          ref={modelRef}
          className="model background-theme flex z-30 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  fixed min-h-screen-minus-sticky rounded p-4 items-center bg-customDark font-workSans"
        >
          <form
            className="flex flex-col gap-2 h-[65vh] max-w-[30rem] bg-customLight rounded-lg p-8  "
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <>
                <h3 className=" text-sm font-semibold">
                  {dict.form.first_Name}
                </h3>
                <input
                  className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
                  placeholder={dict.form.first_Name}
                  name="firstName"
                  type="text"
                  required
                />
                <h3 className=" text-sm font-semibold">
                  {dict.form.last_Name}
                </h3>
                <input
                  className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
                  placeholder="Enter your Last name"
                  name="lastName"
                  type="text"
                  required
                />
                <h3 className=" text-sm font-semibold">{dict.form.username}</h3>
                <input
                  className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
                  placeholder={dict.form.username}
                  name="username"
                  type="text"
                  required
                />
              </>
            )}
            <h3 className=" text-sm font-semibold">{dict.form.email}</h3>
            <input
              className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
              placeholder={dict.form.email}
              name="email"
              type="email"
              required
            />
            <h3 className=" text-sm font-semibold">{dict.form.password}</h3>
            <input
              className="min-w-[20rem] bg-customLight text-customDark pl-4 py-2 rounded-lg border-2 border-cyan-200 focus:border-cyan-400 border-solid "
              placeholder={dict.form.password}
              name="password"
              type="password"
              required
            />
            <div className=" pt-1 flex justify-between">
              <button onClick={() => setIsLogin(!isLogin)}>
                {!isLogin ? "Already a member? Login" : "Not a member? Sign-Up"}
              </button>
              <button className=" " type="submit">
                {dict.form.submit}
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
