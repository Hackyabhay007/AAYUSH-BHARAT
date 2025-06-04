"use client";
import { useState, useEffect } from "react";
import type { AddressData, AddressDocument } from "@/services/DatabaseService";
import DatabaseService from "@/services/DatabaseService";

export default function AddressForm() {const [formVisible, setFormVisible] = useState(false);
  const [addresses, setAddresses] = useState<AddressDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<AddressData, 'userId'>>({
    full_name: "",
    mobile: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",    type: "home" as const,
    is_default: false,
    country: "India"
  });

  const fetchAddresses = async () => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) return;
      
      const response = await DatabaseService.getUserAddresses(userId);      setAddresses(response);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        setError("You must be logged in to add an address");
        return;
      }

      // Validate pincode
      if (!/^\d{6}$/.test(formData.pincode)) {
        setError("Please enter a valid 6-digit pincode");
        return;
      }

      // Validate phone number
      if (!/^\d{10}$/.test(formData.mobile)) {
        setError("Please enter a valid 10-digit mobile number");
        return;
      }      const addressData: AddressData = {
        ...formData,
        userId
      };
      await DatabaseService.createAddress(addressData);
      
      setSuccess("Address added successfully!");
      
      // Reset form and fetch updated addresses
      setFormData({
        full_name: "",
        mobile: "",
        address_line1: "",        address_line2: "",
        city: "",
        state: "",
        pincode: "",
        type: "home",
        is_default: false,
        country: "India"
      });
      
      await fetchAddresses();
      setFormVisible(false);
      
    } catch (error) {
      console.error("Error saving address:", error);
      setError("Failed to save address. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (    <div>
      <div className="flex px-6 flex-col gap-2 lg:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-medium uppercase tracking-wide text-dark-green">
          My Addresses ({addresses.length}/4)
        </h2>
        {addresses.length < 4 && (
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="bg-dark-green hover:bg-dark text-white px-5 py-2 rounded-lg shadow"
            disabled={submitting}
          >
            Add New Address
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 mx-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 mx-6">
          {success}
        </div>
      )}

      <div className="px-4 md:px-12 my-10 bg-white rounded-2xl shadow-lg">      {/* Display existing addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        {addresses.map((address, index) => (
          <div key={address.$id || index} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{address.full_name}</h3>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                {address.type}
              </span>
            </div>
            <p className="text-sm text-gray-600">{address.mobile}</p>
            <p className="text-sm text-gray-600">
              {address.address_line1}
              {address.address_line2 && `, ${address.address_line2}`}
            </p>
            <p className="text-sm text-gray-600">
              {address.city}, {address.state} - {address.pincode}
            </p>
            {address.is_default && (
              <span className="text-xs text-blue-600 mt-2 block">Default Address</span>
            )}
          </div>
        ))}
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="space-y-6 py-10">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="input-style"
              required
            />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="input-style"
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
          </div>
          <input
            type="text"
            name="address_line1"
            value={formData.address_line1}
            onChange={handleInputChange}
            placeholder="Address Line 1"
            className="input-style w-full"
            required
          />
          <input
            type="text"
            name="address_line2"
            value={formData.address_line2}
            onChange={handleInputChange}
            placeholder="Address Line 2 (Optional)"
            className="input-style w-full"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="input-style"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="input-style"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
              className="input-style"
              pattern="[0-9]{6}"
              maxLength={6}
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="input-style"
              required
            >
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="default"
              name="is_default"
              checked={formData.is_default}
              onChange={handleInputChange}
            />
            <label htmlFor="default" className="text-sm">
              Set as default address
            </label>
          </div>          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-dark-green hover:bg-dark text-white px-6 py-2 rounded-md shadow flex items-center justify-center min-w-[120px] ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Add Address'
              )}
            </button>
            <button
              type="button"
              onClick={() => setFormVisible(false)}
              disabled={submitting}
              className={`bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
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
