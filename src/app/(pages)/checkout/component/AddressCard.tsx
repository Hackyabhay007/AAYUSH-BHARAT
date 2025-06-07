import { useState } from "react";
import AddressForm from "./AddressForm";
import { Address } from "@/types/customer";

// Define a SimpleAddress interface that matches the component's needs
interface SimpleAddress {
  name: string;
  street: string;
  city: string;
  pincode: string;
  phone: string;
}

export default function AddressCard({
  address,
  onAddressSelect,
}: {
  address: SimpleAddress;
  onAddressSelect: (addr: SimpleAddress) => void;
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
            // Convert Address array to SimpleAddress format
            if (addr && addr.length > 0) {
              const simpleAddr: SimpleAddress = {
                name: addr[0].full_name,
                street: addr[0].address_line1,
                city: addr[0].city,
                pincode: addr[0].pincode,
                phone: addr[0].mobile
              };
              onAddressSelect(simpleAddr);
              setShowForm(false);
            }
          }}
        />
      )}
    </div>
  );
}
