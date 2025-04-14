import axios from "axios";
import SuccesToaster from "./SuccesToaster";
import ErrorToaster from "./ErrorToaster";
import { useNavigate } from "react-router-dom";
import UseAuth from "../auth/UseAuth";

const BookNowModal = ({ service, isOpen, onClose }) => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const { provider } = service || {};

  const handleBooking = async (e) => {
    e.preventDefault();

    if (user?.email === provider?.email)
      return ErrorToaster("Action not permitted");

    const form = e.target;
    const serviceDate = form.date.value;
    const description = form.instruction.value;

    const bookingData = {
      serviceId: service._id,
      category: service.category,
      serviceImage: service.photoURL,
      provider: provider?.email,
      userEmail: user.email,
      userName: user.displayName,
      serviceDate,
      description,
      price: service.price,
      status: "Pending",
      bid_count: service.bid_count,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookNow`,
        bookingData
      );
      if (res.data.insertedId) {
        SuccesToaster("Booking successful!");
        onClose();
        navigate("/bookedService");
      }
    } catch (err) {
      ErrorToaster(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50 min-h-[90vh] overflow-y-auto sm:mx-4">
      <div className="bg-white/35 p-6 rounded-lg w-full max-w-2xl ">
        <h2 className="text-xl font-bold mb-4">Book Service Now!</h2>
        <form onSubmit={handleBooking} className="md:grid grid-cols-2 gap-4">
          {/* Service and User Info */}
          <div>
            <label htmlFor="serviceId" className="block font-semibold mb-2">
              Service ID
            </label>
            <input
              defaultValue={service._id}
              id="serviceId"
              className="input input-bordered text-gray-900 w-full"
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 " htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="border text-gray-900 bg-white p-2 rounded-md"
            >
              <option value="Laptop Service">Laptop Service</option>
              <option value="Smartphone Service">Smartphone Service</option>
              <option value="Desktop Service">Desktop Service</option>
            </select>
          </div>

          <div>
            <label htmlFor="serviceImage" className="block font-semibold mb-2">
              Service Image
            </label>
            <input
              defaultValue={service.photoURL}
              id="serviceImage"
              className="input input-bordered text-gray-900 w-full"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="providerEmail" className="block font-semibold mb-2">
              Provider Email
            </label>
            <input
              defaultValue={service.provider.email}
              id="providerEmail"
              className="input input-bordered text-gray-900 w-full"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="providerName" className="block font-semibold mb-2">
              Provider Name
            </label>
            <input
              defaultValue={service?.provider?.name || "NO Available!"}
              id="providerName"
              className="input input-bordered text-gray-900 w-full"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="userEmail" className="block font-semibold mb-2">
              Your Email
            </label>
            <input
              defaultValue={user?.email}
              id="userEmail"
              className="input input-bordered text-gray-900 w-full"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="userName" className="block font-semibold mb-2">
              User Name
            </label>
            <input
              defaultValue={user?.displayName || "Ismail Hossain"}
              id="userName"
              className="input input-bordered text-gray-900 w-full"
              readOnly
            />
          </div>

          {/* Editable fields */}
          <div>
            <label
              htmlFor="serviceTakingDate"
              className="block font-semibold mb-2"
            >
              Service Taking Date
            </label>
            <input
              type="date"
              name="date"
              id="serviceTakingDate"
              className="input input-bordered text-gray-900 w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="instruction" className="block font-semibold mb-2">
              Special Instructions
            </label>
            <textarea
              rows="1"
              name="instruction"
              id="instruction"
              placeholder="Special instruction (address, custom plan...)"
              className="textarea min-h-10 textarea-bordered w-full text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="price" className="block font-semibold mb-2">
              Price
            </label>
            <input
              defaultValue={`$${service.price}`}
              id="price"
              className="input input-bordered text-gray-900 w-full"
              readOnly
            />
          </div>

          <div className="text-center flex gap-6 mt-6">
            <button
              onClick={onClose}
              className="btn bg-gray-900 hover:bg-gray-700 text-white/90 shadow-sm shadow-red-700 w-full mx-auto rounded-3xl "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn  bg-green-500 hover:bg-green-600 text-white/90 shadow-sm shadow-red-700 w-full mx-auto rounded-3xl"
            >
              Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookNowModal;
