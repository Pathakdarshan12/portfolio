
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Database, BarChart, Server } from 'lucide-react';
import { CASE_STUDIES } from '../data';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find(s => s.slug === slug);

  if (!study) return <div>Case study not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link 
        to="/case-studies" 
        className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-12"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Case Studies
      </Link>

      <div className="bg-primary-500 text-white rounded-3xl p-8 lg:p-16 mb-20">
        <div className="text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-80">Full Case Study</div>
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-8 leading-tight">
          {study.title}
        </h1>
        <div className="flex flex-wrap gap-8 text-sm lg:text-base font-medium opacity-90">
          <div className="flex items-center"><Database size={20} className="mr-2" /> {study.domain}</div>
          <div className="flex items-center"><Server size={20} className="mr-2" /> Modern Infrastructure</div>
          <div className="flex items-center"><BarChart size={20} className="mr-2" /> High Impact</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-6">Executive Summary</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "{study.summary}"
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">The Background</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {study.background}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Technical Approach</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {study.approach}
            </p>
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
               <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary-500">Pipeline Visualization</h3>
               {/* Simplified Diagram Component */}
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
                 <div className="w-full sm:w-1/4 h-20 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs uppercase text-center p-2">Raw Sources</div>
                 <div className="hidden sm:block text-slate-300">→</div>
                 <div className="w-full sm:w-1/4 h-20 rounded-xl bg-primary-500/10 border-2 border-primary-500/30 flex items-center justify-center font-bold text-xs uppercase text-center p-2">Ingestion & Validation</div>
                 <div className="hidden sm:block text-slate-300">→</div>
                 <div className="w-full sm:w-1/4 h-20 rounded-xl bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center font-bold text-xs uppercase text-center p-2">Transformation (dbt)</div>
                 <div className="hidden sm:block text-slate-300">→</div>
                 <div className="w-full sm:w-1/4 h-20 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs uppercase text-center p-2">Semantic Layer</div>
               </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Results & Business Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {study.results.map((res, i) => (
                <div key={i} className="flex items-start p-6 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <CheckCircle className="text-emerald-500 mt-1 mr-3 shrink-0" size={20} />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{res}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-10">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Project Metadata</h3>
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Technologies Used</div>
                <div className="flex flex-wrap gap-2">
                  {study.techStack.map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Domain Focus</div>
                <div className="font-bold text-lg text-primary-500">{study.domain}</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Industry</div>
                <div className="font-bold text-lg">FinTech / E-Commerce</div>
              </div>
            </div>
          </div>
          
          <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-4">Want the whitepaper?</h3>
            <p className="text-sm text-slate-400 mb-6">
              I've prepared a detailed technical walkthrough for this project including architecture schemas and model code.
            </p>
            <button className="w-full py-3 bg-primary-500 rounded-xl font-bold hover:bg-primary-600 transition-colors">
              Request PDF Access
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
