import { Metadata } from 'next';

// This is a placeholder function - you'll need to implement the actual blog post fetching
async function getBlogPost(slug: string) {
  // Replace this with your actual blog post fetching logic
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
    {
      slug: 'benefits-of-triphala',
      title: 'What is Triphala and Why You Need It Now',
      excerpt: 'A 45-year-old teacher found relief from chronic bloating with daily Triphala use.',
      content: 'Full article content...',
      image: 'https://images.pexels.com/photos/256576/pexels-photo-256576.jpeg',
      author: 'Dr. Priya Sharma',
      date: '2025-06-01',
      category: 'Ayurvedic Herbs',
      tags: ['Triphala', 'Digestive Health', 'Ayurvedic Medicine']
    }
  ];
  
  return articles.find(article => article.slug === slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);

    if (!post) {
      return {
        title: 'Blog Post Not Found | AAYUDH Bharat',
        description: 'The requested blog post could not be found.',
      };
    }

    // Generate metadata using the blog post information
    return {
      title: `${post.title} | AAYUDH Bharat Blog`,
      description: post.excerpt,
      keywords: ['Ayurveda', 'Natural Wellness', 'AAYUDH Bharat', ...post.tags],
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        images: [
          {
            url: post.image,
            width: 800,
            height: 600,
            alt: post.title
          }
        ],
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.image]
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return default metadata if there's an error
    return {
      title: 'Blog | AAYUDH Bharat',
      description: 'Discover Ayurvedic wisdom and wellness tips on the AAYUDH Bharat blog.',
    };
  }
}
