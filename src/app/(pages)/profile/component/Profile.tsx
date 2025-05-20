"use client";
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function Profile() {
const userData = useSelector((state: RootState) => state.user.user); // optional
console.log(userData);

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
                    <button className="text-dark-green hover:underline text-sm">
                      Edit Profile
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p>{userData?.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p>{userData?.email}</p>
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
  )
}

export default Profile