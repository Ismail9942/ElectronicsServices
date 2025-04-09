import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import ErrorToaster from "../../component/ErrorToaster";

const SingleService = () => {
  const [service, setService] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/services/${id}`
        );
        setService(res.data);
      } catch (error) {
        ErrorToaster(error.message);
      }
    };
    fetchServiceData();
  }, [id]);

  const { title, provider, price, service_area, photoURL, description, _id } =
    service || {};

  return (
    <div className="w-full md:max-w-8/12  mx-auto my-8">
      <div className="card flex-col md:flex-row card-side bg-base-200 text-black/50 shadow-sm shadow-amber-800 lg:h-[450px]">
        <figure>
          <img className="object-cover" src={photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <div className="">
            <h4 className="font-semibold text-base mb-4">
              Provider: <span className="font-bold">{provider?.name}</span>
            </h4>
            <img
              className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring ring-offset-2"
              src={provider?.photo}
            />
          </div>
          <div className="border-t my-4"></div>
          <h2 className="card-title">
            Name : <span className="ml-3">{title}</span>
          </h2>
          <p>
            <span className="font-semibold text-base">Area :</span>
            <span className="ml-3">{service_area}</span>
          </p>
          <p className="font-semibold text-base">
            Price :
            <span className="font-bold bg-green-300 w-28 ml-3 px-2 text-black/80 rounded-3xl">
              ${price}
            </span>
          </p>
          <p className="text-gray-500 ">
            <span className="font-semibold text-base">Description:</span>{" "}
            {description && description}
          </p>

          <div className="card-actions">
            <button className="btn bg-orange-700 hover:bg-gray-800 text-white/90 shadow-sm shadow-red-700 w-full mx-auto rounded-3xl">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleService;
