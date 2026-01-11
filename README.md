# Darshan Pathak Portfolio

A modern, responsive portfolio website showcasing expertise across the complete data lifecycle—from data engineering and analytics to quality assurance and machine learning.

## 🚀 Live Demo

**[pathakdarshan12.github.io/portfolio](https://pathakdarshan12.github.io/portfolio)**

---

## ✨ Features

### Core Capabilities
- **Multi-Page SPA** - React Router for seamless navigation
- **Dark/Light Mode** - Theme persistence with smooth transitions
- **Fully Responsive** - Mobile-first design with Tailwind CSS
- **Type-Safe** - Complete TypeScript implementation
- **Performance Optimized** - Code splitting, lazy loading, and manual chunks

### Key Sections
- **About** - Professional journey, technical expertise, career timeline
- **Projects** - Interactive gallery with domain filtering and live search
- **Case Studies** - Deep technical narratives with architecture diagrams
- **Blog** - Structured technical writing with syntax highlighting
- **Connect** - Contact form with Formspree integration and social links

### Advanced Components
- **Architecture Flow Visualizer** - Interactive data pipeline diagrams with tech stack visualization
- **Blog Template Engine** - Structured content sections (headers, subheaders, code blocks, images, metrics, callouts)
- **Code Syntax Highlighting** - Prism.js with VS Code Dark+ theme
- **Animated UI** - Framer Motion for smooth page transitions and hover effects
- **Dynamic Filtering** - Real-time project filtering by domain and sorting options

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.3** - UI library with Hooks and Context
- **TypeScript 5.8.2** - Static type checking
- **React Router DOM 7.12.0** - Client-side routing with HashRouter
- **Tailwind CSS** - Utility-first CSS framework

### UI & Animation
- **Framer Motion 12.24.12** - Declarative animations
- **Lucide React 0.562.0** - Modern icon library
- **@tailwindcss/typography 0.5.19** - Rich text styling

### Content Rendering
- **React Markdown 10.1.0** - Markdown to JSX
- **Remark GFM 4.0.1** - GitHub Flavored Markdown support
- **Rehype Raw 7.0.0** - Raw HTML in markdown
- **React Syntax Highlighter 16.1.0** - Code block highlighting with Prism.js

### Build & Deployment
- **Vite 6.4.1** - Lightning-fast build tool and dev server
- **@vitejs/plugin-react 5.1.2** - React Fast Refresh
- **gh-pages 6.3.0** - GitHub Pages deployment

### Development
- **TypeScript** - Types for React, Node, and React DOM
- **ESLint** - Code quality (implicit via Vite)
- **PostCSS** - CSS processing (via Tailwind)

---

## 📁 Project Structure

```
portfolio/
├── assets/
│   ├── icons/              # Logo variants (light/dark theme)
│   ├── images/             # Project screenshots, blog covers
│   │   ├── projects/       # Project hero images
│   │   ├── blogs/          # Blog post images
│   │   └── case_study/     # Case study visuals
│   └── resume/             # Downloadable resume (DOCX)
│
├── components/
│   ├── ArchitectureFlow.tsx    # Tech stack pipeline visualizer
│   └── BlogTemplate.tsx        # Structured blog post renderer
│
├── pages/
│   ├── About.tsx               # Homepage with hero, expertise, timeline
│   ├── Projects.tsx            # Project gallery with filters
│   ├── ProjectDetail.tsx       # Individual project deep-dive
│   ├── CaseStudies.tsx         # Case study listing
│   ├── CaseStudyDetail.tsx     # Individual case study view
│   ├── Blog.tsx                # Blog listing with search
│   ├── BlogDetail.tsx          # Individual blog post
│   └── Connect.tsx             # Contact form with Formspree
│
├── App.tsx                     # Root component with routing & nav
├── data.ts                     # Projects, case studies, expertise data
├── blog.ts                     # Blog posts with structured content
├── types.ts                    # TypeScript interfaces & enums
├── index.tsx                   # React app entry point
├── index.html                  # HTML template with importmap
├── vite.config.ts              # Vite configuration with path aliases
├── tsconfig.json               # TypeScript compiler options
├── tailwind.config.js          # Tailwind customization (via CDN)
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

---

## 🎯 Key Technical Highlights

### 1. **Metadata-Driven Architecture**
All projects, case studies, and blog posts are defined as TypeScript objects in `data.ts` and `blog.ts`, enabling:
- Type-safe content management
- Centralized data source
- Easy content updates without touching components

### 2. **Structured Blog Content System**
Blog posts use a **section-based content model** instead of raw Markdown:
```typescript
structuredContent: [
  { type: 'header', id: 'intro', content: 'Introduction' },
  { type: 'paragraph', content: 'Text content...' },
  { type: 'code', content: { language: 'python', code: '...', title: '...' } },
  { type: 'image', content: { src: '...', alt: '...', caption: '...' } },
  { type: 'metrics', content: [...] },
  { type: 'callout', content: { icon: '💡', title: '...', text: '...' } }
]
```
Supports: headers, paragraphs, code blocks, images, lists, quotes, metrics, dividers, callouts, two-column layouts.

### 3. **Interactive Architecture Flow Component**
Custom `<ArchitectureFlow>` component renders tech stack pipelines with:
- Horizontal scrolling cards
- Gradient backgrounds per category
- Tool badges with hover states
- Animated connectors between stages

### 4. **Advanced Filtering & Search**
- **Projects Page**: Domain filters + A-Z/Latest sorting
- **Blog Page**: Category pills + live search across title/excerpt
- **URL-based routing** for deep linking to individual items

### 5. **Dark Mode Implementation**
- Tailwind's `class` dark mode strategy
- Persisted theme preference (via React state)
- Smooth color transitions on theme toggle
- Theme-aware logos (light/dark variants)

### 6. **Code Syntax Highlighting**
- Prism.js via `react-syntax-highlighter`
- VS Code Dark+ theme for consistency
- Copy-to-clipboard functionality
- Line numbers and language labels
- Terminal-style header for code blocks

### 7. **Responsive Navigation**
- Sticky glass-morphism navbar
- Mobile hamburger menu
- Active route highlighting
- Scroll-to-top on route change

### 8. **Performance Optimizations**
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'icons': ['lucide-react'],
      }
    }
  }
}
```
- Manual code splitting for vendor bundles
- Lazy loading via dynamic imports
- Image optimization via CDN (ESM.sh for modules)

---

## 🎨 Design System

### Color Palette
- **Primary**: `#0ea5e9` (Sky Blue) - CTAs, links, accents
- **Neutrals**: Slate scale (50-950) for backgrounds and text
- **Success**: Emerald for data quality themes
- **Warning**: Amber for alerts
- **Error**: Rose for critical states

### Typography
- **Headings**: Inter (sans-serif) - Bold, tight tracking
- **Body**: Merriweather (serif) for blog content, Inter for UI
- **Code**: Fira Code for monospace

### Components
- **Cards**: `rounded-[2.5rem]` with subtle shadows
- **Buttons**: `rounded-2xl` with gradient hover states
- **Badges**: `rounded-full` for tags, `rounded-xl` for larger pills
- **Glassmorphism**: `backdrop-blur-xl` for navbar and overlays

---

## 📊 Content Overview

### Projects (6 Featured)
1. **IsoMetrics Healthcare** - Multi-tenant analytics platform (dbt, Snowflake, RLS)
2. **DataVelocity** - Lambda architecture with Kafka streaming
3. **iTAS** - AI-powered recruitment system (Transformers, Django)
4. **Netflix Analysis** - EDA case study (Python, Pandas)
5. **[Additional projects]**

### Case Studies (3 Technical)
1. **Customer Segmentation** - PCA, clustering, association analysis
2. **Employee Churn Prediction** - Classification modeling
3. **House Price Prediction** - XGBoost regression with Streamlit

### Blog Posts
- Data engineering workflows
- Quality testing frameworks
- Analytics best practices
- Technical tutorials

### Expertise Areas
- **Data Engineering** (Intermediate): Pipelines, ELT, orchestration
- **Data Quality** (Intermediate): Automated testing, validation
- **Analytics Engineering** (Intermediate): dbt, dimensional modeling
- **Data Science** (Foundational): ML models, feature engineering

---

## 🚀 Deployment

### Build Process
```bash
npm run build    # Generates production build in dist/
npm run deploy   # Deploys to GitHub Pages via gh-pages
```

### Deployment Configuration
- **Base Path**: `/portfolio/` (configured in `vite.config.ts` and `package.json`)
- **Router**: HashRouter for GitHub Pages compatibility
- **CDN**: ESM.sh for production module imports (defined in `index.html` importmap)

### GitHub Pages Setup
1. Repository settings → Pages → Source: `gh-pages` branch
2. Custom domain: Optional
3. Automatic deployment via `npm run deploy`

---

## 📝 Content Management

### Adding a Project
Edit `data.ts` → `PROJECTS` array with required fields:
- `id`, `slug`, `title`, `domains`, `description`
- `tech`, `image`, `metrics`, `detailedMetrics`
- `problem`, `solution`, `approach`
- `techCategories`, `implementationCode`

### Adding a Blog Post
Edit `blog.ts` → `BLOG_POSTS` array:
- Define `structuredContent` with section types
- Add author metadata
- Include tags and reading time

### Adding Images
1. Place in `assets/images/projects/` or `assets/images/blogs/`
2. Import in respective data files
3. Reference in content objects

---

## 🔒 Environment Variables

**None required** - The project uses static content and client-side routing only. Formspree endpoint for contact form is hardcoded (can be externalized if needed).

---

## 📄 License

This portfolio is a personal project. Code structure and components can be referenced for learning, but please don't copy the entire portfolio as-is.

---

## 👤 Author

**Darshan Pathak**  
Data Engineer | Analytics Engineer | Data Quality Analyst

- GitHub: [@Pathakdarshan12](https://github.com/Pathakdarshan12)
- LinkedIn: [pathakdarshan12](https://linkedin.com/in/pathakdarshan12)
- Email: pathak12darshan@gmail.com

---

## 🙏 Acknowledgments

- **Tailwind CSS** for utility-first styling
- **Lucide Icons** for beautiful iconography
- **Prism.js** for code syntax highlighting
- **Framer Motion** for smooth animations
- **Vite** for blazing-fast development experience