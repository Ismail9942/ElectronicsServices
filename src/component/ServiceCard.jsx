import Aos from "aos";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const {
    category,
    provider,
    price,
    service_area,
    photoURL,
    description,
    _id,
  } = service || {};

  return (
    <div
      data-aos="zoom-in-up"
      className="card rounded-none bg-base-200 text-black shadow-2xl"
    >
      <figure>
        <img
          className="w-full h-[300px] border-2 border-[#e26d2f] object-cover transition-all duration-300 ease-linear   hover:rotate-2 group-hover:scale-105"
          src={photoURL}
          alt=""
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <img
            className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring ring-offset-2"
            src={provider?.photo}
          />
          <h4 className="font-bold">
            Provider: <span className="font-bold">{provider?.name}</span>
          </h4>
        </div>
        <div className="border-t"></div>
        <h2 className="card-title">
          Name : <span className="ml-3">{category}</span>
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
        <p className=" text-sm text-gray-600 ">
          <span className="font-bold">Description:</span>{" "}
          {(description && description.substring(0, 35)) ||
            "Not Availeable Description"}
          ...
        </p>
        <div className="card-actions ">
          <Link
            to={`/services/${service._id}`}
            className="btn bg-gray-900 text-white w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
