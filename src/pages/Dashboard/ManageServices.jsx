import axios from "axios";
import React, { useState, useEffect } from "react";
import ErrorToaster from "../../component/ErrorToaster";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UseAuth from "../../auth/UseAuth";

const ManageServices = () => {
  const { user } = UseAuth();
  const [services, setServices] = useState([]);

  // fetch data
  const fetchAllServices = async () => {
    try {
      await axios
        .get(
          `${import.meta.env.VITE_API_URL}/my-services?email=${user.email}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setServices(response.data);
        });
    } catch (err) {
      ErrorToaster(err.message);
    }
  };

  // data fetch call
  useEffect(() => {
    if (user?.email) {
      fetchAllServices();
    }
  }, [user?.email]);

  if (!services.length)
    return (
      <div className="my-4 font-bold text-center text-3xl">
        Please Added Your Services
      </div>
    );

  // handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/service-delete/${id}`,
        { withCredentials: true }
      );
      toast.success("Data Deleted Successfully!!!");
      fetchAllServices();
    } catch (err) {
      ErrorToaster(err.message);
    }
  };

  const modernDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="my-8">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium ">
          My Service{services?.length > 1 && "s"} Added
        </h2>

        <span className="px-3 py-1 text-xs text-white bg-green-500/80 rounded-full ">
          {services?.length} Service{services?.length > 1 && "s"}
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
                      <button className="flex items-center gap-x-2">
                        <span>Location</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Category</span>
                      </div>
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
                        ${service?.price}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service?.service_area}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className={`px-3 py-1 text-gray-800/70 font-bold  ${
                              service.category === "Laptop Service" &&
                              "text-blue-500 bg-blue-200/60"
                            } ${
                              service.category === "Smartphone Service" &&
                              "text-green-500 bg-green-100/60"
                            }
                            ${
                              service.category === "Desktop Service" &&
                              "text-red-500 bg-red-100/60"
                            } text-xs rounded-full`}
                          >
                            {service.category}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                            service.status === "Pending" &&
                            " bg-yellow-100/60 text-yellow-500"
                          } ${
                            service.status === "Working" &&
                            " bg-blue-100/60 text-blue-500"
                          } ${
                            service.status === "Completed" &&
                            " bg-green-100/60 text-green-500"
                          } ${
                            service.status === "Rejected" &&
                            " bg-red-100/60 text-red-500"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              service.status === "Pending" && "bg-yellow-500"
                            } ${
                              service.status === "Working" && "bg-blue-500"
                            } ${
                              service.status === "Completed" && "bg-green-500"
                            } ${
                              service.status === "Rejected" && "bg-red-500"
                            } `}
                          ></span>
                          <h2 className="text-sm font-normal ">
                            {service.status}
                          </h2>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service?.description?.substring(0, 15)}...
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <Link
                            to={`/manageUpdated/${service._id}`}
                            className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() => modernDelete(service._id)}
                            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
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

export default ManageServices;
