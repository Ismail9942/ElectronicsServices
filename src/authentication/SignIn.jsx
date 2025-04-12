import React, { useEffect, useRef, useState } from "react";
import loginLottieData from "../assets/login.json";
import Lottie from "lottie-react";
import Aos from "aos";
import { useAuth } from "../auth/AtuhProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorToaster from "../component/ErrorToaster";
import SuccesToaster from "../component/SuccesToaster";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn, userLogIn, setUser, resetPassword } = useAuth();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  // -------AOS ANIMATION
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Log in user

  const handleLogIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    // Check email & password
    if (!email || !password) {
      ErrorToaster("Please provide a valid email and password.");
      return;
    }

    try {
      const user = await userLogIn(email, password);
      if (user) {
        setUser(user);
        SuccesToaster("Successfully Logged In!");

        // Safe navigation
        location.state ? navigate(location.state) : navigate("/");
      } else {
        throw new Error("User login failed");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      ErrorToaster(error.message || "Login failed. Please try again.");
    }
  };

  // google sign in
  const handleGoogleSubmit = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        SuccesToaster("Successfully logged in with Google!");
        navigate("/");
      }
    } catch (error) {
      ErrorToaster(error.message);
    }
  };

  // forget password
  const forgetPassword = async () => {
    const email = emailRef.current?.value;
    if (!email) {
      ErrorToaster("Enter Your Valided Email!");
      return;
    }
    await resetPassword(email)
      .then(() => SuccesToaster("Password Reset Successfully"))
      .catch((error) => ErrorToaster(error.message));
  };
  return (
    <div
      data-aos="flip-left"
      className="hero min-h-[80vh] w-3/4 mx-auto flex items-center justify-center"
    >
      <div className="hero-content w-full flex-col rounded-xl lg:flex-row-reverse bg-gradient-to-br from-[#808b96 ] via-[#bdc3c7] to-[#abb2b9]">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl text-center mb-4 font-bold">Login now!</h1>

          <Lottie animationData={loginLottieData} />
        </div>
        <div className="card w-full text-black max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogIn} className="card-body text-black gap-4">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                ref={emailRef}
                name="email"
                type="email"
                className="input border-none"
                placeholder="Email"
              />
              <div className=" relative">
                <label className="fieldset-label">Password</label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input border-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 top-5 right-3 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <div onClick={forgetPassword}>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="w-full uppercase bg-gray-800 text-white py-2 rounded-sm hover:bg-gray-600 transition">
                Login
              </button>
            </fieldset>
          </form>
          <button
            onClick={handleGoogleSubmit}
            className="btn w-[87%] mx-auto bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <div className="my-3 text-center">
            <span className="text-black">Don't have an account</span>
            <Link to="/register" className="underline text-violet-700 ml-2">
              Register!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
