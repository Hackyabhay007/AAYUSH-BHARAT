"use client";
import authService from '@/appwrite/auth';
import React, { useState, useEffect } from 'react'
import { OrderService } from '@/services/OrderService';

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
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalOrders: 0,
    memberStatus: "Regular",
    progress: 0
  });

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const userId = localStorage.getItem("userid");
        if (!userId) return;

        const orders = await OrderService.getUserOrders(userId);
        const totalSpent = orders.reduce((sum, order) => sum + (order.payment_amount || 0), 0);
        const progress = Math.min((totalSpent / 5000) * 100, 100); // Progress toward Silver status
        
        setStats({
          totalSpent,
          totalOrders: orders.length,
          memberStatus: totalSpent >= 5000 ? "Silver" : "Regular",
          progress: progress
        });
      } catch (error) {
        console.error("Error fetching order stats:", error);
      }
    };

    fetchOrderStats();
  }, []);

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
        phone: form.phone,
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
            <h2 className="text-3xl mt-1">₹{stats.totalSpent.toLocaleString()}</h2>
            <p className="text-xs mt-2">Lifetime purchases</p>
          </div>
          <div className="bg-dark-green text-white rounded-xl p-4 shadow">
            <p className="text-sm">Member Status</p>
            <h2 className="text-2xl mt-1">{stats.memberStatus}</h2>
            <div className="w-full bg-white/30 h-2 mt-2 rounded">
              <div 
                className="bg-white h-2 rounded transition-all duration-500" 
                style={{ width: `${stats.progress}%` }}
              ></div>
            </div>
            {stats.memberStatus === "Regular" && (
              <p className="text-xs mt-2">
                ₹{(5000 - stats.totalSpent).toLocaleString()} until Silver
              </p>
            )}
          </div>
          <div className="bg-dark-green text-white rounded-xl p-4 shadow">
            <p className="text-sm">Total Orders</p>
            <h2 className="text-3xl mt-1">{stats.totalOrders}</h2>
            <p className="text-xs mt-2">Orders placed</p>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="bg-white rounded-xl shadow-md my-6 px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm px-4 py-2 bg-dark-green text-white rounded hover:bg-green-800 transition"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Full Name</p>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              ) : (
                <p className="font-medium">{name}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">Email Address</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              ) : (
                <p className="font-medium">{email}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">Phone Number</p>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              ) : (
                <p className="font-medium">{phone}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">Member Since</p>
              <p className="font-medium">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {isEditing && (
            <div className="mt-4">
              <div className="mb-2">
                <label className="text-gray-500 block mb-1">
                  Current Password (required to update)
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your current password"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-2 px-4 py-2 bg-dark-green text-white rounded hover:bg-green-800 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile