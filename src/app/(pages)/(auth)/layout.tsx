import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const scrolled=true;
  return (
    <>
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#363f1d] text-black shadow-md" : "bg-transparent text-black"}`}>

    <Navbar scrolled={true} />
    </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
