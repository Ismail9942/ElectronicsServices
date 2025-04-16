import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorToaster from "../../component/ErrorToaster";
import MyServiceRequests from "./MyServiceRequests";
import UseAuth from "../../auth/UseAuth";

const BookedService = () => {
  const { user } = UseAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/myBook?${user?.email}&provider: true`,
        {
          withCredentials: true,
        }
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // data fetch
  useEffect(() => {
    if (user?.email) {
      fetchAllServices();
    }
  }, [user]);

  const handleStatusChange = async (id, prevStatus, status) => {
    if (prevStatus !== "Working") return ErrorToaster("Not Allowed");

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/status-update/${id}`, {
        status,
      });

      // refresh ui
      fetchAllServices();
    } catch (err) {
      ErrorToaster(err);
    }
  };

  return (
    <section className="my-8 ">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium ">
          My Book Now Service{services.length > 1 && "s"}
        </h2>

        <span className="px-3 py-1 text-xs text-white bg-green-500/80 rounded-full ">
          {services.length} Service{services.length > 1 && "s"}
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-50">
                  <tr>
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
                      <span>Deadline</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Category
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* ganatate dynamic update */}

                <tbody className="bg-white divide-y divide-gray-200 ">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-10 text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : services.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-10 text-gray-500"
                      >
                        No Available Service.
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <MyServiceRequests
                        key={service._id}
                        service={service}
                        handleStatusChange={handleStatusChange}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookedService;
