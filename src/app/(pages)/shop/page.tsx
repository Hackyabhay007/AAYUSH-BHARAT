import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import ProductsPage from './ProductPage';

function page() {
  const scrolled=true;
  return (

    <div>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#363f1d] text-black shadow-md" : "bg-transparent text-black"}`}>

    <Navbar scrolled={true} />
    </div>
      <ProductsPage/>
      
      <Footer/>
      
      </div>
  )
}

export default page