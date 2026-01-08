
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Calendar, Clock, Tag, ArrowRight,
  ChevronRight, Filter, SortAsc, LayoutGrid,
  Sparkles, MessageSquare
} from 'lucide-react';
import { BLOG_POSTS } from '../data';

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))], []);

  const featuredPost = useMemo(() => BLOG_POSTS[0], []);
  const otherPosts = useMemo(() => BLOG_POSTS.slice(1), []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4 flex items-center">
                <Sparkles size={16} className="mr-2" /> Engineering Insights
              </h2>
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
                Writings & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-500">Platform Insights</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Deep dives into modern data architecture, quality engineering, and the future of data platforms from the front lines of infrastructure.
              </p>
            </div>
          </div>

          {/* Featured Post */}
          {!search && selectedCategory === 'All' && featuredPost && (
            <Link to={`/blog/${featuredPost.slug}`} className="group relative grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 mb-20">
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent"></div>
              </div>
              <div className="lg:col-span-5 p-12 flex flex-col justify-center">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-primary-500/10 text-primary-500 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-500/20">
                       Featured
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{featuredPost.category}</span>
                 </div>
                 <h2 className="text-3xl font-extrabold mb-6 group-hover:text-primary-500 transition-colors leading-tight">
                    {featuredPost.title}
                 </h2>
                 <p className="text-slate-500 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                 </p>
                 <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                       <img src={featuredPost.author.avatar} className="w-10 h-10 rounded-full border-2 border-primary-500/20" alt={featuredPost.author.name} />
                       <span className="text-sm font-bold">{featuredPost.author.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                       <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {featuredPost.date}</span>
                       <span className="flex items-center"><Clock size={14} className="mr-1.5" /> {featuredPost.readingTime}</span>
                    </div>
                 </div>
              </div>
            </Link>
          )}

          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row gap-6 p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm mb-12">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search technical insights..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-3 bg-transparent outline-none font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.filter(p => !(!search && selectedCategory === 'All' && p.id === featuredPost?.id)).map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <Link to={`/blog/${post.slug}`} className="relative h-56 overflow-hidden block">
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                 <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">
                    {post.category}
                 </div>
              </Link>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span className="flex items-center"><Calendar size={12} className="mr-1.5" /> {post.date}</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1.5" /> {post.readingTime}</span>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-primary-500 transition-colors leading-tight line-clamp-2">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <img src={post.author.avatar} className="w-6 h-6 rounded-full" alt="" />
                      <span className="text-[10px] font-bold text-slate-400">{post.author.name}</span>
                   </div>
                   <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-primary-500 flex items-center group/btn"
                  >
                    Read More <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-20 h-20 bg-primary-500/10 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
               <Search size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
