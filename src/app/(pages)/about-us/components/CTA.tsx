// components/CTA.tsx
import { FaLeaf } from "react-icons/fa6";

import { LuMessageSquareText } from "react-icons/lu";
export default function CTA() {
  return (
<section
  className="relative bg-beige bg-center py-32 px-6 md:px-24"
  style={{
    backgroundImage:
      "url('https://images.pexels.com/photos/1050282/pexels-photo-1050282.jpeg?auto=compress&cs=tinysrgb&w=1600')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-beidge text-dark-green bg-opacity-60"></div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h2 className="lg:text-4xl text-2xl md:text-4xl font-medium mb-6 uppercase tracking-wider leading-tight">
      Ayurveda That Feels Like Home
    </h2>
    <p className="text-lg md:text-x mb-8">
      Dive into ancient rituals designed for your body, your rhythm, your healing. <br /> Backed by tradition, delivered with care.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">

      <button className="bg-dark-green text-white px-6 py-3 rounded text-lg transition shadow-lg">
      <div className="flex gap-2 items-center">
        <FaLeaf /> 
        Explore Our Ritual Kits
      </div>
      </button>
      <button className="bg-white hover:bg-gray-100 text-dark-green border border-dark-green px-6 py-3 rounded text-lg transition shadow">
        <div className="flex gap-2 items-center">
          <LuMessageSquareText />
           Join Our Healing Circle
        </div>
      </button>
    </div>
  </div>
</section>

  );
}
