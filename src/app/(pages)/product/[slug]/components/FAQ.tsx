"use client";
import { useState } from 'react';
import faqData from '@/lib/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='bg-light w-full'>

    <div className="max-w-4xl py-8  mx-8 text-dark-green lg:mx-auto p-4">
      <h2 className="lg:text-4xl text-2xl font-medium uppercase tracking-wider text-center mb-8">Frequently asked questions (FAQs)</h2>
      {faqData.map((faq, index) => (
          <div
          key={index}
          className="border rounded mb-3 shadow-lg transition-all duration-300"
          >
          <button
            className="w-full flex justify-between items-center lg:text-base text-sm p-3 text-left font-light"
            onClick={() => toggleFAQ(index)}
            >
            {faq.question}
            <span className="lg:text-xl text-sm">{openIndex === index ? '▲' : '▼'}</span>
          </button>
          {openIndex === index && (
              <div className="px-4 pb-4 ">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
      </div>
  );
}
