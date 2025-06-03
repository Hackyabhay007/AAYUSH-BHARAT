export const shopSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AAYUDH Bharat Shop',
  description: 'Explore our collection of authentic Ayurvedic products crafted from ancient wisdom. 100% natural, physician-trusted formulas with no synthetics.',
  url: 'https://aayudhbharat.com/shop',
  isPartOf: {
    '@type': 'WebSite',
    name: 'AAYUDH Bharat',
    url: 'https://aayudhbharat.com'
  },
  about: {
    '@type': 'Thing',
    name: 'Ayurvedic Products'
  },
  specialty: 'Authentic Ayurvedic formulations',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    highPrice: '1500',
    lowPrice: '200',
    offerCount: '20+',
    availability: 'https://schema.org/InStock'
  }
};

export const shopProductListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Product',
        name: 'Ayurvedic Ritual Kit',
        description: 'Traditional Ayurvedic formula based on ancient wisdom for holistic wellness.',
        image: 'https://aayudhbharat.com/images/products/ritual-kit.jpg',
        url: 'https://aayudhbharat.com/product/ayurvedic-ritual-kit',
        brand: {
          '@type': 'Brand',
          name: 'AAYUDH Bharat'
        },
        offers: {
          '@type': 'Offer',
          price: '899',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        }
      }
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Product',
        name: 'Women\'s Wellness Kit',
        description: 'Specialized Ayurvedic formula for women\'s health based on traditional wisdom.',
        image: 'https://aayudhbharat.com/images/products/women-wellness.jpg',
        url: 'https://aayudhbharat.com/product/womens-wellness-kit',
        brand: {
          '@type': 'Brand',
          name: 'AAYUDH Bharat'
        },
        offers: {
          '@type': 'Offer',
          price: '1299',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        }
      }
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Product',
        name: 'Immunity Booster Kit',
        description: 'Natural Ayurvedic immunity boosting formula based on ancient texts.',
        image: 'https://aayudhbharat.com/images/products/immunity-booster.jpg',
        url: 'https://aayudhbharat.com/product/immunity-booster-kit',
        brand: {
          '@type': 'Brand',
          name: 'AAYUDH Bharat'
        },
        offers: {
          '@type': 'Offer',
          price: '999',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        }
      }
    }
  ]
};