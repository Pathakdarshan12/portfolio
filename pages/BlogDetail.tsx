import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  Calendar, Clock, ChevronRight, Info, 
  Copy, Check, ArrowUp, Zap, Activity,
  Loader2, AlertCircle, MessageCircle, Share2, 
  MoreHorizontal, HandMetal, Bookmark, Mail
} from 'lucide-react';
import { BLOG_POSTS } from '../data';

const parseSafe = (val: any) => {
  if (typeof val !== 'string') return val;
  try {
    return JSON.parse(val.trim());
  } catch (e) {
    console.warn("Failed to parse prop:", val, e);
    return [];
  }
};

const InfoBox = ({ title, children }: any) => (
  <div className="my-10 p-8 rounded-lg border-l-4 border-primary-500 bg-slate-50 dark:bg-slate-900/50 text-left">
    {title && <h4 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h4>}
    <div className="text-slate-600 dark:text-slate-400 font-serif italic text-lg leading-relaxed">{children}</div>
  </div>
);

const MetricsCard = (props: any) => {
  const items = useMemo(() => parseSafe(props.items), [props.items]);
  return (
    <div className="my-12 w-full max-w-[800px] -mx-0 lg:-mx-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((m: any, i: number) => (
          <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{m.value}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      if (!slug) return;
      setLoading(true);
      setError(false);
      try {
        // FIX: Use absolute path from public folder
        // In production, Vite will resolve this correctly
        const response = await fetch(`/portfolio/posts/${slug}.md`);
        
        if (!response.ok) {
          console.error(`Failed to load: /portfolio/posts/${slug}.md - Status: ${response.status}`);
          throw new Error(`Failed to load content: ${response.status}`);
        }
        const rawText = await response.text();
        setContent(rawText);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [slug]);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!post) return <div className="p-20 text-center font-bold">Post metadata not found.</div>;

  const components = {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-[42px] font-black mb-10 text-slate-900 dark:text-white leading-[1.2] text-left tracking-tight">{children}</h1>,
    h2: ({ children }: any) => {
      const id = children.toString().toLowerCase().replace(/\s+/g, '-');
      return (
        <h2 id={id} className="text-2xl md:text-3xl font-bold mt-16 mb-6 text-slate-900 dark:text-white text-left tracking-tight">
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white text-left">{children}</h3>,
    p: ({ children }: any) => <p className="text-lg md:text-[21px] text-slate-700 dark:text-slate-300 font-serif leading-[1.6] mb-8 text-left">{children}</p>,
    ul: ({ children }: any) => <ul className="list-disc pl-6 mb-8 space-y-3 text-lg md:text-[21px] font-serif text-slate-700 dark:text-slate-300 text-left">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal pl-6 mb-8 space-y-3 text-lg md:text-[21px] font-serif text-slate-700 dark:text-slate-300 text-left">{children}</ol>,
    li: ({ children }: any) => <li className="pl-2">{children}</li>,
    hr: () => <div className="flex justify-center my-16 text-slate-300 dark:text-slate-700 text-3xl tracking-[1.5em] font-serif">...</div>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-slate-900 dark:border-primary-500 pl-6 my-12 italic text-2xl text-slate-500 dark:text-slate-400 font-serif leading-relaxed">{children}</blockquote>,
    img: ({ src, alt }: any) => (
      <figure className="my-14 -mx-4 md:-mx-10 lg:-mx-24">
        <img src={src} alt={alt} className="w-full rounded-sm shadow-lg" />
        {alt && <figcaption className="text-center text-sm text-slate-400 mt-6 font-sans italic">{alt}</figcaption>}
      </figure>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const codeString = String(children).replace(/\n$/, '');
      if (inline) return <code className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-sm">{children}</code>;
      
      const id = `code-${Math.random().toString(36).substr(2, 9)}`;
      return (
        <div className="my-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between px-6 py-2.5 bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Source Code</span>
            <button onClick={() => handleCopy(codeString, id)} className="p-1 hover:text-primary-500 transition-colors text-slate-400">
              {copiedId === id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
          <div className="p-8 overflow-x-auto text-left">
            <pre className="font-mono text-[14px] leading-relaxed text-slate-800 dark:text-slate-300"><code>{children}</code></pre>
          </div>
        </div>
      );
    },
    infobox: InfoBox,
    metricscard: MetricsCard
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors selection:bg-primary-100 dark:selection:bg-primary-900 animate-fade-in pb-32">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      
      {/* Post Header Section - Medium Aesthetic */}
      <header className="max-w-[720px] mx-auto pt-16 md:pt-28 px-6 text-left">
        <h1 className="text-4xl md:text-[52px] font-extrabold text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tight font-sans">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between py-10 border-y border-slate-100 dark:border-slate-900 mb-12">
          <div className="flex items-center gap-4">
            <img src={post.author.avatar} className="w-12 h-12 rounded-full object-cover grayscale-[0.2]" alt={post.author.name} />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-medium text-slate-900 dark:text-white">{post.author.name}</span>
                <span className="text-slate-300">•</span>
                <button className="text-[15px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors">Follow</button>
              </div>
              <div className="text-[13px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5 font-sans">
                <span>{post.readingTime}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-slate-400">
            <button className="hover:text-slate-900 dark:hover:text-white transition-colors"><Share2 size={20} /></button>
            <button className="hover:text-slate-900 dark:hover:text-white transition-colors"><Bookmark size={20} /></button>
            <button className="hover:text-slate-900 dark:hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
          </div>
        </div>
      </header>

      {/* Hero Image - Wide Layout */}
      <div className="max-w-[1000px] mx-auto px-4 mb-20">
        <img src={post.image} className="w-full h-auto max-h-[600px] object-cover rounded-sm shadow-2xl" alt="Featured" />
      </div>

      {/* Article Body - Focused Single Column */}
      <div className="max-w-[720px] mx-auto px-6 relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
             <Loader2 className="animate-spin text-primary-500" size={40} />
             <p className="text-slate-400 font-serif italic text-lg">Fetching story from the data platform...</p>
          </div>
        ) : error ? (
          <div className="py-24 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <AlertCircle className="mx-auto text-rose-500 mb-6" size={56} />
            <h3 className="text-2xl font-bold mb-3">Story Unavailable</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto font-serif">We couldn't retrieve this post. It might be undergoing an incremental update or the path is currently offline.</p>
            <Link to="/blog" className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:opacity-90 transition-opacity">Return to Library</Link>
          </div>
        ) : (
          <article className="prose prose-slate dark:prose-invert text-left">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]} 
              components={components as any}
            >
              {content}
            </ReactMarkdown>
          </article>
        )}

        {/* Medium-style Interaction Footer */}
        {!loading && !error && (
          <div className="flex items-center justify-between py-14 mt-20 border-t border-slate-100 dark:border-slate-900">
            <div className="flex items-center gap-10">
              <button className="flex items-center gap-2.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all group">
                <HandMetal size={24} className="group-hover:scale-125 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium font-sans">1.2K</span>
              </button>
              <button className="flex items-center gap-2.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all group">
                <MessageCircle size={24} className="group-hover:scale-125 transition-transform" />
                <span className="text-sm font-medium font-sans">42</span>
              </button>
            </div>
            <div className="flex items-center gap-8 text-slate-400">
               <button className="hover:text-slate-900 dark:hover:text-white transition-colors"><Bookmark size={20} /></button>
               <button className="hover:text-slate-900 dark:hover:text-white transition-colors"><Share2 size={20} /></button>
            </div>
          </div>
        )}

        {/* Tags Section */}
        {!loading && !error && (
          <div className="flex flex-wrap gap-2.5 mt-8 mb-24">
            {post.tags.map(tag => (
              <span key={tag} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full text-[14px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors font-sans">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Author Footer Bio - Full Width Accent */}
      {!loading && !error && (
        <div className="bg-slate-50 dark:bg-slate-900/50 py-32 border-y border-slate-100 dark:border-slate-900">
          <div className="max-w-[720px] mx-auto px-6 text-left">
             <div className="flex flex-col md:flex-row items-start gap-10">
                <img src={post.author.avatar} className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-950 shadow-xl" alt="" />
                <div className="flex-1 text-left">
                   <h4 className="text-2xl font-black mb-3 tracking-tight font-sans">Written by {post.author.name}</h4>
                   <p className="text-slate-600 dark:text-slate-400 mb-8 font-serif text-[18px] font-medium leading-[1.6]">
                     Data Lifecycle Architect specializing in unified lambda architectures and high-fidelity streaming systems. Engineering resilient data foundations for high-growth enterprises and distilling complex engineering concepts into narrative insights.
                   </p>
                   <div className="flex items-center gap-4">
                     <button className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity font-sans">Follow</button>
                     <button className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                       <Mail size={18} className="text-slate-500" />
                     </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Back to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="fixed bottom-12 right-12 w-14 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all z-[60] group"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default BlogDetail;