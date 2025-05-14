// components/CTA.tsx
export default function CTA() {
  return (
<section
  className="relative bg-cover bg-center py-24 px-6 md:px-24 text-white"
  style={{
    backgroundImage:
      "url('https://images.pexels.com/photos/1050282/pexels-photo-1050282.jpeg?auto=compress&cs=tinysrgb&w=1600')", // Herbal/spa aesthetic
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Ayurveda That Feels Like Home
    </h2>
    <p className="text-lg md:text-xl text-gray-200 mb-8">
      Dive into ancient rituals designed for your body, your rhythm, your healing. Backed by tradition, delivered with care.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg transition shadow-lg">
        🌿 Explore Our Ritual Kits
      </button>
      <button className="bg-white hover:bg-gray-100 text-green-700 border border-green-700 px-6 py-3 rounded-full text-lg transition shadow">
        💬 Join Our Healing Circle
      </button>
    </div>
  </div>
</section>

  );
}
