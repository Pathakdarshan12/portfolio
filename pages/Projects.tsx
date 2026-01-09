
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ChevronDown,
  Calendar, Database, Cpu,
  Layers, Microscope, ShieldCheck, Zap,
  Github, PlayCircle, X
} from 'lucide-react';
import { PROJECTS } from '../data';
import { Domain } from '../types';

const statusColors: Record<string, string> = {
  'Live Production': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
  'In Development': 'bg-blue-500/10 text-blue-500 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
  'Case Study': 'bg-purple-500/10 text-purple-500 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Domain | 'All'>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'alphabetical'>('latest');

  const filteredProjects = useMemo(() => {
    let result = PROJECTS.filter(p => {
      const matchesFilter = filter === 'All' || p.domain === filter;
      return matchesFilter;
    });

    if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [filter, sortBy]);

  const domains = ['All', ...Object.values(Domain)];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-primary-600 to-blue-500 dark:from-white dark:via-primary-400 dark:to-blue-400">
            Selected Work
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Exploring the intersection of data engineering, high-performance architecture, and business intelligence.
          </p>
        </header>

        {/* Interactive Controls Bar */}
        <div className="sticky top-20 z-40 mb-12 flex flex-col lg:flex-row items-center gap-6 p-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none">
          {/* Filters */}
          <div className="flex-1 w-full flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 py-1">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d as any)}
                className={`relative px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 group ${
                  filter === d
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-px h-px lg:h-8 bg-slate-200 dark:bg-slate-800 hidden lg:block"></div>

          {/* Sort Only */}
          <div className="flex w-full lg:w-auto items-center gap-4 px-2 pr-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Sort By</span>
            <div className="relative group min-w-[140px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full appearance-none bg-slate-100/50 dark:bg-slate-800/50 border border-transparent px-6 py-2 rounded-2xl outline-none text-sm font-bold pr-10 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <option value="latest">Latest</option>
                <option value="alphabetical">A-Z</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2 animate-in fade-in"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Status Badge */}
                <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${statusColors[project.status || 'Case Study']}`}>
                  {project.status || 'Case Study'}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex-1 bg-white text-slate-900 h-12 rounded-xl flex items-center justify-center font-bold text-sm hover:bg-primary-500 hover:text-white transition-colors"
                    >
                      View Project Details
                    </Link>
                    <div className="flex gap-2">
                      <a href={project.githubUrl} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-primary-500 transition-colors">
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border border-primary-500/20">
                    {project.domain}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-500">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center text-slate-400 text-xs font-bold">
                    <Calendar size={14} className="mr-2" /> {project.publishedDate || '2024'}
                  </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="flex items-center text-sm font-bold text-primary-500 group/link"
                  >
                    Explore Story
                    <ArrowUpRight size={18} className="ml-1 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-bold mb-2">No matching projects</h3>
            <p className="text-slate-500">Try adjusting your filters.</p>
            <button
              onClick={() => {setFilter('All');}}
              className="mt-6 text-primary-500 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
