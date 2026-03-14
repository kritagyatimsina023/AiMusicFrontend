"use client";
import Typewriter from "typewriter-effect";

const TypeWriter = () => {
  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
    >
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
