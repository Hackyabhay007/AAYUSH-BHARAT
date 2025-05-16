"use client";
import React, { useState } from "react";
import { Package, MapPin, Settings, User } from "lucide-react";
import Orders from "./component/Order";
import Addresses from "./component/Address";
import SettingsComponent from "./component/Setting";
import Profile from "./component/Profile";

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "addresses":
        return <Addresses />;
      case "settings":
        return <SettingsComponent />;
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 bg-beige text-dark-green font-medium px-4 lg:pb-10 pb-4 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-medium py-2 tracking-wider text-center">
        Dashboard
      </h1>

      {/* Top Profile Card */}
      <div className="w-full max-w-6xl bg-dark-green text-white rounded-xl p-4 sm:p-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
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

      {/* Tabs */}
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-t-xl shadow-md mt-6 px-4 py-4 flex flex-col sm:flex-row gap-2 sm:gap-8 border-b text-sm sm:text-base">
          {[
            { key: "profile", icon: <User size={16} />, label: "Profile" },
            { key: "orders", icon: <Package size={16} />, label: "Orders" },
            { key: "addresses", icon: <MapPin size={16} />, label: "Addresses" },
            { key: "settings", icon: <Settings size={16} />, label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 pb-2 ${
                activeTab === tab.key
                  ? "border-b-2 border-dark-green text-dark-green font-semibold"
                  : "text-gray-500 hover:text-dark-green"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-md px-4 py-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
