"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartSidebar from "../components/cart/CartSidebar";
import CartIcon from "./CartIcon";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  scrolled: boolean;
}

const logo = {
  src: "/logo/Artboard_1_copy_15@4x.png",
};

const Navbar = ({ scrolled }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`px-6   md:px-12 flex items-center justify-between shadow-md ${
          scrolled ? "border-b border-green-600" : "border-none border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src={logo.src}
            width={121}
            height={153}
            className="object-cover w-24 h-14 lg:w-auto lg:h-auto"
            alt="Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-primary text-sm">
          {[
            { title: "HOME", link: "/" },
            { title: "SHOP", link: "/shop" },
            { title: "ABOUT US", link: "/about-us" },
            { title: "CONTACT US", link: "/contact-us" },
            { title: "BLOG", link: "/blog" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="relative  group"
            >
              {item.title}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300  group-hover:w-full" />
            </Link>
          ))}

          <Link href={isAuthenticated ? "/profile" : "/login"} className="hover:text-green-700">
            <User size={20} />
          </Link>
          <CartIcon />
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex gap-4 items-center">
          <button onClick={() => setCartOpen(true)} className="text-light">
            <CartIcon />
          </button>
          <button className="text-light">
            <Link href={isAuthenticated ? '/profile' : '/login'}>
              <User size={20} />
            </Link>
          </button>
          <button onClick={() => setMenuOpen(true)} className="text-light">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full z-50 bg-white   text-dark transform transition-transform duration-300 ease-in-out ${
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

        <nav className="flex flex-col px-6 py-4 gap-6 text-lg">          {[
            { title: "HOME", link: "/" },
            { title: "SHOP", link: "/shop" },
            { title: "ABOUT US", link: "/about-us" },
            { title: "CONTACT US", link: "/contact-us" },
            { title: "BLOG", link: "/blog" },
            // { title: "CART", link: "/cart", icon: <ShoppingCart size={20} /> },
            // { title: "PROFILE", link: "/profile", icon: <User size={20} /> },
          ].map((item) => (
            <Link
              href={item.link}
              key={item.title}
              onClick={() => setMenuOpen(false)}
              className={`flex py-2 justify-between items-center group ${
                pathname === item.link ? "text-dark-green font-bold" : ""
              }`}
            >
              <span className="relative">
                {item.title}
                <span className={`absolute left-0 bottom-0 h-0.5 bg-dark-green transition-all duration-300 group-hover:w-full ${pathname === item.link ? "w-full" : "w-0"}`} />
              </span>
              <ChevronRight />
            </Link>
          ))}
        </nav>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
