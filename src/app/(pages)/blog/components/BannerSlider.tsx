// 'use client';
// import { useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react'; // Install lucide-react if not already

// const banners = [
//   {
//     title: 'Open Grantha or Illustrated Herbs',
//     subtitle: 'Unlock Ayurvedic Wisdom Visually',
//     image: 'https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg?auto=compress&cs=tinysrgb&w=1600',
//   },
//   {
//     title: 'Sourced from Charaka & Sushruta',
//     subtitle: 'Ancient Scripts. Modern Meaning.',
//     image: 'https://images.pexels.com/photos/942109/pexels-photo-942109.jpeg?auto=compress&cs=tinysrgb&w=1600',
//   },
//   {
//     title: 'Herbal Wisdom for Every Woman',
//     subtitle: 'Sourced from Charaka & Sushruta',
//     image: 'https://images.pexels.com/photos/105028/pexels-photo-105028.jpeg?auto=compress&cs=tinysrgb&w=1600',
//   },
// ];

// export default function BannerSlider() {
//   const [current, setCurrent] = useState(0);

//   const next = () => setCurrent((prev) => (prev + 1) % banners.length);
//   const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

//   useEffect(() => {
//     const timer = setInterval(next, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
//       {banners.map((banner, i) => (
//         <div
//           key={i}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//             i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
//           }`}
//         >
//           <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
//             <h2 className="text-3xl md:text-5xl font-bold">{banner.title}</h2>
//             <p className="mt-2 text-lg md:text-xl">{banner.subtitle}</p>
//           </div>
//         </div>
//       ))}

//       {/* Arrows */}
//       <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60">
//         <ChevronLeft size={24} />
//       </button>
//       <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60">
//         <ChevronRight size={24} />
//       </button>
//     </div>
//   );
// }


"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    title: "Open Grantha or Illustrated Herbs",
    subtitle: "99.5% NATURAL. 100% YOU.",
    description: "Unlock Ayurvedic Wisdom Visually",
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
    <div className="relative">
      <div ref={sliderRef} className="keen-slider h-screen w-full">
        {slides.map((slide, index) => (
  <div
  key={index}
  className="keen-slider__slide relative h-screen w-full"
  style={{ backgroundColor: slide.bgColor }}
>
  {/* Image as base layer */}
  <Image
  width={500}
  height={500}
    src={slide.imageUrl}
    alt={`Slide ${index + 1}`}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay Text */}
  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6 z-10">
    <h2 className="text-4xl font-medium tracking-wider uppercase md:text-5xl mb-3">{slide.title}</h2>
    {/* <p className="pb-2   md:text-base">{slide.subtitle}</p> */}
    <p className="text-lg md:text-xl">{slide.description}</p>
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
