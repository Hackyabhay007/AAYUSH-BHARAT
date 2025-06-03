import { Product } from '@/types/product';

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.$id,
    brand: {
      '@type': 'Brand',
      name: 'AAYUDH Bharat'
    },
    offers: {
      '@type': 'Offer',
      price: product.sale_price || product.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://aayudhbharat.com/product/${product.$id}`
    },
    category: product.category,
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: '100' // You can replace this with actual review count
      }
    })
  };
}
