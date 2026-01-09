
import { Domain, Project, BlogPost, CaseStudy, Expertise } from './types';
import isometrics from '@/assets/images/projects/isometrics_architecture.png';
import datavelocity from '@/assets/images/projects/sp_etl_master.png';
import road_accident from '@/assets/images/projects/Road_Accidents_Analysis.png';
import itas from '@/assets/images/projects/itas.png';
import netflix from '@/assets/images/projects/netflix.png';
import classifier from '@/assets/images/projects/classification.png';
import incremental_load from '@/assets/images/blogs/incremental_load/incremental_strategy.png';
import customer_segmentation from '@/assets/images/case_study/customer_segmentation.png';
import employee_churn from '@/assets/images/case_study/Employee_Churn_Prediction.png';
import house_price from '@/assets/images/case_study/house_price.png';


export const PROJECTS: Project[] = [
  {
    id: 'p6',
    slug: 'isometrics-healthcare',
    title: 'IsoMetrics – Multi-Tenant Healthcare Analytics Platform',
    domain: Domain.AnalyticsEngineering,
    description: 'A multi-tenant healthcare analytics platform designed to demonstrate analytics engineering best practices including dimensional modeling, incremental transformations, data quality testing, and CI/CD using dbt and Snowflake.',
    tech: ['dbt', 'Snowflake', 'SQL', 'Python', 'Streamlit', 'GitHub Actions'],
    image: isometrics,
    featured: true,
    metrics: [
      'Isolated multi-tenant schemas',
      '99.9% Data Quality via dbt-tests',
      'Automated CI/CD Deployment'
    ],
    detailedMetrics: [
      { label: 'Architecture', value: 'Multi-Tenant', detail: 'Schema-based tenant isolation in Snowflake', icon: 'Layers' },
      { label: 'Modeling', value: 'Kimball Star', detail: 'Fact & Dimension tables for health metrics', icon: 'Database' },
      { label: 'Validation', value: '50+ Tests', detail: 'Custom dbt generic and singular tests', icon: 'ShieldCheck' },
      { label: 'Automation', value: 'GitHub Actions', detail: 'Continuous integration for dbt models', icon: 'Zap' }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/Isometrics-Healthcare-Multi-Tenant-SaaS-Analytics-Platform',
    role: 'Analytics Engineer',
    status: 'Case Study',
    publishedDate: '2024',
    problem: 'Healthcare providers manage highly sensitive data across multiple clinics. Building a unified analytics platform requires strict data isolation (tenancy) while maintaining a single, maintainable codebase for transformations.',
    solution: 'Designed a "Medallion Architecture" on Snowflake using dbt. Implemented schema-based multi-tenancy where a single set of dbt models dynamically processes data for multiple tenants, ensuring privacy and scalability.',
    architectureOverview: 'The system uses a 3-layer approach: Bronze (Raw landing), Silver (Cleaned/Standardized), and Gold (Business Marts). Tenancy is handled via dbt variables and schema-dynamic macros that route data based on tenant profiles.',
    approach: [
      'Defined a YAML-driven tenant configuration for dynamic schema routing.',
      'Implemented Kimball dimensional modeling to separate transactional metrics from master data.',
      'Configured incremental materialization for large-scale clinical tables to reduce warehouse costs.',
      'Built custom dbt macros for standardized column renaming and audit field injection.',
      'Integrated dbt-expectations for advanced schema and data volume validation.'
    ],
    techCategories: [
      { category: 'Warehouse', tools: ['Snowflake', 'Resource Monitors', 'Storage Integrations'] },
      { category: 'Transformation', tools: ['dbt Core', 'Jinja2', 'Incremental Materialization'] },
      { category: 'Visuals', tools: ['Streamlit', 'Python Client for Snowflake'] },
      { category: 'DevOps', tools: ['GitHub Actions', 'dbt-docs'] }
    ],
    implementationCode: [
      {
        lang: 'sql',
        title: 'Incremental Tenant Fact Table',
        code: `{{ config(\n    materialized='incremental',\n    unique_key='encounter_id',\n    schema=var('tenant_schema')\n) }}\n\nselect\n    encounter_id,\n    patient_id,\n    diagnosis_code,\n    encounter_date,\n    {{ dbt_utils.generate_surrogate_key(['patient_id', 'encounter_date']) }} as patient_hk\nfrom {{ ref('stg_encounters') }}\n{% if is_incremental() %}\n    where _ingested_at >= (select max(_ingested_at) from {{ this }})\n{% endif %}`
      }
    ]
  },
  {
    id: 'p5',
    slug: 'data-velocity-lambda-platform',
    title: 'DataVelocity – Metadata-Driven Lambda Architecture',
    domain: Domain.DataEngineering,
    description: 'A metadata-driven data platform implementing batch and streaming ingestion patterns using Kafka and Snowflake, with a unified stored procedure transformation logic.',
    tech: ['Python', 'Apache Kafka', 'Snowflake', 'SQL', 'AWS S3', 'Docker'],
    image: datavelocity,
    featured: true,
    metrics: [
      '<15s Streaming Latency',
      'Unified Batch/Stream Logic',
      'Metadata-Driven Orchestration'
    ],
    detailedMetrics: [
      { label: 'Pattern', value: 'Lambda', detail: 'Simultaneous Speed and Batch layers', icon: 'Zap' },
      { label: 'Streaming', value: 'Kafka', detail: 'Real-time event ingestion via Snowpipe', icon: 'Activity' },
      { label: 'Storage', value: '3-Layer', detail: 'Bronze, Silver, Gold Medallion design', icon: 'Layers' },
      { label: 'Audit', value: 'Full Trace', detail: 'Hash-based change detection (SCD2)', icon: 'Search' }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/DataVelocity-metadata-driven-lambda-platform',
    role: 'Data Engineer',
    status: 'Case Study',
    publishedDate: '2024',
    problem: 'Modern enterprises receive data through two distinct paths: high-velocity event streams (Kafka) and daily batch files (S3). Maintaining two separate transformation pipelines leads to logic drift and inconsistent reporting.',
    solution: 'Engineered a "Unified Lambda Architecture". Both Kafka streams and S3 files land in a Unified Bronze layer. From there, a metadata-driven "SP_ETL_MASTER" Snowflake stored procedure processes both paths using identical SQL logic, preventing code duplication.',
    architectureOverview: 'Speed Layer uses Kafka Connect and Snowpipe Streaming for sub-minute latency. Batch Layer uses S3 stages and COPY INTO. All transformations are orchestrated via Snowflake Tasks and Streams (CDC) for automated, low-latency processing.',
    approach: [
      'Built a metadata repository to store pipeline configs, avoiding hardcoded SQL.',
      'Implemented SHA2_HEX hash-based change detection for high-performance SCD Type 2.',
      'Designed a custom data quality framework that logs errors to separate "Error Tables" without stopping the pipeline.',
      'Containerized the entire Kafka ecosystem using Docker Compose for local testing.',
      'Created a Master Orchestrator SP that handles transaction BEGIN/COMMIT logic across layers.'
    ],
    techCategories: [
      { category: 'Streaming', tools: ['Kafka Connect', 'Snowpipe Streaming', 'Confluent'] },
      { category: 'Transformation', tools: ['Snowflake Stored Procs', 'SQL', 'JavaScript'] },
      { category: 'Infrastructure', tools: ['Docker', 'AWS S3', 'Snowflake Streams'] },
      { category: 'Dashboard', tools: ['Streamlit', 'Pandas'] }
    ],
    implementationCode: [
      {
        lang: 'javascript',
        title: 'Metadata-Driven Master Orchestrator (Snippet)',
        code: `// Dynamic SQL Generation based on Metadata\nvar sql_command = "INSERT INTO " + TARGET_TABLE + " SELECT * FROM " + STAGING_TABLE;\nvar statement = snowflake.createStatement({sqlText: sql_command});\nstatement.execute();\nreturn "Success: " + TARGET_TABLE + " updated.";`
      }
    ]
  },
  {
    id: 'p4',
    slug: 'itas',
    title: 'iTAS – Intelligent Talent Acquisition System',
    domain: Domain.DataScience,
    description: 'AI-powered recruitment platform with resume parsing, skill extraction, and job matching built with a Django and Flask microservices architecture.',
    tech: ['Python', 'Django', 'Flask', 'spaCy', 'scikit-learn', 'MySQL', 'Bootstrap'],
    image: itas,
    featured: false,
    metrics: [
      'NLP Resume Parsing',
      'Skill Ranking Algorithm',
      'Microservices Design'
    ],
    detailedMetrics: [
      { label: 'NLP', value: 'spaCy', detail: 'Entity extraction for resume text', icon: 'Brain' },
      { label: 'Ranking', value: 'Cosine Sim', detail: 'Matching resumes to job descriptions', icon: 'Target' },
      { label: 'Web', value: 'Django', detail: 'Full-featured recruitment dashboard', icon: 'LayoutDashboard' },
      { label: 'Database', value: 'MySQL', detail: 'Relational storage for candidates', icon: 'Database' }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/iTAS',
    role: 'Full-Stack / ML Developer',
    status: 'In Development',
    publishedDate: '2023',
    problem: 'Recruiters are overwhelmed by volume. Manual resume screening is slow, inconsistent, and error-prone, leading to missed talent and high time-to-hire.',
    solution: 'Developed an end-to-end recruitment system. A Django frontend manages the recruiter workflow, while a Flask-based NLP microservice parses PDF/DOCX resumes and calculates a "Compatibility Score" using machine learning.',
    architectureOverview: 'Split into two services: a monolithic Django app for user management and business logic, and a lightweight Flask API for the CPU-intensive NLP parsing and skill matching.',
    approach: [
      'Integrated spaCy NER (Named Entity Recognition) to identify names, emails, and skills from raw text.',
      'Implemented TF-IDF and Cosine Similarity to rank candidates against job descriptions.',
      'Designed a relational MySQL schema to track application status and candidate history.',
      'Created a multi-step screening pipeline from Upload -> Parse -> Match -> Schedule.'
    ],
    techCategories: [
      { category: 'Web Framework', tools: ['Django', 'Flask'] },
      { category: 'AI/NLP', tools: ['spaCy', 'NLTK', 'scikit-learn'] },
      { category: 'Frontend', tools: ['Bootstrap', 'JQuery'] }
    ],
    implementationCode: [
      {
        lang: 'python',
        title: 'Skill Extraction with spaCy',
        code: `import spacy\nnlp = spacy.load("en_core_web_sm")\n\ndef extract_skills(text, skill_db):\n    doc = nlp(text)\n    found_skills = [ent.text for ent in doc.ents if ent.label_ == "SKILL"]\n    return list(set(found_skills) & set(skill_db))`
      }
    ]
  },
  {
    id: 'p3',
    slug: 'kidney-disease-classification',
    title: 'Kidney Disease Classification (MLOps)',
    domain: Domain.DataScience,
    description: 'End-to-end MLOps pipeline for kidney CT scan classification using VGG16. Implements experiment tracking with MLflow and data versioning with DVC.',
    tech: ['Python', 'TensorFlow', 'MLflow', 'DVC', 'Docker', 'AWS'],
    image: classifier,
    featured: false,
    metrics: [
      'VGG16 Transfer Learning',
      'MLflow Reproducibility',
      'DVC Pipeline Tracking'
    ],
    detailedMetrics: [
      { label: 'CNN', value: 'VGG16', detail: 'Pre-trained weights for feature extraction', icon: 'Brain' },
      { label: 'Ops', value: 'MLflow', detail: 'Experiment tracking and model registry', icon: 'Activity' },
      { label: 'Versioning', value: 'DVC', detail: 'Large data version control for images', icon: 'Database' },
      { label: 'Deploy', value: 'Docker', detail: 'Containerized for AWS deployment', icon: 'Zap' }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/Kidney_Disease_Classification_Using_MLflow_and_DVC',
    role: 'MLOps Engineer',
    status: 'Case Study',
    publishedDate: '2024',
    problem: 'ML projects often fail in production due to lack of reproducibility, data version drift, and cumbersome deployment processes in medical imaging where accuracy is critical.',
    solution: 'Built a modular MLOps pipeline. Used VGG16 transfer learning for high-accuracy image classification and integrated DVC for data versioning and MLflow for tracking parameters/metrics.',
    architectureOverview: 'The project follows a modular design: Data Ingestion -> Base Model Prep -> Training -> Evaluation. Each stage is linked via a dvc.yaml file to ensure strict execution order.',
    approach: [
      'Used DVC to version 2GB+ of medical imagery without cluttering Git.',
      'Fine-tuned VGG16 by adding custom dense layers for specific kidney pathology classes.',
      'Configured MLflow as a central registry to compare different hyperparameters (learning rate, epochs).',
      'Automated the prediction service with a Flask API and Dockerized the entire environment.'
    ],
    techCategories: [
      { category: 'Modeling', tools: ['TensorFlow', 'VGG16', 'Keras'] },
      { category: 'MLOps', tools: ['MLflow', 'DVC', 'Dagshub'] },
      { category: 'DevOps', tools: ['Docker', 'GitHub Actions'] }
    ],
    implementationCode: [
      {
        lang: 'yaml',
        title: 'DVC Pipeline Stage',
        code: `stages:\n  training:\n    cmd: python src/pipeline/stage_03_model_training.py\n    deps:\n      - src/pipeline/stage_03_model_training.py\n      - artifacts/data_ingestion/kidney-ct-scan-image\n    outs:\n      - artifacts/training/model.h5`
      }
    ]
  },
  {
    id: 'p1',
    slug: 'road-accident-analysis-powerbi',
    title: 'Road Accident Analysis & Visualization',
    domain: Domain.AnalyticsEngineering,
    description: 'Interactive Power BI dashboard analyzing 307K records of UK road accidents. Features KPI tracking, YoY comparisons, and geographical trend analysis.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Excel'],
    image: road_accident,
    featured: false,
    metrics: [
      '307K Records Analyzed',
      'Interactive Map Viz',
      'YoY Trend Analysis'
    ],
    detailedMetrics: [
      { label: 'Volume', value: '307K', detail: 'Massive scale UK accident dataset', icon: 'BarChart' },
      { label: 'Engine', value: 'DAX', detail: 'Complex calculated measures for KPIs', icon: 'Cpu' },
      { label: 'ETL', value: 'Power Query', detail: 'Heavy data cleaning and normalization', icon: 'Layers' },
      { label: 'UI', value: 'Dark Theme', detail: 'High-contrast dashboard for visibility', icon: 'LayoutDashboard' }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/Road_Accident_Analysis_Using_PowerBI',
    role: 'Data Analyst',
    status: 'Case Study',
    publishedDate: '2023',
    problem: 'Public safety departments need to understand accident patterns across vast regions but struggle to visualize raw data from 300,000+ incidents to find high-risk junctions.',
    solution: 'Designed an interactive Power BI dashboard that distills complex UK accident data into actionable KPIs (Casualties, Severity, Vehicle Types) with drill-down capabilities for temporal and spatial analysis.',
    architectureOverview: 'End-to-end BI solution: Excel (Source) -> Power Query (Cleaning) -> Data Model (Star Schema) -> DAX (Logic) -> Power BI (Visualization).',
    approach: [
      'Performed intensive data cleaning in Power Query to handle nulls and inconsistent location data.',
      'Developed custom DAX measures for Year-over-Year (YoY) casualty comparisons.',
      'Created a multi-page dashboard featuring a high-level KPI overview and a deep-dive map view.',
      'Identified critical patterns: Weather impact, road type correlation, and peak casualty hours.'
    ],
    techCategories: [
      { category: 'BI Platform', tools: ['Power BI Desktop', 'Power BI Service'] },
      { category: 'Logic', tools: ['DAX (Data Analysis Expressions)'] },
      { category: 'Data Prep', tools: ['Power Query', 'M Language'] }
    ],
    implementationCode: [
      {
        lang: 'dax',
        title: 'YoY Casualty Measure',
        code: `YoY Casualties = \nVAR CurrentYear = [Total Casualties]\nVAR PreviousYear = CALCULATE([Total Casualties], SAMEPERIODLASTYEAR('Calendar'[Date]))\nRETURN DIVIDE(CurrentYear - PreviousYear, PreviousYear, 0)`
      }
    ]
  },
{
    id: 'p2',
    slug: 'netflix-data-analysis',
    title: 'Netflix Content & Trend Analysis',
    domain: Domain.DataScience,
    description: 'Comprehensive Exploratory Data Analysis (EDA) of the Netflix dataset using Python, uncovering content trends, rating distributions, and geographical concentrations over the last decade.',
    tech: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'NumPy'],
    image: netflix,
    featured: false,
    metrics: [
      '8,000+ Titles Analyzed',
      'Cleaned Messy Categorical Data',
      'Dynamic Content Visuals'
    ],
    detailedMetrics: [
      { label: 'Scale', value: '8.8K Rows', detail: 'Comprehensive catalog analysis', icon: 'Database' },
      { label: 'Visuals', value: '15+ Charts', detail: 'Statistical content distributions', icon: 'BarChart' },
      { label: 'Core', value: 'Python', detail: 'Pandas & Seaborn backend', icon: 'Cpu' },
      { label: 'Trends', value: '10+ Years', detail: 'Historical production analysis', icon: 'Activity' }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/Netflix_Data_Analysis',
    role: 'Data Scientist',
    status: 'Case Study',
    publishedDate: '06-12-2025',
    problem: 'Streaming services generate massive amounts of catalog data, but raw information lacks the visual context needed to identify production shifts, rating preferences, and content gaps across global markets.',
    solution: 'Conducted a deep-dive EDA using Python. Cleaned multi-valued columns (Cast, Director), handled null values strategically, and generated high-impact visualizations to map Netflix\'s global growth and content strategy.',
    architectureOverview: 'Standard Data Analytics Pipeline: Raw CSV Ingestion → Data Cleaning (Missing Value Imputation) → Feature Engineering (Date Extraction) → Statistical EDA → Visual Synthesis.',
    approach: [
      'Processed raw CSV data using Pandas for initial data profiling and null detection.',
      'Split and normalized multi-valued categories like "Listed In" and "Cast" for granular analysis.',
      'Utilized Matplotlib and Seaborn for multi-variate analysis of Ratings vs. Release Year.',
      'Extracted insights on Netflix\'s content pivot from TV Shows to Movies over time.',
      'Identified top content-producing countries through frequency distribution mapping.'
    ],
    techCategories: [
      { category: 'Data Sources', tools: ['Netflix Titles CSV', 'Kaggle Dataset'] },
      { category: 'Transformation', tools: ['Pandas', 'NumPy', 'Data Cleaning'] },
      { category: 'Data Warehouse', tools: ['Python DataFrame', 'In-memory Processing'] },
      { category: 'Visualization', tools: ['Seaborn', 'Matplotlib', 'Heatmaps'] }
    ],
    implementationCode: [
      {
        lang: 'python',
        title: 'Categorical Distribution Analysis',
        code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Visualize TV Shows vs Movies\nsns.set(style="darkgrid")\nplt.figure(figsize=(10,6))\nax = sns.countplot(x="type", data=netflix_df, palette="Set2")\nplt.title("Distribution of Content on Netflix")\nplt.show()`
      }
    ]
  }
];

export const SKILLS = [
  // Engineering - Blue
  { name: 'Spark', domain: Domain.DataEngineering, mastery: 3, xp: '5y', icon: 'Zap' },
  { name: 'Kafka', domain: Domain.DataEngineering, mastery: 2, xp: '3y', icon: 'Activity' },
  { name: 'Airflow', domain: Domain.DataEngineering, mastery: 3, xp: '4y', icon: 'Layers' },
  { name: 'Python', domain: Domain.DataEngineering, mastery: 3, xp: '6y', icon: 'Code' },
  { name: 'AWS', domain: Domain.DataEngineering, mastery: 2, xp: '4y', icon: 'Cloud' },

  // Quality - Green
  { name: 'dbt-tests', domain: Domain.QualityEngineering, mastery: 3, xp: '4y', icon: 'ShieldCheck' },
  { name: 'Great Expectations', domain: Domain.QualityEngineering, mastery: 2, xp: '2y', icon: 'CheckSquare' },
  { name: 'Monte Carlo', domain: Domain.QualityEngineering, mastery: 2, xp: '2y', icon: 'Microscope' },
  { name: 'Elementary', domain: Domain.QualityEngineering, mastery: 3, xp: '3y', icon: 'Search' },

  // Analytics - Purple
  { name: 'dbt', domain: Domain.AnalyticsEngineering, mastery: 3, xp: '5y', icon: 'Database' },
  { name: 'Snowflake', domain: Domain.AnalyticsEngineering, mastery: 3, xp: '4y', icon: 'Box' },
  { name: 'Looker', domain: Domain.AnalyticsEngineering, mastery: 2, xp: '3y', icon: 'BarChart' },
  { name: 'SQL', domain: Domain.AnalyticsEngineering, mastery: 3, xp: '6y', icon: 'Terminal' },

  // Science - Pink
  { name: 'PyTorch', domain: Domain.DataScience, mastery: 2, xp: '3y', icon: 'Brain' },
  { name: 'XGBoost', domain: Domain.DataScience, mastery: 2, xp: '3y', icon: 'TrendingUp' },
  { name: 'Pandas', domain: Domain.DataScience, mastery: 3, xp: '5y', icon: 'Table' },
  { name: 'MLflow', domain: Domain.DataScience, mastery: 2, xp: '2y', icon: 'GitBranch' },
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
    id: 'b1',
    slug: 'how-i-built-a-lambda-architecture',
    title: 'How I built a Unified Lambda Architecture on Snowflake',
    date: 'Jan 15, 2026',
    category: 'Data Engineering',
    readingTime: '15 min read',
    featured: true,
    image: datavelocity,
    author: {
      name: 'Darshan Pathak',
      role: 'Data Engineer',
      avatar: 'https://picsum.photos/seed/dp88/200/200',
      linkedin: 'https://linkedin.com/in/pathakdarshan12'
    },
    excerpt: 'Building a production-grade platform that unifies batch file loads and real-time Kafka events through identical transformation logic.',
    tags: ['Snowflake', 'Kafka', 'Data Engineering', 'Lambda Architecture'],
    content: ''
  },
  {
    id: 'b3',
    slug: 'dbt-incremental-models-can-quietly-break-your-data',
    title: 'dbt Incremental Models Can Quietly Break Your Data (Here\'s How to Fix It)',
    date: 'Jan 07, 2026',
    category: 'Data Engineering',
    readingTime: '8 min read',
    featured: false,
    image: incremental_load,
    author: {
      name: 'Darshan Pathak',
      role: 'Lead Data Architect',
      avatar: 'https://picsum.photos/seed/dp88/200/200',
      linkedin: 'https://linkedin.com/in/pathakdarshan12'
    },
    excerpt: 'The worst data bugs are the ones you don\'t see coming. Learn how to keep your dbt incremental models from silently corrupting your warehouse.',
    tags: ['dbt', 'Data Engineering', 'Quality'],
    content: ''
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'customer-segmentation-analysis',
    title: 'Customer Segmentation & Association Analysis',
    image: customer_segmentation,
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
    image: employee_churn,
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
    image: house_price,
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
