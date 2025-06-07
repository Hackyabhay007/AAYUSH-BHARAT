"use client";
import Categories from "@/app/components/Categories";
import HeroSection from "@/app/components/HeroSection"
import Navbar from "@/app/components/Navbar"
import SectionFive from "@/app/components/SectionFive";
import SectionFour from "@/app/components/SectionFour";
import TextSlider from "@/app/components/TextSlider";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import SectionSix from "@/app/components/SectionSix";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import ReelSection from "@/components/ReelSection";

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
      <HeroSection />
      <TextSlider />
      <Categories />
      <FeaturedProducts />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <ReelSection title="AS SEEN AS" />
      <Footer />
    </>
  );
}
