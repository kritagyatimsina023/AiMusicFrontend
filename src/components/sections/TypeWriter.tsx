"use client";
import Typewriter from "typewriter-effect";
// import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

const TypeWriter = () => {
  //   const words = [
  //     {
  //       text: "Hover",
  //     },
  //     {
  //       text: "Over",
  //     },
  //     {
  //       text: "The",
  //     },
  //     {
  //       text: "Card",
  //     },
  //   ];
  return (
    <div>
      {/* <TypewriterEffectSmooth className="text-[0.783em]" words={words} /> */}
      <Typewriter
        options={{
          strings: "Hover Over The Card",
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
};

export default TypeWriter;
