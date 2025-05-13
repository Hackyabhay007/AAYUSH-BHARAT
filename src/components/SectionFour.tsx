'use client';

import React from 'react';
import { FaBalanceScaleLeft, FaLeaf, FaCalendarDay, FaSyncAlt } from 'react-icons/fa'; // General icons
import { GiWaterDrop, GiCycle, GiHerbsBundle, GiDroplets } from 'react-icons/gi'; // More specific icons

// Define the structure for each benefit
interface BenefitDetail {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefitDetails: BenefitDetail[] = [
  {
    id: 'balance',
    icon: <GiHerbsBundle size={28} className="text-green-600" />,
    title: 'Balance',
    description: 'Hormonal rhythm using herbs like Shatavari & Ashoka.',
  },
  {
    id: 'detox',
    icon: <GiDroplets size={28} className="text-blue-500" />,
    title: 'Detox',
    description: 'Clear toxins (Ama) from digestion and metabolism.',
  },
  {
    id: 'regulate',
    icon: <FaCalendarDay size={28} className="text-purple-600" />,
    title: 'Regulate',
    description: 'Restore healthy menstrual cycles.',
  },
];

// Icons for the visual row
const visualIconsData = [
    { label: "Balance", icon: <FaBalanceScaleLeft size={40} className="text-dark-green" /> },
    { label: "Detox", icon: <GiWaterDrop size={40} className="text-dark-green" /> },
    { label: "Regulate", icon: <GiCycle size={40} className="text-gray-700" /> },
];


export default function SectionFour() {
  return (
    <section className="py-12 bg-light text-dark">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl uppercase md:text-4xl tracking-widest font-semibold mb-10">
          Why 3 Capsules?
        </h2>

        {/* Visual Icons Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 mb-12">
          {visualIconsData.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="p-4 bg-beige rounded-full shadow-md">
                {item.icon}
              </div>
              <span className="text-base uppercase  font-semibold">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Detailed Copy Section */}
        <div className="max-w-3xl mx-auto space-y-8">
          {benefitDetails.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left p-6 rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark mb-1">
                  {benefit.title}
                </h3>
                <p className="text-dark leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="mt-12 text-lg md:text-xl italic text-dark max-w-2xl mx-auto">
          One ritual. Three classical medicines. Designed to heal from root.
        </p>
      </div>
    </section>
  );
}
