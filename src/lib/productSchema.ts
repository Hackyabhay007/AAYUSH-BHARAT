import { Product } from '@/types/product';

export function generateProductSchema(product: Product) {
  // Get the default variant if available
  const defaultVariant = product.variants?.[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: defaultVariant?.image || '',
    sku: product.$id,
    brand: {
      '@type': 'Brand',
      name: 'AAYUDH Bharat'
    },
    offers: {
      '@type': 'Offer',
      price: defaultVariant?.sale_price || defaultVariant?.price || 0,
      priceCurrency: 'INR',
      availability: defaultVariant?.stock && defaultVariant.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://aayudhbharat.com/product/${product.slug}`
    },
    category: product.category
  };
}
