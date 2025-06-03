export const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'AAYUDH Bharat Ayurvedic Blog',
  description: 'Explore Ayurvedic wisdom explained simply for modern women. Articles on natural remedies, women\'s health, and ancient wellness practices.',
  url: 'https://aayudhbharat.com/blog',
  isPartOf: {
    '@type': 'WebSite',
    name: 'AAYUDH Bharat',
    url: 'https://aayudhbharat.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'AAYUDH Bharat',
    logo: {
      '@type': 'ImageObject',
      url: 'https://aayudhbharat.com/logo/Artboard_1_copy_15@4x.png'
    }
  },
  inLanguage: 'en-US',
  about: [
    'Ayurveda',
    'Women\'s Health',
    'Natural Remedies',
    'Holistic Wellness'
  ],
  blogPost: [
    {
      '@type': 'BlogPosting',
      headline: 'How to Treat PCOD Naturally (Ayurveda vs. Hormone Pills)',
      image: 'https://images.pexels.com/photos/6766221/pexels-photo-6766221.jpeg?auto=compress&cs=tinysrgb&w=1600',
      datePublished: '2025-05-15',
      author: {
        '@type': 'Organization',
        name: 'AAYUDH Bharat'
      }
    },
    {
      '@type': 'BlogPosting',
      headline: 'What is Triphala and Why You Need It Now',
      image: 'https://images.pexels.com/photos/256576/pexels-photo-256576.jpeg?auto=compress&cs=tinysrgb&w=1600',
      datePublished: '2025-05-10',
      author: {
        '@type': 'Organization',
        name: 'AAYUDH Bharat'
      }
    },
    {
      '@type': 'BlogPosting',
      headline: 'Food as Ritual: Ayurvedic Meal Tips by Dosha',
      image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=1600',
      datePublished: '2025-05-05',
      author: {
        '@type': 'Organization',
        name: 'AAYUDH Bharat'
      }
    }
  ]
};
