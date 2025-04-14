import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Aos from "aos";
import Lottie from "lottie-react";
import LottieRegister from "../assets/register.json";
import ErrorToaster from "../component/ErrorToaster";
import SuccesToaster from "../component/SuccesToaster";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import UseAuth from "../auth/UseAuth";

const Register = () => {
  const { googleSignIn, userRegister, setUser } = UseAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // -------AOS ANIMATION
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // google sign in
  const handleGoogleSubmit = async () => {
    try {
      googleSignIn();
      SuccesToaster("Successfully created!");
      navigate("/");
    } catch (error) {
      ErrorToaster(error.message);
    }
  };

  // password validation
  const handlePasswordValidation = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      ErrorToaster(
        "Password must have 1 uppercase, 1 lowercase, 1 number & 6+ characters."
      );
      return false;
    } else {
      return true;
    }
  };

  // USER SIGN IN
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    const userData = {
      username,
      email,
      password,
      photo,
    };

    if (!handlePasswordValidation(userData.password)) {
      return;
    }
    try {
      const result = await userRegister(
        userData.email,
        userData.password,
        userData.username,
        userData.photo
      );
      setUser(result);
      SuccesToaster("Successfully Registered!");
      form.reset();
      navigate("/");
    } catch (error) {
      if (error?.code === "auth/email-already-in-use") {
        ErrorToaster("This email is already registered!");
      } else {
        ErrorToaster(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center my-6">
      <div
        data-aos="flip-up"
        className=" w-3/4 min-h-[70vh] lg:flex justify-center items-center rounded-xl bg-gradient-to-br from-[#808b96 ] via-[#bdc3c7] to-[#abb2b9]"
      >
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block">Username</label>
              <input
                type="text"
                name="username"
                autoComplete="username"
                className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
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

            <div className="mb-4">
              <label className="block">Photo URL</label>
              <input
                type="url"
                name="photo"
                autoComplete="on"
                className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full uppercase bg-gray-800 text-white py-2 rounded-sm hover:bg-gray-600 transition"
            >
              Register
            </button>
          </form>
          <button
            onClick={handleGoogleSubmit}
            className="btn w-full my-6 bg-white text-black border-[#e5e5e5]"
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
            <span>Alrady account</span>
            <Link to="/login" className="underline text-violet-800 ml-2">
              Sign In!
            </Link>
          </div>
        </div>
        <div className="w-96">
          <Lottie animationData={LottieRegister} />
        </div>
      </div>
    </div>
  );
};

export default Register;
