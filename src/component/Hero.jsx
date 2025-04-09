import React from "react";
import { Typewriter } from "react-simple-typewriter";
import heroImg from "../../public/images/hero.jpg";

const Hero = () => {
  return (
    <div
      referrerPolicy="no-referrer"
      className="hero relative "
      style={{
        height: "80vh",
        backgroundImage: `url(${heroImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/40 bg-opacity-60"></div>
      <div className="hero-content text-white text-center relative z-20">
        <div>
          <p className="text-green-600 font-bold text-lg">
            ★ Welcome To Electronics Service Center
          </p>
          <h1 className="mb-5 md:mb-8 text-5xl md:text-6xl font-bold">
            <Typewriter
              words={["Explore Our Service Center"]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <p className="mb-5 text-lg">
            We offer fast and reliable repair services for all kinds of
            electronic devices — from phones and laptops to home appliances.{" "}
            <br />
            Quality parts, expert care, and customer satisfaction are our top
            priorities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
