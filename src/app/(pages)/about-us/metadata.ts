import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | AAYUDH Bharat - Authentic Ayurvedic Traditions',
  description: 'Discover AAYUDH Bharat\'s mission to revive ancient Ayurvedic wisdom through authentic rituals. 100% natural, physician-trusted traditions from classical texts.',
  keywords: ['Ayurvedic Heritage', 'AAYUDH Bharat Story', 'Authentic Ayurveda', 'Traditional Wellness', 'AYUSH Certified'],
  openGraph: {
    title: 'About Us | AAYUDH Bharat - Authentic Ayurvedic Traditions',
    description: 'Ayurveda reimagined: Rooted in tradition, designed for today. Discover our journey of bringing time-tested, physician-trusted Ayurvedic formulations to the modern world.',
    images: [
      {
        url: '/logo/Artboard_1_copy_15@4x.png',
        width: 800,
        height: 600,
        alt: 'AAYUDH Bharat About Us'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | AAYUDH Bharat - Authentic Ayurvedic Traditions',
    description: 'Explore our mission to bring authentic Ayurvedic rituals to modern life. No synthetics, 100% natural formulas from classical texts.',
    images: ['/logo/Artboard_1_copy_15@4x.png']
  }
};
