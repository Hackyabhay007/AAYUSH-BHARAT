import { Metadata } from 'next';
import productService from '@/appwrite/product';
import { Product } from '@/types/product';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // Fetch the product data based on the slug
    const product = await productService.fetchOneProduct(params.slug) as Product;

    if (!product) {
      return {
        title: 'Product Not Found | AAYUDH Bharat',
        description: 'The requested product could not be found.',
      };
    }

    // Generate metadata using the product information
    return {
      title: `${product.name} | AAYUDH Bharat - Authentic Ayurvedic Products`,
      description: product.description || 'Discover our authentic Ayurvedic product crafted from ancient wisdom. 100% natural, physician-trusted formula.',
      keywords: [
        product.name,
        'Ayurvedic Products',
        'Natural Wellness',
        product.category,
        'AAYUDH Bharat',
        'Authentic Ayurveda',
        ...product.ingredients?.split(',').map(ingredient => ingredient.trim()) || []
      ],
      openGraph: {
        title: `${product.name} | AAYUDH Bharat`,
        description: product.description,
        images: [
          {
            url: product.image || '/logo/Artboard_1_copy_15@4x.png',
            width: 800,
            height: 600,
            alt: product.name
          }
        ],        type: 'website',
        siteName: 'AAYUDH Bharat',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} | AAYUDH Bharat`,
        description: product.description,
        images: [product.image || '/logo/Artboard_1_copy_15@4x.png']
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return default metadata if there's an error
    return {
      title: 'Product | AAYUDH Bharat',
      description: 'Discover our authentic Ayurvedic products.',
    };
  }
}