import {
  Rabbit,
  Leaf,
  CreditCard,
  ShieldCheck,
  HandHeart,
} from "lucide-react";

const promises = [
  {
    icon: <ShieldCheck size={32} className="text-white" />,
    title: "Authentic Formulas",
    description:
      "100% Classical Ayurvedic recipes from Charaka, Sushruta, and Bhaishajya Granthas.",
  },
  {
    icon: <Leaf size={32} className="text-white" />,
    title: "No Synthetics",
    description:
      "Absolutely no shortcuts, no chemicals, and no dilution of Ayurvedic wisdom.",
  },
  {
    icon: <HandHeart size={32} className="text-white" />,
    title: "Physician-Trusted",
    description:
      "Time-tested, doctor-approved rituals with real healing value.",
  },
];
export default function Promise() {
  return (
    <section className="bg-white flex justify-center items-center flex-col gap-16 py-24 px-6 md:px-16 border-t border-gray-200">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-dark-green tracking-wide">
          OUR PROMISE TO YOU
        </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-y-12 gap-x-10">
          {promises.map((promise, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-black rounded-full p-4 mb-6">
                {promise.icon}
              </div>
              <h3 className="text-lg uppercase font-medium tracking-wider">
                {promise.title}
              </h3>
              <p className="opacity-70 text-sm font-light max-w-64">{promise.description}</p>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
