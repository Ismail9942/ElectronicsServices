import axios from "axios";
import { useAuth } from "../../auth/AtuhProvider";
import ErrorToaster from "../../component/ErrorToaster";
import SuccesToaster from "../../component/SuccesToaster";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const title = form.service_title.value;
    const price = parseFloat(form.price.value);
    const service_area = form.service_area.value;
    const photoURL = form.photoURL.value;
    const description = form.description.value;

    const formData = {
      title,
      provider: { email, name: user?.displayName, photo: user?.photoURL },
      price,
      service_area,
      photoURL,
      description,
      bid_count: 0,
      status: "Pending",
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/service`, formData);
      form.reset();
      SuccesToaster("Data Added Successfully!!");
      navigate("/manageService");
    } catch (error) {
      ErrorToaster(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Add Service
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="service_title">
                Service Name
              </label>
              <input
                id="service_title"
                name="service_title"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="service_area">
                Service Area
              </label>
              <input
                id="service_area"
                name="service_area"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
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
              type="url"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-500 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
              required
            ></textarea>
          </div>
          <div className="flex mt-6">
            <button className="w-full disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddService;
