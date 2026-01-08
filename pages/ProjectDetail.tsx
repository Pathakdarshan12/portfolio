
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Github, ExternalLink, Code2, Layers, Target,
  Zap, Activity, Database, Microscope, Search, ShieldCheck,
  Clock, TrendingDown, ArrowDownCircle, CheckSquare,
  LayoutDashboard, GitBranch, Terminal, Trophy, ChevronRight,
  PlayCircle, Briefcase, Calendar, Users, Cpu, BarChart
} from 'lucide-react';
import { PROJECTS } from '../data';

const IconMap: Record<string, any> = {
  Zap, Activity, Database, Microscope, Search, ShieldCheck,
  Clock, TrendingDown, ArrowDownCircle, CheckSquare, Target,
  Layers, LayoutDashboard, Cpu, BarChart
};

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'implementation' | 'results'>('overview');
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects" className="text-primary-500 hover:underline">Return to projects</Link>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'architecture', label: 'Architecture', icon: GitBranch },
    { id: 'implementation', label: 'Implementation', icon: Terminal },
    { id: 'results', label: 'Outcomes', icon: Trophy },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-12 pb-32 overflow-hidden bg-slate-900 text-white">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/projects"
            className="inline-flex items-center text-slate-400 hover:text-white transition-all group mb-12"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              {project.domain}
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-primary-400">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-10">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href={project.demoUrl} className="flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95">
                <PlayCircle size={20} className="mr-2" /> Live Demo
              </a>
              <a href={project.githubUrl} className="flex items-center px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all backdrop-blur-md hover:scale-105 active:scale-95">
                <Github size={20} className="mr-2" /> GitHub Source
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 backdrop-blur-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image & Metrics Overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 dark:border-slate-800/50 bg-slate-900 group">
          <div className="relative aspect-video lg:aspect-[21/9]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {(project.detailedMetrics || []).map((metric, i) => {
            const Icon = IconMap[metric.icon] || Activity;
            return (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="mb-4 p-2 w-fit rounded-lg bg-primary-500/10 text-primary-500 group-hover:scale-110 transition-transform">
                  <Icon size={20} />
                </div>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500 mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{metric.label}</div>
                <div className="text-sm text-slate-400">{metric.detail}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Main Content (3 cols) */}
          <div className="lg:col-span-3">
            {/* Tabs Navigation */}
            <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 mb-12 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 relative ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-500'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <tab.icon size={18} className="mr-2" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-full bg-primary-500/5 -z-10 rounded-t-lg"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'overview' && (
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                        <Target size={24} />
                      </div>
                      <h2 className="text-3xl font-bold">The Project Goal</h2>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
                      {project.problem || "Information about the specific technical challenges addressed."}
                    </p>
                    <div className="mt-8 p-8 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-primary-500">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Technical Insight</h4>
                      <p className="text-slate-600 dark:text-slate-400 italic">"Building this project demonstrated the value of modularity and proactive testing in scalable data architectures."</p>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                        <Zap size={24} />
                      </div>
                      <h2 className="text-3xl font-bold">Technical Approach</h2>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                      {project.solution || "High-level overview of the solution architecture and learning strategy."}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(project.approach || []).map((step, i) => (
                        <div key={i} className="flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl group hover:border-primary-500/30 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center font-bold text-xs mr-4 shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-all">
                            {i + 1}
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{step}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-16">
                  <section>
                    <h3 className="text-2xl font-bold mb-8">System Architecture Flow</h3>
                    <div className="p-10 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
                      <div className="min-w-[700px] flex items-center justify-between">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm text-center">
                            <Database className="mx-auto mb-2 text-primary-500" />
                            <div className="font-bold text-xs uppercase">Sources</div>
                            <div className="text-[10px] text-slate-400 mt-1">Ingestion</div>
                          </div>
                        </div>
                        <div className="h-0.5 w-12 bg-slate-300 dark:bg-slate-700 relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 dark:bg-slate-700 rotate-45 border-t-2 border-r-2 border-slate-400"></div>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-6 bg-primary-500/10 border-2 border-primary-500/30 rounded-2xl shadow-sm text-center scale-110">
                            <Layers className="mx-auto mb-2 text-primary-500" />
                            <div className="font-bold text-xs uppercase">Processing</div>
                            <div className="text-[10px] text-primary-400 mt-1">Transformation</div>
                          </div>
                        </div>
                        <div className="h-0.5 w-12 bg-slate-300 dark:bg-slate-700 relative">
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 dark:bg-slate-700 rotate-45"></div>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-6 bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl shadow-sm text-center">
                            <ShieldCheck className="mx-auto mb-2 text-blue-500" />
                            <div className="font-bold text-xs uppercase">Quality</div>
                            <div className="text-[10px] text-blue-400 mt-1">Validation</div>
                          </div>
                        </div>
                        <div className="h-0.5 w-12 bg-slate-300 dark:bg-slate-700 relative"></div>
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm text-center">
                            <Activity className="mx-auto mb-2 text-emerald-500" />
                            <div className="font-bold text-xs uppercase">Output</div>
                            <div className="text-[10px] text-slate-400 mt-1">Reporting / AI</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-8">Technology Stack</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {(project.techCategories || []).map((cat, i) => (
                        <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                          <h4 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-6">{cat.category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {cat.tools.map(tool => (
                              <div key={tool} className="flex items-center px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl font-bold text-sm">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                                {tool}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'implementation' && (
                <div className="space-y-12">
                  <section>
                    <h3 className="text-2xl font-bold mb-8">Implementation Showcase</h3>
                    {(project.implementationCode || []).map((snippet, i) => (
                      <div key={i} className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Code2 size={18} className="text-primary-500 mr-2" />
                            <h4 className="font-bold">{snippet.title}</h4>
                          </div>
                          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-500">
                            {snippet.lang}
                          </span>
                        </div>
                        <div className="relative group">
                           <div className="bg-slate-900 rounded-3xl p-8 overflow-hidden border border-white/5 shadow-2xl">
                             <pre className="text-sm font-mono text-slate-300 leading-relaxed overflow-x-auto">
                               <code>{snippet.code}</code>
                             </pre>
                             <button className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                               <Layers size={16} />
                             </button>
                           </div>
                        </div>
                      </div>
                    ))}
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-6">Learning Outcomes</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'System Design', desc: 'Gained deep understanding of end-to-end data flows and service decoupling.' },
                        { title: 'Optimization Techniques', desc: 'Explored performance tuning in high-dimensional vector spaces and database indexing.' },
                        { title: 'Quality Frameworks', desc: 'Integrated automated testing into every step of the developer lifecycle.' }
                      ].map((feature, i) => (
                        <details key={i} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden" open={i === 0}>
                          <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold">
                            {feature.title}
                            <ChevronRight size={18} className="group-open:rotate-90 transition-transform" />
                          </summary>
                          <div className="px-6 pb-6 text-slate-500 text-sm">
                            {feature.desc}
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'results' && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
                      <div className="text-emerald-500 font-bold mb-4 flex items-center">
                        <Trophy size={20} className="mr-2" /> Key Achievements
                      </div>
                      <div className="space-y-4">
                        {(project.metrics || []).map((m, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <CheckSquare size={18} className="text-emerald-500" />
                            <span className="font-bold text-slate-800 dark:text-slate-200">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-8 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                      <h4 className="font-bold mb-4">Skills Demonstrated</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <span key={t} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <section className="pt-8">
                    <h3 className="text-2xl font-bold mb-8">Technical Impact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        { label: 'System Complexity', value: 'High', sub: 'Multi-layer integration' },
                        { label: 'Test Coverage', value: '95%+', sub: 'Robust CI automation' },
                        { label: 'Architecture', value: 'Modern', sub: 'Cloud-native design' }
                      ].map((stat, i) => (
                        <div key={i} className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                          <div className="text-3xl font-extrabold text-primary-500 mb-1">{stat.value}</div>
                          <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">{stat.label}</div>
                          <div className="text-xs text-slate-400">{stat.sub}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar (1 col) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Info Card */}
              <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl">
                <h3 className="font-bold text-lg mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Project Info</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Briefcase className="text-primary-500 mr-3 shrink-0" size={18} />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Category</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{project.client || "Portfolio Project"}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="text-primary-500 mr-3 shrink-0" size={18} />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Duration</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{project.duration || "Self-paced"}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="text-primary-500 mr-3 shrink-0" size={18} />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Contribution</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{project.role || "Developer"}</div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-10 py-4 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:scale-[1.02] transition-transform">
                  Download Technical Docs
                </button>
              </div>

              {/* Outcomes List */}
              <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl">
                <h3 className="font-bold mb-6 text-primary-400">Technical Outcomes</h3>
                <ul className="space-y-4">
                  {(project.metrics || []).map((m, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-5 h-5 bg-primary-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-semibold text-slate-300">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
