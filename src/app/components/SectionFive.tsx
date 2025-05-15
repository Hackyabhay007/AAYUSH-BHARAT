'use client';

import React from 'react';
import {
  FaUserMd,
  FaUsers,
  FaVideo,
  FaBookOpen, 
  FaCalendarCheck,
  FaComments, 
  FaWhatsapp,
  FaEnvelope,
  FaQrcode
} from 'react-icons/fa';

interface BenefitItem {
  icon: React.ReactNode;
  text: string;
  subItems?: string[]; 
}

const benefits: BenefitItem[] = [
  {
    icon: <FaWhatsapp className="text-dark-green mr-3 flex-shrink-0 lg:size-6 size-4" />,
    text: 'Free 1-on-1 Ayurvedic Consultation (Phone/ )',
  },
    {
    icon: <FaCalendarCheck className="text-dark-green mr-3 flex-shrink-0 lg:size-6 size-4"  />,
    text: 'Menstrual Ritual Tracker + Self-Care Reminders',
  },
  {
    icon: <FaUserMd className="text-dark-green mr-3 flex-shrink-0 lg:size-6 size-4"  />,
    text: 'Lifetime Access to our Wellness Community',
  },
  {
    icon: <FaVideo className="text-dark-green mr-3 flex-shrink-0 lg:size-6 size-4"  />,
    text: 'Daily Yoga & Pranayama Videos',
  },
 
  {
    icon: <FaUsers className="text-dark-green mr-3 flex-shrink-0 lg:size-6 size-4" />,
    text: 'Indian Kitchen Recipe eBook',
  },

  {
    icon: <FaComments className="text-dark-green mr-3 flex-shrink-0 lg:size-6 size-4"  />,
    text: 'Live Ayurveda Q&A Events',
  },
   {
    icon: <FaBookOpen className="text-dark-green mr-3 flex-shrink-0 lg:size-6 size-4"/>,
    text: 'Dosha-Based Diet Plans',
  },
];

export default function SectionFive() {

return (
  <section className="py-16 bg-beige text-dark-green">
    <div className="container w-full flex flex-col items-center text-center mx-auto px-4">

        <h2 className="text-2xl  md:text-4xl uppercase font-medium mb-4">
            Your Healing Continues After You Order.
          </h2>
          <p className="text-lg text-dark mb-10">With every box, you receive:</p>

      <div className="flex flex-col md:flex-row sm:flex-col  items-center mx-2 lg:mx-16 justify-center gap-10">
        
        {/* Video Section */}
        <div className="w-full sm:flex-1 flex-1/8">
          <video
            className="w-6xl h-full rounded-lg shadow-lg"
            controls
            autoPlay
            loop
            muted
          >
            <source src="/your-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Section */}
        <div className="w-full flex-1 text-center md:text-left">
        
          <div className="lg:space-y-6 space-y-2 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                {benefit.icon}
                <span className="lg:text-lg text-sm  text-dark-green">{benefit.text}</span>
              </div>
            ))}
          </div>

        
        </div>

        
      </div>


  <div className="sm:px-6 sm:py-2 lg:px-16 px-4 py-3 mt-4 max-w-6xl bg-green-50 border border-green-200 rounded mb-8">
            <p className="text-md text-green-700 font-medium flex items-center justify-center gap-3">
              <FaWhatsapp size={22} /> <FaEnvelope size={22} /> <FaQrcode size={22} />
              Access sent after delivery via WhatsApp + Email + QR in Box
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="lg:px-8  px-4 py-3 bg-dark-green text-white font-medium rounded-sm hover:bg-dark transition duration-300 shadow-md">
              Explore Wellness Community
            </button>
            <button className="lg:px-8  px-4 py-3 bg-dark-green text-white font-medium rounded-sm hover:bg-dark transition duration-300 shadow-md">
              Book My Free Consult
            </button>
          </div>



    </div>
  </section>
);
}