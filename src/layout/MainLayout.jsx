import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../component/Navber";
import "aos/dist/aos.css";
import Footer from "../component/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col container">
      <Toaster position="top-center" reverseOrder={false} />
      <Navber />
      <div className="pt-18 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
