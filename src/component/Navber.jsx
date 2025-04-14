import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import TheameToggle from "../auth/TheameToggle";
import { FaCircleChevronDown, FaScrewdriverWrench } from "react-icons/fa6";
import Profile from "./Profile";
import UseAuth from "../auth/UseAuth";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UseAuth();

  return (
    <nav className="shadow-md py-4 bg-[#34495ecc] text-white">
      <div className="flex justify-between items-center gap-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center pl-4 gap-2">
          <FaScrewdriverWrench className="w-10 h-10 text-[#e7000b] bg-white hover:bg-gray-200 border border-e-red-600 p-2 rounded-full" />
          <span className="font-bold">Electronics Services</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li className="">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-600 text-white font-semibold hover:bg-red-700/80 px-8 py-2 rounded-sm border-none hover:bg-gradient-to-l transition-all duration-300 ease-in-out"
                  : "hover:text-gray-300 px-8"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-600 text-white font-semibold hover:bg-red-700/80 p-8 py-2 rounded-sm border-none hover:bg-gradient-to-l transition-all duration-300 ease-in-out"
                  : "hover:text-gray-300 px-8"
              }
            >
              Services
            </NavLink>
          </li>
          {/* Services all page */}

          {user && (
            <li className="relative group">
              <Link className="flex gap-3 items-center justify-center">
                <span>Dashboard </span> <FaCircleChevronDown />
              </Link>

              {/* Dropdown content - shown on hover */}
              <div className="absolute group-content top-full left-0 bg-[#34495ecc] w-40 p-2z-10 shadow-lg">
                {/* add services */}
                <NavLink
                  to="/addService"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-red-600 hover:bg-red-700 px-3 py-2 text-white"
                      : " hover:text-gray-300 px-3 py-2"
                  }
                >
                  Add Service
                </NavLink>

                {/* Manage Service */}
                <NavLink
                  to="/manageService"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-red-600 hover:bg-red-700 px-3 py-2 shadow text-white"
                      : " hover:text-gray-300 px-3 py-2"
                  }
                >
                  Manage Service
                </NavLink>
                {/*  Booked-Services */}
                <NavLink
                  to="/bookedService"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-red-600 hover:bg-red-700 px-3 py-2 shadow text-white"
                      : " hover:text-gray-300 px-3 py-2"
                  }
                >
                  Booked-Services
                </NavLink>
                {/* Service-To-Do */}
                <NavLink
                  to="/serviceToDo"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-red-600 hover:bg-red-700 px-3 py-2 shadow text-white"
                      : " hover:text-gray-300 px-3 py-2"
                  }
                >
                  Service-To-Do
                </NavLink>
              </div>
            </li>
          )}
        </ul>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <TheameToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <Profile />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-blue-700 text-white p-4 space-y-3 text-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-sm md:btn-md mr-2 bg-[#e7000b] hover:bg-red-700 text-white font-bold hover:bg-gradient-to-l transition-all duration-300 border-none"
                  : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-600 text-white font-semibold hover:bg-red-700/80 p-8 py-2 rounded-sm border-none hover:bg-gradient-to-l transition-all duration-300 ease-in-out"
                  : "hover:text-gray-300 px-8"
              }
            >
              Services
            </NavLink>
          </li>
          {/* Services all page */}

          {user && (
            <li className="relative group">
              <Link className="flex gap-3 items-center justify-center">
                <span>Dashboard </span> <FaCircleChevronDown />
              </Link>

              {/* Dropdown content - shown on hover */}
              <div className="absolute group-content top-full left-0 bg-[#34495ecc] w-40 p-2z-10 shadow-lg">
                {/* add services */}
                <NavLink
                  to="/addService"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-red-600 hover:bg-red-700 px-3 py-2 text-white"
                      : " hover:text-gray-300 px-3 py-2"
                  }
                >
                  Add Service
                </NavLink>

                {/* Manage Service */}
                <NavLink
                  to="/manageService"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-red-600 hover:bg-red-700 px-3 py-2 shadow text-white"
                      : " hover:text-gray-300 px-3 py-2"
                  }
                >
                  Manage Service
                </NavLink>
                {/*  Booked-Services */}
                <NavLink
                  to="/bookedService"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-red-600 hover:bg-red-700 px-3 py-2 shadow text-white"
                      : " hover:text-gray-300 px-3 py-2"
                  }
                >
                  Booked-Services
                </NavLink>
                {/* Service-To-Do */}
                <NavLink
                  to="/serviceToDo"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-red-600 hover:bg-red-700 px-3 py-2 shadow text-white"
                      : " hover:text-gray-300 px-3 py-2"
                  }
                >
                  Service-To-Do
                </NavLink>
              </div>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default CustomNavbar;
