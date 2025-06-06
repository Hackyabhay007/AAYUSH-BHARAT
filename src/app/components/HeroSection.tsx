"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { useInView } from "framer-motion";
import heroService from "@/appwrite/heroService";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface HeroContent {
  heading: string;
  image: string;
  video: string;
  button1: string;
  button1_slug: string;
  button2: string;
  button2_slug: string;
  sub_text: string;
  mobile_image: string;
}

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [heroContents, setHeroContents] = useState<HeroContent[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch hero content
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        setIsLoading(true);
        const content = await heroService.getHeroContent();
        
        if (Array.isArray(content) && content.length > 0) {
          setHeroContents(content.map(item => ({
            ...item,
            heading: item.heading || '',
            image: item.image || '',
            video: item.video || '',
            button1: item.button1 || '',
            button1_slug: item.button1_slug || '',
            button2: item.button2 || '',
            button2_slug: item.button2_slug || '',
            sub_text: item.sub_text || '',
            mobile_image: item.mobile_image || ''
          })));
        } else {
          setError('No hero content available');
        }
      } catch (error) {
        console.error("Failed to fetch hero content:", error);
        setError('Failed to load hero content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  // Auto slide effect
  useEffect(() => {
    if (heroContents.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroContents.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroContents.length]);

  const changeSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    changeSlide((currentSlide + 1) % heroContents.length);
  };

  const prevSlide = () => {
    changeSlide((currentSlide - 1 + heroContents.length) % heroContents.length);
  };
  
  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-black">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }

  if (error || heroContents.length === 0) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-black">
        <div className="text-2xl text-white">{error || 'No content available'}</div>
      </div>
    );
  }

  const heroContent = heroContents[currentSlide];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10">
        {/* Background media */}
        <div className="absolute inset-0">
          {heroContent.video ? (
            <video
              key={currentSlide}
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={heroContent.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              key={currentSlide}
              src={heroContent.image || '/hero.png'}
              alt={heroContent.heading || "Hero background"}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
        </div>

        {/* Navigation Buttons */}
        {heroContents.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 z-50 transition-all duration-300"
              aria-label="Previous slide"
            >
              <IoIosArrowBack size={28} className="text-white drop-shadow-lg" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 z-50 transition-all duration-300"
              aria-label="Next slide"
            >
              <IoIosArrowForward size={28} className="text-white drop-shadow-lg" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {heroContents.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
            {heroContents.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-white' : 'w-3 bg-white hover:bg-white/90'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-50 container mx-auto px-4">
          <div ref={ref} className="h-full flex flex-col text-center lg:text-left items-center justify-center lg:items-start max-w-2xl">
            {heroContent.heading && (
              <h1 className="text-4xl sm:text-6xl font-bold tracking-wider mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {heroContent.heading}
              </h1>
            )}
            
            {heroContent.sub_text && (
              <p className="text-lg sm:text-xl tracking-wide py-2 mb-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] max-w-xl font-medium">
                {heroContent.sub_text}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mt-3">
              {heroContent.button1 && heroContent.button1_slug && (
                <Button
                  buttonText={heroContent.button1}
                  href={heroContent.button1_slug}
                  className="bg-white text-black border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 min-w-[150px] text-lg font-semibold px-6 py-3 shadow-lg"
                />
              )}
              {heroContent.button2 && heroContent.button2_slug && (
                <Button
                  buttonText={heroContent.button2}
                  href={heroContent.button2_slug}
                  className="border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 min-w-[150px] text-lg font-semibold px-6 py-3 shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
