"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCalendarDay } from "react-icons/fa";
import { GiHerbsBundle, GiDroplets } from "react-icons/gi";

const data = [
  {
    id: "balance",
    icon: <FaCalendarDay size={84} className="text-dark-green bg-light p-2 rounded-full" />,
    title: "Balance",
    description: "Hormonal rhythm using herbs like Shatavari & Ashoka",
  },
  {
    id: "detox",
    icon: <GiDroplets size={84} className="text-dark-green bg-light p-2 rounded-full" />,
    title: "Detox",
    description: "Clear toxins (Ama) from digestion and metabolism",
  },
  {
    id: "regulate",
    icon: <GiHerbsBundle size={84} className="text-dark-green bg-light p-2 rounded-full" />,
    title: "Regulate",
    description: "Restore healthy menstrual cycles",
  },
];

export default function SectionFour() {
  return (
    <section className="bg-beige py-16 px-4 text-center">
      <h2 className="text-2xl md:text-4xl text-dark-green tracking-wider font-bold mb-12">
        WHY 3 CAPSULES?
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl mx-auto">
        {data.map(({ id, icon, title, description }, i) => (
          <motion.div
            key={id}
            className="bg-dark-green flex justify-center h-64 flex-col items-center rounded-2xl shadow-lg p-6 w-70 lg:w-3xl md:w-[300px] cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: [0, 1.5, -1.5, 0], // gentle tilt on hover
              transition: { duration: 0.4 },
            }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-2xl uppercase font-light text-light mb-3">{title}</h3>
            <p className="text-light uppercase text-sm font-extralight tracking-wide">
              {description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-12 text-lg italic text-dark"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        *One ritual. Three classical medicines. Designed to heal from root.*
      </motion.p>
    </section>
  );
}
