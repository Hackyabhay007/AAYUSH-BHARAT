import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | AAYUDH Bharat - Authentic Ayurvedic Products',
  description: 'Explore our premium collection of authentic Ayurvedic products crafted from ancient wisdom. 100% natural, physician-trusted formulas with no synthetics.',
  keywords: ['Ayurvedic Products', 'Natural Wellness', 'Herbal Products', 'AAYUDH Bharat Shop', 'Authentic Ayurveda'],
  openGraph: {
    title: 'Shop | AAYUDH Bharat - Authentic Ayurvedic Products',
    description: 'Browse our collection of 100% Classical Ayurvedic products derived from ancient wisdom. Physician-trusted, time-tested formulas for holistic wellness.',
    images: [
      {
        url: '/logo/Artboard_1_copy_15@4x.png',
        width: 800,
        height: 600,
        alt: 'AAYUDH Bharat Shop'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop | AAYUDH Bharat - Authentic Ayurvedic Products',
    description: 'Discover authentic Ayurvedic products for holistic wellness. No synthetics, 100% natural.',
    images: ['/logo/Artboard_1_copy_15@4x.png']
  }
};