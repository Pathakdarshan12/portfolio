
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, Github, Linkedin, Mail
} from 'lucide-react';

// Pages
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Connect from './pages/Connect';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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
  }, [location]);

  const navLinks = [
    { name: 'About', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Connect', path: '/connect' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <ScrollToTop />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-12 transition-all shadow-lg shadow-primary-500/20">
                DP
              </div>
              <span className="font-black text-xl tracking-tighter hidden sm:block">
                Darshan<span className="text-primary-500">Pathak</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold tracking-tight transition-all hover:text-primary-500 ${
                    (link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path))
                      ? 'text-primary-500 scale-105'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-all active:scale-95"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-lg font-bold px-4 py-3 rounded-2xl transition-all ${
                    (link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path))
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<About />} />
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
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800/50 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
            <div className="md:col-span-5">
              <Link to="/" className="flex items-center space-x-3 mb-8 group">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-xs">DP</div>
                <span className="font-black text-xl tracking-tighter uppercase">Darshan Pathak</span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-10 leading-relaxed font-medium">
                Engineering resilient data foundations and intelligence layers for high-growth enterprises.
              </p>
              <div className="flex space-x-4">
                {[Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary-500 hover:border-primary-500 transition-all group">
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-slate-400">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link to="/projects" className="text-slate-500 hover:text-primary-500 transition-colors">Project Gallery</Link></li>
                <li><Link to="/case-studies" className="text-slate-500 hover:text-primary-500 transition-colors">Case Narratives</Link></li>
                <li><Link to="/blog" className="text-slate-500 hover:text-primary-500 transition-colors">Technical Blog</Link></li>
              </ul>
            </div>

            <div className="md:col-span-5 flex flex-col items-start lg:items-end">
              <div className="w-full max-w-sm">
                <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-slate-400">Join the Newsletter</h4>
                <div className="flex p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
                   <input type="email" placeholder="Your Email" className="bg-transparent flex-1 px-4 outline-none text-sm font-medium" />
                   <button className="px-6 py-3 bg-primary-500 text-white rounded-xl font-black text-xs hover:bg-primary-600 transition-all">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <div>© {new Date().getFullYear()} DARSHAN PATHAK ARCHITECTURE</div>
            <div className="flex gap-8">
               <a href="#" className="hover:text-primary-500">Privacy</a>
               <a href="#" className="hover:text-primary-500">Ethics</a>
               <a href="#" className="hover:text-primary-500">Open Source</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
