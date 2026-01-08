
import React from 'react';
import { Mail, Github, Linkedin, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

const Connect: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-4xl font-bold mb-6">Let's Build Something<br/><span className="text-primary-500">Exceptional</span> Together</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
            Available for architectural consulting, engineering partnerships, and technical strategy.
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500/10 text-primary-500 rounded-xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">Email</div>
                <div className="text-lg font-bold">hello@datalifecycle.io</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                <Linkedin size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">LinkedIn</div>
                <div className="text-lg font-bold">linkedin.com/in/datalifecycle</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white rounded-xl flex items-center justify-center">
                <Github size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">GitHub</div>
                <div className="text-lg font-bold">github.com/datalifecycle</div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm uppercase tracking-widest">Availability Status</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Currently accepting <span className="text-slate-900 dark:text-white font-bold">new projects</span> starting April 2024.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="flex items-center space-x-2 mb-8">
            <MessageSquare className="text-primary-500" />
            <h2 className="text-2xl font-bold">Send a Message</h2>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">Full Name</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">Email Address</label>
                <input type="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" placeholder="john@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500">Inquiry Type</label>
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500">
                <option>Select an option...</option>
                <option>Architecture Consulting</option>
                <option>Data Engineering Support</option>
                <option>Quality Assurance Framework</option>
                <option>Analytics Implementation</option>
                <option>Other / Say Hi</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" placeholder="How can I help you?"></textarea>
            </div>

            <button className="w-full py-4 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all flex items-center justify-center">
              Send Message <ArrowRight className="ml-2" size={18} />
            </button>
          </form>

          <div className="mt-12 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Frequently Asked</h3>
            <div className="space-y-3">
              {[
                'What is your standard project lead time?',
                'Do you offer ongoing platform maintenance?',
                'Can you work with existing tech stacks?'
              ].map((faq, i) => (
                <div key={i} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 size={16} className="text-primary-500 mr-2 shrink-0" />
                  <span>{faq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
