
import { Domain, Project, BlogPost, CaseStudy } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'real-time-fraud-detection',
    title: 'Real-time Fraud Detection Pipeline',
    domain: Domain.DataEngineering,
    description: 'Scalable streaming architecture handling 10k events/sec using Kafka and Flink.',
    tech: ['Kafka', 'Apache Flink', 'Python', 'Redis'],
    image: 'https://picsum.photos/seed/fraud/800/600',
    featured: true,
    metrics: ['99.9% uptime', 'Latency < 200ms'],
    githubUrl: '#'
  },
  {
    id: '2',
    slug: 'predictive-churn-model',
    title: 'Enterprise Customer Churn Prediction',
    domain: Domain.DataScience,
    description: 'End-to-end ML workflow from raw data ingestion to automated model monitoring.',
    tech: ['Scikit-learn', 'Airflow', 'Snowflake', 'DVC'],
    image: 'https://picsum.photos/seed/churn/800/600',
    featured: true,
    metrics: ['15% reduction in churn', '0.89 AUC'],
    githubUrl: '#'
  },
  {
    id: '3',
    slug: 'dbt-testing-framework',
    title: 'Automated dbt Quality Framework',
    domain: Domain.QualityEngineering,
    description: 'Custom macro library for data reconciliation and schema validation at scale.',
    tech: ['dbt', 'Snowflake', 'SQL', 'GitHub Actions'],
    image: 'https://picsum.photos/seed/dbt/800/600',
    featured: true,
    metrics: ['80% reduction in data issues', '100% test coverage'],
    githubUrl: '#'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'dbt-best-practices-2024',
    title: 'dbt Best Practices: Modular Modeling',
    date: '2024-03-15',
    category: 'Analytics Engineering',
    excerpt: 'Deep dive into architecting sustainable dbt projects with proper layer separation.',
    content: 'Content about dbt best practices...',
    tags: ['dbt', 'SQL', 'Snowflake'],
    readingTime: '8 min'
  },
  {
    id: 'b2',
    slug: 'data-contract-introduction',
    title: 'Implementing Data Contracts in Modern Pipelines',
    date: '2024-02-28',
    category: 'Data Engineering',
    excerpt: 'How to prevent upstream breaking changes from ruining your downstream consumers.',
    content: 'Content about data contracts...',
    tags: ['Data Contracts', 'Pipelines', 'Quality'],
    readingTime: '12 min'
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
