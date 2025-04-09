import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { title, provider, price, service_area, photoURL, description } =
    service || {};
  return (
    <div className="card rounded-none bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          className="w-full border-2 border-[#e26d2f]"
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
        <h2 className="card-title">Name: {title}</h2>
        <p>
          {" "}
          <span className="font-bold">Area:</span> {service_area}
        </p>
        <p className="font-bold">
          Price:
          <span className="font-bold bg-green-300 px-4  rounded-3xl">
            ${price}
          </span>
        </p>
        <p className=" text-sm text-gray-600 ">
          <span className="font-bold">Description:</span>{" "}
          {(description && description.substring(0, 70)) ||
            "Not Availeable Description"}
          ...
        </p>
        <div className="card-actions ">
          <Link className="btn bg-gray-900 text-white w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
