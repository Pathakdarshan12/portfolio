import { Domain, Project, BlogPost, CaseStudy } from './types';
import isometrics_architecture from '@/assets/images/projects/isometrics_architecture.png';
import datavelocity_proc from '@/assets/images/blogs/datavelocity/sp_etl_master.png';
import datavelocity_ from '@/assets/images/blogs/datavelocity/sp_etl_master.png';
import itas from '@/assets/images/projects/itas.png';
import datavelocityImg from '@/assets/images/blogs/datavelocity/sp_etl_master.png';
import incremental_strategyImg from '@/assets/images/blogs/incremental_load/incremental_strategy.png';

export type Domain = 'data-engineering' | 'analytics' | 'machine-learning' | 'full-stack';

export interface Metric {
  label: string;
  value: string;
  detail: string;
  icon: string;
}

export interface TechCategory {
  category: string;
  tools: string[];
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'data-velocity-lambda-platform',
    title: 'Data Velocity: Metadata-Driven Lambda Platform for Food Delivery at Scale',
    domain: 'data-engineering',
    description: 'Architected a unified Lambda architecture converging batch CSV ingestion and real-time Kafka streams, achieving sub-15-second end-to-end latency with metadata-driven data quality framework.',
    tech: ['Snowflake', 'SQL', 'Python', 'Kafka', 'ETL', 'Data Modeling', 'AWS S3', 'Streamlit'],
    image: datavelocityImg,
    featured: true,
    metrics: [
      'Sub-15s latency (Kafka → Gold)',
      '95%+ validation pass rate',
      '~50k events/day processed',
      '10× faster SCD Type 2'
    ],
    detailedMetrics: [
      {
        label: 'End-to-End Latency',
        value: '<15s',
        detail: 'Kafka to Gold layer processing time',
        icon: 'zap'
      },
      {
        label: 'Validation Pass Rate',
        value: '95%+',
        detail: 'Data quality framework success rate',
        icon: 'check-circle'
      },
      {
        label: 'Daily Event Volume',
        value: '~50k',
        detail: 'Food delivery events simulated per day',
        icon: 'activity'
      },
      {
        label: 'SCD Performance',
        value: '10×',
        detail: 'Faster using SHA2_HEX vs column comparison',
        icon: 'trending-up'
      }
    ],
    githubUrl: '#', // Replace with actual GitHub URL
    problem: 'Food delivery platforms require processing both batch historical data and real-time streaming events across multiple entities (orders, customers, restaurants, deliveries). Traditional approaches often result in duplicate transformation logic, data quality issues, and inability to replay historical data beyond Kafka retention limits.',
    solution: 'Designed a unified Lambda architecture with metadata-driven framework that converges batch CSV and Kafka streams at Bronze layer, implementing comprehensive data quality validations and enabling indefinite historical replay capabilities.',
    approach: [
      'Architected unified Lambda architecture eliminating duplicate transformation logic across 10+ entities',
      'Designed metadata-driven data quality framework with four validation types (mandatory, value, lookup, duplicate)',
      'Implemented hash-based SCD Type 2 using SHA2_HEX for 10× performance improvement',
      'Built transactional Bronze loads with COMMIT/ROLLBACK control and INGEST_RUN_ID-based idempotency',
      'Enabled indefinite historical replay from Bronze layer beyond Kafka retention limits',
      'Supported schema evolution via metadata-driven column mapping for zero-code onboarding',
      'Enforced data quality SLAs with configurable threshold-based downstream processing control',
      'Developed Streamlit monitoring dashboard for real-time operational visibility'
    ],
    techCategories: [
      {
        category: 'Data Platform',
        tools: ['Snowflake', 'AWS S3']
      },
      {
        category: 'Stream Processing',
        tools: ['Kafka']
      },
      {
        category: 'Development',
        tools: ['Python', 'SQL', 'ETL']
      },
      {
        category: 'Visualization',
        tools: ['Streamlit']
      }
    ],
    role: 'Data Engineer',
    duration: '3 months'
  },
  {
    id: '2',
    slug: 'isometrics-healthcare-analytics',
    title: 'IsoMetrics-Healthcare: Multi-Tenant SaaS Analytics Platform',
    domain: 'data-engineering',
    description: 'Built enterprise-grade multi-tenant analytics platform simulating 200+ hospital tenants with row-level security, achieving 96% performance improvement through advanced optimization strategies.',
    tech: ['dbt', 'Snowflake', 'SQL', 'Python', 'Streamlit', 'GitHub Actions'],
    image: isometrics_architecture,
    featured: true,
    metrics: [
      '200+ hospital tenants',
      '96% performance gain',
      '100+ automated tests',
      '2M+ records processed'
    ],
    detailedMetrics: [
      {
        label: 'Hospital Tenants',
        value: '200+',
        detail: 'Multi-tenant simulation scale',
        icon: 'building'
      },
      {
        label: 'Performance Improvement',
        value: '96%',
        detail: 'Runtime reduced from 12min to 45s',
        icon: 'trending-up'
      },
      {
        label: 'Automated Tests',
        value: '100+',
        detail: 'dbt tests in CI/CD pipeline',
        icon: 'check-square'
      },
      {
        label: 'Records Processed',
        value: '2M+',
        detail: 'Synthetic healthcare records',
        icon: 'database'
      }
    ],
    githubUrl: '#', // Replace with actual GitHub URL
    problem: 'Healthcare analytics platforms serving multiple hospital systems require strict data isolation, comprehensive quality testing, and efficient processing of large-scale patient data while maintaining sub-4-hour freshness SLAs and 99%+ quality thresholds.',
    solution: 'Engineered a multi-tenant SaaS analytics platform with Snowflake row-level security, automated CI/CD validation, and optimized incremental processing strategies across 50+ dbt models with real-time monitoring and cost attribution.',
    approach: [
      'Built multi-tenant platform with Snowflake row-level security for 200+ hospital tenants',
      'Developed 50+ dbt models across staging/intermediate/marts layers with incremental strategies',
      'Implemented Type 2 SCD snapshots for provider/contract dimension tracking',
      'Engineered CI/CD pipeline with pre-merge validation on isolated schemas',
      'Created 100+ dbt tests (generic, singular, custom RLS macros) with automatic teardown',
      'Achieved 96% performance improvement through clustering and partition pruning',
      'Designed real-time SLA monitoring enforcing 4-hour freshness and >99% quality',
      'Built Streamlit dashboard for pipeline health, quality metrics, and cost attribution'
    ],
    techCategories: [
      {
        category: 'Data Transformation',
        tools: ['dbt', 'SQL']
      },
      {
        category: 'Data Platform',
        tools: ['Snowflake']
      },
      {
        category: 'CI/CD',
        tools: ['GitHub Actions']
      },
      {
        category: 'Development',
        tools: ['Python', 'Streamlit']
      }
    ],
    role: 'Data Engineer',
    duration: '4 months'
  },
  {
    id: '3',
    slug: 'intelligent-talent-acquisition',
    title: 'Intelligent Talent Acquisition System',
    domain: 'machine-learning',
    description: 'Automated resume parsing and job matching system using BERT transformers for precise candidate information extraction and intelligent skill-job matching with integrated job search capabilities.',
    tech: ['Python', 'Django', 'MySQL', 'Gen AI', 'TensorFlow', 'HTML', 'CSS', 'JavaScript', 'BERT'],
    image: itas,
    featured: false,
    metrics: [
      'BERT-powered parsing',
      'Automated job matching',
      'Real-time job scraping',
      'Full-stack interface'
    ],
    detailedMetrics: [
      {
        label: 'NLP Model',
        value: 'BERT',
        detail: 'Transformer-based extraction',
        icon: 'cpu'
      },
      {
        label: 'Automation',
        value: 'End-to-End',
        detail: 'Resume parsing to job matching',
        icon: 'refresh-cw'
      },
      {
        label: 'Job Search',
        value: 'Real-time',
        detail: 'Automated web scraping',
        icon: 'search'
      },
      {
        label: 'Interface',
        value: 'Full-stack',
        detail: 'Complete candidate/job management',
        icon: 'layout'
      }
    ],
    githubUrl: '#', // Replace with actual GitHub URL
    problem: 'Traditional talent acquisition processes involve manual resume screening, inefficient candidate-job matching, and time-consuming job search across multiple platforms, leading to slower hiring cycles and suboptimal matches.',
    solution: 'Developed an intelligent system leveraging BERT transformers for automated resume parsing, AI-driven skill-job matching, and integrated job scraping functionality with a user-friendly management interface.',
    approach: [
      'Implemented BERT transformer for precise candidate information extraction from resumes',
      'Built intelligent skill-job matching algorithm using TensorFlow',
      'Developed automated job-search command for scraping matching job listings',
      'Created Django-based backend with MySQL database for candidate and job data management',
      'Designed intuitive full-stack interface for managing job postings and candidate profiles',
      'Integrated Gen AI capabilities for enhanced matching accuracy'
    ],
    techCategories: [
      {
        category: 'Machine Learning',
        tools: ['TensorFlow', 'Gen AI', 'BERT']
      },
      {
        category: 'Backend',
        tools: ['Python', 'Django', 'MySQL']
      },
      {
        category: 'Frontend',
        tools: ['HTML', 'CSS', 'JavaScript']
      }
    ],
    role: 'Full-stack ML Engineer',
    duration: '2 months'
  }
];

