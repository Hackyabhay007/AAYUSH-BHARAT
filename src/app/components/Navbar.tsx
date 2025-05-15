"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  scrolled: boolean;
}

const logo = {
  src: "/logo/Artboard_1_copy_15@4x.png",
};

const Navbar = ({ scrolled }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`px-6 font-notosans md:px-12 flex items-center justify-between shadow-md ${
          scrolled ? "border-b border-primary" : "border-none border-transparent"
        }`}
      >
        <a href={"/"} className="flex items-center">
          <Image
            src={logo.src}
            width={120}
            height={150}
            className="object-cover"
            alt="Logo"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-primary text-sm">
          <a href={"/product/12"} className="hover:underline">SHOP</a>
          <a href={"/about-us"} className="hover:underline">ABOUT US</a>
          <a href={"/contact-us"} className="hover:underline">CONTACT US</a>
          <a href={"/blog"} className="hover:underline">BLOG</a>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex gap-4 items-center">
          <button onClick={() => setMenuOpen(true)} className="text-light">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Drawer with Slide Animation */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full z-50 bg-white font-notosans text-dark
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Top bar inside drawer */}
        <div className="flex items-center bg-dark-green justify-between px-6 py-4 border-b">
          <Link href={"/"}>
            <Image
              src={logo.src}
              width={100}
              height={100}
              alt="Logo"
              className="object-cover"
            />
          </Link>
          <div className="flex text-primary items-center gap-4">
            <button onClick={() => setMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        <nav className="flex flex-col px-6 py-4 gap-6 text-lg">
          {[
            { title: "SHOP", link: "/product/12" },
            { title: "ABOUT US", link: "/about-us" },
            { title: "CONTACT US", link: "/contact-us" },
            { title: "BLOG", link: "/blog" },
          ].map((item) => (
            <a
              href={item.link}
              key={item.title}
              onClick={() => setMenuOpen(false)} // Optional: close on link click
              className="flex py-2 justify-between items-center hover:underline"
            >
              {item.title} <ChevronRight />
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
