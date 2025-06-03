import Head from 'next/head';
import React from 'react';
import JsonLd from './JsonLd';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  structuredData?: any;
}

export default function SEO({
  title = 'AAYUDH Bharat | Nature\'s Wisdom',
  description = 'Reviving ancient Ayurvedic wisdom through authentic formulas from Charaka, Sushruta, and Bhaishajya Granthas. 100% natural, physician-trusted Ayurvedic wellness products with no synthetics or chemicals.',
  canonicalUrl = 'https://aayudhbharat.com',
  ogType = 'website',
  ogImage = '/logo/Artboard_1_copy_15@4x.png',
  ogImageAlt = 'AAYUDH Bharat Logo',
  structuredData,
}: SEOProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
      </Head>
      
      {structuredData && <JsonLd data={structuredData} />}
    </>
  );
}
