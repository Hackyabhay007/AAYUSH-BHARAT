"use client";
import Categories from "@/app/components/Categories";
import HeroSection from "@/app/components/HeroSection"
import Navbar from "@/app/components/Navbar"
// import RitualKits from "@/app/components/RitualKits";
import SectionFive from "@/app/components/SectionFive";
import SectionFour from "@/app/components/SectionFour";
import TextSlider from "@/app/components/TextSlider";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import SectionSix from "@/app/components/SectionSix";
import FeaturedProducts from "@/app/components/FeaturedProducts";
// import VideoSection from "./components/VideoSection";
import ReelSection from "@/components/ReelSection";
import videoService from "@/appwrite/video";
import config from "@/config/config";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [videos, setVideos] = useState<{
    id
:string;
videoname
: 
string;
videourl
: 
string
  }[]>([]); // Adjust type as needed

  async function fetchVideo() {
    const videos = await videoService.fetchVideo(config.appwriteReelCollectionId);
    setVideos(videos); // Set the fetched videos in state
  }

  useEffect(() => {
    fetchVideo();

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
      {/* <RitualKits /> */}
      <SectionFour />
      <SectionFive />
      <SectionSix />
      {/* <VideoSection/> */}
      <ReelSection isfollowShow={true} title="AS SEEN AS" videos={videos} />
      <Footer />
    </>
  );
}
