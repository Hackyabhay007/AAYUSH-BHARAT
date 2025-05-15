"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    title: "Open Grantha or Illustrated Herbs",
    subtitle: "99.5% Nature. 100% You. Unlock Ayurvedic Wisdom Visuall",
    description: "Unlock Ayurvedic Wisdom Visually 99.5% NATURAL. 100% You. Unlock Ayurvedic Wisdom Visuall ",
    imageUrl: "https://images.pexels.com/photos/31018432/pexels-photo-31018432/free-photo-of-european-robin-perched-on-tree-branch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "#f5ebdf",
  },
  {
    title: "Sourced from Charaka & Sushruta",
    subtitle: "PURE. POWERFUL. PLANT-BASED.",
    description: "Ancient Scripts. Modern Meaning.",
    imageUrl: "https://images.pexels.com/photos/31984778/pexels-photo-31984778/free-photo-of-aerial-view-of-green-forest-with-circular-structure.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "#e8f0f2",
  },
  {
    title: "Herbal Wisdom for Every Woman.",
    subtitle: "BEAUTY WITHOUT COMPROMISE.",
    description: "Sourced from Charaka & Sushruta",
    imageUrl: "https://images.pexels.com/photos/13583948/pexels-photo-13583948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "#fff7e6",
  },
];

const BannerSlider = () => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    created() {
      setLoaded(true);
    },
  });

  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [slider]);

  useEffect(() => {
    if (!slider.current) return;
    slider.current.on("slideChanged", (s) => setCurrentSlide(s.track.details.rel));
  }, [slider]);
console.log(currentSlide);

  return (
    <div className="relative h-136">
      <div ref={sliderRef} className="keen-slider w-full">
        {slides.map((slide, index) => (
  <div
  key={index}
  className="keen-slider__slide relative h-136 w-full"
  style={{ backgroundColor: slide.bgColor }}
>
  {/* Image as base layer */}
  <Image
  width={500}
  height={300}
    src={slide.imageUrl}
    alt={`Slide ${index + 1}`}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay Text */}
  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6 z-10">
    <h2 className="text-4xl font-medium tracking-wider uppercase md:text-5xl mb-3">{slide.title}</h2>
    {/* <p className="pb-2   md:text-base">{slide.subtitle}</p> */}
    <p className="text-lg font-light md:text-xl">{slide.description}</p>
    <p className="text-lg md:text-xl font-light">{slide.subtitle}</p>
      <button className="text-beige border-beige border-2  px-8 py-3 mt-4 rounded text-lg transition shadow-lg">
          <div className="flex gap-2 items-center">
           
            Explore Now
          </div>
          </button>
  </div>
</div>



        ))}
      </div>

      {loaded && slider.current && (
        <div className="absolute bottom-4 right-6 z-20 flex items-center gap-6">
          <button
            onClick={() => slider.current?.prev()}
            className="transition transform -scale-x-100 text-white text-2xl hover:scale-110 hover:-scale-x-100"
          >
            {/* Left Arrow SVG */}
            <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.2383 29.3713C33.565 24.2506 35.4083 22.1009 40.0008 20.0141C35.3058 17.7032 33.4834 15.5456 31.2383 10.6288" stroke="#fff" />
              <path d="M0 20H39.5675" stroke="#fff" />
            </svg>
          </button>
          <button
            onClick={() => slider.current?.next()}
            className="text-white text-2xl hover:scale-110 transition"
          >
            {/* Right Arrow SVG */}
            <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20H39.5675" stroke="#ffff" />
              <path d="M31.2383 29.3713C33.565 24.2506 35.4083 22.1009 40.0008 20.0141C35.3058 17.7032 33.4834 15.5456 31.2383 10.6288" stroke="#ffff" />
            </svg>

          </button>
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
