'use client';

import React from "react";
import { Droplet, HeartPulse, Moon } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const RitualKits = () => {
  const kits = [
    {
      title: "Heavy Flow Kit",
      description: "Regulates excessive flow and calms Pitta",
      icon: <Droplet size={28} />,
      bg: "bg-dark-green",
      text: "text-beige",
      iconBg: "bg-beige text-dark-green",
    },
    {
      title: "PCOD / PCOS Kit",
      description: "Supports cyst reduction and hormonal balance",
      icon: <HeartPulse size={28} />,
      bg: "bg-beige",
      text: "text-dark-green",
      iconBg: "bg-dark-green text-beige",
    },
    {
      title: "Low / Delayed Periods Kit",
      description: "Restores flow and improves ovulation",
      icon: <Moon size={28} />,
      bg: "bg-dark-green",
      text: "text-light",
      iconBg: "bg-beige text-dark-green",
    },
  ];

  return (
    <section className="justify-center bg-light py-12 my-6 flex flex-col gap-6 px-4">
      <h1 className="font-semibold uppercase tracking-wider text-dark-green lg:text-4xl text-2xl text-center">
        Our Ayurvedic Ritual Kits
      </h1>

      <div className="flex flex-col items-center max-w-5xl mt-6 mx-auto lg:grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {kits.map((kit, index) => (
          <motion.div
            key={kit.title}
            className={`rounded-2xl w-70 lg:w-auto shadow-2xl p-8 flex flex-col items-center ${kit.bg} ${kit.text}`}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`p-4 rounded-full mb-4 ${kit.iconBg}`}>
              {kit.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center">{kit.title}</h2>
            <p className="mb-4 flex-grow text-center">{kit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RitualKits;
