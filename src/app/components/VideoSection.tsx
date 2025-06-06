"use client";

import videoService from "@/appwrite/video";
import config from "@/config/config";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";

const VIDEOS_PER_PAGE = 4;

type Video = { id: string; videourl: string; videoname: string; link?: string };

export default function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await videoService.fetchVideo(config.appwriteReelCollectionId);
        if(fetchedVideos && fetchedVideos.length > 0){

          setVideos(fetchedVideos || []); // fallback to empty array if null
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(startIndex, startIndex + VIDEOS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <section className="px-4 lg:px-12 py-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl text-dark-green font-semibold">SHOPPABLE</h2>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="border px-4 py-2 text-sm hover:bg-black hover:text-white transition"
        >
          FOLLOW US
        </a>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 relative">
        {currentVideos.map((video, index) => (
          <a
            key={video.id || index}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group rounded overflow-hidden"
          >
            <video
              src={video.videourl}
              className="w-full h-[350px] object-cover"
              loop
              muted
              autoPlay
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <FaInstagram className="text-white text-3xl" />
            </div>
          </a>
        ))}

        {/* Arrows at Bottom Right */}
        {videos.length > VIDEOS_PER_PAGE && (
          <div className="absolute bottom-0 right-0 flex gap-2 p-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="bg-white p-2 rounded-full shadow disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-white p-2 rounded-full shadow disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
