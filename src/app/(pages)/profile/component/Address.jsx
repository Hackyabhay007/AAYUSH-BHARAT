
import { useState } from "react";

export default function AddressForm() {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <div>

      <div className="flex px-6 flex-col gap-2 lg:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-medium uppercase tracking-wide text-dark-green">
          My Addresses (0/4)
        </h2>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="bg-dark-green hover:bg-dark text-white px-5 py-2 rounded-lg shadow"
          >
          Add New Address
        </button>
      </div>
    <div className="px-4 md:px-12 my-10 bg-white rounded-2xl shadow-lg">

      {formVisible && (
        <form className="space-y-6 py-10">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input-style"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="input-style"
              />
          </div>
          <input
            type="text"
            placeholder="Address Line 1"
            className="input-style w-full"
            />
          <input
            type="text"
            placeholder="Address Line 2 (Optional)"
            className="input-style w-full"
            />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="input-style"
              />
            <input
              type="text"
              placeholder="State"
              className="input-style"
              />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Pincode"
              className="input-style"
            />
            <select className="input-style">
              <option>Home</option>
              <option>Office</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="default" />
            <label htmlFor="default" className="text-sm">
              Set as default address
            </label>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="bg-dark-green hover:bg-dark text-white px-6 py-2 rounded-md shadow"
              >
              Add Address
            </button>
            <button
              type="button"
              onClick={() => setFormVisible(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
              >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
      </div>
  );
}
