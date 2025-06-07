"use client";
import React, { useEffect, useState } from "react";
import Orders from "./component/Order";
import Addresses from "./component/Address";
import SettingsComponent from "./component/Setting";
import Profile from "./component/Profile";
import DatabaseService from "@/services/DatabaseService";
import { useAuth } from "@/contexts/AuthContext";

type UserProfile = {
  name: string;
  email: string;
  $createdAt: string;
  phone: string;
  $id: string;
};

export default function ProfileDashboard({ onLoadingChange }: { onLoadingChange: (loading: boolean) => void }) {
  const { logout, user: authUser, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [tabLoading, setTabLoading] = useState(false);
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isAuthenticated || !authUser?.$id) {
          throw new Error("User not authenticated");
        }
        
        const userID = authUser.$id;
        const userData = await DatabaseService.getUserData(userID);
        
        if (userData) {
          setUserState({
            name: userData.fullname || "",
            email: userData.email || "",
            phone: userData.phone || "",
            $createdAt: userData.$createdAt || "",
            $id: userData.$id || "",
          });
        } else {
          setUserState(null);
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        setUserState(null);
      } finally {
        setLoading(false);
        onLoadingChange(false);
      }
    };
    
    setLoading(true);
    fetchUser();
  }, [isAuthenticated, authUser, onLoadingChange]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "addresses":
        return <Addresses />;
      case "settings":
        return <SettingsComponent />;
      case "profile":
        return (
          <Profile
            name={user?.name || ""}
            phone={user?.phone || "No Phone Number"}
            email={user?.email || ""}
            createdAt={user?.$createdAt || ""}
            $id={user?.$id || ""}
          />
        );
      default:
        return null;
    }
  };

  const handleTabClick = async (tabKey: string) => {
    setTabLoading(true);
    setActiveTab(tabKey);

    // Simulate async operation (replace with real fetch if needed)
    // If you have async fetch for tab, await it here
    await new Promise((resolve) => setTimeout(resolve, 500)); // Remove or replace with real fetch

    setTabLoading(false);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="text-white">User not found</div>;
  }
  return (
    <div className="flex flex-col items-center pt-20 bg-beige text-dark-green font-medium px-4 lg:pb-10 pb-4 sm:px-6 lg:px-8 min-h-screen">      <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-medium py-2 tracking-wider text-center">
        Dashboard
      </h1>

      {/* Top Profile Card */}
      <div className="w-full max-w-6xl bg-dark-green text-white rounded-xl p-4 sm:p-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="bg-white text-dark-green rounded-full h-14 w-14 flex items-center justify-center text-xl font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="font-light">
            <h2 className="text-lg sm:text-xl">{user?.name || "User"}</h2>
            <p className="text-sm">{user?.email || "No email"}</p>
            <p className="text-sm">Member Since: {new Date(user?.$createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="border border-white px-4 py-2 rounded hover:bg-white hover:text-dark-green transition text-sm sm:text-base self-start sm:self-auto"
        >
          Sign Out →
        </button>
      </div>      {/* Tabs */}
      <div className="w-full max-w-6xl">
        <div className="mt-6 border-b">
          <div className="flex overflow-x-auto">
            {[
              { key: "profile", label: "Profile" },
              { key: "orders", label: "Orders" },
              { key: "addresses", label: "Addresses" },
              { key: "settings", label: "Settings" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`px-6 py-3 font-medium text-sm sm:text-base transition-colors duration-300 whitespace-nowrap
                ${
                  activeTab === tab.key
                    ? "border-b-2 border-dark-green text-dark-green"
                    : "text-gray-500 hover:text-dark-green"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {tabLoading ? (
          <div className="py-10 text-center">Loading...</div>
        ) : (
          <div className="mt-6">{renderTabContent()}</div>
        )}
      </div>
    </div>
  );
}
