
import { Domain, Project, BlogPost, CaseStudy, Expertise } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'isometrics-healthcare',
    title: 'IsoMetrics – Multi-Tenant Healthcare Analytics Platform',
    domain: Domain.AnalyticsEngineering,
    description:
      'A multi-tenant healthcare analytics platform designed to demonstrate analytics engineering best practices including dimensional modeling, incremental transformations, data quality testing, and CI/CD using dbt and Snowflake.',
    tech: ['dbt', 'Snowflake', 'SQL', 'Python', 'Streamlit', 'GitHub Actions'],
    image:
      'https://raw.githubusercontent.com/Pathakdarshan12/Isometrics-Healthcare-Multi-Tenant-SaaS-Analytics-Platform/main/docs/IsoMetrics.png',
    featured: true,
    metrics: [
      'Multi-tenant analytics design',
      'Incremental dbt models',
      'Automated data quality checks'
    ],
    githubUrl:
      'https://github.com/Pathakdarshan12/Isometrics-Healthcare-Multi-Tenant-SaaS-Analytics-Platform',
    role: 'Analytics Engineer',
    status: 'Case Study',
    publishedDate: '2024'
  },

  {
    id: 'p2',
    slug: 'data-velocity-lambda-platform',
    title: 'DataVelocity – Metadata-Driven Lambda Architecture',
    domain: Domain.DataEngineering,
    description:
      'A metadata-driven data platform implementing batch and streaming ingestion patterns using Kafka and Snowflake, with a layered architecture and audit-friendly transformations.',
    tech: ['Python', 'Apache Kafka', 'Snowflake', 'SQL', 'AWS S3'],
    image:
      'https://raw.githubusercontent.com/Pathakdarshan12/DataVelocity-metadata-driven-lambda-platform/main/datavelocity_unified_dashboard/dashboard.png',
    featured: true,
    metrics: [
      'Batch and streaming ingestion',
      'Metadata-driven pipeline design',
      'Layered warehouse architecture'
    ],
    githubUrl:
      'https://github.com/Pathakdarshan12/DataVelocity-metadata-driven-lambda-platform',
    role: 'Data Engineer',
    status: 'Case Study',
    publishedDate: '2024'
  },

  {
    id: 'p3',
    slug: 'itas',
    title: 'iTAS – Intelligent Talent Acquisition System',
    domain: Domain.DataScience,
    description:
      'An academic project focused on building an intelligent talent acquisition system using machine learning techniques for resume parsing and candidate–job matching.',
    tech: [
      'Python',
      'Django',
      'Flask',
      'TensorFlow',
      'PyTorch',
      'MySQL'
    ],
    image:
      'https://raw.githubusercontent.com/Pathakdarshan12/iTAS/main/screenshots/preview.png',
    featured: false,
    metrics: [
      'Resume parsing workflow',
      'Skill matching logic',
      'ML-based candidate analysis'
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/iTAS',
    role: 'ML / Full-Stack Developer',
    status: 'In Development',
    publishedDate: '2023'
  },

  {
    id: 'p4',
    slug: 'kidney-disease-classification',
    title: 'Kidney Disease Classification using MLflow & DVC',
    domain: Domain.DataScience,
    description:
      'A machine learning project demonstrating experiment tracking with MLflow and dataset versioning using DVC for kidney disease classification.',
    tech: [
      'Python',
      'Flask',
      'MLflow',
      'DVC',
      'TensorFlow',
      'PyTorch',
      'Docker'
    ],
    image:
      'https://raw.githubusercontent.com/Pathakdarshan12/Kidney_Disease_Classification_Using_MLflow_and_DVC/main/screenshots/preview.png',
    featured: false,
    metrics: [
      'ML experiment tracking',
      'Data version control',
      'Model serving via Flask'
    ],
    githubUrl:
      'https://github.com/Pathakdarshan12/Kidney_Disease_Classification_Using_MLflow_and_DVC',
    role: 'ML Engineer',
    status: 'Case Study',
    publishedDate: '2024'
  },

  {
    id: 'p5',
    slug: 'road-accident-analysis-powerbi',
    title: 'Road Accident Analysis using Power BI',
    domain: Domain.DataEngineering,
    description:
      'A data analysis and visualization project using Power BI to explore patterns and trends in road accident data.',
    tech: ['Power BI', 'DAX'],
    image:
      'https://raw.githubusercontent.com/Pathakdarshan12/Road_Accident_Analysis_Using_PowerBI/main/assets/preview.png',
    featured: false,
    metrics: [
      'Interactive dashboards',
      'Exploratory analysis',
      'Trend-based insights'
    ],
    githubUrl:
      'https://github.com/Pathakdarshan12/Road_Accident_Analysis_Using_PowerBI',
    role: 'Data Analyst',
    status: 'Case Study',
    publishedDate: '2023'
  }
];

