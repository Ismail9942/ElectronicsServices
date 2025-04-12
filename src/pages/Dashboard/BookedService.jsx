import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/AtuhProvider";
import axios from "axios";
import ErrorToaster from "../../component/ErrorToaster";

const BookedService = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);

  // data fetch
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/myBook?email=${user.email}`
        );
        setServices(data);
      } catch (err) {
        ErrorToaster(err.message);
      }
    };
    fetchAllServices();
  }, [user.email]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Working":
        return "bg-teal-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <section className="my-8">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium ">My Book Now</h2>

        <span className="px-3 py-1 text-xs text-white bg-green-500/80 rounded-full ">
          {services.length} Service{services.length > 1 && "s"}
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Photo</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Service Area</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Price Range</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Description
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Edit
                    </th>
                  </tr>
                </thead>

                {/* ganatate dynamic update */}
                {services?.map((service) => (
                  <tbody
                    key={service._id}
                    className="bg-white divide-y divide-gray-200 "
                  >
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        <img
                          src={service?.photoURL}
                          alt={service?.title}
                          className="w-16 h-16  rounded-md"
                        />
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service?.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service?.service_area}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        ${service?.price}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        <span
                          className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusBadgeColor(
                            service?.status
                          )}`}
                        >
                          {service.status}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service.description?.substring(0, 15)}...
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookedService;
