import axios from "axios";
import React, { useState, useEffect } from "react";
import CostomerRequests from "./CostomerRequests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../auth/UseAuth";

const ServiceTodo = () => {
  const { user, userLogOut } = UseAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // data fetch
  useEffect(() => {
    if (user?.email) {
      fetchAllServices();
    }
  }, [user?.email]);

  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookNow/${user.email}?provider=true`,
        { withCredentials: true }
      );
      setServices(data);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        userLogOut();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, prevStatus, status) => {
    if (prevStatus === status || prevStatus === "Completed")
      return console.log("Not Allowed");

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/status-update/${id}`, {
        status,
      });
      toast.success(`Status Changed To ${status}`);
      fetchAllServices();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="my-8">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium ">
          Service{services?.length > 1 && "s"} To Do
        </h2>

        <span className="px-3 py-1 text-xs text-white bg-green-500/80 rounded-full ">
          {services?.length === 1
            ? "1 Service To Do"
            : `${services?.length} Service`}
          {services?.length > 1 && "s"}
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
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
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
                      <button className="flex items-center gap-x-2">
                        <span>Category</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Edit
                    </th>
                  </tr>
                </thead>

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
                      <CostomerRequests
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

export default ServiceTodo;
