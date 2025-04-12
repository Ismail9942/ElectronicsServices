import React, { useEffect, useState } from "react";
import ErrorToaster from "../../component/ErrorToaster";
import axios from "axios";
import ServiceCard from "../../component/ServiceCard";
import Hero from "../../component/Hero";

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/allServices?search=${search}`
        );
        setServices(data);
      } catch (error) {
        ErrorToaster(error.message);
      }
    };
    fetchAllServices();
  }, [search]);

  const handleReset = () => setSearch("");

  return (
    <>
      <Hero />
      <div className="py-10">
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
            <form>
              <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  name="search"
                  value={search}
                  placeholder="Enter Service Title"
                  aria-label="Enter service Title"
                />

                <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                  Search
                </button>
              </div>
            </form>

            <button
              onClick={handleReset}
              className="btn bg-red-600 hover:bg-red-700 text-white border-none"
            >
              Reset
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-2 lg:grid-cols-3">
            {services?.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
