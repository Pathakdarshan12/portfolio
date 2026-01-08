
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  Calendar, Clock, ChevronRight, Info,
  AlertTriangle, CheckCircle, Lightbulb, Copy,
  Check, ArrowRight, Twitter, Linkedin,
  Link as LinkIcon, ArrowUp, Activity, Zap,
  ShieldCheck, Layers, Users, Database, Eye, MessageSquare,
  Loader2, AlertCircle
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

// --- CUSTOM COMPONENTS ---
const InfoBox = ({ title, children }: any) => (
  <div className="my-8 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 dark:bg-blue-900/30 flex gap-4">
    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Info size={22} /></div>
    <div className="flex-1">
      {title && <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-widest mb-2">{title}</h4>}
      <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{children}</div>
    </div>
  </div>
);

const WarningBox = ({ title, children }: any) => (
  <div className="my-8 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-900/30 flex gap-4">
    <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500"><AlertTriangle size={22} /></div>
    <div className="flex-1">
      {title && <h4 className="font-bold text-amber-600 dark:text-amber-400 text-xs uppercase tracking-widest mb-2">{title}</h4>}
      <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{children}</div>
    </div>
  </div>
);

const SuccessBox = ({ title, children }: any) => (
  <div className="my-8 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-900/30 flex gap-4">
    <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><CheckCircle size={22} /></div>
    <div className="flex-1">
      {title && <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-xs uppercase tracking-widest mb-2">{title}</h4>}
      <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{children}</div>
    </div>
  </div>
);

const TipBox = ({ title, children }: any) => (
  <div className="my-8 p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 dark:bg-purple-900/30 flex gap-4">
    <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500"><Lightbulb size={22} /></div>
    <div className="flex-1">
      {title && <h4 className="font-bold text-purple-600 dark:text-purple-400 text-xs uppercase tracking-widest mb-2">{title}</h4>}
      <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{children}</div>
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

const TechStack = (props: any) => {
  const groups = useMemo(() => parseSafe(props.groups), [props.groups]);
  return (
    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((g: any, i: number) => (
        <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/50">
          <h4 className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-4 border-b border-primary-500/10 pb-2">{g.category}</h4>
          <div className="flex flex-wrap gap-2">
            {g.tools.map((t: string) => (
              <span key={t} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-lg text-xs font-bold shadow-sm text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-600">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ArchitectureDiagram = ({ src, caption }: any) => (
  <figure className="my-12">
    <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
      <img src={src} alt={caption} className="w-full object-cover" />
    </div>
    {caption && <figcaption className="mt-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{caption}</figcaption>}
  </figure>
);

// --- BLOG DETAIL COMPONENT ---
const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const post = BLOG_POSTS.find(p => p.slug === slug);

  // Dynamic Content Fetcher
  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(false);

    // Fetch Markdown from external file
    fetch(`./posts/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  const toc = useMemo(() => {
    if (!content) return [];
    return content.split('\n')
      .filter(line => line.trim().startsWith('## '))
      .map(line => line.replace('## ', '').trim());
  }, [content]);

  useEffect(() => {
    if (loading) return;
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
    h1: ({ children }: any) => <h1 className="text-4xl md:text-6xl font-black mb-12 text-slate-900 dark:text-white leading-tight">{children}</h1>,
    h2: ({ children }: any) => {
      const id = children.toString().toLowerCase().replace(/\s+/g, '-');
      return (
        <h2 id={id} className="text-3xl font-bold mt-20 mb-8 group flex items-center text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="mr-4 text-primary-500 opacity-20 group-hover:opacity-100 transition-opacity">#</span>
          {children}
        </h2>
      );
    },
    p: ({ children }: any) => <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{children}</p>,
    code: ({ node, inline, className, children, ...props }: any) => {
      const codeString = String(children).replace(/\n$/, '');
      const match = /language-(\w+)/.exec(className || '');
      const meta = (node as any)?.data?.meta || (props as any)?.node?.data?.meta || '';
      const fileNameMatch = /file="([^"]+)"/.exec(meta);
      const fileName = fileNameMatch ? fileNameMatch[1] : null;

      if (inline) return <code className="px-1.5 py-0.5 rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400 font-mono text-sm">{children}</code>;

      const id = `code-${Math.random().toString(36).substr(2, 9)}`;
      return (
        <div className="my-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950">
          <div className="flex items-center justify-between px-6 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500"></div><div className="w-3 h-3 rounded-full bg-amber-500"></div><div className="w-3 h-3 rounded-full bg-emerald-500"></div></div>
              {fileName && <span className="ml-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{fileName}</span>}
            </div>
            <button onClick={() => handleCopy(codeString, id)} className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all text-slate-400">
              {copiedId === id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="p-8 overflow-x-auto"><pre className="font-mono text-sm text-slate-300"><code>{children}</code></pre></div>
        </div>
      );
    },
    infobox: InfoBox,
    warningbox: WarningBox,
    successbox: SuccessBox,
    tipbox: TipBox,
    metricscard: MetricsCard,
    techstack: TechStack,
    architecturediagram: ArchitectureDiagram
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <motion.div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-primary-500 origin-left" style={{ scaleX }} />

      <header className="relative pt-32 pb-48 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link to="/blog" className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center mb-12 hover:text-white transition-colors">
            <ChevronRight size={14} className="rotate-180 mr-2" /> Back to Insights
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-black text-white tracking-tight mb-12"
          >
            {post.title}
          </motion.h1>
          <div className="flex items-center gap-4">
            <img src={post.author.avatar} className="w-14 h-14 rounded-2xl border-2 border-primary-500" alt="" />
            <div>
              <div className="text-white font-bold">{post.author.name}</div>
              <div className="text-primary-400 text-xs font-bold uppercase tracking-widest">{post.author.role}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <main className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 lg:p-20 shadow-2xl relative min-h-[600px]">

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="h-10 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
                    <div className="space-y-4">
                      <div className="h-4 w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg animate-pulse"></div>
                      <div className="h-4 w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-slate-50 dark:bg-slate-800/50 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-64 w-full bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
                    <div className="flex justify-center py-20">
                       <Loader2 className="animate-spin text-primary-500" size={32} />
                    </div>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center"
                  >
                    <AlertCircle className="mx-auto text-rose-500 mb-4" size={48} />
                    <h3 className="text-2xl font-bold mb-2">Content Unavailable</h3>
                    <p className="text-slate-500">The Markdown file for this post could not be loaded.</p>
                  </motion.div>
                ) : (
                  <motion.article
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-slate dark:prose-invert max-w-none"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components as any}>
                      {content}
                    </ReactMarkdown>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          </main>

          <aside className="lg:col-span-4 sticky top-24 h-fit space-y-8">
            <div className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl">
              <h3 className="font-bold text-xl mb-10 flex items-center"><Database size={18} className="mr-3 text-primary-500" /> Outline</h3>
              <nav className="space-y-4">
                {loading ? (
                   Array(4).fill(0).map((_, i) => <div key={i} className="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" style={{width: `${Math.random() * 50 + 40}%`}}></div>)
                ) : (
                  toc.map((title) => {
                    const id = title.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <a key={id} href={`#${id}`} className={`block text-sm font-bold transition-all ${activeHeading === id ? 'text-primary-500 translate-x-2' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
                        {title}
                      </a>
                    );
                  })
                )}
              </nav>
            </div>

            <div className="p-10 bg-primary-500 rounded-[3rem] text-white shadow-2xl shadow-primary-500/20">
               <h4 className="text-2xl font-black mb-4">Stay Informed</h4>
               <p className="text-sm opacity-80 mb-8 leading-relaxed font-medium">Weekly technical deep-dives on architecture and data quality engineering.</p>
               <button className="w-full py-4 bg-white text-primary-500 rounded-xl font-black hover:bg-slate-100 transition-all">Join 2,000+ Readers</button>
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
