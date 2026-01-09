
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Github, Code2, Layers, Target, 
  Zap, Activity, Database, Microscope, Search, ShieldCheck, 
  Clock, TrendingDown, ArrowDownCircle, CheckSquare, 
  LayoutDashboard, GitBranch, Terminal, Trophy, ChevronRight,
  PlayCircle, Briefcase, Calendar, Users, Cpu, BarChart, CheckCircle,
  ArrowRight, Box, Server, Globe, Sparkles, Share2, Bookmark, MoreHorizontal,
  ArrowUpRight, Monitor
} from 'lucide-react';
import { PROJECTS } from '../data';

const IconMap: Record<string, any> = {
  Zap, Activity, Database, Microscope, Search, ShieldCheck,
  Clock, TrendingDown, ArrowDownCircle, CheckSquare, Target,
  Layers, LayoutDashboard, Cpu, BarChart, Monitor, Server, Box
};

const DataFlowDiagram = ({ techCategories }: { techCategories: any[] }) => {
  const stages = [
    { label: 'Sources', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', category: 'Data Sources' },
    { label: 'Processing', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', category: 'Transformation' },
    { label: 'Storage', icon: Server, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', category: 'Data Warehouse' },
    { label: 'Insight', icon: Monitor, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', category: 'Visualization' }
  ];

  // Helper to find tools for a generic stage if the category names don't match perfectly
  const getToolsForStage = (stageLabel: string) => {
    const matched = techCategories.find(c =>
      c.category.toLowerCase().includes(stageLabel.toLowerCase()) ||
      (stageLabel === 'Sources' && c.category.toLowerCase().includes('ingestion')) ||
      (stageLabel === 'Processing' && c.category.toLowerCase().includes('processing')) ||
      (stageLabel === 'Storage' && c.category.toLowerCase().includes('warehouse'))
    );
    return matched ? matched.tools : [];
  };

  return (
    <div className="relative py-12 px-4 overflow-hidden">
      {/* Background Flow Animation Lines - Desktop Only */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-1/2 hidden md:block z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary-500 to-transparent animate-[flow_3s_linear_infinite]" style={{ backgroundSize: '200% 100%' }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {stages.map((stage, i) => {
          const tools = getToolsForStage(stage.label);
          const Icon = stage.icon;
          return (
            <div key={stage.label} className="flex flex-col items-center">
              <div className={`w-full p-6 rounded-[2rem] border-2 ${stage.bg} ${stage.border} backdrop-blur-md transition-all hover:scale-105 group`}>
                <div className={`w-12 h-12 rounded-2xl ${stage.bg} ${stage.color} flex items-center justify-center mb-4 transition-transform group-hover:rotate-12`}>
                  <Icon size={24} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-3 text-slate-900 dark:text-white">{stage.label}</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {tools.length > 0 ? tools.slice(0, 3).map((t: string) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-1 bg-white/50 dark:bg-slate-900/50 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm">{t}</span>
                  )) : (
                    <span className="text-[10px] font-bold px-2 py-1 opacity-40 italic">System Core</span>
                  )}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="md:hidden flex flex-col items-center py-4">
                   <ArrowDownCircle className="text-slate-300 dark:text-slate-700" size={24} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes flow {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-fade-in">
      <section className="relative pt-12 pb-32 overflow-hidden bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/projects" className="inline-flex items-center text-slate-400 hover:text-white transition-all group mb-12">
            <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
          <div className="max-w-4xl text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6">
              {project.domain}
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-left">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-10 text-left">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href={project.githubUrl} target="_blank" rel="noopener" className="flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold transition-all shadow-lg">
                <Github size={20} className="mr-2" /> GitHub Source
              </a>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener" className="flex items-center px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all">
                  <PlayCircle size={20} className="mr-2" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 dark:border-slate-800/50 bg-slate-900">
          <div className="relative aspect-video lg:aspect-[21/9]">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {(project.detailedMetrics || []).map((metric, i) => {
            const Icon = IconMap[metric.icon] || Activity;
            return (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group">
                <div className="mb-4 p-2 w-fit rounded-lg bg-primary-500/10 text-primary-500 transition-transform group-hover:scale-110">
                  <Icon size={20} />
                </div>
                <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 mb-1">{metric.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 text-left">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-4">
            <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 mb-12 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-500'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <tab.icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-[500px] animate-fade-in">
              {activeTab === 'overview' && (
                <div className="space-y-16 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <section>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500"><Target size={24} /></div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">The Problem</h2>
                      </div>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {project.problem}
                      </p>
                    </section>
                    <section>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><Zap size={24} /></div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">The Solution</h2>
                      </div>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {project.solution}
                      </p>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-16 text-left animate-fade-in">
                  {/* Data Flow Diagram Section */}
                  <section>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-3xl font-black tracking-tight mb-2">Architecture Insight</h3>
                        <p className="text-slate-500 font-medium">Modular systems design with high-integrity data flow.</p>
                      </div>
                      <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Activity size={14} className="animate-pulse text-primary-500" /> System Active
                      </div>
                    </div>

                    <DataFlowDiagram techCategories={project.techCategories || []} />
                  </section>

                  {/* Tech Stack Breakdown Section */}
                  <section>
                    <h3 className="text-2xl font-black mb-10 tracking-tight">Technology Stack</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {(project.techCategories || []).map((cat, i) => (
                        <div key={cat.category} className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-6">{cat.category}</h4>
                          <div className="flex flex-wrap gap-2.5">
                            {cat.tools.map(tool => (
                              <div key={tool} className="group relative">
                                <span className="px-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-black hover:border-primary-500 hover:text-primary-500 transition-all cursor-default block">
                                  {tool}
                                </span>
                                {/* Mini Tooltip Mockup */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-[9px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                  Integrated via {project.domain}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Strategic Approach */}
                  <section>
                    <div className="max-w-4xl">
                      <h3 className="text-2xl font-black mb-8 tracking-tight">Strategic Approach</h3>
                      <div className="space-y-6">
                        {(project.approach || []).map((step, i) => (
                          <div key={i} className="flex gap-6 group">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm font-black group-hover:bg-primary-500 group-hover:text-white transition-all">
                                {i + 1}
                              </div>
                              {i < (project.approach?.length || 0) - 1 && (
                                <div className="w-px flex-grow bg-slate-200 dark:bg-slate-800 my-2"></div>
                              )}
                            </div>
                            <div className="pb-8">
                              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {step}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'implementation' && (
                <div className="space-y-12 text-left animate-fade-in">
                  <section>
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-3xl font-black tracking-tight">Technical Execution</h3>
                       <a href={project.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-primary-500 font-bold hover:underline">
                         View Source <ArrowUpRight size={16} />
                       </a>
                    </div>
                    <div className="space-y-10">
                       {(project.implementationCode || []).length > 0 ? (
                         (project.implementationCode || []).map((snippet, i) => (
                            <div key={i} className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900">
                               <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <Terminal size={16} className="text-primary-400" />
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">{snippet.title}</span>
                                  </div>
                                  <div className="flex gap-1.5">
                                     <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                     <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                     <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                  </div>
                               </div>
                               <div className="p-8 overflow-x-auto">
                                  <pre className="font-mono text-sm leading-relaxed text-slate-300"><code>{snippet.code}</code></pre>
                               </div>
                            </div>
                         ))
                       ) : (
                         <div className="p-20 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <Code2 size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 font-bold">Project source code is available on GitHub for this project.</p>
                            <a href={project.githubUrl} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 text-primary-500 font-black hover:underline">View Repository <ArrowUpRight size={16} /></a>
                         </div>
                       )}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'results' && (
                <div className="space-y-12 text-left animate-fade-in">
                   <section>
                      <h3 className="text-3xl font-black mb-8 tracking-tight">Project Outcomes</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-6">Key Deliverables</h4>
                            <div className="space-y-4">
                               {(project.metrics || []).map((metric, i) => (
                                 <div key={i} className="flex items-start p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/30 transition-colors group">
                                    <CheckCircle size={24} className="text-emerald-500 mr-4 shrink-0 transition-transform group-hover:scale-110" />
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{metric}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="bg-primary-500/5 dark:bg-primary-500/10 rounded-[3rem] border border-primary-500/20 p-12 flex flex-col justify-center">
                            <div className="w-16 h-16 rounded-3xl bg-primary-500 flex items-center justify-center text-white mb-8 shadow-xl shadow-primary-500/20">
                              <Trophy size={32} />
                            </div>
                            <h4 className="text-3xl font-black mb-4 tracking-tight">Architecture Validated</h4>
                            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                               The project successfully achieved production-grade scalability and accuracy, meeting all architectural goals.
                            </p>
                            <Link to="/connect" className="mt-10 inline-flex items-center gap-2 text-primary-500 font-black hover:gap-4 transition-all uppercase tracking-widest text-xs">
                              Discuss Implementation <ArrowRight size={16} />
                            </Link>
                         </div>
                      </div>
                   </section>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
