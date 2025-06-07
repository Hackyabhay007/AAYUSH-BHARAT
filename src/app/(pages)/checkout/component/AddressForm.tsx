import { useState } from "react";
import { saveUserAddress } from "@/services/AddressService";
import { Address } from "@/types/customer";

interface AddressFormProps {
  onSave: (addr: Address[]) => void;
}

export default function AddressForm({ onSave }: AddressFormProps) {
  const [form, setForm] = useState<Omit<Address, 'id'>>({
    full_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    type: "home",
    is_default: false
  });

  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!form.full_name) return "Name is required";
    if (!form.mobile) return "Phone number is required";
    if (!/^\d{10}$/.test(form.mobile)) return "Please enter a valid 10-digit phone number";
    if (!form.address_line1) return "Address is required";
    if (!form.city) return "City is required";
    if (!form.state) return "State is required";
    if (!form.pincode) return "Pincode is required";
    if (!/^\d{6}$/.test(form.pincode)) return "Please enter a valid 6-digit pincode";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        setError("Please log in to add an address");
        return;
      }      const saved = await saveUserAddress(userId, form);
      // Convert the Appwrite document to our Address type
      const addressData: Address = {
        id: saved.$id,
        full_name: saved.full_name,
        mobile: saved.mobile,
        address_line1: saved.address_line1,
        address_line2: saved.address_line2,
        city: saved.city,
        state: saved.state,
        pincode: saved.pincode,
        type: saved.type as 'home' | 'office' | 'other',
        is_default: saved.is_default
      };
      onSave([addressData]);
      setError(null);
    } catch (err) {
      setError("Failed to save address. Please try again.");
      console.error("Error saving address:", err);
    }
  };

  return (
    <div className="mt-3 p-3 rounded">
      {error && (
        <div className="text-red-500 text-sm mb-3">{error}</div>
      )}
      <input
        type="text"
        placeholder="Full Name"
        className="input w-full mb-2 p-2 border rounded"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Mobile Number"
        className="input w-full mb-2 p-2 border rounded"
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        maxLength={10}
      />
      <input
        type="text"
        placeholder="Address Line 1"
        className="input w-full mb-2 p-2 border rounded"
        value={form.address_line1}
        onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address Line 2 (Optional)"
        className="input w-full mb-2 p-2 border rounded"
        value={form.address_line2}
        onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="City"
          className="input w-full mb-2 p-2 border rounded"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          className="input w-full mb-2 p-2 border rounded"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />
      </div>
      <input
        type="text"
        placeholder="Pincode"
        className="input w-full mb-2 p-2 border rounded"
        value={form.pincode}
        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
        maxLength={6}
      />
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="is_default"
          checked={form.is_default}
          onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="is_default" className="text-sm text-gray-600">Set as default address</label>
      </div>
      <button 
        className="w-full bg-dark-green text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        onClick={handleSubmit}
      >
        Save Address
      </button>
    </div>
  );
}
