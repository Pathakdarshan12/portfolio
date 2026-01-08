
import React from 'react';
import { CheckCircle2, Award, GraduationCap, Briefcase, Focus } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    {
      domain: 'Data Engineering',
      tools: ['Spark', 'Kafka', 'Airflow', 'Python', 'Go', 'Kubernetes', 'AWS', 'GCP']
    },
    {
      domain: 'Analytics Engineering',
      tools: ['dbt', 'Snowflake', 'BigQuery', 'SQL', 'Looker', 'Tableau', 'Fivetran']
    },
    {
      domain: 'Data Quality & Testing',
      tools: ['Great Expectations', 'Monte Carlo', 'dbt-tests', 'Soda', 'Elementary']
    },
    {
      domain: 'Data Science',
      tools: ['PyTorch', 'XGBoost', 'Pandas', 'MLflow', 'Docker', 'R']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      {/* Intro */}
      <section>
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              I am a Senior Data Professional with a passion for building robust, self-healing data ecosystems. 
              My journey started in pure Data Science, but I quickly realized that the most sophisticated models 
              are useless without reliable, high-quality data pipelines.
            </p>
            <p>
              Today, I specialize in the intersection of <span className="text-slate-900 dark:text-white font-semibold">Data Engineering</span> 
              and <span className="text-slate-900 dark:text-white font-semibold">Quality Engineering</span>. I believe that 
              data should be treated with the same rigor as software, incorporating CI/CD, unit testing, and automated observability.
            </p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <img 
              src="https://picsum.photos/seed/profile/400/400" 
              alt="Profile" 
              className="rounded-xl mb-4 w-full aspect-square object-cover"
            />
            <div className="text-center">
              <h3 className="font-bold text-xl">Based in San Francisco</h3>
              <p className="text-sm text-slate-500">Working Remotely Globally</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section>
        <div className="flex items-center space-x-2 mb-8">
          <Award className="text-primary-500" />
          <h2 className="text-2xl font-bold">Technical Expertise</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skills.map((item, i) => (
            <div key={i} className="space-y-4">
              <h3 className="font-bold text-lg border-b border-slate-200 dark:border-slate-800 pb-2">{item.domain}</h3>
              <div className="flex flex-wrap gap-2">
                {item.tools.map(tool => (
                  <span key={tool} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex items-center space-x-2 mb-8">
          <Briefcase className="text-primary-500" />
          <h2 className="text-2xl font-bold">Professional Experience</h2>
        </div>
        <div className="space-y-12">
          {[
            {
              role: 'Lead Data Architect',
              company: 'TechFlow Solutions',
              period: '2022 - Present',
              desc: 'Architected a multi-cloud data mesh serving 500+ daily active users. Reduced warehouse spend by 35% through query optimization and modeling refinement.'
            },
            {
              role: 'Senior Analytics Engineer',
              company: 'DataSense Inc.',
              period: '2020 - 2022',
              desc: 'Built the first dbt-led transformation layer. Implemented data contracts between microservices and the warehouse.'
            },
            {
              role: 'Data Scientist',
              company: 'RetailPulse',
              period: '2018 - 2020',
              desc: 'Developed demand forecasting models with 92% accuracy. Automated feature engineering pipelines.'
            }
          ].map((exp, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
              <div className="absolute top-0 left-[-9px] w-4 h-4 bg-primary-500 rounded-full border-4 border-slate-50 dark:border-slate-950"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h3 className="font-bold text-xl">{exp.role}</h3>
                <span className="text-sm font-bold text-primary-500">{exp.period}</span>
              </div>
              <div className="font-semibold text-slate-700 dark:text-slate-300 mb-4">{exp.company}</div>
              <p className="text-slate-600 dark:text-slate-400">{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <GraduationCap className="text-primary-500" />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold">M.S. Data Science</h3>
              <p className="text-slate-600 dark:text-slate-400">Stanford University • 2018</p>
            </div>
            <div>
              <h3 className="font-bold">B.S. Computer Science</h3>
              <p className="text-slate-600 dark:text-slate-400">University of California, Berkeley • 2016</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Focus className="text-primary-500" />
            <h2 className="text-2xl font-bold">Current Focus</h2>
          </div>
          <ul className="space-y-4">
            {[
              'LLM Observability and Evaluation Frameworks',
              'Real-time Data Quality Assertion at the Source',
              'Serverless Data Processing with Rust',
              'Distributed Systems Performance Tuning'
            ].map((focus, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle2 size={18} className="mr-2 text-primary-500 shrink-0 mt-1" />
                <span className="text-slate-600 dark:text-slate-400">{focus}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
