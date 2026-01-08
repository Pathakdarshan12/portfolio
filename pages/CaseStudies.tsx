
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import { CASE_STUDIES } from '../data';

const CaseStudies: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl font-bold mb-6">Technical Case Studies</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          In-depth technical narratives exploring complex problem solving, architecture design, and strategic execution.
        </p>
      </div>

      <div className="space-y-12">
        {CASE_STUDIES.map((study) => (
          <div key={study.id} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="lg:col-span-5 h-64 lg:h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-12">
              <BookOpen size={80} className="text-primary-500 opacity-20 group-hover:scale-110 transition-transform" />
            </div>
            
            <div className="lg:col-span-7 p-8 lg:p-12">
              <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-4">{study.domain}</div>
              <h2 className="text-3xl font-bold mb-6 group-hover:text-primary-500 transition-colors">{study.title}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {study.summary}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {study.techStack.map(t => (
                  <span key={t} className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500">
                    {t}
                  </span>
                ))}
              </div>

              <Link 
                to={`/case-studies/${study.slug}`}
                className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors"
              >
                Read Case Study <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