export const SKILLS = [
  // Engineering - Blue
  { name: 'Spark', domain: Domain.DataEngineering, mastery: 3, xp: '5y', icon: 'zap' },
  { name: 'Kafka', domain: Domain.DataEngineering, mastery: 2, xp: '3y', icon: 'activity' },
  { name: 'Airflow', domain: Domain.DataEngineering, mastery: 3, xp: '4y', icon: 'layers' },
  { name: 'Python', domain: Domain.DataEngineering, mastery: 3, xp: '6y', icon: 'code' },
  { name: 'AWS', domain: Domain.DataEngineering, mastery: 2, xp: '4y', icon: 'cloud' },

  // Quality - Green
  { name: 'dbt-tests', domain: Domain.QualityEngineering, mastery: 3, xp: '4y', icon: 'shield-check' },
  { name: 'Great Expectations', domain: Domain.QualityEngineering, mastery: 2, xp: '2y', icon: 'check-circle' },
  { name: 'Monte Carlo', domain: Domain.QualityEngineering, mastery: 2, xp: '2y', icon: 'microscope' },
  { name: 'Elementary', domain: Domain.QualityEngineering, mastery: 3, xp: '3y', icon: 'search' },

  // Analytics - Purple
  { name: 'dbt', domain: Domain.AnalyticsEngineering, mastery: 3, xp: '5y', icon: 'database' },
  { name: 'Snowflake', domain: Domain.AnalyticsEngineering, mastery: 3, xp: '4y', icon: 'box' },
  { name: 'Looker', domain: Domain.AnalyticsEngineering, mastery: 2, xp: '3y', icon: 'bar-chart' },
  { name: 'SQL', domain: Domain.AnalyticsEngineering, mastery: 3, xp: '6y', icon: 'terminal' },

  // Science - Pink
  { name: 'PyTorch', domain: Domain.DataScience, mastery: 2, xp: '3y', icon: 'brain' },
  { name: 'XGBoost', domain: Domain.DataScience, mastery: 2, xp: '3y', icon: 'trending-up' },
  { name: 'Pandas', domain: Domain.DataScience, mastery: 3, xp: '5y', icon: 'table' },
  { name: 'MLflow', domain: Domain.DataScience, mastery: 2, xp: '2y', icon: 'git-branch' },
];

