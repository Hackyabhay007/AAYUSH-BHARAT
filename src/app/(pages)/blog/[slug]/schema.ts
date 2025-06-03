interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
}

export function generateBlogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'AAYUDH Bharat',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aayudhbharat.com/logo/Artboard_1_copy_15@4x.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aayudhbharat.com/blog/${post.slug}`
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    about: [
      'Ayurveda',
      post.category,
      ...post.tags
    ]
  };
}
