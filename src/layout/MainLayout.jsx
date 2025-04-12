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
      <header className="w-full sticky top-0 z-50">
        <Navber />
      </header>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
