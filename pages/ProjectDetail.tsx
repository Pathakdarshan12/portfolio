
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Code2, Layers, Target } from 'lucide-react';
import { PROJECTS } from '../data';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link 
        to="/projects" 
        className="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors mb-12"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Projects
      </Link>

      <header className="mb-12">
        <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3">{project.domain}</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">{project.title}</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a href={project.githubUrl} className="flex items-center px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:scale-105 transition-transform">
              <Github size={18} className="mr-2" /> Source Code
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} className="flex items-center px-6 py-2 border border-slate-200 dark:border-slate-800 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <ExternalLink size={18} className="mr-2" /> Live Demo
            </a>
          )}
        </div>
      </header>

      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full rounded-3xl mb-16 shadow-2xl"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Target className="text-primary-500" />
              <h2 className="text-2xl font-bold">Problem & Solution</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Detailed technical description of the challenges faced during this project... 
              (This would typically be MDX content). 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="text-primary-500" />
              <h2 className="text-2xl font-bold">Architecture</h2>
            </div>
            <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-sm">
              {/* Architecture Diagram Placeholder */}
              [ Architecture Visualization Component ]
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="text-primary-500" />
              <h2 className="text-2xl font-bold">Implementation</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              How the tech stack was integrated to achieve the final results.
            </p>
            <div className="bg-slate-900 text-white p-6 rounded-xl overflow-x-auto shadow-xl">
              <pre className="text-sm">
                <code>{`// Sample Code Placeholder
async function processPipeline(stream) {
  const result = await stream
    .filter(event => event.isValid)
    .map(event => transform(event))
    .batch(100);
  
  return await sink(result);
}`}</code>
              </pre>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 bg-primary-500/5 dark:bg-primary-500/10 rounded-2xl border border-primary-500/20">
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary-600 dark:text-primary-400">Key Outcomes</h3>
            <ul className="space-y-3">
              {project.metrics.map((m, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 mr-3 shrink-0"></div>
                  <span className="text-sm font-semibold">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetail;
