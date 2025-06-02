"use client";

import { FaInstagram } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

type ReelVideo = {
  id: string;
  videourl: string;
  link?: string;
};

interface ReelSectionProps {
  title?: string;
  instagramLink?: string;
  videos: ReelVideo[];
  isfollowShow?:boolean;
}

export default function ReelSection({
  title = "SHOPPABLE",
  instagramLink = "https://www.instagram.com/",
  videos,
  isfollowShow = false,
}: ReelSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="px-4 lg:px-20 py-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="lg:text-4xl text-2xl text-dark-green font-semibold">{title}</h2>
       {isfollowShow && (<a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="border px-4 py-2 lg:text-sm text-xs hover:bg-dark-green hover:text-white transition"
        >
          FOLLOW US
        </a>)}
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={!isMobile}
        spaceBetween={20}
        direction={"horizontal"}
        slidesPerView={isMobile ? 1 : 4}
        className={`w-full text-dark ${
          isMobile ? "h-[500px] overflow-y-auto" : "h-auto"
        }`}
      >
        {videos.map((video, index) => (
          <SwiperSlide
            key={video.id || index}
            className={isMobile ? "!h-[500px]" : ""}
          >
            <a
              href={video.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded overflow-hidden block"
            >
              <video
                src={video.videourl}
                className="w-full h-[550px] object-cover"
                loop
                muted
                autoPlay
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <FaInstagram className="text-white text-3xl" />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
