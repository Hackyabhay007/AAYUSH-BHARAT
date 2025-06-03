import { Product } from '@/types/product';

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.sale_price || product.price,      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://aayudhbharat.com/product/${product.$id}`,
    },
    brand: {
      '@type': 'Brand',
      name: 'AAYUDH Bharat'
    },
    category: product.category,
    keywords: [
      product.name,
      'Ayurvedic Products',
      product.category,
      ...(product.ingredients ? product.ingredients.split(',').map(i => i.trim()) : [])
    ],
    // Add manufacturer information
    manufacturer: {
      '@type': 'Organization',
      name: 'AAYUDH Bharat',
      description: 'Authentic Ayurvedic products manufacturer'
    }
  };
}