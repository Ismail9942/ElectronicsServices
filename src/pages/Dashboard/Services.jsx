import React, { useEffect, useState } from "react";
import ErrorToaster from "../../component/ErrorToaster";
import axios from "axios";
import ServiceCard from "../../component/ServiceCard";
import Hero from "../../component/Hero";
import Title from "./Title";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/allServices`
      );
      setServices(data);
    } catch (error) {
      ErrorToaster(error.message);
    }
  };
  return (
    <>
      <Hero />

      <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
            <div>
              <select
                name="category"
                id="category"
                className="border p-4 rounded-lg"
              >
                <option value="">Filter By Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            <form>
              <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                  className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  name="search"
                  placeholder="Enter Job Title"
                  aria-label="Enter Job Title"
                />

                <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                  Search
                </button>
              </div>
            </form>
            <div>
              <select
                name="category"
                id="category"
                className="border p-4 rounded-md"
              >
                <option value="">Sort By Deadline</option>
                <option value="dsc">Descending Order</option>
                <option value="asc">Ascending Order</option>
              </select>
            </div>
            <button className="btn">Reset</button>
          </div>
          <div className="w-10/12 max-w-full mx-auto grid grid-cols-1 gap-6 my-8 md:grid-cols-2 lg:grid-cols-3">
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
