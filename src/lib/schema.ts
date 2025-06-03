export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AAYUDH Bharat',
  url: 'https://aayudhbharat.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://aayudhbharat.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  },
  description: 'AAYUDH Bharat offers authentic Ayurvedic wellness products with 100% Classical Ayurvedic recipes from Charaka, Sushruta, and Bhaishajya Granthas. No synthetics, no chemicals, and no dilution of Ayurvedic wisdom.',
  publisher: {
    '@type': 'Organization',
    name: 'AAYUDH Bharat',
    logo: {
      '@type': 'ImageObject',
      url: 'https://aayudhbharat.com/logo/Artboard_1_copy_15@4x.png'
    }
  }
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AAYUDH Bharat',
  url: 'https://aayudhbharat.com',
  logo: 'https://aayudhbharat.com/logo/Artboard_1_copy_15@4x.png',
  sameAs: [
    'https://www.instagram.com/aayudhbharat',
    'https://www.facebook.com/aayudhbharat'
  ],
  description: 'We revive ancient Ayurvedic wisdom through boxed rituals — not pills or shortcuts. Just time-tested, physician-trusted traditions, crafted for the modern Indian woman seeking holistic wellness.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-XXXXXXXXXX',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi']
  }
};
