"use client";
import React, { useContext } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/moving-border";
import { UserAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import Cookies from "js-cookie";

import { easeInOut, motion } from "motion/react";

const HeroSection = () => {
  const context = useContext(SignInAndSignUpContext);
  const naviagte = useNavigate();
  if (!context) {
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  }
  const { setOpen, setActivate } = context;
  const { user } = UserAuth();
  const handleExplore = () => {
    if (!user) {
      setOpen(true);
      setActivate(true);
    } else {
      naviagte(`/try-now/${Cookies.get("userId")}`);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-auto md:h-[50rem] relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      {/* <GlowFlow /> */}

      <div className="p-4 relative z-10 w-full text-center">
        <motion.h1
          initial={{
            opacity: 0,
            filter: "blur(20px)",
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.02,
            ease: easeInOut,
          }}
          className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500"
        >
          Master the Art of Music
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            filter: "blur(20px)",
          }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.02,
            staggerChildren: 0.07,
            delayChildren: 0.2,
          }}
          className="mt-4 font-normal text-base md:text-lg text-neutral-300/70 max-w-lg mx-auto"
        >
          Bring your lyrics to life with AI-powered music creation. Whether
          you’re exploring new sounds or shaping your unique style, let our
          generator craft the perfect mood and help you elevate your musical
          journey.
        </motion.p>
        <div className="mt-4">
          <Button
            borderRadius="1.75rem"
            onClick={handleExplore}
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <motion.span
              initial={{
                opacity: 0,
                filter: "blur(20px)",
              }}
              whileInView={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
              }}
            >
              Try it Now!
            </motion.span>
          </Button>
        </div>
        <div className="mt-10">{/* <ShinyButton /> */}</div>
      </div>
    </div>
  );
};

export default HeroSection;
