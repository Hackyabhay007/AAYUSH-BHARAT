import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | AAYUDH Bharat - Get in Touch',
  description: 'Have questions about our Ayurvedic products? Contact AAYUDH Bharat\'s customer support team. We\'re available Monday to Friday 9am to 9pm (GMT).',
  keywords: ['Contact AAYUDH Bharat', 'Ayurvedic Customer Support', 'AAYUDH Bharat Help', 'Ayurvedic Products Support', 'Contact Form'],
  openGraph: {
    title: 'Contact Us | AAYUDH Bharat - Get in Touch',
    description: 'Reach out to our dedicated support team for any questions about our authentic Ayurvedic products. We\'re here to help with your wellness journey.',
    images: [
      {
        url: '/logo/Artboard_1_copy_15@4x.png',
        width: 800,
        height: 600,
        alt: 'AAYUDH Bharat Contact Us'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | AAYUDH Bharat - Get in Touch',
    description: 'Questions about our authentic Ayurvedic products? Our customer support team is ready to assist with your wellness needs.',
    images: ['/logo/Artboard_1_copy_15@4x.png']
  }
};
