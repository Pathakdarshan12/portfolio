export enum Domain {
  DataEngineering = 'Data Engineering',
  DataScience = 'Data Quality',
  AnalyticsEngineering = 'Data Science',
  QualityEngineering = 'Data Analytics'
}

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

export interface Project {
  id: string;
  slug: string;
  title: string;
  domain: Domain;
  description: string;
  tech: string[];
  image: string;
  featured: boolean;
  metrics: string[]; // Legacy for backward compat
  detailedMetrics?: Metric[];
  githubUrl?: string;
  demoUrl?: string;
  problem?: string;
  solution?: string;
  approach?: string[];
  techCategories?: TechCategory[];
  implementationCode?: {
    lang: string;
    code: string;
    title: string;
  }[];
  client?: string;
  duration?: string;
  role?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  domain: Domain;
  summary: string;
  background: string;
  approach: string;
  results: string[];
  techStack: string[];
}
