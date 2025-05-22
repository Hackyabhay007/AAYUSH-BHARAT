"use client";

import { useRef } from "react";
import Image from "next/image";

type Person = {
  name: string;
  description: string;
  image: string;
};

const people: Person[] = [
  {
    name: "John Morgan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://www.zeroharm.in/cdn/shop/files/Sesbania_Grandiflora_extract-01_600x.png?v=1707390029",
  },
  {
    name: "Ellie Anderson",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://www.zeroharm.in/cdn/shop/files/Sesbania_Grandiflora_extract-01_600x.png?v=1707390029",
  },
  {
    name: "Nia Adebayo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://www.zeroharm.in/cdn/shop/files/Sesbania_Grandiflora_extract-01_600x.png?v=1707390029",
  },
  {
    name: "Liam Scott",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://www.zeroharm.in/cdn/shop/files/Sesbania_Grandiflora_extract-01_600x.png?v=1707390029",
  },
  {
    name: "Sophia Lee",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://www.zeroharm.in/cdn/shop/files/Sesbania_Grandiflora_extract-01_600x.png?v=1707390029",
  },
];

export default function CardSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340; // Width of one card + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full hide-scroll-x max-w-7xl mx-auto px-4 py-10 text-dark-green">
   
      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
      >
        &#8592;
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
      >
        &#8594;
      </button>

      {/* Scrollable card row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory px-2 py-4 hide-scroll-x"
        style={{ scrollBehavior: "smooth" }}
      >
        {people.map((person, index) => (
          <div
            key={index}
            className="min-w-[400px] max-w-[600px] bg-beige text-black rounded-xl p-6 flex flex-col items-center snap-center flex-shrink-0 shadow-md"
          >
            <div className="w-46 h-46 rounded-full overflow-hidden mb-4">
              <Image
                src={person.image}
                alt={person.name}
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
            <h1 className="text-lg lg:text-2xl font-medium uppercase tracking-wider text-dark-green mb-2">{person.name}</h1>
            <p className="lg:text-base w-2/3 text-sm font-light tracking-wide text-center mb-4">{person.description}</p>
            <button className="px-4 py-2 bg-dark-green text-white rounded hover:bg-dark">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
