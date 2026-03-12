"use client";
// import dynamic from "next/dynamic";
import React from "react";
import Spline from "@splinetool/react-spline";

// const Spline = dynamic(() => import("@splinetool/react-spline"), {
//   ssr: false,
//   loading: () => <div>Loading 3D Scene...</div>,
// });

export default function SplineRobo() {
  return (
    <div className="h-140 w-120 mt-10">
      <Spline scene="https://prod.spline.design/egosUxKJ57IolpLe/scene.splinecode" />
    </div>
  );
}
