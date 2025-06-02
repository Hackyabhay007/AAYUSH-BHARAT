"use client";
import authService from '@/appwrite/auth';
import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';

type ProfileProps = {
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  $id:string;
};

const Profile: React.FC<ProfileProps> = ({ name, phone, email, createdAt, $id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name, phone, email,$id,password:'' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      // Call your AuthService.updateUser function
      // Example: await AuthService.updateUser({ name: form.name, phone: form.phone, email: form.email });
      await authService.updateUser({
        name: form.name,
        phone: Number(form.phone),
        email: form.email,
        userId: form.$id,
        password: form.password,
      }); // Adjust as per your actual function signature
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to update profile.");
      } else {
        setError("Failed to update profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
          <div className="w-full max-w-6xl">
  
        
                {/* Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6 bg-white shadow-md rounded-b-xl">
                  <div className="bg-dark-green text-white rounded-xl p-4 shadow">
                    <p className="text-sm">Total Spent</p>
                    <h2 className="text-3xl mt-1">₹0</h2>
                    <p className="text-xs mt-2">Lifetime purchases</p>
                  </div>
                  <div className="bg-dark-green text-white rounded-xl p-4 shadow">
                    <p className="text-sm">Member Status</p>
                    <h2 className="text-2xl mt-1">Regular</h2>
                    <div className="w-full bg-white/30 h-2 mt-2 rounded">
                      <div className="bg-white h-2 w-1/4 rounded"></div>
                    </div>
                    <p className="text-xs mt-2">₹5,000 until Silver</p>
                  </div>
                  <div className="bg-dark-green text-white rounded-xl p-4 shadow">
                    <p className="text-sm">Total Orders</p>
                    <h2 className="text-3xl mt-1">0</h2>
                    <p className="text-xs mt-2">Orders placed</p>
                  </div>
                </div>
        
                {/* Profile Info Section */}
                <div className="bg-white rounded-xl shadow-md my-6 px-4 py-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <h3 className="text-lg font-semibold">Profile Information</h3>
                    {!isEditing ? (
                      <button
                        className="text-dark-green hover:underline text-sm"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        className="text-gray-500 hover:underline text-sm"
                        onClick={() => setIsEditing(false)}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                  {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                          disabled={saving}
                        />
                      ) : (
                        <p>{name}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                          disabled={saving}
                        />
                      ) : (
                        <p>{email}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                          disabled={saving}
                        />
                      ) : (
                        <p>{phone}</p>
                      )}
                    </div>


                    <div>
              <p className="text-gray-600">Password</p>
              {isEditing ? (
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                  disabled={saving}
                  placeholder="Enter old password"
                />
              ) : (
                <p className="italic text-gray-400">********</p>
              )}
            </div>
                    <div>




                      <p className="text-gray-600">Member Since</p>
                      <p> {createdAt ? createdAt.split("T")[0] : ""}</p>
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      className="mt-4 bg-dark-green text-white px-4 py-2 rounded"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  )}
                </div>
              </div>
    </div>
  )
}

export default Profile