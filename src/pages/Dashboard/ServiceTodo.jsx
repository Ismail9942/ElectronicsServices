import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/AtuhProvider";
import ErrorToaster from "../../component/ErrorToaster";

const ServiceTodo = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);

  // data fetch
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookNow?email=${user.email}`,
          {
            withCredentials: true,
          }
        );
        setServices(data);
      } catch (err) {
        ErrorToaster(err.message);
      }
    };

    if (user?.email) {
      fetchAllServices();
    }
  }, [user?.email]);

  if (!services.length) return <div>No services found</div>;

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Working":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-300 ";
    }
  };

  return (
    <section className="my-8">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium ">My Book Now</h2>

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
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Deadline</span>
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
                          src={user?.photoURL}
                          alt={service?.title}
                          className="w-16 h-16  rounded-md"
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service?.serviceDate}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service?.serviceName}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        ${service?.price}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service?.service_area}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <span
                          className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusBadgeColor(
                            service?.status
                          )}`}
                        >
                          <select
                            value={service?.serviceStatus}
                            onChange={async (e) => {
                              const newStatus = e.target.value;

                              try {
                                await axios.patch(
                                  `${
                                    import.meta.env.VITE_API_URL
                                  }/updateStatus/${service._id}`,
                                  { status: newStatus }
                                );

                                // Update state locally
                                const updatedServices = services.map((s) =>
                                  s._id === service._id
                                    ? { ...s, serviceStatus: newStatus }
                                    : s
                                );
                                setServices(updatedServices);
                              } catch (err) {
                                ErrorToaster(
                                  "Failed to update status",
                                  err.message
                                );
                              }
                            }}
                            className="border-none bg-transparent outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Working">Working</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {service?.description?.substring(0, 15)}...
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none">
                            Update
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

export default ServiceTodo;
