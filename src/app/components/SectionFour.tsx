'use client';

import React from 'react';
import {  FaCalendarDay } from 'react-icons/fa';
import {  GiHerbsBundle, GiDroplets } from 'react-icons/gi';

// Types
// interface BenefitDetail {
//   id: string;
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const benefitDetails: BenefitDetail[] = [
//   {
//     id: 'balance',
//     icon: <GiHerbsBundle size={36} className="text-green-600" />,
//     title: 'Balance',
//     description: 'Hormonal rhythm using herbs like Shatavari & Ashoka.',
//   },
//   {
//     id: 'detox',
//     icon: <GiDroplets size={36} className="text-blue-500" />,
//     title: 'Detox',
//     description: 'Clear toxins (Ama) from digestion and metabolism.',
//   },
//   {
//     id: 'regulate',
//     icon: <FaCalendarDay size={36} className="text-purple-600" />,
//     title: 'Regulate',
//     description: 'Restore healthy menstrual cycles.',
//   },
// ];

// const visualIconsData = [
//   { label: 'Balance', icon: <FaBalanceScaleLeft size={28} className="text-dark-green" /> },
//   { label: 'Detox', icon: <GiWaterDrop size={28} className="text-dark-green" /> },
//   { label: 'Regulate', icon: <GiCycle size={28} className="text-dark-green" /> },
// ];

export default function SectionFour() {
  return (
    <>
    {/* <section className="py-16 bg-[#fafaf3] text-dark-green">
      <div className=" mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-16 tracking-wide">
          Why 3 Capsules?
        </h2>

        <div className="flex w-full flex-col justify-center items-center">
          <div className="grid w-1/2 grid-cols-1 md:grid-cols-[auto_auto] gap-12 items-start">
      
            <div className="space-y-12 flex flex-col items-center md:items-end">
              {visualIconsData.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="p-4 bg-beige rounded-full shadow-md">
                    {item.icon}
                  </div>
                  <span className="text-sm uppercase font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-12">
              {benefitDetails.map((benefit) => (
                <div
  key={benefit.id}
  className="flex items-start text-left gap-4 bg-white p-5 rounded-lg shadow-md w-[500px] max-w-full"
>
                  <div>{benefit.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-700">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-14 text-center text-lg italic text-gray-800 max-w-2xl">
            *One ritual. Three classical medicines. Designed to heal from root.*
          </p>
        </div>
      </div>
    </section> */}

    <section className="bg-beige  py-16 px-4 text-center">
  <h2 className="text-2xl md:text-4xl text-dark-green tracking-wider font-bold mb-12">
    WHY 3 CAPSULES?
  </h2>

  <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl mx-auto">
    {[
      {
        id: "balance",
        icon: <FaCalendarDay size={56} className="text-beige" />,
        title: "Balance",
        description: "Hormonal rhythm using herbs like Shatavari & Ashoka",
      },
      {
        id: "detox",
        icon: <GiDroplets size={56} className="text-beige" />,
        title: "Detox",
        description: "Clear toxins (Ama) from digestion and metabolism",
      },
      {
        id: "regulate",
        icon: <GiHerbsBundle size={56} className="text-beige" />,
        title: "Regulate",
        description: "Restore healthy menstrual cycles",
      },
    ].map(({ id, icon, title, description }) => (
      <div
        key={id}
        className="bg-dark-green flex justify-center h-64 flex-col items-center rounded-2xl shadow-lg p-6 w-full md:w-[300px] hover:shadow-xl transition-shadow duration-300"
      >
        <div className=" text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-light text-beige mb-3">{title}</h3>
        <p className="text-beige text-base font-light">{description}</p>
      </div>
    ))}
  </div>

  <p className="mt-12 text-lg italic text-dark">
    *One ritual. Three classical medicines. Designed to heal from root.*
  </p>
</section>
</>
  );
}
