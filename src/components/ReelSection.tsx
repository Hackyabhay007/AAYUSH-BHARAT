"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import reelService from "@/appwrite/reelService";
import Loader from "./Loader";
import "swiper/css";
import "swiper/css/navigation";

type ReelVideo = {
  id: string;
  videourl: string;
};

interface ReelSectionProps {
  title?: string;
}

export default function ReelSection({
  title = "AS SEEN AS",
}: ReelSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [videos, setVideos] = useState<ReelVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setIsLoading(true);
        const reelData = await reelService.getReels();
        setVideos(reelData || []);
      } catch (error) {
        console.error("Error fetching reels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReels();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isLoading) {
    return (
      <section className="px-4 lg:px-20 py-10 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="lg:text-4xl text-2xl text-dark-green font-semibold">
            {title}
          </h2>
        </div>
        <Loader />
      </section>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <section className="px-4 lg:px-20 py-10 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="lg:text-4xl text-2xl text-dark-green font-semibold">
            {title}
          </h2>
        </div>
        <div className="flex justify-center items-center h-[550px] bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No reels available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 lg:px-20 py-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="lg:text-4xl text-2xl text-dark-green font-semibold">
          {title}
        </h2>
      </div>      <Swiper
        modules={[Navigation]}
        navigation={videos.length > 4}
        spaceBetween={20}
        direction={"horizontal"}
        slidesPerView={isMobile ? 1 : 4}
        className={`w-full text-dark ${isMobile ? "h-[500px] overflow-y-auto" : "h-auto"}`}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={video.id || index} className={isMobile ? "!h-[500px]" : ""}>
            <div className="relative rounded overflow-hidden block h-[450px]">
              <video
                src={video.videourl}
                className="w-full h-full object-cover"
                loop
                muted
                autoPlay
                playsInline
                preload="auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
