
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Copy, Check, Share2, Bookmark, 
  ArrowUp, Linkedin, Twitter, Facebook, Link as LinkIcon,
  ChevronRight, ArrowLeft, Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogSection, BlogPost } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BlogTemplateProps extends BlogPost {}

const BlogTemplate: React.FC<BlogTemplateProps> = ({
  title, date, category, readingTime, image, author, structuredContent = [], relatedPosts
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Scroll Progress & Active Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((scrollTop / docHeight) * 100);

      // TOC Active State
      const headers = structuredContent.filter(s => s.type === 'header' || s.type === 'subheader');
      for (const header of headers) {
        if (header.id) {
          const element = document.getElementById(header.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < 300) {
              setActiveId(header.id);
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [structuredContent]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const renderSection = (section: BlogSection, index: number) => {
    switch (section.type) {
      case 'header':
        return (
          <h2 id={section.id} className="text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-32 group flex items-center gap-2">
            {section.content}
            <a href={`#${section.id}`} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-500">
              <LinkIcon size={20} />
            </a>
          </h2>
        );
      case 'subheader':
        return (
          <h3 id={section.id} className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-4 scroll-mt-32">
            {section.content}
          </h3>
        );
      case 'paragraph':
        return (
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-serif max-w-prose">
            {section.content}
          </p>
        );
      case 'image':
        return (
          <figure className="my-12 group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              {/* Optional: Add a subtle overlay or effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>

              <img
                src={section.content.src}
                alt={section.content.alt}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            {section.content.caption && (
              <figcaption className="text-center text-sm text-slate-500 mt-4 italic font-serif flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-slate-300 dark:bg-slate-700"></span>
                {section.content.caption}
                <span className="w-8 h-px bg-slate-300 dark:bg-slate-700"></span>
              </figcaption>
            )}
          </figure>
        );
      case 'code':
        const codeId = `code-${index}`;
        return (
          <div className="relative group my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-[#1e1e1e]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    {section.content.title && (
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                           <Terminal size={12} />
                           {section.content.title}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {section.content.language && (
                       <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                           {section.content.language}
                       </span>
                    )}
                    <button
                        onClick={() => copyToClipboard(section.content.code, codeId)}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                    >
                        {copiedCodeId === codeId ? (
                            <Check size={14} className="text-emerald-500" />
                        ) : (
                            <Copy size={14} />
                        )}
                    </button>
                </div>
            </div>

            <div className="text-sm font-mono leading-relaxed">
                <SyntaxHighlighter
                    language={section.content.language || 'text'}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: '#1e1e1e', // Matches container bg
                        fontSize: '0.9rem',
                        lineHeight: '1.6'
                    }}
                    wrapLines={true}
                    showLineNumbers={true}
                    lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#6e7681', textAlign: 'right' }}
                >
                    {section.content.code}
                </SyntaxHighlighter>
            </div>
          </div>
        );
      case 'list':
        return (
          <ul className={`mb-8 space-y-2 text-lg text-slate-700 dark:text-slate-300 font-serif ${section.content.ordered ? 'list-decimal pl-6' : 'list-none'}`}>
            {section.content.items.map((item: string, i: number) => (
              <li key={i} className={`flex items-start gap-3 ${!section.content.ordered && 'pl-2'}`}>
                {!section.content.ordered && <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 shrink-0" />}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'quote':
        const colors = {
          info: 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300',
          warning: 'border-amber-500 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300',
          success: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-300',
          danger: 'border-rose-500 bg-rose-50 dark:bg-rose-900/10 text-rose-700 dark:text-rose-300',
          default: 'border-primary-500 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300'
        };
        const theme = colors[section.content.type as keyof typeof colors] || colors.default;
        
        return (
          <blockquote className={`my-12 p-8 rounded-r-2xl border-l-4 ${theme}`}>
            <p className="text-xl italic font-serif mb-4">"{section.content.text}"</p>
            {section.content.author && <cite className="text-sm font-bold uppercase tracking-widest opacity-70">— {section.content.author}</cite>}
          </blockquote>
        );
      case 'metrics':
        return (
          <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {section.content.map((m: any, i: number) => (
              <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center">
                <div className="text-4xl mb-4">{m.icon}</div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600 mb-2">{m.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{m.label}</div>
              </div>
            ))}
          </div>
        );
      case 'divider':
        return (
          <div className="my-16 text-center text-slate-300 dark:text-slate-700 text-2xl tracking-[1em]">
            {section.content.style === 'stars' ? '✨ ✨ ✨' : '• • •'}
          </div>
        );
      case 'callout':
        return (
            <div className={`my-10 p-6 rounded-xl border flex items-start gap-4 ${
                section.content.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 
                section.content.color === 'rose' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800' :
                'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
            }`}>
                <div className="text-2xl">{section.content.icon}</div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{section.content.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{section.content.text}</p>
                </div>
            </div>
        );
      case 'twoColumn':
        return (
          <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>{renderSection(section.content.left, index * 100)}</div>
            <div>{renderSection(section.content.right, index * 100 + 1)}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-slate-200 dark:bg-slate-800">
        <div className="h-full bg-primary-500 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      <nav className="fixed top-24 left-6 hidden 2xl:flex flex-col gap-4 z-40">
        <Link to="/blog" className="w-10 h-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-500 shadow-sm transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <button className="w-10 h-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-500 shadow-sm"><Share2 size={16} /></button>
        <button className="w-10 h-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-500 shadow-sm"><Bookmark size={16} /></button>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-40 bg-slate-950 text-white overflow-hidden text-left">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={image} className="w-full h-full object-cover grayscale" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>
        <div className="max-w-[720px] mx-auto px-6 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 border border-white/10 rounded text-primary-400 text-[9px] font-black uppercase tracking-widest mb-8 backdrop-blur-md">
            {category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-tight text-left">{title}</h1>
          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/5 text-left">
            <div className="flex items-center gap-3">
              <img src={author.avatar} className="w-9 h-9 rounded-full border border-white/10" alt="" />
              <div className="text-left">
                <div className="text-xs font-bold">{author.name}</div>
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{author.role}</div>
              </div>
            </div>
            <div className="flex gap-6 text-[9px] font-bold uppercase tracking-widest text-slate-400 text-left">
               <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary-500" /> {date}</span>
               <span className="flex items-center gap-1.5"><Clock size={12} className="text-blue-500" /> {readingTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-[1440px] mx-auto px-6 relative z-10 -mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sidebar (Desktop) - Empty or Share */}
        <div className="hidden lg:block lg:col-span-2">
           {/* Placeholder for future side widgets */}
        </div>

        {/* Center Content */}
        <article className="lg:col-span-8 bg-white dark:bg-slate-950 p-8 md:p-14 rounded-3xl shadow-2xl shadow-slate-950/5 border border-slate-100 dark:border-slate-800/50">
          {structuredContent.map((section, index) => (
            <div key={index}>
              {renderSection(section, index)}
            </div>
          ))}

          {/* Post Footer */}
          <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-900">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-400">Written By</h4>
            <div className="flex items-center gap-6">
                <img src={author.avatar} className="w-16 h-16 rounded-full border border-slate-200 dark:border-slate-800" alt="" />
                <div>
                    <h5 className="text-lg font-bold text-slate-900 dark:text-white">{author.name}</h5>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{author.role}</p>
                    <div className="flex gap-3 mt-3">
                        {author.linkedin && <a href={author.linkedin} target="_blank" rel="noopener" className="text-slate-400 hover:text-[#0077b5]"><Linkedin size={18} /></a>}
                        {author.twitter && <a href={author.twitter} target="_blank" rel="noopener" className="text-slate-400 hover:text-[#1DA1F2]"><Twitter size={18} /></a>}
                    </div>
                </div>
            </div>
          </div>
        </article>

        {/* Right Sidebar - Table of Contents */}
        <aside className="hidden xl:block xl:col-span-2 relative">
          <div className="sticky top-32">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Table of Contents</h4>
            <ul className="space-y-3 border-l-2 border-slate-100 dark:border-slate-800">
              {structuredContent
                .filter(s => s.type === 'header' || s.type === 'subheader')
                .map((header, i) => (
                  <li key={i} className={`pl-4 ${header.type === 'subheader' ? 'ml-2' : ''}`}>
                    <a 
                      href={`#${header.id}`}
                      className={`text-sm transition-colors block py-1 ${
                        activeId === header.id 
                          ? 'text-primary-500 font-bold -ml-[18px] border-l-2 border-primary-500 pl-[14px]' 
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {header.content}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </main>

      {/* Scroll to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className={`fixed bottom-8 right-8 w-12 h-12 bg-primary-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 ${scrollProgress > 10 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default BlogTemplate;
