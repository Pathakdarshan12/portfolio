
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../blog';
import BlogTemplate from '../components/BlogTemplate';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Post not found</h1>
          <p className="text-slate-500 mb-6">The article you are looking for does not exist.</p>
          <Link to="/blog" className="px-6 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return <BlogTemplate {...post} />;
};

export default BlogDetail;