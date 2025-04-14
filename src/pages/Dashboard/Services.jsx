import React, { useEffect, useState } from "react";
import ErrorToaster from "../../component/ErrorToaster";
import axios from "axios";
import ServiceCard from "../../component/ServiceCard";
import Hero from "../../component/Hero";

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/allServices`,
          {
            params: { search },
          }
        );
        setServices(data);
      } catch (error) {
        ErrorToaster(error.message);
      } finally {
        setLoading(false);
      }
    };

    const timerId = setTimeout(() => {
      if (search !== "") {
        fetchData();
      } else {
        // যদি সার্চ খালি হয়, সব সার্ভিস দেখাবে
        fetchData();
      }
    }, 500); // 500ms ডিবাউন্স

    return () => clearTimeout(timerId);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    // সার্চ ভ্যালু ইতিমধ্যে স্টেটে আছে, ইফেক্ট অটো কল হবে
  };

  const handleReset = () => {
    setSearch("");
  };

  return (
    <>
      <Hero />
      <div className="py-10">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none"
                type="text"
                name="search"
                value={search}
                placeholder="Enter Service Title"
                aria-label="Enter service Title"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Search
              </button>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 text-sm font-medium text-white bg-red-600  hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center my-8">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center my-8">No services found</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Services;
