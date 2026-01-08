
export enum Domain {
  DataEngineering = 'Data Engineering',
  DataScience = 'Data Science',
  AnalyticsEngineering = 'Analytics Engineering',
  QualityEngineering = 'Quality Engineering'
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
  githubUrl?: string;
  demoUrl?: string;
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
