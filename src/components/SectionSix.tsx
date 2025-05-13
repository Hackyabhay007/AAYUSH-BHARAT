'use client';

import React from 'react';

export default function SectionSix() {
  return (
    <section className="py-16 md:py-24 bg-[#f7f3ef] text-[#363f1d]"> {/* A light beige/off-white background and dark green text */}
      <div className="container mx-auto px-6 md:px-8 text-center max-w-3xl"> {/* Limiting max-width for readability */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Born from Granthas.
          <br className="hidden sm:block" /> {/* Line break on small screens and up for better flow */}
          Built for Her.
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-700"> {/* Slightly lighter text for the copy */}
          Ayudh Bharat revives the original purpose of Ayurveda – healing through daily rituals.
          <br className="hidden sm:block" />
          We don’t treat symptoms. We restore rhythm.
        </p>
      </div>
    </section>
  );
}
