import Home from "@/components/layout/Home";

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import SideBarPromptArea from "@/pages/sections/PromptSlide/SideBarPromptArea";
import TechStack from "@/pages/sections/infoSections/TechStack";
// import Developer from "@/pages/sections/infoSections/Developer";
import Background from "@/pages/sections/infoSections/Background";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/try-now/:id"
          element={
            <ProtectedRoute>
              <SideBarPromptArea />
            </ProtectedRoute>
          }
        />
        <Route path="/techStack" element={<TechStack />} />
        {/* <Route path="/developer" element={<Developer />} /> */}
        <Route path="/background" element={<Background />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
