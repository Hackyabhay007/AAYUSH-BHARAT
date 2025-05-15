"use client";

import React from "react";
import { Droplet, HeartPulse, Moon } from "lucide-react";
import { motion } from "framer-motion";

const RitualKits = () => {
  return (
    <section className="justify-center bg-light py-12 my-6 flex flex-col gap-6 px-4">
      <h1 className="font-semibold uppercase tracking-wider text-dark-green text-4xl text-center">
        Our Ayurvedic Ritual Kits
      </h1>

      {/* Grid for the kit boxes */}
      <div className="flex-1/2 max-w-5xl mt-6 mx-auto grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Heavy Flow Kit */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl bg-dark-green text-beige p-8 overflow-hidden shadow-2xl flex flex-col items-center"
        >
          <div className="bg-beige text-dark-green p-4 rounded-full mb-4">
            <Droplet size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">Heavy Flow Kit</h2>
          <p className="mb-4 flex-grow text-center">
            Regulates excessive flow and calms Pitta
          </p>
        </motion.div>

        {/* PCOD / PCOS Kit */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-beige text-dark-green p-8 shadow-2xl flex flex-col items-center"
        >
          <div className="bg-dark-green text-beige p-4 rounded-full mb-4">
            <HeartPulse size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">PCOD / PCOS Kit</h2>
          <p className="mb-4 flex-grow text-center">
            Supports cyst reduction and hormonal balance
          </p>
        </motion.div>

        {/* Low / Delayed Periods Kit */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-dark-green text-light p-8 shadow-2xl flex flex-col items-center"
        >
          <div className="bg-beige text-dark-green p-4 rounded-full mb-4">
            <Moon size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">
            Low / Delayed Periods Kit
          </h2>
          <p className="mb-4 flex-grow text-center">
            Restores flow and improves ovulation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RitualKits;
