"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SectionSix() {
  const motifs = [
    {
      image: "/logo/Cycle.png",
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

        <section className="py-10 px-4 text-center max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl font-semibold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Symbols and Motifs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {motifs.map((motif, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-40 h-40 flex items-center justify-center rounded-full ${motif.bg}`}
                >
                  <Image
                    width={500}
                    height={500}
                    src={motif.image}
                    alt={`Motif ${index + 1}`}
                    className="max-w-full max-h-full hover:scale-110 duration-300"
                  />
                </div>
                <p className="text-sm text-gray-700 mt-4 max-w-xs">{motif.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
