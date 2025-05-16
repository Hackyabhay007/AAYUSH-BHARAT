"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";;

const faqs = [
  {
    question: "How do I return my order?",
    answer: "All orders can be returned within 30 days.",
  },
  {
    question: "Are there any shipping costs?",
    answer: "Shipping is free for orders over $50. Otherwise, a flat rate of $5 applies.",
  },
  {
    question: "How can I track my order?",
    answer: "After placing your order, you'll receive a tracking link via email.",
  },
];

export default function FAQSection() {const [openIndex, setOpenIndex] = useState<number | null>(null);


  const toggle = (index:number) => {

    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-beige text-dark-green">

    <section className="max-w-4xl mx-auto px-4 py-20 text-dark-green">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl lg:text-4xl md:text-4xl font-semibold uppercase mb-4">Help / FAQs</h1>
        <p className="text-gray-600 text-sm md:text-base font-light">
          If you have a question, please consult our list of frequently asked questions before reaching out for assistance.
        </p>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-semibold uppercase mb-6">Orders & Shipping</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left font-medium text-lg"
                >
                <span className="text-black hover:underline">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openIndex === index && (
                  <div className="mt-3 text-sm text-gray-700">{faq.answer}</div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
          </div>
  );
}
