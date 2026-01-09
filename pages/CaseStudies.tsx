
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, ArrowRight, Sparkles, Database, Layers, ShieldCheck, Zap } from 'lucide-react';
import { CASE_STUDIES } from '../data';

const CaseStudies: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-40 relative overflow-hidden animate-fade-in">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Impactful Hero */}
        <header className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-[0.3em] mb-8">
            <Sparkles size={14} /> Architectural Narratives
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            Engineering <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-blue-600 to-indigo-600">Decision Intelligence</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Detailed dissections of technical strategy, distributed system design, and the high-impact results delivered through data architecture.
          </p>
        </header>

        {/* Case Study Grid */}
        <div className="space-y-16">
          {CASE_STUDIES.length > 0 ? (
            CASE_STUDIES.map((study, i) => (
              <div
                key={study.id}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Visual Icon Section */}
                <div className="lg:col-span-4 min-h-[300px] bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                  <BookOpen size={100} className="text-primary-500 opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 relative z-10" />

                  {/* Tech Floating Icons for Visual Interest */}
                  <div className="absolute top-8 left-8 p-3 bg-white/50 dark:bg-slate-700 rounded-2xl backdrop-blur-md opacity-40 group-hover:opacity-100 transition-opacity">
                    <Database size={24} className="text-primary-500" />
                  </div>
                  <div className="absolute bottom-8 right-8 p-3 bg-white/50 dark:bg-slate-700 rounded-2xl backdrop-blur-md opacity-40 group-hover:opacity-100 transition-opacity">
                    <Zap size={24} className="text-amber-500" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-8 p-10 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-primary-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20">
                      {study.domain}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Case Narrative • {(study.techStack || study.technologies || []).length} Technologies
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-black mb-8 group-hover:text-primary-500 transition-colors leading-tight text-left">
                    {study.title}
                  </h2>

                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium text-left">
                    {study.summary || study.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-12">
                    {(study.techStack || study.technologies || []).map(t => (
                      <span key={t} className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mt-auto">
                    <Link
                      to={`/case-studies/${study.slug}`}
                      className="inline-flex items-center px-10 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-black transition-all shadow-xl shadow-primary-500/20 group/btn"
                    >
                      Read Full Story <ChevronRight size={20} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="py-32 text-center bg-white dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-20 h-20 bg-primary-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary-500">
                <BookOpen size={40} />
              </div>
              <h3 className="text-3xl font-black mb-4">Case Library Empty</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
                Our detailed technical narratives are currently undergoing final documentation review. Check back shortly for deep architectural dives.
              </p>
              <Link
                to="/"
                className="inline-flex items-center text-primary-500 font-black text-sm uppercase tracking-widest hover:underline"
              >
                Return to Dashboard <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
