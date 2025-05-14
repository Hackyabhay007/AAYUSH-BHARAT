// PromiseSection.tsx
import { ShieldCheck, Leaf, HandHeart } from 'lucide-react';

const promises = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
    title: "Authentic Formulas",
    desc: "100% Classical Ayurvedic recipes from Charaka, Sushruta, and Bhaishajya Granthas.",
  },
  {
    icon: <Leaf className="w-10 h-10 text-green-600" />,
    title: "No Synthetics",
    desc: "Absolutely no shortcuts, no chemicals, and no dilution of Ayurvedic wisdom.",
  },
  {
    icon: <HandHeart className="w-10 h-10 text-green-600" />,
    title: "Physician-Trusted",
    desc: "Time-tested, doctor-approved rituals with real healing value.",
  },
];

export default function PromiseSection() {
  return (
    <section className="py-20 px-6 md:px-24 bg-gradient-to-b from-green-50 to-white">
      <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
        Our Promise to You
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {promises.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-8 text-center shadow hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
