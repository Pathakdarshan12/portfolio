import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Calendar, Clock, ArrowRight,
  Sparkles, Hash, Layers, ShieldCheck,
  Database, Zap, Trophy, Briefcase
} from 'lucide-react';
import { BLOG_POSTS } from '../blog';

const categoryStyles: Record<string, { gradient: string, shadow: string, icon: any }> = {
  'Data Engineering': {
    gradient: 'from-cyan-500 to-blue-600',
    shadow: 'shadow-cyan-500/20',
    icon: Zap
  },
  'Quality Engineering': {
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20',
    icon: ShieldCheck
  },
  'Analytics Engineering': {
    gradient: 'from-purple-500 to-indigo-600',
    shadow: 'shadow-purple-500/20',
    icon: Database
  },
  'Data Science': {
    gradient: 'from-pink-500 to-rose-600',
    shadow: 'shadow-pink-500/20',
    icon: Layers
  },
  'Career': {
    gradient: 'from-rose-500 to-orange-600',
    shadow: 'shadow-rose-500/20',
    icon: Briefcase
  },
  'All': {
    gradient: 'from-slate-700 to-slate-900',
    shadow: 'shadow-slate-500/20',
    icon: Hash
  }
};

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');

  const categories = useMemo<string[]>(() => ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))], []);

  const filteredPosts = useMemo(() => {
  return BLOG_POSTS
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const numA = parseInt(a.id.substring(1));
      const numB = parseInt(b.id.substring(1));
      return numB - numA;
    });
}, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-40 relative overflow-hidden animate-fade-in">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Modern Hero Header */}
        <header className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-in">
            <Sparkles size={14} className="animate-pulse" /> Engineering Chronicles
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
            Writings from the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-blue-600 to-indigo-600">
              Platform Edge
            </span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Architectural deep-dives, modern data stack patterns, and tactical guides for building resilient digital foundations.
          </p>
        </header>

        {/* Premium Search & Filter Bar */}
        <div className="mb-20 sticky top-24 z-30">
          <div className="p-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search technical insights..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-slate-100/50 dark:bg-slate-800/50 border border-transparent focus:border-primary-500/30 rounded-3xl outline-none font-bold text-slate-700 dark:text-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 w-full lg:w-auto">
              {categories.map((cat: string) => {
                const style = categoryStyles[cat] || categoryStyles['All'];
                const Icon = style.icon;
                const isActive = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 uppercase tracking-widest ${
                      isActive
                        ? `bg-gradient-to-br ${style.gradient} text-white ${style.shadow} scale-105`
                        : 'bg-slate-100/50 dark:bg-slate-800/50 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredPosts.map((post, index) => {
            const style = categoryStyles[post.category] || categoryStyles['All'];
            const CategoryIcon = style.icon;

            return (
              <article
                key={post.id}
                className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Visual Header */}
                <Link to={`/blog/${post.slug}`} className="relative h-72 overflow-hidden block">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  {/* Category Badge Floating */}
                  <div className={`absolute top-8 left-8 px-4 py-2 bg-gradient-to-br ${style.gradient} text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2`}>
                    <CategoryIcon size={12} />
                    {post.category}
                  </div>
                </Link>

                {/* Content Body */}
                <div className="p-10 lg:p-14 flex-grow flex flex-col">
                  {/* Meta Row */}
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary-500" /> {post.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800"></span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {post.readingTime}</span>
                  </div>

                  <h3 className="text-3xl font-black mb-6 group-hover:text-primary-500 transition-colors leading-[1.1] text-left">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 line-clamp-3 leading-relaxed font-medium text-left">
                    {post.excerpt}
                  </p>

                  {/* Author & CTA */}
                  <div className="mt-auto flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <img src={post.author.avatar} className="w-10 h-10 rounded-full border-2 border-primary-500/20" alt="" />
                      <div className="text-left">
                        <div className="text-xs font-black text-slate-900 dark:text-white">{post.author.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.author.role || 'Data Architect'}</div>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary-500 group-hover:text-white transition-all shadow-lg"
                    >
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Visual Polish: Side Accent */}
                <div className={`absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-40 text-center animate-fade-in">
            <div className="w-24 h-24 bg-primary-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-primary-500">
              <Sparkles size={48} className="opacity-20" />
            </div>
            <h3 className="text-4xl font-black mb-4">No insights found</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">
              Our data sensors didn't pick up anything for that search. Try another category or broader terms.
            </p>
            <button
              onClick={() => {setSearch(''); setSelectedCategory('All');}}
              className="mt-10 px-10 py-4 bg-primary-500 text-white rounded-2xl font-black shadow-xl shadow-primary-500/20 hover:scale-105 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;