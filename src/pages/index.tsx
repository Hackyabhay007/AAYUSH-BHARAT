import Categories from "@/components/Categories";
import FeatureSection from "@/components/FeatureCards";
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import RitualKits from "@/components/RitualKits";
import SectionFive from "@/components/SectionFive";
import SectionFour from "@/components/SectionFour";
import TextSlider from "@/components/TextSlider";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SectionSix from "@/components/SectionSix";

export default function Home() {
     const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
  
    <>
   <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#363f1d] text-black shadow-md" : "bg-transparent text-black"}`}>

    <Navbar scrolled={scrolled} />
    </div>
    <HeroSection/>
    <TextSlider/>
    <Categories/>
    <RitualKits/>
    <SectionFour/>
    <SectionFive/>
    <SectionSix/>
    <Footer/>
    </>
  );
}
