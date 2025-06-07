import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import BlogPostClient from '@/components/BlogPostClient'
import JsonLd from '@/components/JsonLd'
import { generateBlogPostSchema } from './schema'
export { generateMetadata } from './metadata'

// This is a placeholder function - replace with your actual blog post fetching logic
async function getBlogPost(slug: string) {
  const articles = [
    {
      slug: 'how-to-treat-pcod-naturally',
      title: 'How to Treat PCOD Naturally (Ayurveda vs. Hormone Pills)',
      excerpt: 'Priya reversed her PCOD symptoms in 6 months through personalized herbs and yoga.',
      content: 'Full article content...',
      image: 'https://images.pexels.com/photos/6766221/pexels-photo-6766221.jpeg',
      author: 'Dr. Ayush Kumar',
      date: '2025-06-03',
      category: 'Women\'s Health',
      tags: ['PCOD', 'Natural Treatment', 'Ayurveda', 'Hormonal Health']
    },
    // Add more articles as needed
  ];
  
  return articles.find(article => article.slug === slug);
}

// Update to handle params as a Promise
export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  // Await the params Promise
  const params = await props.params;
  const scrolled = true;
  
  // Get the blog post data with the resolved slug
  const post = await getBlogPost(params.slug);
  const blogSchema = post ? generateBlogPostSchema(post) : null;

  return (
    <>
      {blogSchema && <JsonLd data={blogSchema} />}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#363f1d] text-black shadow-md" : "bg-transparent text-black"}`}>
        <Navbar scrolled={true} />
      </div>
      <BlogPostClient blogId={params.slug} />
      <Footer />
    </>
  )
}