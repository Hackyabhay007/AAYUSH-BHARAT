'use client';

import React from 'react';
// Importing some example icons from react-icons
// Replace these with your actual logo components or image tags
import { FaShieldAlt, FaBolt, FaUsers, FaRocket } from 'react-icons/fa';

interface FeatureCardProps {
  logo: React.ReactNode;
  description: string;
}

const featureCardData: FeatureCardProps[] = [
  {
    logo: <FaShieldAlt size={40} className="text-blue-500" />, // Example icon and color
    description: 'Robust Security Measures',
  },
  {
    logo: <FaBolt size={40} className="text-yellow-500" />,
    description: 'Lightning Fast Performance',
  },
  {
    logo: <FaUsers size={40} className="text-green-500" />,
    description: 'Dedicated Customer Support',
  },
  {
    logo: <FaRocket size={40} className="text-purple-500" />,
    description: 'Scalable Infrastructure',
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({ logo, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full">
      <div className="mb-4 text-3xl"> {/* Container for the logo */}
        {logo}
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default function FeatureSection() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Scale with <span className="bg-blue-500 text-white px-2 py-1 rounded">NO</span> issues
        </h2>
        <p className="text-gray-600 mb-10 md:mb-16 max-w-2xl mx-auto text-sm md:text-base">
          Our platform can handle load times upto 99.99% of the times, the rest of the times GOD is against us.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featureCardData.map((card, index) => (
            <FeatureCard key={index} logo={card.logo} description={card.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
