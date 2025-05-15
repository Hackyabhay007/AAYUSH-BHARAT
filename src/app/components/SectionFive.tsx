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
    icon: <FaWhatsapp className="text-dark-green mr-3 flex-shrink-0" size={22} />,
    text: 'Free 1-on-1 Ayurvedic Consultation (Phone/WhatsApp)',
  },
    {
    icon: <FaCalendarCheck className="text-dark-green mr-3 flex-shrink-0" size={22} />,
    text: 'Menstrual Ritual Tracker + Self-Care Reminders',
  },
  {
    icon: <FaUserMd className="text-dark-green mr-3 flex-shrink-0" size={22} />,
    text: 'Lifetime Access to our Wellness Community',
  },
  {
    icon: <FaVideo className="text-dark-green mr-3 flex-shrink-0" size={22} />,
    text: 'Daily Yoga & Pranayama Videos',
  },
 
  {
    icon: <FaUsers className="text-dark-green mr-3 flex-shrink-0" size={22} />,
    text: 'Indian Kitchen Recipe eBook',
  },

  {
    icon: <FaComments className="text-dark-green mr-3 flex-shrink-0" size={22} />,
    text: 'Live Ayurveda Q&A Events',
  },
   {
    icon: <FaBookOpen className="text-dark-green mr-3 flex-shrink-0" size={22} />,
    text: 'Dosha-Based Diet Plans',
  },
];

export default function SectionFive() {
//   return (
//     <section className="py-16 bg-beige text-dark-green">
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//           Your Healing Continues After You Order.
//         </h2>
//         <p className="text-lg text-dark mb-10">
//           With every box, you receive:
//         </p>

//         <div className="flex flex-col items-center max-w-2xl mx-auto text-center space-y-6 mb-12">
//           {benefits.map((benefit, index) => (
//             <div key={index}>
//               <div className="flex items-center">
//                 {benefit.icon}
//                 <span className="text-lg items-center text-dark-green">{benefit.text}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="max-w-2xl mx-auto text-center mb-12 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <p className="text-md text-green-700 font-semibold flex items-center justify-center gap-2">
//             <FaWhatsapp size={20} /> <FaEnvelope size={20} /> <FaQrcode size={20} />
//             Access sent after delivery via WhatsApp + Email + QR in Box
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <button className="px-8 py-3 bg-dark-green text-white font-semibold rounded-sm hover:bg-dark transition duration-300 shadow-md">
//             Explore Wellness Community
//           </button>
//           <button className="px-8 py-3 bg-dark-green text-white font-semibold rounded-sm hover:bg-dark transition duration-300 shadow-md">
//             Book My Free Consult
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }


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
        
          <div className="space-y-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                {benefit.icon}
                <span className="text-lg text-dark-green">{benefit.text}</span>
              </div>
            ))}
          </div>

        
        </div>

        
      </div>


  <div className="sm:px-6 sm:py-2 px-16 py-3 mt-4 max-w-6xl bg-green-50 border border-green-200 rounded-xl mb-8">
            <p className="text-md text-green-700 font-semibold flex items-center justify-center gap-2">
              <FaWhatsapp size={20} /> <FaEnvelope size={20} /> <FaQrcode size={20} />
              Access sent after delivery via WhatsApp + Email + QR in Box
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="px-8 py-3 bg-dark-green text-white font-semibold rounded-sm hover:bg-dark transition duration-300 shadow-md">
              Explore Wellness Community
            </button>
            <button className="px-8 py-3 bg-dark-green text-white font-semibold rounded-sm hover:bg-dark transition duration-300 shadow-md">
              Book My Free Consult
            </button>
          </div>



    </div>
  </section>
);
}