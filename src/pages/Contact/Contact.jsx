import Aos from "aos";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <section
      data-aos="zoom-in"
      className="border bg-gray-200 text-gray-800 border-gray-400 mb-6 py-16 px-4 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Contant <span className="text-orange-500">Me</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you. Please fill out the form below.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Subject */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Message */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
