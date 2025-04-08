import React from "react";
import toast from "react-hot-toast";
import { Bounce } from "react-toastify";

const ErrorToaster = (message) => {
  toast.error(`${message}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

export default ErrorToaster;
