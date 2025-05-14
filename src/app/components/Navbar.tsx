import Image from "next/image";
interface NavbarProps {
  scrolled: boolean;
}

const logo={
    src:"/logo/Artboard_1_copy_15@4x.png"

}
const Navbar = (scrolled: NavbarProps) => {
  return (
    <>

      {/* Main Navbar */}
      <div
        className={`px-6 font-notosans md:px-12 flex items-center justify-between shadow-md ${
          scrolled ? "border-b border-primary" : "border-none border-transparent"
        }`}
      >
        {/* Left Nav */}
        <nav className=" hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:underline">
            <Image 
                src={logo.src}
                width={120}
                height={150}
                className="object-cover "
                alt="AayudhBharat Logo"
            />
          </a>
        </nav>

      
        <div className="flex items-center gap-6 text-primary text-sm">
          <a href="#" className="hidden md:inline hover:underline">
            SHOP
          </a>
          <a href="#" className="hidden md:inline hover:underline">
            ABOUT US
          </a>
          <a href="#" className="hidden md:inline hover:underline">
            CONTACT US
          </a>
          <a href="#" className="hidden md:inline hover:underline">
            BLOG
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
