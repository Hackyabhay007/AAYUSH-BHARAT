import { NextResponse } from 'next/server';
import type { Product } from '@/types/product';

export async function GET() {
  let xml = '';
  
  try {
    // Dynamic import of productService
    const { default: productService } = await import('@/appwrite/product');
    
    // Define static routes first (in case product fetch fails)
    const baseUrl = 'https://aayudhbharat.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    const staticRoutes = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: '/shop', priority: '0.9', changefreq: 'weekly' },
      { url: '/about-us', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact-us', priority: '0.7', changefreq: 'monthly' },
      { url: '/blog', priority: '0.8', changefreq: 'weekly' }
    ];

    // Start building the XML
    xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Add static routes
    staticRoutes.forEach(route => {
      xml += `
        <url>
          <loc>${baseUrl}${route.url}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>${route.changefreq}</changefreq>
          <priority>${route.priority}</priority>
        </url>
      `;
    });

    try {
      // Fetch products in a separate try-catch block
      const products = await productService.fetchProduct() as Product[];
      
      // Add product routes
      products.forEach((product: Product) => {
        const productId = product.$id;
        xml += `
          <url>
            <loc>${baseUrl}/product/${productId}</loc>
            <lastmod>${currentDate}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
          </url>
        `;
      });
    } catch (productError) {
      // Log the error but continue with static routes
      console.error('Error fetching products for sitemap:', productError);
    }
    
    // Close the XML
    xml += '</urlset>';
    
    // Return the sitemap XML
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
