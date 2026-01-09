
import React, { useState } from 'react';
import {
  Mail, Github, Linkedin, MessageSquare, ArrowRight,
  CheckCircle2, Copy, Check, Clock, MapPin, ChevronDown,
  AlertCircle, Code, Download
} from 'lucide-react';

const FORM_ENDPOINT = "https://formspree.io/f/mzddpbgd";

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
          <div className={`p-3 rounded-xl bg-gradient-to-br ${
            type === 'email' ? 'from-blue-500 to-cyan-500' :
            type === 'linkedin' ? 'from-blue-600 to-blue-700' :
            type === 'resume' ? 'from-amber-500 to-orange-600' :
            'from-slate-600 to-slate-800'
          } text-white shadow-lg`}>
            <Icon size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtext}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        {type === 'resume' ? (
          <a
            href={link}
            download="Darshan_Pathak_Resume.docx"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors truncate max-w-[200px]"
          >
            {value}
          </a>
        ) : (
          <a
            href={type === 'email' ? `mailto:${value}` : link}
            target={type === 'email' ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors truncate max-w-[200px]"
          >
            {value}
          </a>
        )}

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
            target={type === 'resume' ? undefined : "_blank"}
            download={type === 'resume' ? "Darshan_Pathak_Resume.docx" : undefined}
            rel={type === 'resume' ? undefined : "noopener noreferrer"}
            className="p-2 bg-slate-100 dark:bg-slate-700/50 hover:bg-primary-500 hover:text-white rounded-lg transition-all text-slate-500 dark:text-slate-400"
          >
            {type === 'resume' ? <Download size={14} /> : <ArrowRight size={14} />}
          </a>
        )}
      </div>
    </div>
  );
};

const Connect: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Fallback for demonstration if no endpoint is set
    if (FORM_ENDPOINT.includes("your-form-id")) {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection or email me directly.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 selection:bg-primary-500 selection:text-white relative overflow-hidden animate-fade-in">
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 dark:bg-primary-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
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
                  👋 Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600 dark:from-primary-400 dark:to-blue-500">Connect</span>
                </h1>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest text-left">
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> Pune, Maharashtra, India</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> IST Timezone (GMT+5:30)</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl text-left">
              <p className="text-left">
                I'm always open to discussing new projects, architectural challenges, or high-impact data engineering opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactCard
                type="email"
                icon={Mail}
                title="Email"
                subtext="Direct line to my inbox"
                value="pathak12darshan@gmail.com"
              />
              <ContactCard
                type="resume"
                icon={Download}
                title="Resume / CV"
                subtext="Latest technical profile"
                value="Download Resume (DOCX)"
                link="assets/resume/Darshan_Pathak_Resume.docx"
              />
              <ContactCard
                type="linkedin"
                icon={Linkedin}
                title="LinkedIn"
                subtext="Professional network"
                value="linkedin.com/in/pathakdarshan12"
                link="https://linkedin.com/in/pathakdarshan12"
              />
              <ContactCard
                type="github"
                icon={Github}
                title="GitHub"
                subtext="Open source & repositories"
                value="github.com/Pathakdarshan12"
                link="https://github.com/Pathakdarshan12"
              />
              <ContactCard
                type="leetcode"
                icon={Code}
                title="LeetCode"
                subtext="Problem solving"
                value="leetcode.com/pathakdarshan12"
                link="https://leetcode.com/pathakdarshan12"
              />
            </div>
          </div>

          <div className="lg:col-span-5 text-left">
            <div className="bg-white/80 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8 text-left">
                <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <MessageSquare size={24} />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-left">Quick Message</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-left">Sent directly to my email</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  {error && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-500 text-sm font-bold animate-fade-in">
                      <AlertCircle size={18} />
                      {error}
                    </div>
                  )}

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest block text-left">Your Name</label>
                    <input name="name" required type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest block text-left">Your Email</label>
                    <input name="email" required type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest block text-left">Subject</label>
                    <div className="relative text-left">
                      <select name="reason" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white transition-all appearance-none cursor-pointer shadow-sm">
                        <option value="Inquiry">💼 Business Inquiry</option>
                        <option value="Collaboration">🤝 Collaboration</option>
                        <option value="Consulting">📊 Data Consulting</option>
                        <option value="Hello">💬 Just Saying Hi</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest block text-left">Your Message</label>
                    <textarea name="message" required rows={4} placeholder="How can I help you?" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all resize-none shadow-sm"></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group">
                    {isSubmitting ? "Sending..." : "Send to Gmail"}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Success!</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Message sent. I'll get back to you soon.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-primary-500 dark:text-primary-400 font-bold hover:underline">Send another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
