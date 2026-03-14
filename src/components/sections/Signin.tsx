"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase/config";
// import { toast } from "react-toastify";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

import gsap from "gsap";
// import Cookies from "js-cookie";
import { IconBrandGoogle } from "@tabler/icons-react";
// import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
// import { UserAuth } from "@/context/AuthContext";
// import api from "../../../utils/api";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import { useSignInStore } from "@/store/useSignInStore";
// import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
// import { UserAuth } from "@/context/AuthContext";
// import { UserCredential } from "firebase/auth";
// import api from "@/utils/api";

export function Signin() {
  // const context = useContext(SignInAndSignUpContext);
  // if (!context) {
  //   throw new Error("Navbar must be used within SignInAndSignUpProvider");
  // }
  // const {
  //   open,
  //   setOpen,
  //   activate,
  //   setActivate,
  //   showPassword,
  //   setShowPassword,
  //   // setUserUid,
  // } = context;
  // const [sigInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { googleSignIn, emailSignIn } = useAuthStore();
  const {
    open,
    setOpen,
    activate,
    setActivate,
    showPassword,
    setShowPassword,
  } = useSignInStore();

  // const { setUser, googleSignIn } = UserAuth();
  const signInRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = signInRef.current;
    if (!el) return;

    gsap.set(el, { y: 200, rotate: 20, opacity: 0 });

    const tl = gsap.timeline();
    tl.to(el, {
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    });

    return () => {
      gsap.killTweensOf(el);
    };
  }, []);

  const clearFields = function () {
    setEmail("");
    setPassword("");
  };

  // const handleSignin = async () => {
  //   try {
  //     const result = await googleSignIn();
  //     const firebaseUser = result.user;
  //     if (result && firebaseUser) {
  //       const res = await api.post("/users/create-user", {
  //         name: firebaseUser?.displayName || firebaseUser?.email?.split("@")[0],
  //         email: firebaseUser?.email,
  //         photoUrl: firebaseUser?.photoURL,
  //       });
  //       setUserUid(res.data.user._id);
  //       Cookies.set("userId", res.data.user._id, { expires: 7 });
  //       toast.success(`Welcome ${result?.user?.displayName}`);
  //       if (!res) {
  //         toast.error("Failed storing user data");
  //         return;
  //       }
  //       setActivate(!activate);
  //       setOpen(!open);
  //     }
  //   } catch (error: any) {
  //     if (
  //       error.code === "auth/cancelled-popup-request" ||
  //       error.code === "auth/popup-closed-by-user"
  //     ) {
  //       console.log("User closed the popup, no action needed");
  //     } else {
  //       // console.error("Sign-in error:", error);
  //     }
  //     // console.error(error);
  //   }
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await sigInWithEmailAndPassword(email, password);
  //     const firebaseUser = response?.user;
  //     if (!firebaseUser) {
  //       toast.error("Incorrect email or password");
  //       clearFields();
  //       return;
  //     }
  //     const res = await api.post("/users/create-user", {
  //       name: firebaseUser?.displayName || firebaseUser?.email?.split("@")[0],
  //       email: firebaseUser?.email,
  //       photoUrl: firebaseUser?.photoURL,
  //     });
  //     Cookies.set("userId", res.data.user._id, { expires: 7 });
  //     setUserUid(res.data.user._id);
  //     setUser(firebaseUser);
  //     // toast.success("Stored in db");
  //     setOpen(!open);
  //     setActivate(!activate);
  //     toast.success(`Logged in as ${firebaseUser.email}`);
  //     clearFields();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    try {
      await emailSignIn(email, password);
      setOpen(false);
      setActivate(false);
      clearFields();
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };
  return (
    <div
      ref={signInRef}
      className="shadow-input relative sign-in-compo  mx-auto w-[40rem] max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black"
    >
      <img
        src="/photos/gradient.png"
        className="absolute top-0 right-0 opacity-60 -z-1"
        alt=""
      />
      <div className="h-0 w-[14rem] absolute top-[10%] right-[-5%] shadow-[0_0_900px_15px_#e99b63] "></div>
      <div className="h-0 w-[14rem] absolute top-[10%] left-[-5%] shadow-[0_0_900px_15px_#e99b63] "></div>

      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Music Generator
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to use this Music Generator Feature
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div> */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="User@gmail.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 ">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="••••••••"
              type={`${showPassword ? "text" : "password"}`}
              required
            />
            {showPassword ? (
              <IoEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3"
              />
            ) : (
              <IoMdEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3"
              />
            )}
          </div>
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
        <div className="flex items-center justify-center gap-1 text-center p-1 mt-5 ">
          <p className="text-center">Not a member?</p>
          <span
            onClick={() => setOpen(!open)}
            className="text-blue-400 underline cursor-pointer"
          >
            SignUp now
          </span>
        </div>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            onClick={async () => {
              await googleSignIn();
              setOpen(!open);
              setActivate(!activate);
            }}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
