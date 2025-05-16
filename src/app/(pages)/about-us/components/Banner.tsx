export default function Banner() {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center brightness-75 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      {/* Dark overlay for text focus */}
      <div className="absolute inset-0 bg-opacity-50" />

      {/* Main Heading */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-white text-2xl md:text-6xl font-extrabold leading-tight tracking-wide drop-shadow-lg">
          Ayurveda Reimagined.<br />
          Rooted in Tradition, Designed for Today.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
          Discover wellness crafted from age-old granthas and pure nature. Embrace a better you.
        </p>
      </div>
    </section>
  );
}
