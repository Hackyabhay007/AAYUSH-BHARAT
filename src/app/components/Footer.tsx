'use client';
import React from 'react';
import Link from 'next/link';
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaShieldAlt,
  FaCreditCard,
  FaBoxOpen
} from 'react-icons/fa';
import { RiShieldCheckFill } from 'react-icons/ri';

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
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Shop', href: '/product/12' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Blog', href: '/blog' },
  { label: 'Term & Condition', href: '/terms-and-conditions' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Track Order', href: '/track-order' },
];

const trustIcons = [
  { label: 'AYUSH Certified', icon: <RiShieldCheckFill size={24} />, text: "AYUSH" },
  { label: 'GMP Certified', icon: <FaShieldAlt size={24} />, text: "GMP" },
  { label: 'Cash on Delivery', icon: <FaBoxOpen size={24} />, text: "COD" },
  { label: 'Secure Payments by Razorpay', icon: <FaCreditCard size={24} />, text: "Razorpay" },
];

const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/yourprofile', icon: <FaInstagram size={28} /> },
  { label: 'WhatsApp', href: 'https://wa.me/yournumber', icon: <FaWhatsapp size={28} /> },
  { label: 'YouTube', href: 'https://youtube.com/yourchannel', icon: <FaYoutube size={28} /> },
];

export default function Footer() {
  return (
    <footer className="bg-dark-green text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-32 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-primary text-base hover:underline transition duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust Icons */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Commitment</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustIcons.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center bg-white/10 rounded-md p-3 hover:bg-white/20 transition"
              >
                <div className="text-primary">{item.icon}</div>
                <span className="text-sm mt-2 text-center">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-primary hover:text-white transition duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm text-white/70">
        <p>&copy; {new Date().getFullYear()} AAYUSH BHARAT. All Rights Reserved.</p>
        <p className="mt-1">
          <Link href="/privacy-policy" className="hover:text-primary hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-1">|</span>
          <Link href="/terms-and-conditions" className="hover:text-primary hover:underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}
