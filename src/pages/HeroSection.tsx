"use client";
import React, { useContext } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/moving-border";
import { UserAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import Cookies from "js-cookie";
import { easeInOut, motion } from "motion/react";
import { useSignInStore } from "@/store/useSignInStore";

const HeroSection = () => {
  const context = useContext(SignInAndSignUpContext);
  const naviagte = useNavigate();
  if (!context) {
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  }
  const { setOpen, setActivate } = useSignInStore();
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
      {/* Spotify-style font: Plus Jakarta Sans (closest free alternative to Circular) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');
      `}</style>

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="p-4 relative z-10 w-full text-center">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(20px)", y: 10 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.02, ease: easeInOut }}
          className="mt-20 md:mt-0 text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
          }}
        >
          Master the Art{" "}
          <span
            style={{
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
            }}
          >
            of Music
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.02, delayChildren: 0.2 }}
          className="mt-5 text-neutral-300/60 max-w-lg mx-auto leading-relaxed"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 300,
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
          }}
        >
          Bring your lyrics to life with AI-powered music creation. Whether
          you're exploring new sounds or shaping your unique style, let our
          generator craft the perfect mood and help you elevate your musical
          journey.
        </motion.p>

        <div className="mt-6">
          <Button
            borderRadius="1.75rem"
            onClick={handleExplore}
            className="bg-white cursor-pointer dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <motion.span
              initial={{ opacity: 0, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Try it Now →
            </motion.span>
          </Button>
        </div>

        <div className="mt-10">{/* <ShinyButton /> */}</div>
      </div>
    </div>
  );
};

export default HeroSection;
