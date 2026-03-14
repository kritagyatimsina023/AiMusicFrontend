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
      <DataSafety />
      <MyReview />
    </main>
  );
};

export default Home;