// Content has been moved to external .md files in the /posts/ directory
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'modular-dbt-architectures-2024',
    title: 'The Art of Modular dbt Architectures',
    date: 'March 20, 2024',
    category: 'Analytics Engineering',
    readingTime: '10 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Darshan Pathak',
      role: 'Lead Data Architect',
      avatar: 'https://picsum.photos/seed/dp88/200/200',
      twitter: '#',
      linkedin: '#'
    },
    excerpt: 'Modern data transformation requires more than just SQL. Learn how to apply software engineering principles to your dbt projects for ultimate scalability.',
    tags: ['dbt', 'Architecture', 'SQL'],
    content: '' // Fetched dynamically at runtime
  },
  {
    id: 'b2',
    slug: 'scaling-quality-with-elementary',
    title: 'Scaling Quality with dbt & Elementary',
    date: 'Feb 15, 2024',
    category: 'Data Quality',
    readingTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Darshan Pathak',
      role: 'Quality Lead',
      avatar: 'https://picsum.photos/seed/dp88/200/200'
    },
    excerpt: 'Manual testing is a death sentence for data teams. Discover how to build a self-healing quality layer using Elementary and dbt.',
    tags: ['Quality', 'Observability', 'dbt'],
    content: '' // Fetched dynamically at runtime
  }
];


export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'modern-data-stack-migration',
    title: 'Migrating Legacy On-Prem ETL to Modern Data Stack',
    domain: Domain.DataEngineering,
    summary: 'A 12-month transformation journey for a global retail brand.',
    background: 'Client suffered from data silos and high maintenance costs of legacy Hadoop clusters.',
    approach: 'Lift and shift strategy followed by progressive refinement using Airbyte, Snowflake, and dbt.',
    results: ['Reduced monthly costs by 40%', 'Self-service analytics enabled for 200+ users'],
    techStack: ['Snowflake', 'Airbyte', 'dbt', 'Terraform']
  }
];
