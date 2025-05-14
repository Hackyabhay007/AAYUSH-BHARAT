// components/Vision.tsx
export default function Vision() {
  return (
    <section className="relative py-20 px-6 md:px-24 bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
      {/* Decorative Ayurveda icon background */}
      <img
        src="https://images.pexels.com/photos/1662290/pexels-photo-1662290.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Herbs"
        className="absolute opacity-10 top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-green-200">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-green-800 mb-6">
          Our Vision
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          To revive ancient Ayurvedic wisdom through <span className="text-green-700 font-medium">boxed rituals</span>
          — not pills, not shortcuts. Just time-tested, physician-trusted traditions tailored for the modern Indian woman.
        </p>
      </div>
    </section>
  );
}
