'use client';
import React from 'react';
import Link from 'next/link'; // Using Next.js Link for navigation
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaShieldAlt, // Placeholder for AYUSH/GMP
  FaCreditCard, // For Razorpay
  FaBoxOpen // For COD
} from 'react-icons/fa';
import { RiShieldCheckFill } from 'react-icons/ri'; // Another option for certification

interface QuickLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const quickLinks: QuickLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Shop', href: '/shop' }, // Replace with actual shop path
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Community', href: '/community' },
];

const trustIcons = [
  { label: 'AYUSH Certified', icon: <RiShieldCheckFill size={24} className="text-primary" />, text: "AYUSH" },
  { label: 'GMP Certified', icon: <FaShieldAlt size={24} className="text-primary" />, text: "GMP" },
  { label: 'Cash on Delivery', icon: <FaBoxOpen size={24} className="text-primary" />, text: "COD" },
  { label: 'Secure Payments by Razorpay', icon: <FaCreditCard size={24} className="text-primary" />, text: "Razorpay" },
];

const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/yourprofile', icon: <FaInstagram size={28} /> },
  { label: 'WhatsApp', href: 'https://wa.me/yournumber', icon: <FaWhatsapp size={28} /> },
  { label: 'YouTube', href: 'https://youtube.com/yourchannel', icon: <FaYoutube size={28} /> },
];

export default function Footer() {
  return (
    <footer className="bg-dark-green text-light pt-12 pb-4">
      <div className="containe px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h5 className="text-xl font-light text-light mb-4">Quick Links</h5>
            <ul className="space-y-2 grid grid-cols-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-base font-light hover:text-light hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Icons */}
          <div>
            <h5 className="text-xl font-light text-light mb-4">Our Commitment</h5>
            <div className="grid grid-cols-4">
              {trustIcons.map((item) => (
                <div key={item.label} className="flex flex-col text-primary rounded-md">
                  {item.icon}
                  <span className="text-xs font-extralight mt-2">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="text-xl font-light text-white mb-4">Connect With Us</h5>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-primary hover:text-white transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter/Contact (Optional) */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Stay Updated</h5>
            <p className="mb-2 text-sm">Get the latest news and offers.</p>
            {/* You can add a newsletter signup form here */}
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded-l-md border-2 border-primary text-light focus:outline-none w-full text-sm"
              />
              <button
                type="submit"
                className="bg-primary text-dark-green px-4 py-2 rounded-r-md hover:bg-light text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AAYUSH BHARAT. All Rights Reserved.</p>
          <p className="mt-1">
            <Link href="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy | </Link> 
            <Link href="/terms-of-service" className="hover:text-primary hover:underline">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
