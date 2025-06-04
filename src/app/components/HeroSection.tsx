"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { motion, useInView } from "framer-motion";
import videoService from "@/appwrite/video";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [videoUrl,setVideoUrl]=useState(null)
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoList = await videoService.fetchVideo();
        if (videoList && videoList.length > 0) {
          setVideoUrl(videoList[0].videourl); // Ensure this matches your DB field
        }
      } catch (error) {
        console.error("Failed to fetch video:", error);
      }
    };

    fetchVideo();
  }, []);


  return (
    <section className="relative w-full h-screen overflow-hidden   ">
      {/* Background Video */}
        {videoUrl && (
        <video
          className="absolute top-0 left-0 w-auto min-w-full min-h-full object-cover z-0 brightness-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-10 lg:bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Overlay Content */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 flex lg:px-18 px-6 lg:max-w-2xl flex-col text-center lg:text-left items-center justify-center h-full lg:items-start text-primary"
      >
        <h1 className="   text-3xl sm:text-5xl font-semibold tracking-wider mb-6">
          RECLAIM YOUR NATURAL BALANCE
        </h1>
        <p className="text-base    tracking-wide text-light uppercase lg:py-1 p-1 rounded mb-4">
          Ayurvedic Ritual Kits crafted from Granthas to restore your inner
          harmony.
        </p>
        <div className="flex gap-4 mt-3">
          <Button
            buttonText="Shop Ritual Kits"
            className="bg-light text-dark border border-dark hover:bg-dark hover:text-light hover:border-dark"
          />
          <Button
            buttonText="Book Free Consultation"
            className="hover:bg-light hover:text-dark hover:border-light"
          />
        </div>
      </motion.div>
    </section>
  );
}
