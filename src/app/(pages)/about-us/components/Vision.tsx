export default function Vision() {
  return (
    <section className="bg-beige text-dark-green py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Text Column */}
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
            NATURE’S WISDOM,<br />OUR VISION
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed">
            We revive ancient Ayurvedic wisdom through{' '}
            <span className="text-dark font-medium">
              boxed rituals
            </span>{' '}
            — not pills or shortcuts. <br />
            Just time-tested, physician-trusted traditions, crafted for the modern Indian woman seeking holistic wellness.
          </p>
        </div>

        {/* Right Image Column */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://sahara-cosmetics-digifist.myshopify.com/cdn/shop/files/pexels-monstera-6979015_2.jpg?v=1690543145&width=720" // replace with correct image path
            alt="Vision"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
