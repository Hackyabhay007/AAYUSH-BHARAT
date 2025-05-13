"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./ui/Button";

export default function HeroSection() {

   const heroImg = {src: "/hero.png"};

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);
 
  return (
    <section className="font-notosans relative w-full h-screen overflow-hidden">
      <Image
        src={heroImg.src}
        alt="Hero Image"
        width={500}
        height={500}
        className="brightness-50 absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div
        className={` relative z-10 flex flex-col items-center justify-center h-full text-center text-primary transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="font-begum text-3xl sm:text-5xl font-semibold tracking-wider mb-6">
          RECLAIM YOUR NATURAL BALANCE
        </h1>
        <p className="text-base font-notosans tracking-wide bg-beige text-dark px-4 rounded-xl mb-4">
          Ayurvedic Ritual Kits crafted from Granthas to restore your inner
          harmony.
        </p>
        <div className="flex gap-4 mt-3">
          <Button buttonText={'Shop Ritual Kits'} />
          <Button buttonText={'Book Free Consultation'} />
        </div>
      </div>
    </section>
  );
}
