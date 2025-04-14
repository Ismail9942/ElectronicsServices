import axios from "axios";
import ErrorToaster from "../../component/ErrorToaster";
import SuccesToaster from "../../component/SuccesToaster";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UseAuth from "../../auth/UseAuth";

const ManageUpdated = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [service, setService] = useState({});
  const { id } = useParams();

  // data fetch
  useEffect(() => {
    fetchAllServices();
  }, [id]);

  const fetchAllServices = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/services/${id}`
      );
      setService(data);
    } catch (err) {
      ErrorToaster(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };
  // update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: service.title,
      provider: {
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      price: parseFloat(service.price),
      category: service.category,
      photoURL: service.photoURL,
      description: service.description,
      bid_count: 0,
      status: "Pending",
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/update/${id}`, formData);
      SuccesToaster("Data Updated Successfully!");
      navigate("/manageService");
    } catch (error) {
      ErrorToaster(error.message);
    }
  };

  const { category, price, service_area, photoURL, description } =
    service || {};
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Update Service
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                value={user?.email || ""}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={category || ""}
                className="border text-gray-700 p-2 rounded-md"
              >
                <option value="Laptop Service">Laptop Service</option>
                <option value="SmartPhone Service">SmartPhone Service</option>
                <option value="Desktop Service">Desktop Service</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                onChange={handleChange}
                value={price || ""}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="service_area">
                Service Area
              </label>
              <input
                id="service_area"
                name="service_area"
                onChange={handleChange}
                value={service_area || ""}
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div>
            <label className="text-gray-700 " htmlFor="photoURL">
              Photo URL
            </label>
            <input
              id="photoURL"
              name="photoURL"
              onChange={handleChange}
              value={photoURL || ""}
              type="url"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              onChange={handleChange}
              value={description || ""}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              name="description"
              id="description"
              required
            ></textarea>
          </div>
          <div className="flex mt-6">
            <button
              type="submit"
              className="w-full disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ManageUpdated;
