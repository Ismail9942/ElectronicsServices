import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const TheameToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <button
      onClick={toggleTheme}
      className="p-2  dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md"
    >
      {theme === "dark" ? (
        <FaMoon className="text-white text-2xl" />
      ) : (
        <FaSun className="text-black text-2xl" />
      )}
    </button>
  );
};

export default TheameToggle;