export const EXPERTISE_DATA: Expertise[] = [
  {
    title: 'Data Engineering',
    mastery: 'EXPERT',
    iconName: 'Database',
    gradient: 'from-sky-500 to-blue-700',
    competencies: [
      { emoji: '🏗️', text: 'Pipeline Architecture & ETL/ELT Design' },
      { emoji: '⚡', text: 'Real-time Stream Processing' },
      { emoji: '☁️', text: 'Cloud Infrastructure & Orchestration' },
      { emoji: '📊', text: 'Modern Data Warehousing' },
      { emoji: '🔄', text: 'Workflow Automation' }
    ],
    technologies: ['Python', 'SQL', 'Java', 'PySpark', 'Kafka', 'Airflow', 'dbt', 'Databricks', 'Snowflake', 'AWS S3', 'Docker', 'GitHub']
  },
  {
    title: 'Data Quality Engineering',
    mastery: 'EXPERT',
    iconName: 'Shield',
    gradient: 'from-emerald-500 to-teal-700',
    competencies: [
      { emoji: '🛡️', text: 'Data Validation & Schema Enforcement' },
      { emoji: '🧪', text: 'Automated Testing Frameworks' },
      { emoji: '📊', text: 'Data Profiling & Health Monitoring' },
      { emoji: '🔍', text: 'Quality Metrics & SLA Tracking' },
      { emoji: '⚠️', text: 'Proactive Anomaly Detection' }
    ],
    technologies: ['Pytest-BDD', 'Great Expectations', 'dbt tests', 'Playwright', 'SQLAlchemy', 'Jenkins', 'GitHub Actions', 'Snowflake', 'PostgreSQL']
  },
  {
    title: 'Data Analytics Engineering',
    mastery: 'ADVANCED',
    iconName: 'BarChart',
    gradient: 'from-purple-500 to-indigo-700',
    competencies: [
      { emoji: '📐', text: 'Data Modeling & Dimensional Design' },
      { emoji: '🔄', text: 'Transformation Pipeline Development' },
      { emoji: '📊', text: 'BI & Self-Service Dashboards' },
      { emoji: '☁️', text: 'Cloud Analytics Optimization' },
      { emoji: '📈', text: 'Statistical Analysis & EDA' }
    ],
    technologies: ['dbt', 'SQL', 'PySpark', 'Power BI', 'Streamlit', 'Snowflake', 'Databricks', 'AWS', 'Azure', 'GitHub', 'Docker']
  },
  {
    title: 'Data Science & ML',
    mastery: 'ADVANCED',
    iconName: 'Brain',
    gradient: 'from-pink-500 to-rose-700',
    competencies: [
      { emoji: '🤖', text: 'Machine Learning Model Development' },
      { emoji: '📊', text: 'Statistical Analysis & Testing' },
      { emoji: '🔍', text: 'Exploratory Data Analysis' },
      { emoji: '📈', text: 'Predictive Modeling & Forecasting' },
      { emoji: '🛠️', text: 'Feature Engineering at Scale' }
    ],
    technologies: ['TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'PySpark', 'Databricks', 'Snowflake', 'Docker', 'GitHub', 'Streamlit']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b3',
    slug: 'dbt-incremental-models-can-quietly-break-your-data',
    title: 'dbt Incremental Models Can Quietly Break Your Data (Here\'s How to Fix It)',
    date: 'Jan 07, 2026',
    category: 'Data Engineering',
    readingTime: '8 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1591608971362-f08b2a09f91a?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Darshan Pathak',
      role: 'Lead Data Architect',
      avatar: 'https://picsum.photos/seed/dp88/200/200',
      twitter: '#',
      linkedin: '#'
    },
    excerpt: 'The worst data bugs are the ones you don\'t see coming. Learn how to keep your dbt incremental models from silently corrupting your warehouse.',
    tags: ['dbt', 'Data Engineering', 'Quality'],
    content: ''
  },
  {
    id: 'b1',
    slug: 'modular-dbt-architectures-2024',
    title: 'The Art of Modular dbt Architectures',
    date: 'March 20, 2024',
    category: 'Analytics Engineering',
    readingTime: '10 min read',
    featured: false,
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
    content: ''
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
    content: ''
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'customer-segmentation-analysis',
    title: 'Customer Segmentation & Association Analysis',
    description:
      'A data analysis case study involving exploratory data analysis (EDA), dimensionality reduction (PCA), clustering to identify customer segments, and association rule mining to discover relationships between demographic and survey variables.',
    domain: Domain.DataScience,
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Scikit-learn',
      'PCA',
      'Clustering'
    ],
    keyFindings: [
      'Identified distinct customer segments via clustering',
      'Uncovered demographic factors influencing behaviors',
      'Association rules revealed relationships between key variables'
    ],
    repoUrl: 'https://github.com/Pathakdarshan12/Customer_Segmentation',
    publishedDate: '2025'
  },
  {
    id: 'cs2',
    slug: 'employee-churn-prediction',
    title: 'Employee Churn Prediction with Machine Learning',
    description:
      'A predictive modeling case study to forecast employee churn using machine learning. Includes dataset exploration, preprocessing, model building, evaluation, and exporting prediction results.',
    domain: Domain.DataScience,
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Scikit-learn'
    ],
    keyFindings: [
      'Explored employee dataset to understand churn drivers',
      'Built and evaluated models with classification metrics',
      'Exported churn predictions for analysis'
    ],
    repoUrl: 'https://github.com/Pathakdarshan12/Employee_Churn_Prediction',
    publishedDate: '2025'
  },
  {
    id: 'cs3',
    slug: 'house-price-prediction-app',
    title: 'House Price Prediction App (Machine Learning)',
    description:
      'A machine learning-based web application that predicts house prices using an XGBoost regression model wrapped in a Streamlit interface, enabling user interaction with feature inputs to estimate property prices.',
    domain: Domain.DataScience,
    technologies: [
      'Python',
      'Streamlit',
      'Pandas',
      'NumPy',
      'XGBoost',
      'Matplotlib'
    ],
    keyFindings: [
      'Developed a web app for interactive price predictions',
      'Applied regression modeling via XGBoost',
      'Provided visualization support for predictive insights'
    ],
    repoUrl: 'https://github.com/Pathakdarshan12/House_Price_Prediction',
    publishedDate: '2025'
  }
];
