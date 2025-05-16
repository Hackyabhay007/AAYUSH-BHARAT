"use client";

import React, { useRef } from "react";
import { FaLeaf, FaLock, FaHandPeace } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

interface Feature {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const features: Feature[] = [
  {
    icon: <FaHandPeace className="text-light text-2xl" />,
    title: "Grantha-Based Classical Formulas",
    link: "#",
  },
  {
    icon: <FaLeaf className="text-light text-2xl" />,
    title: "No Chemicals",
    link: "#",
  },
  {
    icon: <FaLock className="text-light text-2xl" />,
    title: "3-Capsule Ritual: Balance • Detox • Regulate",
    link: "#",
  },
  {
    icon: <FaLock className="text-light text-2xl" />,
    title: "Backed by AYUSH & GMP Certified Facilities",
    link: "#",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const FeaturesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="sm:py-4 px-6 bg-light my-16" ref={ref}>
      <h2 className="lg:text-4xl text-2xl text-dark-green text-center uppercase font-semibold tracking-wider mb-12">
        Why Choose Ayudh Bharat
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x sm:divide-y-1 sm:divide-x-1 divide-gray-200 text-center">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center px-6 py-8"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={index}
          >
            <div className="bg-dark-green rounded-full w-16 h-16 flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>
            <p className="text-base font-light mb-2 tracking-wide">{feature.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
