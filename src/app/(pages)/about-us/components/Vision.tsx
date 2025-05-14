// components/Vision.tsx
export default function Vision() {
  return (
    <section className="relative py-20 px-6 md:px-24 bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
      <div className="flex justify-center items-center flex-col relative z-10 h-64 max-w-4xl mx-auto text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-green-200">
        <h2 className="text-4xl md:text-5xl font-serif font-medium  text-dark-green tracking-wider uppercase mb-6">
          Our Vision
        </h2>
        <p className="text-lg md:text-xl text-dark leading-relaxed">
          To revive ancient Ayurvedic wisdom through <span className="text-green-700 font-medium">boxed rituals</span>
          — not pills, not shortcuts. <br /> Just time-tested, physician-trusted traditions tailored for the modern Indian woman.
        </p>
      </div>
    </section>
  );
}
