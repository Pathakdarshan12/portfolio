
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Database, ShieldCheck, Layers, Microscope,
  ArrowRight, CheckCircle2, Briefcase, Focus, Globe,
  Zap, Activity, Download, Camera, Coffee,
  Gamepad2, Mountain, Quote, ArrowUpRight, Calendar, Heart, Eye
} from 'lucide-react';
import { PROJECTS, BLOG_POSTS } from '../data';

const Home: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [typedText, setTypedText] = useState('');
  const roles = ["Data Engineer by craft", "Quality Guardian by principle", "Analytics Architect by design", "Data Scientist by curiosity"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Typewriter effect for roles
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentRole = roles[roleIndex];

    if (typedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setTypedText(currentRole.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText('');
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [typedText, roleIndex]);

  const lifecycleStages = [
    {
      title: 'Data Engineering',
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      description: 'I build scalable, self-healing pipelines that ingest millions of events daily.',
      tools: ['Spark', 'Kafka', 'Airflow', 'Python'],
      impact: '100+ TB Processed'
    },
    {
      title: 'Data Quality',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500',
      description: 'I treat data as code, implementing unit tests and automated observability.',
      tools: ['dbt tests', 'Great Expectations', 'Soda'],
      impact: '99.9% Reliability'
    },
    {
      title: 'Analytics Engineering',
      icon: Layers,
      color: 'from-purple-500 to-indigo-500',
      description: 'I transform raw data into semantic layers for self-service business intelligence.',
      tools: ['dbt', 'Snowflake', 'SQL', 'Looker'],
      impact: '200+ Active Users'
    },
    {
      title: 'Data Science',
      icon: Microscope,
      color: 'from-rose-500 to-pink-500',
      description: 'I develop predictive models that turn historical data into future strategy.',
      tools: ['Python', 'BERT', 'MLflow', 'PyTorch'],
      impact: '15% Churn Reduction'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* 1. Hero Section: The Polymath Introduction */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05]"
               style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl">
                  <img src="https://picsum.photos/seed/dp/800/800" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">The Data Polymath</h2>
                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
                  I Build the Complete <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-purple-500 to-blue-500">Data Story</span>
                </h1>
                <div className="h-8 flex items-center">
                   <span className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 font-medium">
                    {typedText}
                    <span className="inline-block w-1 h-6 ml-1 bg-primary-500 animate-pulse"></span>
                   </span>
                </div>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                Bridging the gap across the complete data lifecycle—from ingestion and transformation
                to quality assurance and predictive modeling.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary-500/20 flex items-center group">
                  View Projects <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <a href="#" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center">
                  <Download className="mr-2" size={18} /> Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none">
          {[
            { label: 'Data Ingested', value: '100+ TB', icon: Database },
            { label: 'Reliability', value: '99.9%', icon: ShieldCheck },
            { label: 'Models Deployed', value: '50+', icon: Microscope },
            { label: 'Years Experience', value: '6+', icon: Briefcase },
          ].map((stat, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
              <div className="p-3 bg-primary-500/10 text-primary-500 rounded-xl group-hover:scale-110 transition-transform">
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Lifecycle Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Operational Philosophy</h2>
          <h3 className="text-4xl font-bold">The Complete Lifecycle</h3>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 hidden lg:block -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lifecycleStages.map((stage, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveStage(i)}
                onMouseLeave={() => setActiveStage(null)}
                className={`relative p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] transition-all duration-500 cursor-default group ${
                  activeStage === i ? 'shadow-2xl shadow-primary-500/10 -translate-y-2 border-primary-500/50 scale-105' : 'hover:border-primary-500/20'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stage.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 transition-transform`}>
                  <stage.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">{stage.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {stage.description}
                </p>

                <div className={`space-y-4 transition-all duration-500 overflow-hidden ${activeStage === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Outcome</div>
                      <div className="flex items-center text-sm font-bold text-slate-800 dark:text-slate-200">
                         <Zap size={14} className="mr-2 text-yellow-500" /> {stage.impact}
                      </div>
                   </div>
                </div>
                <div className="absolute top-1/2 -right-4 w-3 h-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-full hidden lg:block translate-y-[-50%] group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Philosophy Section */}
      <section className="bg-slate-900 text-white py-32 overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Quote className="mx-auto text-primary-500 mb-12 opacity-50" size={60} />
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-16 tracking-tight">
            "Most people specialize in one part of the data stack. I chose to <span className="text-primary-400">master the entire journey</span>."
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Engineering Foundation', text: "Without solid pipelines, there's no data to analyze. Infrastructure is the bedrock." },
              { title: 'Quality First', text: "Bad data equals bad decisions. I treat data like production code—tested and observed." },
              { title: 'End-to-End Thinking', text: "I design systems thinking about the entire lifecycle, ensuring seamless transitions." },
            ].map((p, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                <h4 className="font-bold text-lg mb-3">{p.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Featured Work</h2>
            <h3 className="text-4xl font-bold">Selected Projects</h3>
          </div>
          <Link to="/projects" className="hidden sm:flex items-center text-primary-500 font-bold hover:underline">
            View All <ArrowUpRight size={18} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PROJECTS.filter(p => p.featured).slice(0, 3).map((project, index) => (
            <div key={project.id} className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-video overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <Link to={`/projects/${project.slug}`} className="w-full py-2 bg-white text-slate-900 rounded-xl font-bold text-sm text-center">Explore Story</Link>
                </div>
              </div>
              <div className="p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-500 mb-2 block">{project.domain}</span>
                <h4 className="text-xl font-bold mb-4">{project.title}</h4>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Professional Journey Timeline */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Milestones</h2>
            <h3 className="text-4xl font-bold">The Career Path</h3>
          </div>

          <div className="space-y-12">
            {[
              { role: 'Lead Data Architect', company: 'TechFlow Solutions', period: '2022 - Present', desc: 'Architected a multi-cloud data mesh serving 500+ users.', tech: ['DuckDB', 'Dagster', 'GCP'] },
              { role: 'Senior Analytics Engineer', company: 'DataSense Inc.', period: '2020 - 2022', desc: 'Implemented first dbt-led transformation layer.', tech: ['dbt', 'Snowflake', 'Airflow'] }
            ].map((job, i) => (
              <div key={i} className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-16 h-16 bg-primary-500/10 text-primary-500 rounded-2xl flex items-center justify-center shrink-0">
                  <Briefcase size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h4 className="text-2xl font-bold">{job.role}</h4>
                    <span className="text-sm font-bold text-slate-400">{job.period}</span>
                  </div>
                  <p className="text-primary-500 font-bold mb-4">{job.company}</p>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{job.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map(t => <span key={t} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Insights</h2>
          <h3 className="text-4xl font-bold">Latest Writings</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6">
              <div className="sm:w-32 sm:h-32 bg-primary-500/10 rounded-2xl flex items-center justify-center shrink-0">
                 <Activity className="text-primary-500 opacity-50" size={40} />
              </div>
              <div>
                 <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                   <Calendar size={12} /> {post.date}
                   <span className="text-primary-500">{post.category}</span>
                 </div>
                 <h4 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">{post.title}</h4>
                 <p className="text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Personal Side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-square relative">
              <img src="https://picsum.photos/seed/hike/1000/1000" alt="Personal Side" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <div className="absolute bottom-12 left-12 text-white flex items-center gap-3">
                 <Mountain size={24} /> <span className="font-bold tracking-widest uppercase text-xs">Adventurer</span>
              </div>
           </div>
           <div className="space-y-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500">Beyond the Data</h2>
              <h3 className="text-4xl font-bold">Wrangling Life</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I believe that a clear mind leads to clear code. My passion for high-stakes problem solving carries over into my personal life.
              </p>
              <div className="grid grid-cols-2 gap-6">
                 {[
                   { icon: Camera, title: 'Photography', desc: 'Pixels over Bytes' },
                   { icon: Coffee, title: 'Roasting', desc: 'Extraction Tuning' },
                 ].map((h, i) => (
                    <div key={i} className="flex items-start gap-4">
                       <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-primary-500"><h.icon size={20} /></div>
                       <div><div className="font-bold text-sm">{h.title}</div><div className="text-xs text-slate-500">{h.desc}</div></div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 9. Vision & CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="p-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-[2.5rem] text-white shadow-2xl">
              <h4 className="text-2xl font-bold mb-8 flex items-center"><Focus className="mr-3" /> Currently Exploring</h4>
              <ul className="space-y-4">
                 {['LLM Observability', 'Serverless Rust', 'Data Mesh Architectures'].map((f, i) => (
                    <li key={i} className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl">
                       <CheckCircle2 size={18} /> <span className="font-medium">{f}</span>
                    </li>
                 ))}
              </ul>
           </div>
           <div className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-4 flex items-center"><Globe className="mr-3 text-primary-500" /> Open to Partnerships</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-8">Ready for architectural consulting and strategic data engineering roles.</p>
              <Link to="/connect" className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center hover:opacity-90 transition-opacity">
                 Let's Talk <ArrowRight className="ml-2" size={18} />
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
