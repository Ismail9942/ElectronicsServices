import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaHeart,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { FaScrewdriverWrench } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="relative bg-[#5d6d7e] text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex justify-start items-center">
              <h3 className="font_header text-2xl font-bold flex gap-4 ">
                <FaScrewdriverWrench className="w-8 h-8 text-[#e7000b] bg-white hover:bg-gray-200 border border-e-red-600 p-2 rounded-full" />
                <span className="font-bold">Electronics Services</span>
              </h3>
            </div>
            <div className="border-t py-3"></div>
            <p className="text-sm leading-relaxed">
              Expert electronics services for home and office devices with
              guaranteed satisfaction.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "All Reviews", "Login"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:text-black transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-white" />
                <span className="text-sm">Gzipur, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-white" />
                <span className="text-sm">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-white" />
                <span className="text-sm">info@chillgamer.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-sm">
              Subscribe to get special offers and updates!
            </p>
            <div className="">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 focus:outline-none focus:border-none w-full text-gray-500"
              />
              <div className="border-t py-3"></div>
              <button className="bg-red-500 hover:bg-red-600 text-white w-1/2 px-4 py-2 transition-colors duration-300">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          {[
            { icon: FaGithub, link: "https://github.com/Ismail9942" },
            {
              icon: FaLinkedin,
              link: "https://www.linkedin.com/in/md-mostafizur-rahman-78bb511a4/",
            },
            { icon: FaTwitter, link: "https://x.com/home" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              className="transform hover:scale-110 transition-transform duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm flex items-center justify-center gap-1">
            Made with <FaHeart className="text-red-500" /> by Movie Review Team
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
