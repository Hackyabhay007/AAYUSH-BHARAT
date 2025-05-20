"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-medium uppercase mb-6 text-center">
          Change Password
        </h2>

        <form className="space-y-6">
          {/* Current Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 rounded bg-beige border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-green pr-10"
            />
            {currentPassword && (
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute top-9 right-3 text-gray-600 hover:text-dark-green"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded bg-beige border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-green pr-10"
            />
            {newPassword && (
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute top-9 right-3 text-gray-600 hover:text-dark-green"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Confirm New Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-beige border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-green pr-10"
            />
            {confirmPassword && (
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute top-9 right-3 text-gray-600 hover:text-dark-green"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-dark-green text-white py-2 rounded shadow hover:bg-light hover:text-dark transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
