import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Filter,
  ChevronRight,
  Hash,
} from "lucide-react";
import { BLOG_POSTS } from "../data";

const Blog: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "All">(
    "All"
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))],
    []
  );

  const featuredPost = useMemo(
    () => BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0],
    []
  );

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-32 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Hero Header */}
        <header className="mb-20 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4 flex items-center justify-center lg:justify-start">
                <Sparkles size={16} className="mr-2" /> Engineering Insights
              </h2>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 text-left">
                Writings from the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-500">
                  Platform Edge
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 text-left">
                Architectural deep-dives, modern data stack tutorials, and
                tactical guides for building reliable data infrastructure.
              </p>
            </div>
          </div>
        </header>

        {/* Featured Post Spotlight */}
        {!search && selectedCategory === "All" && featuredPost && (
          <div className="mb-24 transition-all duration-500">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group relative block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto h-72 lg:h-[450px] overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent"></div>
                </div>
                <div className="p-8 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="px-4 py-1.5 bg-primary-500 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                      Featured
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight group-hover:text-primary-500 transition-colors text-left">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 line-clamp-3 leading-relaxed text-left">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      <img
                        src={featuredPost.author.avatar}
                        className="w-12 h-12 rounded-full border-2 border-primary-500/20"
                        alt=""
                      />
                      <div className="text-left">
                        <div className="text-sm font-bold">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          {featuredPost.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary-500 font-bold">
                      Read Story <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-6 p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm mb-16">
          <div className="flex-1 relative group">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search technical insights..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-transparent outline-none font-medium text-slate-700 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="relative h-64 overflow-hidden block"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  {post.category}
                </div>
              </Link>
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-2" /> {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-2" /> {post.readingTime}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-6 group-hover:text-primary-500 transition-colors leading-tight text-left">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-slate-500 dark:text-slate-400 mb-10 line-clamp-3 leading-relaxed text-left">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold text-primary-500 uppercase tracking-widest"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all group/btn"
                  >
                    <ArrowRight
                      size={18}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-300 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-4">No results found</h3>
            <p className="text-slate-500 font-medium">
              Try broadening your search or switching categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
