import HeroSection from "@/pages/HeroSection";
import React from "react";
import FeaturedSection from "../sections/FeaturedSection";
import ChooseUs from "../sections/ChooseUs";
import DataSafety from "@/pages/sections/DataSafety";
import MyReview from "@/pages/sections/review/MyReview";
import AvailableVersions from "./AvailableVersions";
import Navbar from "../sections/Navbar";

const Home = () => {
  return (
    <main className="h-screen ">
      <div className="w-full relative flex items-center justify-center">
        <Navbar />
      </div>
      <HeroSection />
      <AvailableVersions />
      <FeaturedSection />
      <ChooseUs />
      <div className="flex items-center justify-center relative max-w-7xl mx-auto">
        <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-gradient-to-r from-[#1DB954]/20 to-[#1DB954]/10 rounded-full blur-3xl" />
        <div className="absolute top-[20%] left-[-5%] w-96 h-96 bg-gradient-to-r from-[#9333EA]/15 to-[#7C3AED]/5 rounded-full blur-3xl" />
        <DataSafety />
        <MyReview />
      </div>
    </main>
  );
};

export default Home;
