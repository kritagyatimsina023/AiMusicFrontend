import React, { useRef, useState } from "react";
import GenreDropDown from "./GenreDropDown";
import InstrumentsDropDown from "./InstrumentsDropDown";
import KeyDropDown from "./KeyDropDown";
import TempoDropDown from "./TempoDropDown";
import { motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface DataType {
  data: {
    title: string;
    inner: string[];
  };
}

const InputDropDown: React.FC<DataType> = ({ data }) => {
  const dropref = useRef<HTMLDivElement | null>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!dropref.current) return;
    if (drop) {
      gsap.fromTo(
        dropref.current,
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          ease: "power2.out",
        }
      );
      gsap.to(containerRef.current, {
        height: "20rem",
        duration: 1.15,
      });
    } else {
      gsap.to(dropref.current, {
        opacity: 0,
        y: -20,
        duration: 1.25,
        ease: "power2.in",
      });
      gsap.to(containerRef.current, {
        height: "8rem",
        duration: 1.25,
        delay: 1.3,
      });
    }
  }, [drop]);
  return (
    <div ref={containerRef} className=".div">
      <motion.button
        type="button"
        onClick={() => setDrop(!drop)}
        initial={{ "--x": "100%" }}
        animate={{ "--x": "-100%" }}
        whileTap={{ scale: 0.97 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0.5,
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
          scale: {
            type: "spring",
            stiffness: 10,
            damping: 5,
            mass: 0.1,
          },
        }}
        className="px-6 py-2 cursor-pointer rounded-md relative radial-gradient"
      >
        <span className="text-neutral-100  tracking-wide font-light h-full w-full relative inline-flex items-center gap-4 linear-mask">
          {data.title} {drop ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
        <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
      </motion.button>

      <div
        ref={dropref}
        className={`text-center opacity-0  border-1 border-white/40  rounded-2xl mt-3`}
      >
        {data.title === "Genre" && <GenreDropDown data={data} />}
        {data.title === "Instruments" && <InstrumentsDropDown data={data} />}
        {data.title === "Key" && <KeyDropDown data={data} />}
        {data.title === "Tempo" && <TempoDropDown data={data} />}
      </div>
    </div>
  );
};

export default InputDropDown;
