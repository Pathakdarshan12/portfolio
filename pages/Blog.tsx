
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data';

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags)));
  
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-20">
        <h1 className="text-4xl font-bold mb-6">Writings & Insights</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10">
          Deep dives into modern data architecture, quality engineering, and the future of data platforms.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-grow max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedTag === tag 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article 
            key={post.id}
            className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="h-48 bg-slate-50 dark:bg-slate-800 overflow-hidden border-b border-slate-200 dark:border-slate-800">
                  <img
                    src={post.preview_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center space-x-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
                <span>•</span>
                <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.readingTime}</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 group-hover:text-primary-500 transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              
              <p className="text-slate-600 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">{post.category}</span>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-sm font-bold text-slate-900 dark:text-white flex items-center hover:text-primary-500 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
