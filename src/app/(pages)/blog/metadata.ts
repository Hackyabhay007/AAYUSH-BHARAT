import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | AAYUDH Bharat - Ayurvedic Wisdom Explained',
  description: 'Explore our Ayurvedic blog with insights on women\'s health, natural remedies, and ancient wellness wisdom explained in simple terms. Practical tips backed by classical texts.',
  keywords: ['Ayurvedic Blog', 'Women\'s Health', 'Natural Remedies', 'Ayurveda Tips', 'PCOD Natural Treatment', 'Ayurvedic Wisdom', 'Triphala Benefits'],
  openGraph: {
    title: 'Blog | AAYUDH Bharat - Ayurvedic Wisdom Explained',
    description: 'Discover practical Ayurvedic wisdom for modern women. Our blog explains ancient wellness practices with real-life examples and evidence-based insights from classical texts.',
    images: [
      {
        url: '/logo/Artboard_1_copy_15@4x.png',
        width: 800,
        height: 600,
        alt: 'AAYUDH Bharat Blog'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | AAYUDH Bharat - Ayurvedic Wisdom Explained',
    description: 'Ayurveda was never meant to be confusing. Our blog explains it clearly for real women with practical tips and insights.',
    images: ['/logo/Artboard_1_copy_15@4x.png']
  }
};
