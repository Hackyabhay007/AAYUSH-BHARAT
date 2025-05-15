'use client';
import Image from 'next/image';
import { useState } from 'react';



const articles = [
  {
    title: 'How to Treat PCOD Naturally (Ayurveda vs. Hormone Pills)',
    example: 'Priya reversed her PCOD symptoms in 6 months through personalized herbs and yoga.',
    grantha: 'Sushruta Samhita, Ch. 24',
    image: 'https://images.pexels.com/photos/6766221/pexels-photo-6766221.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'What is Triphala and Why You Need It Now',
    example: 'A 45-year-old teacher found relief from chronic bloating with daily Triphala use.',
    grantha: 'Charaka Samhita, Sutrasthana 4',
    image: 'https://images.pexels.com/photos/256576/pexels-photo-256576.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Food as Ritual: Ayurvedic Meal Tips by Dosha',
    example: 'Vata types thrive on grounding stews and warm drinks, as seen in our community study.',
    grantha: 'Charaka Samhita, Ch. 5',
    image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: '7 Ayurvedic Rules for Women’s Cycles',
    example: 'Tracking the cycle with dosha fluctuations helped one client reduce cramps by 80%.',
    grantha: 'Sushruta Samhita, Sharira Sthana 3',
    image: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];
const POSTS_PER_PAGE = 3;

export default function Hero() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = articles.slice(start, end);

  return (
    <section className="px-4 md:px-12 pt-24 py-10">
      <h2 className="text-4xl font-medium uppercase tracking-wider text-dark-green text-center mb-10">Blog / Knowledge Hub</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPosts.map((post, index) => (
          <div
            key={index}
            className="overflow-hidden transition-transform"
          >
            <Image width={500} height={500} src={post.image} alt={post.title} className="w-lg h-96  object-cover" />
            <div className="py-4">
              <h3 className="text-2xl text-dark-green uppercase font-light leading-snug tracking-wide line-clamp-2">
                {post.title}
              </h3>
              {/* <p className="text-sm text-gray-500 mt-1">{post.date}</p> */}
              <p className="text-sm mr-5 text-dark-green max-w-fit font-extralight tracking-wide mt-2 line-clamp-3">
                {post.example}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2 text-gray-600">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-full ${
                currentPage === page
                  ? 'bg-black text-white font-semibold'
                  : 'hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </section>
  );
}
