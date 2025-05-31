import { useState } from "react";
import AddressForm from "./AddressForm";

export default function AddressCard({
  address,
  onAddressSelect,
}: {
  address: Address; // Replace 'any' with your Address type if available
  onAddressSelect: (addr: any) => void;
}) {
  
  
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Delivery Address</h3>

      {address ? (
        <div className="border p-3 rounded bg-blue-50">
          <div>{address.name}</div>
          <div>
            {address.street}, {address.city} {address.pincode}
          </div>
          <div>Phone: {address.phone}</div>
          <button
            className="text-blue-500 text-sm mt-2"
            onClick={() => setShowForm(true)}
          >
            Edit
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-2">No address found.</p>
      )}

      <button
        className="text-blue-600 text-sm mt-2"
        onClick={() => setShowForm(!showForm)}
      >
        {address ? "Add New Address" : "Add Address"}
      </button>

      {showForm && (
        <AddressForm
          onSave={(addr) => {
            onAddressSelect(addr); // Update parent state
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
