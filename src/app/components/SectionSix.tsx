export default function SectionSix() {
  
const motifs = [
  {
    image: "/logo/Cycle.png", // Replace with your actual image paths
    bg: "bg-[#3f4b2b]",
    text: "Represents inner balance and energy flow. It is like maintaining harmony within oneself.",
  },
  {
    image: "/logo/Balance.png",
    bg: "bg-[#914c32]",
    text: "Symbolizes inner awakening and nurturing from within. The drop represents Ojas.",
  },
  {
    image: "/logo/Ojas.png",
    bg: "bg-dark-green",
    text: "Represents the cyclical nature of healing — how healing is not a one-time act but a constant rhythm in life.",
  },
];
  return (
    <section className="py-16 md:py-24 bg-[#f7f3ef] text-[#363f1d]"> {/* A light beige/off-white background and dark green text */}
      <div className="container mx-auto px-6 md:px-8 text-center max-w-3xl"> {/* Limiting max-width for readability */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Born from Granthas.
          <br className="hidden sm:block" /> {/* Line break on small screens and up for better flow */}
          Built for Her.
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-700"> {/* Slightly lighter text for the copy */}
          Ayudh Bharat revives the original purpose of Ayurveda – healing through daily rituals.
          <br className="hidden sm:block" />
          We don’t treat symptoms. We restore rhythm.
        </p>
        <section className="py-10 px-4 text-center max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-8">Symbols and Motifs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {motifs.map((motif, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-40 h-40 flex items-center justify-center rounded-full ${motif.bg}`}>
              <img src={motif.image} alt={`Motif ${index + 1}`}  className=" max-w-full max-h-full" />
            </div>
            <p className="text-sm text-gray-700 mt-4 max-w-xs">{motif.text}</p>
          </div>
        ))}
      </div>
    </section>
      </div>
    </section>
  );
}
