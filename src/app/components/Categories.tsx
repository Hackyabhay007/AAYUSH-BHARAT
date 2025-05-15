"use client";
import React from 'react';
import { FaLeaf, FaLock, FaHandPeace } from 'react-icons/fa';

interface Feature {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const features: Feature[] = [
  {
    icon: <FaHandPeace className="text-light text-2xl" />,
    title: 'Grantha-Based Classical Formulas',
    link: '#',
  },
  {
    icon: <FaLeaf className="text-light text-2xl" />,
    title: 'No Chemicals',
    link: '#',
  },
  {
    icon: <FaLock className="text-light text-2xl" />,
    title: '3-Capsule Ritual: Balance • Detox • Regulate',
    link: '#',
  },
  {
    icon: <FaLock className="text-light text-2xl" />,
    title: 'Backed by AYUSH & GMP Certified Facilities',
    link: '#',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="sm:py-4 px-6 bg-light my-16">
      <h2 className="text-4xl text-dark-green text-center uppercase font-semibold tracking-wider mb-12">
        Why Choose Ayudh Bharat
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x sm:divide-y-1 sm:divide-x-1 divide-gray-200 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center px-6 py-8 opacity-0 animate-fadeInUp animation-delay-[200ms] animation-fill-forwards group transition-all duration-300 ease-in-out" // 🔥
            style={{ animationDelay: `${index * 200}ms` }} // 🔥 stagger animation
          >
            <div className="bg-dark-green rounded-full w-16 h-16 flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110"> {/* 🔥 */}
              {feature.icon}
            </div>
            <p className="text-base font-light mb-2 tracking-wide">{feature.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
