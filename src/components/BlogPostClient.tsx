'use client';
import React from 'react';
import BlogArticle from '@/app/(pages)/blog/[slug]/components/BlogArticle';

interface BlogPostClientProps {
  blogId: string;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ blogId }) => {
  return (
    <div>
      <BlogArticle />
    </div>
  );
};

export default BlogPostClient;
