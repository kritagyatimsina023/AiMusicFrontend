import HeroSection from "@/pages/HeroSection";
import React from "react";
import FeaturedSection from "../sections/FeaturedSection";
import ChooseUs from "../sections/ChooseUs";
import DataSafety from "@/pages/sections/DataSafety";
import MyReview from "@/pages/sections/review/MyReview";
import AvailableVersions from "./AvailableVersions";

const Home = () => {
  return (
    <main className="h-screen ">
      <HeroSection />
      <AvailableVersions />
      <FeaturedSection />
      <ChooseUs />
      <div className="flex items-center justify-center">
        <DataSafety />
        <MyReview />
      </div>
    </main>
  );
};

export default Home;
