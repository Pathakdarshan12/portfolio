
import React from 'react';
import { useParams, Link } from 'react-router-dom';
// Added missing Calendar and CheckSquare imports
import {
  ArrowLeft, CheckCircle, Database, BarChart, Server, Globe,
  ShieldCheck, Zap, Layers, Sparkles, ExternalLink, Github,
  Calendar, CheckSquare
} from 'lucide-react';
import { CASE_STUDIES } from '../data';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find(s => s.slug === slug);

  if (!study) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 animate-fade-in">
      <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
        <h1 className="text-3xl font-black mb-6 text-left">Case Narrative Not Found</h1>
        <p className="text-slate-500 mb-10 font-medium text-left">The specific technical deep-dive you requested doesn't exist or has been relocated.</p>
        <Link to="/case-studies" className="px-8 py-4 bg-primary-500 text-white rounded-2xl font-black shadow-xl shadow-primary-500/20 inline-flex items-center gap-3">
          <ArrowLeft size={18} /> Return to Library
        </Link>
      </div>
    </div>
  );

  const resultsList = study.results || study.keyFindings || [];
  const technologiesList = study.techStack || study.technologies || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 animate-fade-in">
      {/* Hero Header */}
      <section className="relative pt-24 pb-48 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            to="/case-studies"
            className="inline-flex items-center text-slate-400 hover:text-white transition-all group mb-16 text-xs font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-2 transition-transform" /> Back to Case Studies
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 backdrop-blur-md">
              <Sparkles size={14} /> Technical Dissection
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter leading-[0.95] text-left">
              {study.title}
            </h1>
            <div className="flex flex-wrap gap-8 text-sm font-bold text-slate-400">
              <div className="flex items-center gap-3"><Database size={20} className="text-primary-500" /> {study.domain}</div>
              {study.publishedDate && <div className="flex items-center gap-3"><Calendar size={20} className="text-blue-500" /> {study.publishedDate}</div>}
              {study.repoUrl && (
                <a href={study.repoUrl} target="_blank" rel="noopener" className="flex items-center gap-3 text-primary-400 hover:text-white transition-colors">
                  <Github size={20} /> Repository Source
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-12">
            <div className="p-10 lg:p-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-2xl">
              <section className="mb-20">
                <h2 className="text-3xl font-black mb-8 tracking-tight text-left">Narrative Insight</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic border-l-4 border-primary-500 pl-8 text-left">
                  "{study.summary || study.description}"
                </p>
              </section>

              {study.background && (
                <section className="mb-20">
                  <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-slate-400 text-xs text-left">The Context</h2>
                  <div className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6 text-left">
                    {study.background}
                  </div>
                </section>
              )}

              {study.approach && (
                <section className="mb-20">
                  <h2 className="text-2xl font-black mb-8 text-left">Strategic Implementation</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10 text-left">
                    {study.approach}
                  </p>

                  {/* Visual Architecture Flow */}
                  <div className="p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                    <h3 className="font-black mb-10 uppercase text-[10px] tracking-widest text-primary-500 text-left">System Lifecycle Visualization</h3>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                      <div className="w-full md:w-1/4 p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl text-center shadow-sm">
                        <Database className="mx-auto mb-3 text-slate-400" size={24} />
                        <div className="font-black text-[10px] uppercase">Data Source</div>
                      </div>
                      <div className="hidden md:block text-slate-300 dark:text-slate-700">
                         <ArrowLeft className="rotate-180" size={20} />
                      </div>
                      <div className="w-full md:w-1/4 p-6 bg-primary-500 text-white rounded-3xl text-center shadow-xl shadow-primary-500/20 scale-110">
                        <Layers className="mx-auto mb-3" size={24} />
                        <div className="font-black text-[10px] uppercase">Processing</div>
                      </div>
                      <div className="hidden md:block text-slate-300 dark:text-slate-700">
                         <ArrowLeft className="rotate-180" size={20} />
                      </div>
                      <div className="w-full md:w-1/4 p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl text-center shadow-sm">
                        <CheckSquare className="mx-auto mb-3 text-emerald-500" size={24} />
                        <div className="font-black text-[10px] uppercase">Validated Result</div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {resultsList.length > 0 && (
                <section>
                  <h2 className="text-2xl font-black mb-10 text-left">Key Outcomes & Deliverables</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {resultsList.map((res, i) => (
                      <div
                        key={i}
                        className="flex items-start p-8 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] transition-transform hover:scale-[1.02]"
                      >
                        <CheckCircle className="text-emerald-500 mt-1 mr-4 shrink-0" size={24} />
                        <span className="font-black text-slate-800 dark:text-slate-200 text-sm text-left">{res}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 text-left">
            <div className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl sticky top-24">
              <h3 className="font-black text-xl mb-10 border-b border-slate-100 dark:border-slate-800 pb-6 flex items-center gap-3">
                <Globe size={20} className="text-primary-500" /> Case Details
              </h3>
              <div className="space-y-8">
                <div>
                  <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-4">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {technologiesList.map(t => (
                      <span key={t} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Primary Domain</div>
                  <div className="font-black text-lg text-primary-500">{study.domain}</div>
                </div>

                {study.repoUrl && (
                  <div className="pt-6">
                    <a
                      href={study.repoUrl}
                      target="_blank"
                      rel="noopener"
                      className="w-full py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-500 transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                      <Github size={16} /> Explore Repository Source
                    </a>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
