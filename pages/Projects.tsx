
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data';
import { Domain } from '../types';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Domain | 'All'>('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.domain === filter);

  const domains = ['All', ...Object.values(Domain)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold mb-4">Project Portfolio</h1>
          <p className="text-slate-600 dark:text-slate-400">A collection of systems I've architected and models I've deployed.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Filter size={18} className="text-slate-400" />
          <div className="flex flex-wrap gap-2">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === d 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary-500'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Link 
            key={project.id}
            to={`/projects/${project.slug}`}
            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/5 transition-all"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={20} className="text-primary-500" />
              </div>
            </div>
            
            <div className="p-8">
              <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3">{project.domain}</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-500 transition-colors">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-1 text-[10px] bg-slate-100 dark:bg-slate-800 rounded uppercase font-bold tracking-tight text-slate-500">
                    {t}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                {project.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs text-slate-400 uppercase tracking-tighter mb-1">Impact</div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{m}</div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
