"use client";

import { useRef } from "react";
import Button from "./ui/Button";
import { motion, useInView } from "framer-motion";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full h-screen overflow-hidden font-notosans">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-auto min-w-full min-h-full object-cover z-0 brightness-50"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/1448735/1448735-uhd_2732_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

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
        <h1 className="font-begum text-3xl sm:text-5xl font-semibold tracking-wider mb-6">
          RECLAIM YOUR NATURAL BALANCE
        </h1>
        <p className="text-base font-notosans tracking-wide text-light uppercase lg:py-1 p-1 rounded mb-4">
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
