"use client";
import React, { useEffect, useRef, useState } from "react";
import SplineRobo from "@/components/sections/SplineScence";
import { TextReavealSection } from "@/components/sections/TextReavealSection";
import PromptOutputSection from "../ClientPrompt/PromptOutputSection";
import TextAreaPrompt from "../ClientPrompt/TextAreaPrompt";
import ReviewSection from "../review/ReviewSection";
import SideBarPrompt from "@/components/sections/SideBarPrompt";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowBigRight } from "lucide-react";
import { TooltipProvider } from "../../../components/ui/tooltip";
import gsap from "gsap";
import MusicInfoCard from "./MusicInfoCard";

const SideBarPromptArea = () => {
  const [sideBarOpenbtn, setsideBarOpenbtn] = useState<boolean>(true);
  const [showMusicInfo, setShowMusicInfo] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const seenStatus = sessionStorage.getItem("music-info-seen");
    // show only if user has NOT seen it yet
    if (seenStatus === "false") {
      setShowMusicInfo(true);
    }
  }, []);

  useEffect(() => {
    if (!navbarRef.current) return;

    let lastScrollY = 0;
    const navbarHeight = navbarRef.current.offsetHeight;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
        gsap.to(navbarRef.current, {
          y: -navbarHeight,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(navbarRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMusicInfo = () => {
    setShowMusicInfo(false);
    sessionStorage.setItem("music-info-seen", "true");
  };

  return (
    <div className="h-screen w-screen flex relative overflow-y-hidden">
      {showMusicInfo && <MusicInfoCard onClose={handleCloseMusicInfo} />}

      <img
        src="/photos/gradient.png"
        className="absolute top-0 right-0 opacity-60 -z-1"
        alt=""
      />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_10px_#e99b63] -rotate-[30deg]"></div>

      <TooltipProvider>
        <div
          onClick={() => {
            setsideBarOpenbtn(!sideBarOpenbtn);
          }}
          className="fixed p-4 top-3 left-4 z-40"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ArrowBigRight />
            </TooltipTrigger>
            <TooltipContent className=" bg-white/40 ease-in 0.2s rounded-md shadow-md px-3 py-2 text-white/80 ">
              <p>Open Side bar</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div
          className={`${sideBarOpenbtn ? "w-[25%]" : "w-0"} scroll-area overflow-y-auto`}
        >
          <SideBarPrompt
            sideBarOpenbtn={sideBarOpenbtn}
            setsideBarOpenbtn={setsideBarOpenbtn}
          />
        </div>

        <div
          ref={scrollContainerRef}
          className={`${sideBarOpenbtn ? "w-[75%]" : "w-full"} scroll-area overflow-y-auto`}
        >
          <div className="flex flex-row-reverse items-center">
            <div className="w-full relative flex justify-center ">
              <SplineRobo />
            </div>
            <div className="w-full">
              <TextReavealSection />
            </div>
          </div>

          <div className="my-10 flex justify-center">
            <PromptOutputSection />
          </div>

          <div className="mt-10">
            <TextAreaPrompt />
          </div>

          <div className="mt-10 flex justify-center">
            <ReviewSection />
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default SideBarPromptArea;
