import { NextRequest, NextResponse } from 'next/server';
import productService from '@/appwrite/product';
import { Models } from 'appwrite';

export async function GET(request: NextRequest) {
  try {
    // Fetch all products
    const products = await productService.fetchProduct();
    
    const baseUrl = 'https://aayudhbharat.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Define static routes
    const staticRoutes = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: '/shop', priority: '0.9', changefreq: 'weekly' },
      { url: '/about-us', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact-us', priority: '0.7', changefreq: 'monthly' },
      { url: '/blog', priority: '0.8', changefreq: 'weekly' }
    ];
    
    // Start building the XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
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
      `;    });
    
    // Add product routes
    products.forEach((product: Models.Document) => {
      xml += `
        <url>
          <loc>${baseUrl}/product/${product.$id}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    });
    
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
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
