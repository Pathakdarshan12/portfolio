
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, Github, Linkedin, Mail, 
  Database, BarChart3, ShieldCheck, Microscope, 
  ArrowRight, Search
} from 'lucide-react';
import icon from '@/assets/icons/icon-light.ico';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Connect from './pages/Connect';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Connect', path: '/connect' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform text-xs">
                <img
                    src={icon}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                Darshan<span className="text-primary-500">Pathak</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                    location.pathname.startsWith(link.path) ? 'text-primary-500' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-lg font-semibold text-slate-700 dark:text-slate-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary-500 rounded flex items-center justify-center text-white font-bold text-[10px]">
                  DP
                </div>
                <span className="font-bold text-lg">Darshan Pathak</span>
              </Link>
              <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-6">
                Bridging the gap across the complete data lifecycle—from ingestion and transformation 
                to quality assurance and predictive modeling.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/Pathakdarshan12" className="text-slate-400 hover:text-primary-500 transition-colors"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/pathakdarshan12" className="text-slate-400 hover:text-primary-500 transition-colors"><Linkedin size={20} /></a>
                <a href="mailto:pathak12darshan@gmail.com" className="text-slate-400 hover:text-primary-500 transition-colors"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li><Link to="/about" className="hover:text-primary-500">About</Link></li>
                <li><Link to="/projects" className="hover:text-primary-500">Projects</Link></li>
                <li><Link to="/case-studies" className="hover:text-primary-500">Case Studies</Link></li>
                <li><Link to="/blog" className="hover:text-primary-500">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li><Link to="/connect" className="hover:text-primary-500">Contact</Link></li>
                <li><a href="#" className="hover:text-primary-500">RSS Feed</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Darshan Pathak. All rights reserved. Built with React & Tailwind.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
