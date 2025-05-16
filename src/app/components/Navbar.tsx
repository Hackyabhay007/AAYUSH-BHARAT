"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  scrolled: boolean;
}

const logo = {
  src: "/logo/Artboard_1_copy_15@4x.png",
};

const Navbar = ({ scrolled }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // NEW

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
            className="object-cover w-24 h-14 lg:w-auto lg:h-auto"
            alt="Logo"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-primary text-sm">
          {[
            { title: "SHOP", link: "/product/12" },
            { title: "ABOUT US", link: "/about-us" },
            { title: "CONTACT US", link: "/contact-us" },
            { title: "BLOG", link: "/blog" },
          ].map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="relative group"
            >
              {item.title}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <a href={"/profile"} className="hover:text-green-700">
            <User size={20} />
          </a>
          <button onClick={() => setCartOpen(true)} className="hover:text-green-700">
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex gap-4 items-center">
          <button onClick={() => setCartOpen(true)} className="text-light">
            <ShoppingCart size={20} />
          </button>
          <button className="text-light">
            <Link href={'/profile'}>
            <User size={20} />
            </Link>
          </button>
          <button onClick={() => setMenuOpen(true)} className="text-light">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full z-50 bg-white font-notosans text-dark transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
          <button onClick={() => setMenuOpen(false)}>
            <X size={28} className="text-primary" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4 gap-6 text-lg">
          {[
            { title: "SHOP", link: "/product/12" },
            { title: "ABOUT US", link: "/about-us" },
            { title: "CONTACT US", link: "/contact-us" },
            { title: "BLOG", link: "/blog" },
            // { title: "CART", link: "/cart", icon: <ShoppingCart size={20} /> },
            // { title: "PROFILE", link: "/profile", icon: <User size={20} /> },
          ].map((item) => (
            <a
              href={item.link}
              key={item.title}
              onClick={() => setMenuOpen(false)}
              className="flex py-2 justify-between items-center group"
            >
              <span className="relative">
                {item.title}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-dark-green transition-all duration-300 group-hover:w-full" />
              </span>
              { <ChevronRight />}
            </a>
          ))}
        </nav>
      </div>
{/* Cart Overlay Blur */}
{cartOpen && (
  <div
    onClick={() => setCartOpen(false)}
    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
  />
)}

{/* Cart Drawer */}
<div
  className={`fixed flex flex-col justify-between top-0 right-0 w-full sm:w-[400px] h-full z-50 bg-light transition-transform duration-300 ease-in-out shadow-xl ${
    cartOpen ? "translate-x-0" : "translate-x-full"
  }`}
      >
        <div className="flex bg-beige justify-between items-center p-4 border-b">
          <h2 className="text-xl font-medium uppercase">Your Cart</h2>
          <button onClick={() => setCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 p-4 overflow-y-auto ">
        </div>

        {/* Cart Footer */}
        <div className="p-4 border-t bg-[#FCEED5]">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-xl uppercase">Total</span>
            <span className="text-dark-green font-medium text-xl">₹ 0.00</span>
          </div>
          <p className="text-base text-gray-700 font-light mb-3">
            Tax included. Shipping calculated at checkout.
          </p>
          <div className="flex gap-3">
            <button className="w-1/2 border border-dark-green text-dark-green py-2 rounded hover:bg-dark-green hover:text-light duration-300">
              🛒 View cart
            </button>
            <button className="w-1/2 bg-dark-green border border-dark-green text-white py-2 rounded hover:bg-light hover:text-dark-green">
              Checkout
            </button>
          </div>
          <p className="text-center text-xs mt-3 text-dark-green underline uppercase"><Link href={"/product/12"}> Continue Shopping </Link></p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
