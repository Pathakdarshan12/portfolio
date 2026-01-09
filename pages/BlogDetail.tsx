
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  Calendar, Clock, ChevronRight, Info, 
  AlertTriangle, CheckCircle, Lightbulb, Copy, 
  Check, ArrowRight, ArrowUp, Activity, Zap, 
  ShieldCheck, Layers, Database, Loader2, AlertCircle
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
  <div className="my-8 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 dark:bg-blue-900/30 flex gap-4 text-left">
    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Info size={22} /></div>
    <div className="flex-1 text-left">
      {title && <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-widest mb-2 text-left">{title}</h4>}
      <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-left">{children}</div>
    </div>
  </div>
);

const MetricsCard = (props: any) => {
  const items = useMemo(() => parseSafe(props.items), [props.items]);
  return (
    <div className="my-12">
      {props.title && <h4 className="text-center font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-8">{props.title}</h4>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((m: any, i: number) => (
          <div key={i} className="p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center mb-4 mx-auto">
               {m.icon === 'Zap' ? <Zap size={20} /> : <Activity size={20} />}
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{m.value}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</div>
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
  const [activeHeading, setActiveHeading] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = BLOG_POSTS.find(p => p.slug === slug);

  // Scroll Progress Logic
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

  // Markdown Content Loader (using Fetch)
  useEffect(() => {
    const loadContent = async () => {
      if (!slug) return;
      setLoading(true);
      setError(false);
      try {
        // Use a root-relative path to ensure consistency across different base URLs
        const response = await fetch(`posts/${slug}.md`);
        if (!response.ok) {
           throw new Error(`Failed to load content (${response.status})`);
        }
        const rawText = await response.text();
        console.log(`Successfully fetched ${slug}.md, length: ${rawText.length}`);
        setContent(rawText);
      } catch (err) {
        console.error("Markdown loading failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [slug]);

  const toc = useMemo(() => {
    if (!content) return [];
    return content.split('\n')
      .filter(line => line.trim().startsWith('## '))
      .map(line => line.replace('## ', '').trim());
  }, [content]);

  useEffect(() => {
    if (loading || !content) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: '-10% 0px -70% 0px' }
    );
    const headings = document.querySelectorAll('h2');
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [loading, content]);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!post) return <div className="p-20 text-center font-bold">Post metadata not found.</div>;

  const components = {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-6xl font-black mb-12 text-slate-900 dark:text-white leading-tight text-left">{children}</h1>,
    h2: ({ children }: any) => {
      const id = children.toString().toLowerCase().replace(/\s+/g, '-');
      return (
        <h2 id={id} className="text-3xl font-bold mt-20 mb-8 flex items-center text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4 text-left">
          <span className="mr-4 text-primary-500 opacity-20">#</span>
          {children}
        </h2>
      );
    },
    p: ({ children }: any) => <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-left">{children}</p>,
    code: ({ node, inline, className, children, ...props }: any) => {
      const codeString = String(children).replace(/\n$/, '');
      if (inline) return <code className="px-1.5 py-0.5 rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400 font-mono text-sm">{children}</code>;

      const id = `code-${Math.random().toString(36).substr(2, 9)}`;
      return (
        <div className="my-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950">
          <div className="flex items-center justify-between px-6 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500"></div><div className="w-3 h-3 rounded-full bg-amber-500"></div><div className="w-3 h-3 rounded-full bg-emerald-500"></div></div>
            </div>
            <button onClick={() => handleCopy(codeString, id)} className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all text-slate-400">
              {copiedId === id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="p-8 overflow-x-auto text-left"><pre className="font-mono text-sm text-slate-300"><code>{children}</code></pre></div>
        </div>
      );
    },
    infobox: InfoBox,
    metricscard: MetricsCard
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors animate-fade-in">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="relative pt-32 pb-48 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-left">
          <Link to="/blog" className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center mb-12 hover:text-white transition-colors">
            <ChevronRight size={14} className="rotate-180 mr-2" /> Back to Insights
          </Link>
          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight mb-12 text-left">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-left">
            <img src={post.author.avatar} className="w-14 h-14 rounded-2xl border-2 border-primary-500" alt="" />
            <div className="text-left">
              <div className="text-white font-bold">{post.author.name}</div>
              <div className="text-primary-400 text-xs font-bold uppercase tracking-widest">{post.author.role}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <main className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 lg:p-20 shadow-2xl relative min-h-[600px] text-left">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                   <Loader2 className="animate-spin text-primary-500" size={48} />
                   <p className="text-slate-400 font-bold uppercase tracking-[0.2em] animate-pulse">Synchronizing Narrative...</p>
                </div>
              ) : error ? (
                <div className="py-20 text-center">
                  <AlertCircle className="mx-auto text-rose-500 mb-6" size={64} />
                  <h3 className="text-2xl font-black mb-4">Content Synchronization Failure</h3>
                  <p className="text-slate-500 font-medium mb-10">The technical deep-dive for "{slug}" could not be retrieved from the source repository.</p>
                  <Link to="/blog" className="px-8 py-4 bg-primary-500 text-white rounded-2xl font-black shadow-xl shadow-primary-500/20">
                    Return to Library
                  </Link>
                </div>
              ) : (
                <article className="prose prose-slate dark:prose-invert max-w-none text-left">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={components as any}
                  >
                    {content}
                  </ReactMarkdown>
                </article>
              )}
            </div>
          </main>

          <aside className="lg:col-span-4 sticky top-24 h-fit space-y-8 text-left">
            <div className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl">
              <h3 className="font-black text-xl mb-10 flex items-center text-left"><Database size={18} className="mr-3 text-primary-500" /> Outline</h3>
              <nav className="space-y-4 text-left">
                {toc.length > 0 ? toc.map((title) => {
                  const id = title.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <a key={id} href={`#${id}`} className={`block text-sm font-bold transition-all ${activeHeading === id ? 'text-primary-500 translate-x-2' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
                      {title}
                    </a>
                  );
                }) : (
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No sections indexed</p>
                )}
              </nav>
            </div>

            <div className="p-10 bg-primary-500 rounded-[3rem] text-white shadow-2xl shadow-primary-500/20 text-left">
               <h4 className="text-2xl font-black mb-4 text-left">Architectural Newsletter</h4>
               <p className="text-sm opacity-80 mb-8 leading-relaxed font-medium text-left">Weekly technical deep-dives on platform engineering and data quality.</p>
               <button className="w-full py-4 bg-white text-primary-500 rounded-xl font-black hover:bg-slate-100 transition-all">Subscribe</button>
            </div>
          </aside>
        </div>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-10 right-10 w-16 h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all z-[60]">
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default BlogDetail;