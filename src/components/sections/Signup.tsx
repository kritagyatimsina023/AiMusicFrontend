"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth } from "../app/firebase/config";
import { IoMdEyeOff } from "react-icons/io";

// import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
// import api from "@/utils/api";
// import { auth } from "@/firebase/config";
// import defaultPic from "@/public/photos/avatar.jpg";
import gsap from "gsap";
// import Cookies from "js-cookie";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import { toast } from "react-toastify";
// import api from "../../../utils/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useSignInStore } from "@/store/useSignInStore";

export function Signup() {
  const navigate = useNavigate();
  const signUpRef = useRef<HTMLDivElement | null>(null);

  // animate on mount
  useEffect(() => {
    const el = signUpRef.current;
    if (!el) return;

    // initial state (optional if CSS already sets it)
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
  //   const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const { emailSignUp } = useAuthStore();
  const [password, setPassword] = useState<string>("");
  const context = useContext(SignInAndSignUpContext);
  if (!context) {
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  }
  // const {
  //   open,
  //   setOpen,
  //   activate,
  //   setActivate,
  //   showPassword,
  //   setShowPassword,
  // } = context;
  // const [createUserWithEmailandPassword] =
  //   useCreateUserWithEmailAndPassword(auth);
  const {
    open,
    setOpen,
    // activate,
    setActivate,
    showPassword,
    setShowPassword,
  } = useSignInStore();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   try {
  //     e.preventDefault();
  //     const res = await createUserWithEmailandPassword(email, password);
  //     const firebaseUser = res?.user;
  //     console.log("Signup firebase", firebaseUser);
  //     if (!res) {
  //       toast.error(`${email} already registered`);
  //       setEmail("");
  //       setPassword("");
  //       return;
  //     }
  //     if (!email && !password) {
  //       toast.error("Enter email and password");
  //       return;
  //     }
  //     const resUser = await api.post("/users/create-user", {
  //       name: firebaseUser?.email?.split("@")[0],
  //       email: firebaseUser?.email,
  //       photoUrl: "@/public/photos/avatar.jpg",
  //     });
  //     // console.log("From signup", resUser.data.__id);
  //     Cookies.set("userId", resUser.data.user._id, { expires: 7 });
  //     if (!resUser) {
  //       toast.error("Failed storing user into db");
  //     }
  //     navigate("/");
  //     setOpen(!open);
  //     setActivate(!activate);
  //     toast.success("Registered successfully");
  //     setEmail("");
  //     setPassword("");
  //   } catch (error) {
  //     toast.error("Failed");
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // this is good one
    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }
    try {
      await emailSignUp(email, password); // ← call Zustand store function
      setOpen(false);
      setActivate(false);
      setEmail("");
      setPassword("");
      navigate("/"); // optional redirect
    } catch (error) {
      console.error(error);
      toast.error("Signup failed");
    }
  };

  return (
    <div
      ref={signUpRef}
      className="shadow-input  sign-in-compo mx-auto w-[40rem] max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black"
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
          Sign up &rarr;
          <BottomGradient />
        </button>
        <div className="flex items-center gap-3 pt-4">
          <span
            className="cursor-pointer text-blue-400 underline"
            onClick={() => setOpen(!open)}
          >
            Return
          </span>
        </div>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
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
