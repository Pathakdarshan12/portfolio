
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, BarChart3, ShieldCheck, Microscope, 
  ArrowRight, Activity, Cpu, Layers 
} from 'lucide-react';
import { PROJECTS, BLOG_POSTS } from '../data';

const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600">Complete Data Lifecycle</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10">
            Expertise in building scalable data architectures, ensuring data reliability through quality engineering, 
            and delivering actionable insights via advanced analytics and Machine Learning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/projects" 
              className="w-full sm:w-auto px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold flex items-center justify-center transition-all shadow-lg shadow-primary-500/20"
            >
              View Projects <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link 
              to="/connect" 
              className="w-full sm:w-auto px-8 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-semibold transition-all"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          {[
              { label: 'Production Pipelines', value: '15+' },
              { label: 'Datasets Validated', value: '100+' },
              { label: 'dbt Models', value: '80+' },
              { label: 'Data Quality SLA', value: '95%+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-500 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Competencies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Core Competencies</h2>
          <p className="text-slate-600 dark:text-slate-400">Specialized skills across the modern data stack</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Data Engineering',
              icon: <Database className="text-blue-500" />,
              desc: 'Designing and maintaining reliable ETL/ELT pipelines, cloud data warehouses, and workflow orchestration.'
            },
            {
              title: 'Data Quality',
              icon: <ShieldCheck className="text-emerald-500" />,
              desc: 'Implementing automated data validation, pipeline testing, and quality checks to prevent production issues.'
            },
            {
              title: 'Data Science',
              icon: <Microscope className="text-rose-500" />,
              desc: 'Applying statistical analysis and machine learning to extract insights and support data-driven decisions.'
            },
            {
              title: 'Data Analytics',
              icon: <Layers className="text-purple-500" />,
              desc: 'Transforming raw data into analytics-ready models and dashboards for consistent business reporting.'
            }
          ].map((skill, i) => (
            <div key={i} className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 transition-colors group">
              <div className="mb-4 p-3 w-fit rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{skill.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-slate-600 dark:text-slate-400">Real-world solutions to complex data challenges</p>
            </div>
            <Link to="/projects" className="hidden sm:flex items-center text-primary-500 font-semibold hover:underline">
              All Projects <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.filter(p => p.featured).slice(0, 3).map((project) => (
              <div key={project.id} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">{project.domain}</div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-1 text-[10px] bg-slate-100 dark:bg-slate-800 rounded uppercase font-bold tracking-tight">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link 
                    to={`/projects/${project.slug}`} 
                    className="w-full py-2 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
          <p className="text-slate-600 dark:text-slate-400">Sharing knowledge from the field</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <Link 
              key={post.id}
              to={`/blog/${post.slug}`}
              className="flex flex-col sm:flex-row bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all p-2"
            >
              <div className="sm:w-48 h-48 sm:h-auto bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-xl">
                  <img src={post.preview_image} alt={post.title} className="w-full h-full object-cover" loading="lazy"/>
               </div>
              <div className="p-6 sm:flex-1">
                <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="text-primary-500 font-bold">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">{post.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center text-primary-500 text-sm font-bold">
                  Read Article <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
