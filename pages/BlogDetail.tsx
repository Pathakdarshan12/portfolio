
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import avatar from '@/assets/icons/avatar.png';


const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link 
        to="/blog" 
        className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-12"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Blog
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex items-center space-x-3 text-sm text-slate-500 mb-6">
            <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
            <span>•</span>
            <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.readingTime}</span>
            <span>•</span>
            <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">{post.category}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full border-2 border-primary-500 p-0.5">
              <img
                src={avatar}
                alt="Author"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold">Darshan Pathak</div>
              <div className="text-sm text-slate-500">Data Quality Analyst</div>
            </div>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-400 leading-relaxed space-y-8">
          <p className="text-xl font-medium text-slate-900 dark:text-white border-l-4 border-primary-500 pl-6 italic">
            {post.excerpt}
          </p>
          
          <p>
            This article explores the intricate details of the topic in question. 
            (Content would normally be rendered from MDX).
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">The Challenge</h2>
          <p>
            Many teams struggle with these specific hurdles when implementing modern data architecture...
          </p>

          <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 my-12">
            <h3 className="font-bold mb-4">Key Takeaways</h3>
            <ul className="list-disc list-inside space-y-3">
              <li>Always prioritize modularity in transformation layers.</li>
              <li>Implement robust testing at every step of the ingestion process.</li>
              <li>Maintain clear documentation via data contracts.</li>
            </ul>
          </div>
        </div>

        <footer className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-500">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <button className="flex items-center text-primary-500 font-bold hover:underline">
              <Share2 size={18} className="mr-2" /> Share this post
            </button>
            <Link to="/blog" className="font-bold hover:text-primary-500 transition-colors">
              View all posts
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetail;
