import React from "react";
import { FaRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" rounded-2xl flex items-center justify-center gap-6 flex-col">
        <h1 className="text-[#e26d2f] text-9xl font-black text-center">404</h1>
        <h2 className="text-xl font-black">PAGE NOT BE FOUND</h2>
        <p className="w-[70%] text-center">
          Sorry but the page you are looking for does not exist, have been
          removed, name changed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="btn bg-[#e26d2f] hover:bg-[#e2622f] uppercase flex gap-3 rounded-3xl py-6 px-8 text-white"
        >
          <span>Go To Home Page</span> <FaRightLong />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
