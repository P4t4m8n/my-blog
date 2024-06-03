"use client";

import { useAuth } from "@/components/contexts/AuthContext/AuthContext";
import { useModal } from "@/components/hooks/useModal";
import { UserModel } from "@/models/user.model";
import { getEmptyUser } from "@/service/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function LoginModel() {
  const [isLogin, setIsLogin] = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [model, setModel] = useModal(modelRef, router.back);
  const { login, register } = useAuth();
  const searchParams = useSearchParams();

  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams.get("showDialog");
  console.log("showModal:", showModal);
  const _isLogin = searchParams.has("login");

  useEffect(() => {
    if (showModal && showModal === "y") {
      setModel(true);
      setIsLogin(_isLogin);
    }
  }, [showModal, _isLogin]);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log("ev:", ev);
    const formData = new FormData(ev.currentTarget);

    try {
      if (isLogin) login(formData);
      else register(formData);
    } catch (error: any) {
      alert(error.message);
    }
  };

 

  return (
    <>
      {model && (
        <section
          ref={modelRef}
          className="model  flex  z-30 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  fixed min-h-screen-minus-sticky rounded p-4 items-center bg-customDark font-workSans"
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
