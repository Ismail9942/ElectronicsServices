import Aos from "aos";
import { useEffect } from "react";

const ServiceHighlight = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <section
      data-aos="zoom-in"
      className="py-12 mb-6 bg-gray-200 text-gray-800 px-4 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-8 shadow border border-gray-400"
    >
      {/* Left Side */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold text-gray-800 leading-snug">
          It’s Our <span className="text-orange-500">Honour,</span> <br />
          To Be <span className="text-blue-700">With You</span>
        </h2>
        <p className="text-gray-600 mt-4 mb-8">
          There are many variations of passages of electronics repair, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don't look even slightly believable.
        </p>

        {/* Service Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold">Laptop Repair</h4>
            <p className="text-sm text-gray-500">
              Many variations of passages of electronics repair.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Camera Repair</h4>
            <p className="text-sm text-gray-500">
              Many variations of passages of electronics repair.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Desktop Repair</h4>
            <p className="text-sm text-gray-500">
              Many variations of passages of electronics repair.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">iPhone Repair</h4>
            <p className="text-sm text-gray-500">
              Many variations of passages of electronics repair.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="flex-1 relative">
        <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://i.ibb.co.com/v6Rp2R5h/about-03.png"
            alt="Repair Service"
            className="object-cover w-full h-full mix-blend-darken"
            style={{
              clipPath:
                "polygon(20% 0%, 100% 0, 100% 100%, 80% 100%, 60% 80%, 40% 100%, 20% 80%, 0 100%, 0 0)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlight;
