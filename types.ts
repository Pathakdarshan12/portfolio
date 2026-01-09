
export enum Domain {
  DataEngineering = 'Data Engineering',
  DataScience = 'Data Science',
  AnalyticsEngineering = 'Analytics Engineering',
  QualityEngineering = 'Quality Engineering'
}

export type ProjectStatus = 'Live Production' | 'In Development' | 'Case Study';

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
  metrics: string[]; 
  detailedMetrics?: Metric[];
  githubUrl?: string;
  demoUrl?: string;
  problem?: string;
  solution?: string;
  approach?: string[];
  techCategories?: TechCategory[];
  architectureOverview?: string; // New: High level architecture description
  implementationCode?: {
    lang: string;
    code: string;
    title: string;
  }[];
  client?: string;
  duration?: string;
  role?: string;
  status?: ProjectStatus;
  views?: string;
  likes?: string;
  publishedDate?: string;
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
  image: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  domain: Domain;
  image?: string;
  summary?: string;
  description?: string;
  background?: string;
  approach?: string;
  results?: string[];
  keyFindings?: string[];
  techStack?: string[];
  technologies?: string[];
  repoUrl?: string;
  publishedDate?: string;
}

export interface Competency {
  emoji: string;
  text: string;
}

export interface Expertise {
  title: string;
  mastery: 'EXPERT' | 'ADVANCED' | 'INTERMEDIATE';
  iconName: string; 
  gradient: string;
  competencies: Competency[];
  technologies: string[];
}
