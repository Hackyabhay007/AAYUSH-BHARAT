"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SectionSix() {
  const motifs = [
    {
      image: "/logo/Cycle.png",
      bg: "bg-[#3f4b2b]",
      heading:"Balance ",
      text: "The symbol of inner flow and calm, We begin with balance. This symbol reflects alignment within calming your hormones, grounding your thoughts, and reconnecting your body with its natural rhythm. Because healing always starts from within.",
    },
    {
      image: "/logo/Balance.png",
      bg: "bg-[#914c32]",
      heading:"Awaken",
      text: "The symbol of Ojas, your inner vitality This flame-like moƟf holds a sacred drop of Ojas the Ayurvedic essence of glow, strength, and immunity. It reminds us to detox gently, nourish deeply, and protect our vital energy as we heal.",
    },
    {
      image: "/logo/Ojas.png",
      bg: "bg-dark-green",
      heading:"Regulate",
      text: "The symbol of rhythm and return Healing is a process, not a one-Ɵme fix. This cyclical form mirrors your natural cycle your energy, your flow, your return to balance. It’s about restoring what was always yours.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f7f3ef] text-[#363f1d]">
      <div className="container mx-auto px-6 md:px-8 text-center max-w-3xl">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Born from Granthas.
          <br className="hidden sm:block" />
          Built for Her.
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl leading-relaxed text-gray-700"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ayudh Bharat revives the original purpose of Ayurveda – healing through daily rituals.
          <br className="hidden sm:block" />
          We don’t treat symptoms. We restore rhythm.
        </motion.p>

        <section className="py-10 px-4 items-center
  justify-center place-items-center text-center max-w-5xl mx-auto">
          {/* <motion.h2
            className="text-2xl font-semibold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Symbols and Motifs
          </motion.h2> */}

          <div className="grid grid-cols-1 lg:w-4xl  md:grid-cols-3 gap-5">
            {motifs.map((motif, index) => (
              <motion.div
                key={index}
                className="flex  flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
               
                <div
                  className={`w-45 h-45 flex items-center justify-center rounded-full ${motif.bg}`}
                >
                  <Image
                    width={500}
                    height={500}
                    src={motif.image}
                    alt={`Motif ${index + 1}`}
                    className="max-w-full max-h-full hover:scale-110 duration-300"
                  />
                </div>
                 <h1 className="lg:text-2xl py-4 text-xl font-medium tracking-wider uppercaset text-dark-green">{motif.heading}</h1>
                <p className="text-sm text-gray-700 max-w-xs ">{motif.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
