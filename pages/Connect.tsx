
import React, { useState } from 'react';
import {
  Mail, Github, Linkedin, MessageSquare, ArrowRight,
  CheckCircle2, Copy, Check, ExternalLink, Twitter,
  Globe, Clock, MapPin, Zap, Info, ChevronDown
} from 'lucide-react';

const ContactCard = ({ icon: Icon, title, subtext, value, link, type }: any) => {
  const [copied, setCopied] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    if (type === 'email') {
      e.preventDefault();
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative p-6 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-2xl transition-all hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${type === 'email' ? 'from-blue-500 to-cyan-500' : type === 'linkedin' ? 'from-blue-600 to-blue-700' : 'from-slate-600 to-slate-800'} text-white shadow-lg`}>
            <Icon size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtext}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <a
          href={type === 'email' ? `mailto:${value}` : link}
          target={type === 'email' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors truncate max-w-[200px]"
        >
          {value}
        </a>

        {type === 'email' ? (
          <button
            onClick={handleAction}
            className="p-2 bg-slate-100 dark:bg-slate-700/50 hover:bg-primary-500 hover:text-white rounded-lg transition-all text-slate-500 dark:text-slate-400 flex items-center gap-2 text-xs font-bold"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span className="hidden group-hover:inline transition-opacity">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-100 dark:bg-slate-700/50 hover:bg-primary-500 hover:text-white rounded-lg transition-all text-slate-500 dark:text-slate-400"
          >
            <ArrowRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700/50 py-4 text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <Info size={16} className="text-primary-500 shrink-0" />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary-500 dark:group-hover:text-white transition-colors">{question}</span>
        </div>
        <ChevronDown size={16} className={`text-slate-400 dark:text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <p className="pl-7 text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-left">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Connect: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 selection:bg-primary-500 selection:text-white relative overflow-hidden animate-fade-in">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 dark:bg-primary-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Column: Personal Intro */}
          <div className="lg:col-span-7 space-y-12 text-left">
            <div className="flex items-start gap-6">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full border-2 border-primary-500 p-1 bg-white dark:bg-slate-900">
                  <img
                    src="https://picsum.photos/seed/dp-profile/200/200"
                    alt="Darshan Pathak"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center animate-pulse">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-tight text-slate-900 dark:text-white text-left">
                  👋 Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600 dark:from-primary-400 dark:to-blue-500">Work Together</span>
                </h1>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> Based in Pune, India</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> IST Timezone (GMT+5:30)</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl text-left">
              <p className="text-left">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                Whether you need help building scalable data pipelines, implementing quality frameworks, or just want to chat about the latest in the data world—feel free to reach out!
              </p>
              <p className="text-left">
                I thrive in environments that value high-integrity data systems and resilient architecture. If you have a complex data challenge or an exciting new venture, let's start a conversation.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-4">
              <ContactCard
                type="email"
                icon={Mail}
                title="Email Me"
                subtext="Direct line for inquiries"
                value="pathak12darshan@gmail.com"
              />
              <ContactCard
                type="linkedin"
                icon={Linkedin}
                title="Connect on LinkedIn"
                subtext="Let's network professionally"
                value="linkedin.com/in/pathakdarshan12"
                link="https://linkedin.com/in/pathakdarshan12"
              />
              <ContactCard
                type="github"
                icon={Github}
                title="Check Out My Code"
                subtext="Explore my open source work"
                value="github.com/Pathakdarshan12"
                link="https://github.com/Pathakdarshan12"
              />
            </div>

            {/* Availability Indicator */}
            <div className="p-8 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl relative overflow-hidden group shadow-sm text-left">
              <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform">
                <Zap size={64} className="text-emerald-500" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500 mb-4 text-left">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Availability Status
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-left">Currently accepting new projects</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 text-left">Focusing on modern data stack implementations & technical consulting.</p>
              <div className="flex flex-wrap items-center gap-4 text-left">
                <span className="px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg text-xs font-bold text-emerald-600 dark:text-emerald-400">Response time: &lt;24 hours</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold italic">🎯 Usually responds while listening to lo-fi beats</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Message Form */}
          <div className="lg:col-span-5 text-left">
            <div className="bg-white/80 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8 text-left">
                <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <MessageSquare size={24} />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-left">Send a Quick Message</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-left">Or just say hi! 👋</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest block text-left">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest block text-left">Your Email</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest block text-left">What brings you here?</label>
                    <div className="relative text-left">
                      <select className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white transition-all appearance-none cursor-pointer shadow-sm">
                        <option className="bg-white dark:bg-slate-900">Select an option...</option>
                        <option className="bg-white dark:bg-slate-900">💼 Freelance/Contract Work</option>
                        <option className="bg-white dark:bg-slate-900">🤝 Full-time Opportunity</option>
                        <option className="bg-white dark:bg-slate-900">📊 Data Consulting</option>
                        <option className="bg-white dark:bg-slate-900">🎓 Mentorship/Advice</option>
                        <option className="bg-white dark:bg-slate-900">💬 Just Saying Hi</option>
                        <option className="bg-white dark:bg-slate-900">🔧 Technical Collaboration</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest block text-left">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project or just say hello..."
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all resize-none shadow-sm"
                    ></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-primary-500 to-blue-600 dark:from-primary-500 dark:to-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => submitted && setSubmitted(false)}
                    className="mt-8 text-primary-500 dark:text-primary-400 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              )}

              {/* Quick FAQs */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700/50 text-left">
                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 text-left">Quick Answers</h4>
                <div className="space-y-1 text-left">
                  <FAQItem
                    question="What's your typical response time?"
                    answer="I typically respond to all emails and inquiries within 24 hours, even on weekends."
                  />
                  <FAQItem
                    question="Do you work with startups?"
                    answer="Absolutely! I love working with early-stage companies to build robust data foundations from scratch."
                  />
                  <FAQItem
                    question="Available for remote work?"
                    answer="Yes, I work remotely with teams across the globe. I'm used to managing multiple timezones effectively."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Alternative Connect */}
        <div className="mt-32 pt-20 border-t border-slate-200 dark:border-slate-800 text-center">
          <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-12">Other Ways to Connect</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Twitter, label: 'Twitter', link: 'https://twitter.com/pathakdarshan' },
              { icon: Globe, label: 'Website', link: '/' },
              { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/pathakdarshan12' },
              { icon: Github, label: 'GitHub', link: 'https://github.com/Pathakdarshan12' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="w-14 h-14 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group shadow-sm"
              >
                <social.icon size={22} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
