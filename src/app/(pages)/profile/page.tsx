'use client';
import React, { useState } from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import ProfileDashboard from './ProfileDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

function Page() {
  const scrolled = true;
  const [loading, setLoading] = useState(true);

  return (
    <ProtectedRoute>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#363f1d] text-black shadow-md" : "bg-transparent text-black"}`}>
        <Navbar scrolled={true} />
      </div>
      <ProfileDashboard onLoadingChange={setLoading} />
      {loading && (
        <div className="flex justify-center items-center min-h-[60vh] fixed inset-0 bg-white bg-opacity-70 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-solid"></div>
        </div>
      )}
      <Footer />
    </ProtectedRoute>
  )
}

export default Page

