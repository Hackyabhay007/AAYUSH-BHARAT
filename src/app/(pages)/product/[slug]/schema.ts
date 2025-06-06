import { Product } from '@/types/product';
import getFilePreview from '@/lib/getFilePreview';

export function generateProductSchema(product: Product) {
  // Get the first variant or use default values
  const defaultVariant = product.variants?.[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: defaultVariant ? getFilePreview(defaultVariant.image) : '',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.min(...(product.variants?.map(v => v.sale_price) || [0])),
      highPrice: Math.max(...(product.variants?.map(v => v.price) || [0])),
      offerCount: product.variants?.length || 0,
      availability: product.variants?.some(v => v.stock > 0) 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: `https://aayudhbharat.com/product/${product.slug}`,
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
    manufacturer: {
      '@type': 'Organization',
      name: 'AAYUDH Bharat',
      description: 'Authentic Ayurvedic products manufacturer'
    }
  };
}