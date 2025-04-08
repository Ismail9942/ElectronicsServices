import React from "react";
import toast from "react-hot-toast";
import { Bounce } from "react-toastify";

const SuccesToaster = (message) => {
  toast.success(`${message}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export default SuccesToaster;
