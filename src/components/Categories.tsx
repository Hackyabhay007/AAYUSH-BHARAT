// 'use client';

// import { FaFemale, FaWeight } from 'react-icons/fa';
// import { GiStomach, GiLoveMystery } from 'react-icons/gi';

// // Increased icon size here (e.g., from 28 to 40)
// const categories = [
//   { icon: <FaFemale size={40} />, label: "Grantha-Based Classical Formulas" },
//   { icon: <FaWeight size={40} />, label: 'No Chemicals' },
//   { icon: <GiStomach size={40} />, label: '3-Capsule Ritual: Balance • Detox • Regulate' },
//   { icon: <GiLoveMystery size={40} />, label: 'Backed by AYUSH & GMP Certified Facilities' },
// ];

// export default function Categories() {
//   return (
//     <section className="py-16 bg-beige text-center">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl text-dark-green uppercase font-semibold tracking-wider mb-12">
//         Why Choose Ayudh Bharat
//       </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//               className="flex flex-col items-center text-center py-6 bg-light rounded-lg shadow-lg border border-primary transition-transform transform hover:-translate-y-2"
//           >
//               <div className="bg-beige  text-dark-green rounded-full p-6 shadow-md flex items-center justify-center w-24 h-24 mb-3"> 
//               {category.icon}
//             </div>
//               <p className="text-base text-dark-green font-medium max-w-[200px]">
//                 {category.label}
//               </p>
//       </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import React from 'react';
import { FaLeaf, FaLock, FaHandPeace } from 'react-icons/fa';

interface Feature {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const features: Feature[] = [
  {
    icon: <FaHandPeace className="text-white text-2xl" />,
    title: 'Grantha-Based Classical Formulas',
    link: '#',
  },
  {
    icon: <FaLeaf className="text-white text-2xl" />,
    title: 'No Chemicals',
    link: '#',
  },
  {
    icon: <FaLock className="text-white text-2xl" />,
    title: '3-Capsule Ritual: Balance • Detox • Regulate',
    link: '#',
  },
  {
    icon: <FaLock className="text-white text-2xl" />,
    title: 'Backed by AYUSH & GMP Certified Facilities',
    link: '#',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-light py-12">
       <h2 className="text-4xl text-dark-green text-center uppercase font-semibold tracking-widest mb-12">
       Why Choose Ayudh Bharat
     </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center px-6 py-8">
            <div className="bg-dark-green rounded-full w-16 h-16 flex items-center justify-center mb-4">
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
