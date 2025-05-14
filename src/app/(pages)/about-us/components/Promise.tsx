// PromiseSection.tsx
import { ShieldCheck, Leaf, HandHeart } from 'lucide-react';

const promises = [
  {
    icon: <ShieldCheck className="w-24 h-24 border rounded-full p-2 bg-dark-green border-none text-beige" />,
    title: "Authentic Formulas",
    desc: "100% Classical Ayurvedic recipes from Charaka, Sushruta, and Bhaishajya Granthas.",
  },
  {
    icon: <Leaf className="w-24 h-24 border rounded-full p-2 bg-dark-green border-none text-beige" />,
    title: "No Synthetics",
    desc: "Absolutely no shortcuts, no chemicals, and no dilution of Ayurvedic wisdom.",
  },
  {
    icon: <HandHeart className="w-24 h-24 border rounded-full p-2 bg-dark-green border-none text-beige" />,
    title: "Physician-Trusted",
    desc: "Time-tested, doctor-approved rituals with real healing value.",
  },
];

export default function PromiseSection() {
  return (
    <section className="py-20 px-6 md:px-24 bg-dark-green text-light">
      <h2 className="text-4xl uppercase tracking-wider font-medium text-center mb-12">
        Our Promise to You
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {promises.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/70 h-72 flex justify-center flex-col backdrop-blur-md border border-gray-100 rounded-2xl p-8 text-center shadow hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-2xl tracking-wide font-medium text-dark-green mb-2">{item.title}</h3>
            <p className="text-dark text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
