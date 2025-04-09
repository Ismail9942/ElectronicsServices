import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import axios from "axios";
import ErrorToaster from "../../component/ErrorToaster";
import ServiceCard from "../../component/ServiceCard";
import Title from "../Dashboard/Title";

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/services`
      );
      setServices(data);
    } catch (error) {
      ErrorToaster(error.message);
    }
  };
  return (
    <div>
      <Banner />
      <Title />
      <div className="w-10/12 max-w-full mx-auto grid grid-cols-1 gap-6 my-8 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Home;
