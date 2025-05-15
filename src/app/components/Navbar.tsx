// import Image from "next/image";
// interface NavbarProps {
//   scrolled: boolean;
// }

// const logo={
//     src:"/logo/Artboard_1_copy_15@4x.png"

// }
// const Navbar = (scrolled: NavbarProps) => {
//   return (
//     <>

//       {/* Main Navbar */}
//       <div
//         className={`px-6 font-notosans md:px-12 flex items-center justify-between shadow-md ${
//           scrolled ? "border-b border-primary" : "border-none border-transparent"
//         }`}
//       >
//         {/* Left Nav */}
//         <nav className=" hidden md:flex gap-6 text-sm">
//           <a href="#" className="hover:underline">
//             <Image 
//                 src={logo.src}
//                 width={120}
//                 height={150}
//                 className="object-cover "
//                 alt="AayudhBharat Logo"
//             />
//           </a>
//         </nav>

      
//         <div className="flex items-center gap-6 text-primary text-sm">
//           <a href="#" className="hidden md:inline hover:underline">
//             SHOP
//           </a>
//           <a href="#" className="hidden md:inline hover:underline">
//             ABOUT US
//           </a>
//           <a href="#" className="hidden md:inline hover:underline">
//             CONTACT US
//           </a>
//           <a href="#" className="hidden md:inline hover:underline">
//             BLOG
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

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
        <a href="#" className="flex items-center">
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
          <a href={"/"} className="hover:underline">SHOP</a>
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

      {/* Mobile Fullscreen Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white font-notosans text-dark">
          {/* Top bar inside drawer */}
          <div className="flex items-center bg-dark-green justify-between px-6 py-4 border-b">
            <Image
              src={logo.src}
              width={100}
              height={100}
              alt="Logo"
              className="object-cover"
            />
            <div className="flex text-primary items-center gap-4">
              <button onClick={() => setMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col px-6 py-4 gap-6 text-lg">
            {[
              "SHOP",
              "HOME",
              "ABOUT US",
              "BLOG"
            ].map((item) => (
              <a
                href="#"
                key={item}
                className="flex py-2 justify-between items-center hover:underline"
              >
                {item} <ChevronRight />
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
