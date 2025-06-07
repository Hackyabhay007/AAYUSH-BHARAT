import { Toaster } from 'react-hot-toast'
import './styles/globals.css'
import ProviderWrapper from '@/store/ProviderWrapper';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { websiteSchema, organizationSchema } from '@/lib/schema';
import CartProvider from './components/CartProvider';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'AAYUDH Bharat | Nature\'s Wisdom',
  description: 'Reviving ancient Ayurvedic wisdom through authentic formulas from Charaka, Sushruta, and Bhaishajya Granthas. 100% natural, physician-trusted Ayurvedic wellness products with no synthetics or chemicals.',
  keywords: ['Ayurveda', 'Herbal', 'Natural Wellness', 'Ayurvedic Products', 'Holistic Health', 'Indian Wellness', 'Classical Ayurveda'],
  authors: [{ name: 'AAYUDH Bharat' }],
  creator: 'AAYUDH Bharat',
  publisher: 'AAYUDH Bharat',
  metadataBase: new URL('https://aayudhbharat.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aayudhbharat.com',
    title: 'AAYUDH Bharat | Ancient Wisdom for Modern Wellness',
    description: 'Authentic Ayurvedic wellness products crafted from time-tested, physician-trusted traditions for the modern Indian woman seeking holistic wellness.',
    siteName: 'AAYUDH Bharat',
    images: [{
      url: '/logo/Artboard_1_copy_15@4x.png',
      width: 800,
      height: 600,
      alt: 'AAYUDH Bharat Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AAYUDH Bharat | Nature\'s Wisdom',
    description: 'Authentic Ayurvedic wellness products with no synthetics. Time-tested, physician-trusted traditions for holistic wellness.',
    images: ['/logo/Artboard_1_copy_15@4x.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  return (    <html lang="en">
      <head>        {/* Google fonts are now imported in globals.css */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#363f1d" />
        <meta name="theme-color" content="#363f1d" />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
      </head>
      <body>
         <ProviderWrapper>
           <AuthProvider>
             <div><Toaster position="top-center" /></div>
             {children}
             <CartProvider />
           </AuthProvider>
         </ProviderWrapper>
       </body>
    </html>
  )
}
