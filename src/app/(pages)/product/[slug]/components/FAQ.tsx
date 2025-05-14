"use client";
import { useState } from 'react';

const faqData = [
  {
    question: "What are Back To Teens Tablets?",
    answer: "Back To Teens Tablets are natural supplements with Horny Goat Weed, Maca Root, and Safed Musli, designed to boost libido, energy, stamina, and enhance vitality and pleasure. Trusted by 15,000+ customers, they’re suitable for both men and women."
  },
  {
    question: "What are the Key Ingredients and Their Benefits?",
    answer: "Horny Goat Weed helps increase blood flow and libido. Maca Root boosts energy and stamina. Safed Musli enhances testosterone and muscle strength."
  },
  {
    question: "What is the Nutritional Value of the Tablets?",
    answer: "Each tablet contains standardized extracts of the ingredients, providing essential phytonutrients without synthetic additives."
  },
  {
    question: "How Should I Take These Tablets?",
    answer: "Take one tablet twice a day after meals with water or as directed by your physician."
  },
  {
    question: "Are There Any Side Effects?",
    answer: "Generally safe when taken as recommended. If you experience any discomfort, consult a doctor."
  },
  {
    question: "Can I Take These Tablets Alongside My Regular Diet?",
    answer: "Yes, they are supplements and safe to take along with your regular diet."
  },
  {
    question: "Does Back To Teens help with male fertility?",
    answer: "Yes, the ingredients are known to enhance sexual health and may support male fertility."
  },
  {
    question: "How Long Should I Use the Product to See Results?",
    answer: "Results may vary, but most users report noticeable improvements within 3–4 weeks of consistent use."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Frequently asked questions (FAQs)</h2>
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="border rounded mb-4 shadow-sm transition-all duration-300"
        >
          <button
            className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:bg-gray-100"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span className="text-xl">{openIndex === index ? '▲' : '▼'}</span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
