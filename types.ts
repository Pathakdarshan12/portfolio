
export enum Domain {
  DataEngineering = 'Data Engineering',
  DataScience = 'Data Science',
  AnalyticsEngineering = 'Analytics Engineering',
  QualityEngineering = 'Quality Engineering',
  ArtificialIntelligence = 'Artificial Intelligence'
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
  icon?: string;
  color?: string;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  domains: Domain[];
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
  architectureOverview?: string;
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

// --- New Blog Types ---

export type BlogSectionType =
  | 'header'
  | 'subheader'
  | 'paragraph'
  | 'image'
  | 'code'
  | 'list'
  | 'quote'
  | 'metrics'
  | 'twoColumn'
  | 'divider'
  | 'callout';

export interface BlogSection {
  type: BlogSectionType;
  content: any;
  id?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string; // Legacy Markdown fallback
  structuredContent?: BlogSection[]; // New structured data
  tags: string[];
  readingTime: string;
  image: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
    twitter?: string;
    linkedin?: string;
  };
  relatedPosts?: {
    title: string;
    slug: string;
    image: string;
  }[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  domains: Domain[];
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
