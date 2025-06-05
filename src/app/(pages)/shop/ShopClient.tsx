'use client';

import React from 'react';
import ProductsPage from './ProductPage';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ShopClient() {
  const scrolled = true;
  
  return (
    <div>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#363f1d] text-black shadow-md" : "bg-transparent text-black"}`}>
        <Navbar scrolled={true} />
      </div>
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-full bg-beige mx-auto pt-20 px-4 sm:px-6 lg:px-8 ">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-dark-green transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="ml-2 font-medium text-dark-green">Shop</span>
            </li>
          </ol>
        </nav>
      </div>
      
      <ProductsPage />
      <Footer />
    </div>
  );
}