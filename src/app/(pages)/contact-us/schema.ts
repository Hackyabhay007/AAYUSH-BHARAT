export const contactUsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact AAYUDH Bharat',
  description: 'Contact our customer support team for any questions about our authentic Ayurvedic products.',
  url: 'https://aayudhbharat.com/contact-us',
  isPartOf: {
    '@type': 'WebSite',
    name: 'AAYUDH Bharat',
    url: 'https://aayudhbharat.com'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'English',
    hoursAvailable: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '21:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '16:00'
      }
    ]
  }
};
