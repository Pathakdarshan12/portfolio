
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Database, ShieldCheck, Layers, Microscope,
  ArrowRight, FileText, CheckCircle2, Award,
  GraduationCap, Briefcase, Focus, Globe,
  Code2, Terminal, Cpu, Zap, Activity,
  ChevronRight, Download, Camera, Coffee,
  Gamepad2, Mountain, Quote,
  FileText, Globe, Sparkles, Calendar, Clock
} from 'lucide-react';

import { motion } from 'framer-motion';
import { PROJECTS, BLOG_POSTS, EXPERTISE_DATA } from '../data';

const ExpertiseCard = ({
  title,
  mastery,
  iconName,
  gradient,
  competencies,
  technologies
}: any) => {
  const Icon = IconMap[iconName] || Activity;

  return (
    <motion.div
      {...({
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        whileHover: { y: -8, transition: { duration: 0.3 } }
      } as any)}
      className={`group relative flex flex-col p-[2px] rounded-[2.5rem] bg-gradient-to-br ${gradient} shadow-2xl h-full overflow-hidden`}
    >
      {/* Glow Ambient Layer */}
      <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Inner Card Container */}
      <div className="flex-grow flex flex-col p-8 lg:p-12 rounded-[2.4rem] bg-white/95 dark:bg-slate-950/80 backdrop-blur-3xl border border-white/10 dark:border-white/5 text-slate-900 dark:text-white relative z-10">

        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
            <div className={`relative p-5 bg-gradient-to-br ${gradient} rounded-[1.5rem] text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
              <Icon size={32} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-4 py-1.5 bg-gradient-to-br ${gradient} text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary-500/10`}>
              {mastery}
            </span>
            <div className="mt-3 flex gap-1.5 px-2">
              {[1, 2, 3].map((dot) => (
                <div key={dot} className={`w-2 h-2 rounded-full transition-colors duration-500 ${mastery === 'EXPERT' ? 'bg-primary-500' : dot <= 2 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-3xl lg:text-4xl font-black mb-10 tracking-tighter leading-none group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>

        {/* Competencies Section */}
        <div className="space-y-4 mb-12 flex-grow">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30 mb-5">Core Competencies</h4>
          <div className="grid grid-cols-1 gap-3.5">
            {competencies.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-primary-500/20 transition-all cursor-default group/item"
              >
                <span className="text-2xl group-hover/item:scale-125 transition-transform duration-300">{item.emoji}</span>
                <span className="text-sm font-bold tracking-tight text-slate-700 dark:text-white/90">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Ecosystem */}
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30 mb-6">Tech Ecosystem</h4>
          <div className="flex flex-wrap gap-2.5">
            {technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-4 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-primary-500 hover:text-white border border-slate-200 dark:border-white/10 rounded-[1rem] text-[11px] font-black tracking-tight transition-all duration-300 cursor-default hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Futuristic Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_8px] opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity"></div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [typedText, setTypedText] = useState('');
  const roles = ["Data Engineer by craft", "Quality Guardian by principle", "Analytics Architect by design", "Data Scientist by curiosity"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Typewriter effect for roles
  useEffect(() => {
    // Fixed: Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout for browser compatibility
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
      impact: '100+ TB Processed',
      project: 'Fraud Detection Pipeline'
    },
    {
      title: 'Data Quality',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500',
      description: 'I treat data as code, implementing unit tests and automated observability.',
      tools: ['dbt tests', 'Great Expectations', 'Soda'],
      impact: '99.9% Reliability',
      project: 'Healthcare Quality Framework'
    },
    {
      title: 'Analytics Engineering',
      icon: Layers,
      color: 'from-purple-500 to-indigo-500',
      description: 'I transform raw data into semantic layers for self-service business intelligence.',
      tools: ['dbt', 'Snowflake', 'SQL', 'Looker'],
      impact: '200+ Active Users',
      project: 'Financial Data Mart'
    },
    {
      title: 'Data Science',
      icon: Microscope,
      color: 'from-rose-500 to-pink-500',
      description: 'I develop predictive models that turn historical data into future strategy.',
      tools: ['Python', 'BERT', 'MLflow', 'PyTorch'],
      impact: '15% Churn Reduction',
      project: 'Talent Match Engine'
    }
  ];

  const skillDepths = [
    { name: 'Data Engineering', level: 95, color: 'bg-blue-500', sub: ['Spark', 'Kafka', 'ETL/ELT', 'Cloud Infra'] },
    { name: 'Data Quality', level: 90, color: 'bg-emerald-500', sub: ['Unit Testing', 'Observability', 'Data Contracts'] },
    { name: 'Analytics', level: 85, color: 'bg-indigo-500', sub: ['dbt', 'SQL', 'Star Schema', 'BI Tools'] },
    { name: 'Data Science', level: 80, color: 'bg-rose-500', sub: ['NLP', 'Predictive Modeling', 'MLOps'] }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20">
        {/* Animated Particle Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05]"
               style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Profile Side */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl">
                  <img src="https://picsum.photos/seed/dp/800/800" alt="Darshan Pathak" className="w-full h-full object-cover" />
                </div>
                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-bounce transition-all duration-1000">
                  <Cpu className="text-primary-500" size={24} />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-pulse transition-all duration-700">
                  <ShieldCheck className="text-emerald-500" size={24} />
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">The Data Polymath</h2>
                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
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
                to quality assurance and predictive modeling. I specialize in turning complex raw data
                into reliable, high-performance engines for business insight.
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

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none">
          {[
            { label: 'Data Processed', value: '100+ TB', icon: Database },
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

      {/* 2. Lifecycle Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Operational Philosophy</h2>
          <h3 className="text-4xl font-bold">The Complete Lifecycle</h3>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 hidden lg:block -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 animate-flow opacity-50"></div>
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
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stage.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform`}>
                  <stage.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">{stage.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {stage.description}
                </p>

                <div className={`space-y-4 transition-all duration-500 overflow-hidden ${activeStage === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Key Outcome</div>
                      <div className="flex items-center text-sm font-bold text-slate-800 dark:text-slate-200">
                         <Zap size={14} className="mr-2 text-yellow-500" /> {stage.impact}
                      </div>
                   </div>
                   <div className="flex flex-wrap gap-1.5 mt-4">
                      {stage.tools.map(tool => (
                        <span key={tool} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold">{tool}</span>
                      ))}
                   </div>
                </div>

                {/* Visual Connector Dot */}
                <div className="absolute top-1/2 -right-4 w-3 h-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-full hidden lg:block translate-y-[-50%] group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. My Philosophy */}
      <section className="bg-slate-900 text-white py-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-primary-500 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Quote className="mx-auto text-primary-500 mb-12 opacity-50" size={60} />
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-16 tracking-tight">
            "Most people specialize in one part of the data stack. I chose to <span className="text-primary-400">master the entire journey</span>—because the best insights come from understanding every stage, from ingestion to insight."
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Engineering Foundation', text: "Without solid pipelines, there's no data to analyze. Infrastructure is the bedrock." },
              { title: 'Quality First', text: "Bad data equals bad decisions. I treat data like production code—tested and observed." },
              { title: 'End-to-End Thinking', text: "I design systems thinking about the entire lifecycle, ensuring seamless transitions." },
            ].map((p, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center mb-6">
                   <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <h4 className="font-bold text-lg mb-3">{p.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Professional Journey */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Milestones</h2>
            <h3 className="text-4xl font-bold">The Career Path</h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 h-full w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

            <div className="space-y-16">
              {[
                {
                  role: 'Lead Data Architect',
                  company: 'TechFlow Solutions',
                  period: '2022 - Present',
                  desc: 'Architected a multi-cloud data mesh serving 500+ users. Transitioned stack to serverless DuckDB + Dagster.',
                  tech: ['DuckDB', 'Dagster', 'GCP'],
                  annotation: 'Pioneered Lakehouse architecture'
                },
                {
                  role: 'Senior Analytics Engineer',
                  company: 'DataSense Inc.',
                  period: '2020 - 2022',
                  desc: 'Implemented first dbt-led transformation layer. Developed automated data contract enforcement system.',
                  tech: ['dbt', 'Snowflake', 'Airflow'],
                  annotation: 'First time using dbt core'
                },
                {
                  role: 'Data Scientist',
                  company: 'RetailPulse',
                  period: '2018 - 2020',
                  desc: 'Built demand forecasting models with 92% accuracy. Automated feature engineering with Python.',
                  tech: ['Python', 'XGBoost', 'Pandas'],
                  annotation: 'Built first production ML model'
                }
              ].map((job, i) => (
                <div key={i} className="relative md:pl-24 group">
                  {/* Point */}
                  <div className="absolute left-0 top-0 w-16 h-16 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 hidden md:flex">
                     <Briefcase size={24} />
                  </div>

                  <div className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                           <h4 className="text-2xl font-bold">{job.role}</h4>
                           <p className="text-primary-500 font-bold">{job.company}</p>
                        </div>
                        <span className="px-4 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-500 mt-2 md:mt-0">
                           {job.period}
                        </span>
                     </div>
                     <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{job.desc}</p>

                     <div className="flex flex-wrap gap-2 mb-8">
                        {job.tech.map(t => (
                          <span key={t} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-xs font-bold">{t}</span>
                        ))}
                     </div>

                     <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        <Focus size={14} className="mr-2 text-primary-500" /> {job.annotation}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* SECTION 4: Latest Insights (Blog) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Insights</h2>
          <h3 className="text-4xl font-bold">Latest Writings</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] hover:shadow-2xl transition-all flex flex-col md:flex-row gap-8">
              <div className="md:w-32 md:h-32 bg-primary-500/10 rounded-3xl flex items-center justify-center shrink-0">
                 <Activity className="text-primary-500 opacity-50" size={40} />
              </div>
              <div className="flex-1">
                 <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                   <Calendar size={12} /> {post.date}
                   <span className="text-primary-500">{post.category}</span>
                 </div>
                 <h4 className="text-2xl font-bold mb-4 group-hover:text-primary-500 transition-colors leading-tight">{post.title}</h4>
                 <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

        {/* SECTION 9: Education */}
        <section className="bg-slate-50 dark:bg-slate-900/30 py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Academic</h2>
              <h3 className="text-4xl font-bold">Foundation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                { title: 'M.S. Data Science', sub: 'Stanford University • 2018', icon: GraduationCap, focus: 'ML & Deep Learning' },
                { title: 'B.S. Computer Science', sub: 'UC Berkeley • 2016', icon: Code2, focus: 'Distributed Systems' }
              ].map((edu, i) => (
                <div key={i} className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                  <edu.icon className="text-primary-500 mb-6" size={32} />
                  <h4 className="text-xl font-bold mb-1">{edu.title}</h4>
                  <p className="text-sm text-slate-500 mb-4">{edu.sub}</p>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Focus: {edu.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* 6. Beyond the Data */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="rounded-[3rem] overflow-hidden shadow-2xl relative aspect-square">
              <img src="https://picsum.photos/seed/hike/1000/1000" alt="Personal Side" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                 <div className="flex items-center space-x-3 text-white">
                    <Mountain size={24} />
                    <span className="font-bold tracking-widest uppercase text-sm">Base Camp, Himalayas</span>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500">Humanizing the Engineer</h2>
              <h3 className="text-4xl font-bold">When I'm Not Wrangling Data...</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I believe that a clear mind leads to clear code. My passion for high-stakes problem solving carries over into my personal life, where I enjoy challenges that test resilience and strategy.
              </p>

              <div className="grid grid-cols-2 gap-6">
                 {[
                   { icon: Mountain, title: 'Trekking', desc: 'Exploring high altitudes' },
                   { icon: Camera, title: 'Photography', desc: 'Capturing data in pixels' },
                   { icon: Gamepad2, title: 'Gaming', desc: 'Strategic competition' },
                   { icon: Coffee, title: 'Roasting', desc: 'Optimizing caffeine extraction' },
                 ].map((h, i) => (
                    <div key={i} className="flex items-start space-x-4">
                       <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-primary-500">
                          <h.icon size={20} />
                       </div>
                       <div>
                          <div className="font-bold text-sm">{h.title}</div>
                          <div className="text-xs text-slate-500">{h.desc}</div>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="p-8 bg-primary-500/5 border border-primary-500/20 rounded-3xl italic text-slate-600 dark:text-slate-400">
                 "Data engineering is a lot like mountaineering: you need a reliable path, the right tools, and the foresight to handle unexpected conditions before they become disasters."
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 10: Final CTA */}
        <section className="bg-slate-950 text-white py-32 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-6xl font-extrabold mb-8 tracking-tighter">
              Let's Build Something <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Exceptional</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <a href="mailto:your@email.com" className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-primary-500 transition-all group">
                <FileText size={32} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-blue-600 transition-all group">
                <Globe size={32} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-slate-800 transition-all group">
                <Code2 size={32} />
              </a>
            </div>
            <Link to="/connect" className="text-primary-400 font-bold text-lg hover:underline underline-offset-8">
              Or fill out the contact form <ArrowRight className="inline-block ml-2" size={20} />
            </Link>
          </div>
        </section>
    </div>
  );
};

export default About;
