import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("/slider.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((error) => console.error("Error loading slides:", error));
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, EffectFade]}
      navigation={true}
      pagination={{ clickable: true }}
      effect="fade"
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      className="w-full h-[80vh]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="relative">
          <img
            className="w-full h-full object-cover"
            src={slide.image}
            alt={slide.title}
          />
          <div className="absolute inset-0 bg-[#0000004d]"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            {/* Text Content */}
            <h1 className="text-3xl md:text-5xl font-bold uppercase animate-fadeInUp">
              {slide.title}
            </h1>
            <p className="mt-3 text-center text-lg md:text-xl animate-fadeInUp">
              {slide.subtitle}
            </p>
            <Link
              to="/"
              className="mt-5 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold  transition-all duration-300 animate-fadeInUp"
            >
              Explore Now
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
