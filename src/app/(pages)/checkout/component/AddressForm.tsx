import { useState } from "react";
import { saveUserAddress } from "@/app/api/users/addresses/route";

export default function AddressForm({ onSave }: { onSave: (addr: any) => void }) {
  const [form, setForm] = useState({ name: "", street: "", city: "", pincode: "", phone: "" });

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userid");
    const saved = await saveUserAddress(userId, form);
    onSave([saved]); // Pass as array to match your address state
  };

  return (
    <div className="mt-3 p-3 rounded">
      <input
        type="text"
        placeholder="Name"
        className="input"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Street"
        className="input"
        value={form.street}
        onChange={(e) => setForm({ ...form, street: e.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        className="input"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />
      <input
        type="text"
        placeholder="Pincode"
        className="input"
        value={form.pincode}
        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        className="input"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button className="text-dark-green px-4 py-1 mt-2 rounded" onClick={handleSubmit}>
    <h1 className="font-semibold text-red">

        Save Address
    </h1>
      </button>
    </div>
  );
}
