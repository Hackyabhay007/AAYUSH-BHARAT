"use client";
import React from "react";
import { User, Package, MapPin, Settings } from "lucide-react";

export default function ProfileDashboard() {
  return (
    <div className="flex flex-col items-center pt-20 bg-beige text-dark-green font-medium px-4">
      <h1 className="text-2xl lg:text-4xl uppercase font-medium py-2 tracking-wider text-center">
        Dashboard
      </h1>

      <div className="w-full max-w-6xl">
        {/* Top Profile Card */}
        <div className="bg-dark-green text-white rounded-xl p-4 sm:p-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-white text-dark-green rounded-full h-14 w-14 flex items-center justify-center text-xl font-semibold">
              1
            </div>
            <div className="font-light">
              <h2 className="text-lg sm:text-xl">Kartik Bhatnagar</h2>
              <p className="text-sm">bhatnagar@gmail.com</p>
              <p className="text-sm">Member Since: May 16, 2025</p>
            </div>
          </div>
          <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-dark-green transition text-sm sm:text-base self-start sm:self-auto">
            Sign Out →
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-xl shadow-md mt-6 px-4 py-4 flex flex-col sm:flex-row gap-4 sm:gap-8 border-b text-sm">
          <button className="border-b-2 border-dark-green pb-2 flex items-center gap-2">
            <User size={16} />
            Profile
          </button>
          <button className="text-gray-500 hover:text-dark-green flex items-center gap-2">
            <Package size={16} />
            Orders
          </button>
          <button className="text-gray-500 hover:text-dark-green flex items-center gap-2">
            <MapPin size={16} />
            Addresses
          </button>
          <button className="text-gray-500 hover:text-dark-green flex items-center gap-2">
            <Settings size={16} />
            Settings
          </button>
        </div>

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
            <button className="text-dark-green hover:underline text-sm">
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Name</p>
              <p>Kartik Bhatnagar</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p>bhatnagar@gmail.com</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p>99999999</p>
            </div>
            <div>
              <p className="text-gray-600">Member Since</p>
              <p>May 16, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
