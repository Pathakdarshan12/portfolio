import { BlogPost } from './types';
import { datavelocityImages } from '@/assets/images/blogs/datavelocity'
import { incrementalloadImages } from '@/assets/images/blogs/incremental_load'
import { isometricsImages } from '@/assets/images/blogs/isometrics_healthcare'
import avatar from '@/assets/icons/avatar.png'

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'how-i-built-a-lambda-architecture',
    title: 'How I built a Lambda Architecture that unifies batch and streaming without duplicating transformation logic',
    date: 'January 1, 2026',
    category: 'Data Engineering',
    excerpt: 'Building a Unified Lambda Architecture on Snowflake. I built a unified data platform that processes file batch loads AND real-time Kafka events through identical transformation logic.',
    content: 'Legacy markdown fallback...',
    tags: ['snowflake', 'kafka', 'data-engineering', 'lambda-architecture', 'streaming'],
    readingTime: '15 min',
    image: datavelocityImages.architecture,
    featured: true,
    author: {
      name: 'Darshan Pathak',
      role: 'Data Quality Analyst',
      avatar: avatar,
      linkedin: 'https://linkedin.com/in/pathakdarshan12'
    },
    structuredContent: [
        { type: 'callout', content: {
            title: 'TL;DR',
            text: 'I built a unified data platform that processes file batch loads AND real-time Kafka events through identical transformation logic. Same validation rules. Same SCD Type 2 procedures. Same quality gates. One codebase. No logic duplication.',
            icon: '💡',
            color: 'blue'
        }},
        { type: 'header', id: 'problem', content: 'The Problem Nobody Talks About' },
        { type: 'paragraph', content: 'Most data platforms force you to choose: batch OR streaming. Build both, and you maintain two codebases. That\'s where pipelines break in production.' },
        { type: 'paragraph', content: 'Lambda architectures promise the best of both worlds but usually deliver twice the complexity. Batch procedures and streaming queries drift apart. Quality checks become inconsistent. When a delivery status changes in Kafka, it needs the exact same validation as a CSV upload - except most teams implement it twice and watch them diverge over six months.' },
        { type: 'paragraph', content: 'I spent three months solving this exact problem.' },
        { type: 'paragraph', content: 'The result? DataVelocity - a production-grade platform that processes CSV batch loads AND real-time Kafka events through the same medallion architecture (Bronze → Silver → Gold). Same validation rules. Same SCD Type 2 logic. Same quality gates. One codebase.' },

        { type: 'header', id: 'built', content: 'What I Actually Built' },
        { type: 'paragraph', content: 'DataVelocity is a unified data platform handling food delivery transactions across 10+ entities (customers, orders, deliveries, restaurants, menu items, locations) with:' },
        { type: 'list', content: { ordered: false, items: [
            'Full historical tracking (SCD Type 2)',
            'Real-time event processing (< 15 second latency)',
            'Zero tolerance for data quality issues (95%+ validation pass rate)',
            'Complete observability (every record traceable)',
            '~95% of transient operational failures self-heal via retries'
        ]}},
        { type: 'image', content: { src: datavelocityImages.architecture, alt: 'Architecture Diagram' } },
        { type: 'image', content: { src: datavelocityImages.sp_etl_master, alt: 'SP ETL Master Flow' } },

        { type: 'header', id: 'architecture', content: 'The Three-Layer Architecture' },

        { type: 'subheader', id: 'layer1', content: 'Layer 1: Dual Ingestion (Batch + Speed)' },
        { type: 'image', content: { src: datavelocityImages.Snowpipe_kafka_connect, alt: 'Snowpipe and Kafka Connect' } },
        { type: 'paragraph', content: 'Batch path: CSV files → S3 → Snowflake Stage → Bronze tables' },
        { type: 'paragraph', content: 'Speed path: Kafka events → Snowpipe Streaming → Landing tables (BRONZE.*_STREAM) → Snowflake Streams (CDC) → Bronze tables' },
        { type: 'paragraph', content: 'Critical insight: Both paths converge at Bronze. From that point forward, they use identical stored procedures. Not "similar." Not "mostly the same." Literally the exact same SQL code.' },
        { type: 'code', content: {
            language: 'sql',
            title: 'Unified Task Execution',
            code: `CREATE TASK TASK_ORDERS_STREAM_TO_GOLD\nWAREHOUSE = ADHOC_WH\nSCHEDULE = '2 MINUTE'\nWHEN SYSTEM$STREAM_HAS_DATA('STREAM_ORDERS_CHANGES')\nAS CALL SP_ETL_MASTER('ORDER_PIPELINE_STREAM', NULL);`
        }},

        { type: 'subheader', id: 'layer2', content: 'Layer 2: Medallion Transformation' },
        { type: 'image', content: { src: datavelocityImages.medalion_architecture, alt: 'Medallion Architecture' } },
        { type: 'list', content: { ordered: false, items: [
            'Bronze Layer: Raw data with minimal transformation, preserving original values for replay.',
            'Silver Layer: MERGE-based upserts using business keys with centralized validation.',
            'Gold Layer: Dimensional models with SCD Type 2 and Fact tables.',
            'Analytics Layer: 20+ denormalized mart views for reporting.'
        ]}},

        { type: 'subheader', id: 'layer3', content: 'Layer 3: Observability & Orchestration' },
        { type: 'paragraph', content: 'Master orchestrator SP_ETL_MASTER coordinates all three layers with full transaction management, real-time SLA tracking, and complete audit trails.' },
        { type: 'image', content: { src: datavelocityImages.observation_layer, alt: 'Observation Layer' } },

        { type: 'header', id: 'decisions', content: 'Five Engineering Decisions That Made This Work' },
        { type: 'image', content: { src: datavelocityImages.decisions, alt: 'Engineering Decisions Overview' } },

        { type: 'subheader', content: 'Decision #1: Dual-Stage Streaming with Unified Bronze' },
        { type: 'paragraph', content: 'Most streaming architectures push Kafka events directly into transformation logic. That creates coupling. My approach: Lightweight landing tables for ingestion, then CDC to Bronze.' },
        { type: 'code', content: {
            language: 'sql',
            title: 'CDC Capture Stream',
            code: `-- Landing table (Snowpipe Streaming writes here)\nCREATE TABLE BRONZE.ORDERS_STREAM (\n    RECORD_METADATA VARIANT,  -- Kafka offset, partition\n    RECORD_CONTENT VARIANT,   -- Raw event payload\n    INGESTED_AT TIMESTAMP_TZ,\n    BATCH_ID VARCHAR(36)\n);\n\n-- CDC captures changes\nCREATE STREAM STREAM_ORDERS_CHANGES ON TABLE ORDERS_STREAM;`
        }},
        { type: 'image', content: { src: datavelocityImages.CDC, alt: 'CDC Architecture' } },
        { type: 'paragraph', content: 'The result: Sub-5-second ingestion latency. From Bronze onwards, streaming and batch use identical procedures.' },

        { type: 'subheader', content: 'Decision #2: Metadata-Driven Validation Framework' },
        { type: 'paragraph', content: 'Hardcoding validation rules is a death trap. I implemented a configuration-driven framework where adding a new rule is just an INSERT statement.' },
        { type: 'code', content: {
            language: 'sql',
            title: 'Validation Config',
            code: `INSERT INTO COMMON.DQ_CONFIG VALUES (\n    'DQ_ORDER_MAN_ORDER_ID',      -- Rule name\n    'BRONZE.ORDER_BRZ',           -- Table to validate\n    'MANDATORY_CHECK',            -- Validation type\n    'ORDER_ID',                   -- Column to check\n    'ORDER_ID IS NOT NULL',       -- Validation logic\n    'Order ID is mandatory'       -- Error message\n);`
        }},
        { type: 'image', content: { src: datavelocityImages.dq_validation, alt: 'Data Quality Types' } },
        { type: 'paragraph', content: 'Five validation types supported: Mandatory, Value, Lookup, Duplicate, and Custom checks.' },

        { type: 'subheader', content: 'Decision #3: Hash-Based SCD Type 2' },
        { type: 'paragraph', content: 'Traditional SCD Type 2 compares columns one by one. At streaming speeds, this kills performance. My optimization: Compute hash once, compare once.' },
        { type: 'code', content: {
            language: 'sql',
            title: 'Hash-Based Comparison',
            code: `SHA2_HEX(CONCAT_WS('|',\n    COALESCE(src.name, ''),\n    COALESCE(src.email, ''),\n    COALESCE(src.phone, '')\n)) AS CURRENT_HASH`
        }},
        { type: 'image', content: { src: datavelocityImages.hash_based_scd_type_2, alt: 'Hash Based SCD2' } },

        { type: 'subheader', content: 'Decision #4: Transactional Bronze with Indefinite Replay' },
        { type: 'paragraph', content: 'Kafka\'s retention is finite. Bronze tables should be immutable and retained forever. I store both transformed and raw values for indefinite replayability.' },

        { type: 'subheader', content: 'Decision #5: Unified Status Tracking' },
        { type: 'paragraph', content: 'My design tracks every status transition regardless of source (CSV or Kafka) in a dedicated history table.' },
        { type: 'image', content: { src: datavelocityImages.status_tracking, alt: 'Status Tracking' } },

        { type: 'header', id: 'outcomes', content: 'What This Architecture Delivered' },
        { type: 'metrics', content: [
            { label: 'Latency', value: '< 15s', icon: '⚡' },
            { label: 'Code Reuse', value: '100%', icon: '♻️' },
            { label: 'Data Quality', value: '95%+', icon: '✅' }
        ]},
        { type: 'list', content: { ordered: false, items: [
            'No logic duplication - One SP handles both CSV and Kafka',
            '~2 second batch processing - 5,000 records through all layers',
            '100% traceability - Every record tracked via INGEST_RUN_ID',
            'Indefinite replay - Bronze retained forever'
        ]}},

        { type: 'header', id: 'advanced', content: 'Advanced Features' },
        { type: 'image', content: { src: datavelocityImages.advanced_features, alt: 'Advanced Features' } },

        { type: 'subheader', content: 'Feature #1: Metadata-Driven Ingestion' },
        { type: 'paragraph', content: 'Adding a new entity means inserting configuration rows - no code required.' },
        { type: 'image', content: { src: datavelocityImages.metadata_tables, alt: 'Metadata Tables' } },

        { type: 'subheader', content: 'Feature #2: Advanced Monitoring & SLA Tracking' },
        { type: 'paragraph', content: 'Comprehensive monitoring framework with SLA tracking and automated alerting.' },
        { type: 'image', content: { src: datavelocityImages.sla_complience, alt: 'SLA Compliance' } },
        { type: 'image', content: { src: datavelocityImages.alert, alt: 'Alerts' } },

        { type: 'subheader', content: 'Feature #3: Auto-Recovery' },
        { type: 'paragraph', content: 'Intelligent retry logic with exponential backoff and Dead Letter Queues.' },
        { type: 'image', content: { src: datavelocityImages.dead_letter_queue, alt: 'Dead Letter Queue' } },

        { type: 'subheader', content: 'Feature #4: Dashboard & Analytics' },
        { type: 'image', content: { src: datavelocityImages.pipeline_overview, alt: 'Pipeline Overview' } },
        { type: 'twoColumn', content: {
            left: { type: 'image', content: { src: datavelocityImages.customer_pipeline_overview, alt: 'Customer Overview' } },
            right: { type: 'image', content: { src: datavelocityImages.revenue_analytics, alt: 'Revenue Analytics' } }
        }},

        { type: 'header', id: 'tech', content: 'Tech Stack' },
        { type: 'image', content: { src: datavelocityImages.core_technology, alt: 'Core Tech' } },
        { type: 'list', content: { ordered: false, items: [
            'Data Warehouse: Snowflake (Multi-cluster compute)',
            'Streaming: Apache Kafka 3.x + Snowpipe Streaming',
            'Orchestration: Snowflake Native (Streams + Tasks)',
            'Development: SQL, Python, Streamlit'
        ]}},

        { type: 'header', id: 'learned', content: 'What I Learned (The Hard Way)' },
        { type: 'list', content: { ordered: true, items: [
            'Lambda Architecture isn\'t about two pipelines. It\'s about unified transformation logic.',
            'SCD Type 2 at streaming speeds requires surgical optimization.',
            'Data Quality can\'t be an afterthought.',
            'Observability is non-negotiable.'
        ]}},

        { type: 'header', id: 'connect', content: 'Let\'s Connect' },
        { type: 'paragraph', content: 'If you\'re building data platforms, dealing with Lambda Architecture complexity, or evaluating engineering candidates, I\'d love to discuss.' },
        { type: 'callout', content: {
            title: 'Explore the Code',
            text: 'The full implementation is available on GitHub.',
            icon: '💻',
            color: 'blue'
        }},
        { type: 'paragraph', content: 'Check out the repo: https://github.com/Pathakdarshan12/DataVelocity-metadata-driven-lambda-platform' }
    ]
  },
  {
    id: 'b2',
    slug: 'dbt-incremental-models-can-quietly-break-your-data',
    title: 'dbt Incremental Models Can Quietly Break Your Data',
    date: 'January 07, 2026',
    category: 'Analytics Engineering',
    excerpt: 'Strategies for managing isolated client data while maintaining a dry codebase in large scale Snowflake deployments.',
    content: 'Full content here...',
    tags: ['dbt', 'Snowflake', 'SaaS'],
    readingTime: '8 min',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    featured: false,
    author: {
      name: 'Darshan Pathak',
      role: 'Data Quality Analyst',
      avatar: avatar,
      linkedin: 'https://linkedin.com/in/pathakdarshan12'
    },
    structuredContent: [
        { type: 'quote', content: { text: 'The worst data bugs are the ones you discover too late.', type: 'warning' } },
        { type: 'header', id: 'simple', content: "Let's Start Simple: What Even Is Incremental Loading?" },
        { type: 'paragraph', content: 'Imagine you have a giant notebook where you write down every customer order. Every day, you need to update your master list.' },
        { type: 'subheader', content: 'Option 1: Full Refresh (The Safe Way)' },
        { type: 'list', content: { ordered: false, items: ['Erase your entire master list', 'Copy everything from the notebook again', 'Takes forever, but you know it\'s correct'] } },
        { type: 'subheader', content: 'Option 2: Incremental (The Fast Way)' },
        { type: 'list', content: { ordered: false, items: ['Only copy the new orders since yesterday', 'Much faster, uses less resources', 'But... what if you miss something?'] } },

        { type: 'image', content: { src: incrementalloadImages.incremental_strategy, alt: 'Incremental Statergy' } },
        { type: 'header', id: 'why-good', content: 'Why Incremental Models Look So Good' },
        { type: 'paragraph', content: 'When you first learn about incremental models, they seem amazing. Instead of rebuilding entire tables every time, you only process new data. Your pipelines run faster. Your cloud costs drop. Everyone\'s happy.' },
        { type: 'code', content: { language: 'sql', code: `{{ config(\n    materialized='incremental',\n    unique_key='order_id'\n) }}\n\nselect * from {{ source('raw', 'orders') }}\n\n{% if is_incremental() %}\n    where created_at >= (select max(created_at) from {{ this }})\n{% endif %}` } },
        { type: 'paragraph', content: "But here's the catch: When it breaks, it breaks silently." },

        { type: 'header', id: 'failures', content: 'Four Ways Incremental Models Fail Silently' },
        { type: 'image', content: { src: incrementalloadImages.incremental_load, alt: 'Incremental Models' } },

        // 1. Schema Changes
        { type: 'subheader', id: 'schema', content: "1. Schema Changes You Don't Notice" },
        { type: 'paragraph', content: 'Imagine this: Your source system adds a new column called discount_amount. Your incremental model keeps running every hour. Everything shows green. Dashboards look fine.' },
        { type: 'paragraph', content: 'But now you have a problem. All records loaded before the new column have no discount data. All records loaded after have it. Your table is split—half complete, half incomplete.' },
        { type: 'callout', content: { title: 'Danger', text: "Why you won't notice: The model doesn't fail. It keeps adding data to your existing table, just ignoring the new column. Your data checks might never catch this because nothing technically broke. You just stopped capturing important business information.", icon: '🚨', color: 'rose' } },

        // 2. Duplicate Records
        { type: 'subheader', id: 'duplicates', content: "2. Duplicate Records Everywhere" },
        { type: 'paragraph', content: "This is the worst failure. Your unique_key isn't actually unique." },
        { type: 'code', content: { language: 'sql', code: `{{ config(\n    materialized='incremental',\n    unique_key='user_id',  -- WRONG!\n    incremental_strategy='append'\n) }}` } },
        { type: 'paragraph', content: "You're tracking user events, but you used user_id as the unique key with append strategy. Every time the same user creates an event, you append it. User #1234 creates 50 events? You now have 50 rows with user_id=1234." },
        { type: 'callout', content: { title: 'Danger', text: "Why you won't notice: Both queries return reasonable-looking numbers. The problem only shows up with certain types of counting. By the time someone notices, you have months of bad data.", icon: '🚨', color: 'rose' } },

        // 3. Late Data
        { type: 'subheader', id: 'late-data', content: "3. Late Data That Never Gets Loaded" },
        { type: 'paragraph', content: "Data doesn't arrive in order. An event from yesterday might show up today. A correction from last month might arrive now." },
        { type: 'code', content: { language: 'sql', code: `{% if is_incremental() %}\n    where created_at > (select max(created_at) from {{ this }})\n{% endif %}` } },
        { type: 'paragraph', content: "This filter assumes data arrives in order. It doesn't. When a late record arrives with created_at = '2024-01-15' and your table already has data through 2024-01-20, this record gets filtered out. Forever." },
        { type: 'callout', content: { title: 'Danger', text: "Why you won't notice: No errors. No warnings. Just missing data. Unless you're checking against the source, you'll never know those records disappeared.", icon: '🚨', color: 'rose' } },

        // 4. Partial Loads
        { type: 'subheader', id: 'partial', content: "4. Partial Loads That Leave Gaps" },
        { type: 'paragraph', content: "Incremental runs aren't all-or-nothing by default. If your job processes 1 million records and crashes at record 750,000, you've loaded 750,000 records and lost 250,000." },
        { type: 'callout', content: { title: 'Danger', text: "Why you won't notice: Your system marks the run as 'failed,' someone reruns it, it succeeds, everyone moves on. But there's now a permanent gap in your data that nobody knows about.", icon: '🚨', color: 'rose' } },

        { type: 'header', id: 'protection', content: 'How to Actually Protect Your Data' },

        { type: 'subheader', content: 'Rule #1: Do Full Refreshes Regularly Anyway' },
        { type: 'paragraph', content: 'Even with perfect logic, small errors compound over time. Schedule a complete rebuild:' },
        { type: 'list', content: { ordered: false, items: ['Weekly for critical tables', 'Monthly for everything else', 'During low-usage hours (weekends, nights)'] } },

        { type: 'subheader', content: 'Rule #2: Count Everything, Every Time' },
        { type: 'paragraph', content: 'After every incremental run, compare counts:' },
        { type: 'code', content: { language: 'sql', code: `-- Source count\nSELECT COUNT(*) FROM source_orders;\n-- Result: 1,000,500\n\n-- Target count\nSELECT COUNT(*) FROM warehouse_orders;\n-- Result: 1,000,350\n\n-- You're missing 150 records. Why?` } },

        { type: 'subheader', content: 'Rule #3: Reload Recent Data on Every Run' },
        { type: 'paragraph', content: 'Instead of only grabbing "new" data, grab new data plus the last few days:' },
        { type: 'code', content: { language: 'sql', code: `WHERE created_date >= (\n  SELECT MAX(created_date) - 3 days\n  FROM warehouse_table\n)` } },
        { type: 'list', content: { ordered: false, items: ['Catches late-arriving data', 'Fixes records that were corrected in the source', 'Gives you a safety buffer for weird edge cases'] } },

        { type: 'subheader', content: 'Rule #4: Your Unique Key Better Actually Be Unique' },
        { type: 'code', content: { language: 'sql', code: `SELECT\n  order_id,\n  COUNT(*) as how_many_times\nFROM source_orders\nGROUP BY order_id\nHAVING COUNT(*) > 1;` } },

        { type: 'subheader', content: 'Rule #5: Make Schema Changes Loud' },
        { type: 'code', content: { language: 'yaml', code: `config:\n  materialized: incremental\n  unique_key: order_id\n  on_schema_change: fail` } },

        { type: 'subheader', content: 'Rule #6: Don\'t Use Incremental Loading Unless You Really Need It' },
        { type: 'paragraph', content: 'Honest question: How big is your table?' },
        { type: 'list', content: { ordered: false, items: ['Under 1 million rows? Just rebuild it every time.', 'Under 10 million rows? Rebuild it.', 'Under 50 million rows? Seriously consider rebuilding it.'] } },

        { type: 'header', id: 'summary', content: 'The Bottom Line' },
        { type: 'paragraph', content: 'Incremental loading is a trade-off:' },
        { type: 'twoColumn', content: {
            left: { type: 'list', content: { ordered: false, items: ['Faster pipelines', 'Lower compute costs', 'Less storage usage'] } },
            right: { type: 'list', content: { ordered: false, items: ['Silent data corruption', 'Missing records', 'Duplicate data', 'Months of wrong decisions'] } }
          }
        },
        { type: 'quote', content: { text: 'Build defensively. Test obsessively. Trust nothing.', type: 'info' } }
    ]
  },
  {
    id: 'b3',
    slug: 'dbt-healthcare-row-level-security-snowflake',
    title: 'dbt in Healthcare: How I Enforced Row-Level Security in Snowflake to Prevent Cross-Hospital Data Leaks',
    date: 'January 27, 2026',
    category: 'Analytics Engineering',
    excerpt: 'Building a multi-tenant SaaS analytics platform with database-enforced tenant isolation. How I automated RLS across 50+ dbt models to guarantee zero cross-hospital data leakage in production.',
    content: 'Legacy markdown fallback...',
    tags: ['dbt', 'snowflake', 'RLS', 'multi-tenancy', 'healthcare', 'HIPAA', 'security'],
    readingTime: '18 min',
    image: isometricsImages.multitenency,
    featured: true,
    author: {
      name: 'Darshan Pathak',
      role: 'Data Quality Analyst',
      avatar: avatar,
      linkedin: 'https://linkedin.com/in/pathakdarshan12'
    },
    structuredContent: [
      { type: 'header', id: 'rls-matters', content: 'Why RLS Matters: One Leaked Row Can Kill Your Platform' },

      { type: 'subheader', id: 'danger', content: 'The Danger of Multi-Tenant Systems' },
      { type: 'paragraph', content: 'All customers share the same tables. Hospital A\'s data sits in the same `encounters` table as Hospital B\'s data. You separate them with a `hospital_id` column. That\'s it. One table, 50 tenants, millions of rows mixed together.' },
      { type: 'paragraph', content: 'The entire system relies on never showing Hospital A any row where `hospital_id = \'HOSPITAL_B\'`.' },
      { type: 'paragraph', content: 'Most platforms handle this with `WHERE hospital_id = {current_user_hospital}` filters in their application layer or dbt models. This is not security. This is a suggestion.' },

      { type: 'subheader', id: 'first-leak', content: 'The First Leak is Never "Minor"' },
      { type: 'paragraph', content: 'When someone discovers they can see another tenant\'s data—even one row—it proves:' },
      { type: 'list', content: { ordered: false, items: [
        'Tenant isolation isn\'t guaranteed. If it leaked once, it can leak again.',
        'The security model has gaps. Which other gaps exist?',
        'Trust evaporates instantly. Would you trust a bank that "accidentally" showed you someone else\'s account?'
      ]}},
      { type: 'paragraph', content: 'In healthcare specifically, one leaked row can expose:' },
      { type: 'list', content: { ordered: false, items: [
        'Patient identifiers (Medical Record Numbers)',
        'Diagnosis codes (status, mental health conditions)',
        'Admission dates (when someone was hospitalized)',
        'Financial data (insurance, charges)'
      ]}},
      { type: 'paragraph', content: 'That\'s not "oops, sorry" territory. That\'s breach notification letters, regulatory investigations, and contract terminations.' },

      { type: 'subheader', id: 'common-causes', content: 'Common Causes of the First Leak' },
      { type: 'paragraph', content: '1. Relying on WHERE filters' },
      { type: 'code', content: {
        language: 'sql',
        title: 'This is NOT security',
        code: `SELECT * FROM encounters \nWHERE hospital_id = 'HOSP_001'`
      }},
      { type: 'paragraph', content: 'What happens when:' },
      { type: 'list', content: { ordered: false, items: [
        'Someone queries the table directly?',
        'A junior engineer forgets the filter?',
        'A JOIN accidentally drops the condition?'
      ]}},

      { type: 'paragraph', content: '2. dbt Security Drift' },
      { type: 'paragraph', content: 'You create 50 models. All have proper filters. Then:' },
      { type: 'list', content: { ordered: false, items: [
        'Engineer creates model #51, forgets the filter',
        'CI tests pass (tests don\'t check isolation)',
        'Deploy happens',
        'Leak exists in production'
      ]}},

      { type: 'subheader', content: 'The Correct Answer: Enforcement at the Database Layer' },
      { type: 'paragraph', content: 'Filters are suggestions. Row-Level Security is enforcement.' },
      { type: 'paragraph', content: 'This is the foundation everything else builds on.' },

      { type: 'header', id: 'key-concepts', content: 'Key Concepts Explained' },
      { type: 'list', content: { ordered: false, items: [
        'Multi-tenancy: One software system serves many customers (tenants) using shared infrastructure. Like an apartment building—many tenants, one building, separate spaces.',
        'Tenant isolation: Each customer\'s data stays completely separated from other customers\' data. Hospital A cannot see Hospital B\'s patients, ever.',
        'HIPAA (Health Insurance Portability and Accountability Act): A US healthcare privacy law that sets strict rules for protecting patient data. Breaking HIPAA can lead to heavy fines and legal trouble.',
        'PHI (Protected Health Information): Medical data covered by HIPAA regulations. Patient names, diagnoses, dates of service, medical record numbers. Leaking PHI = serious legal consequences.',
        'RLS (Row-Level Security): Database-level security that automatically filters rows based on who\'s querying. Snowflake says "you can only see rows that belong to you" before the data even leaves the database.',
        'dbt models: SQL transformations that build data tables. Instead of manually running CREATE TABLE … SELECT …, you write SQL in files and dbt handles the execution, testing, and documentation.',
        'CI pipeline (Continuous Integration): Automated testing that runs every time code changes. Before merging your PR, robots run 250+ tests to ensure nothing breaks.'
      ]}},

      { type: 'header', id: 'where-filters', content: 'The Real Problem with WHERE Filters' },
      { type: 'image', content: { src: isometricsImages.filter_vs_rls, alt: 'Filter vs RLS' } },
      { type: 'paragraph', content: 'Most platforms secure multi-tenant data like this:' },
      { type: 'code', content: {
        language: 'sql',
        code: `WHERE hospital_id = session.current_hospital`
      }},
      { type: 'paragraph', content: 'This breaks in real life for three reasons:' },

      { type: 'subheader', content: 'Example 1: The Forgotten Filter' },
      { type: 'code', content: {
        language: 'sql',
        title: 'Engineer writes a new dashboard query',
        code: `SELECT \n  COUNT(*) as total_readmissions,\n  AVG(length_of_stay) as avg_los\nFROM encounters\nWHERE is_readmission = TRUE\n-- Oops, forgot WHERE hospital_id = X\n-- Query shows ALL hospitals aggregated together`
      }},
      { type: 'paragraph', content: 'Data from Hospital A leaks into Hospital B\'s dashboard. Nobody notices until an audit.' },

      { type: 'subheader', content: 'Example 2: The Drift Over Time' },
      { type: 'list', content: { ordered: false, items: [
        'Month 1: 20 dbt models, all have proper filters',
        'Month 6: 50 models',
        'Month 12: 100 models'
      ]}},
      { type: 'paragraph', content: 'Someone creates `fct_clinical_alerts.sql`. They copy-paste from an old model. That old model predated the security requirements. No `hospital_id` filter. Leak in production.' },

      { type: 'subheader', content: 'Why Enforcement Beats Filtering' },
      { type: 'paragraph', content: 'With Row-Level Security at the database layer:' },
      { type: 'code', content: {
        language: 'sql',
        code: `-- Engineer writes sloppy query:\nSELECT * FROM encounters;\n\n-- Snowflake intercepts and rewrites it to:\nSELECT * FROM encounters \nWHERE hospital_id IN (\n  SELECT hospital_id \n  FROM user_hospital_mapping \n  WHERE user_name = CURRENT_USER()\n);`
      }},
      { type: 'paragraph', content: 'The database enforces isolation. Not the application. Not the engineer\'s memory. The database.' },
      { type: 'paragraph', content: 'Even if someone hacks into Snowflake directly and runs raw SQL, they still can\'t see other hospitals\' data. That\'s enforcement.' },

      { type: 'header', id: 'what-built', content: 'What I Built: One Platform, Many Hospitals' },
      { type: 'image', content: { src: isometricsImages.multitenency, alt: 'Multi-tenancy Architecture' } },
      { type: 'paragraph', content: 'IsoMetrics Healthcare is a multi-tenant SaaS analytics platform for hospital performance monitoring. Think: "Salesforce analytics for hospitals."' },
      { type: 'list', content: { ordered: false, items: [
        'Scale: 50 hospital tenants, 3M+ encounters, 500K+ transactions',
        'Architecture: Medallion (Bronze → Silver → Gold) with 50+ dbt models',
        'Security: Snowflake RLS + HIPAA audit trail',
        'Operations: Streamlit monitoring, GitHub Actions CI/CD',
        'Requirements: Zero cross-tenant leakage, 4-hour freshness SLA, per-tenant cost tracking'
      ]}},

      { type: 'header', id: 'architecture', content: 'Architecture Walk-through: Medallion + Security + Monitoring' },
      { type: 'image', content: { src: isometricsImages.architecture, alt: 'Architecture Overview' } },
      { type: 'image', content: { src: isometricsImages.healthcare_flowchart, alt: 'Healthcare Flowchart' } },
      { type: 'subheader', content: 'Key Points' },
      { type: 'list', content: { ordered: true, items: [
        'Every schema has RLS applied - from raw data to final marts',
        '`hospital_id` is the isolation key - present in every table',
        'Audit schema tracks everything - who accessed what, when',
        'Monitoring sits on top - real-time SLA/quality/cost visibility'
      ]}},

      { type: 'header', id: 'rls-snowflake', content: 'RLS in Snowflake: The "Easy" Part' },
      { type: 'paragraph', content: 'Snowflake Row-Level Security works like this:' },

      { type: 'subheader', content: 'Step 1: Create a Mapping Table' },
      { type: 'code', content: {
        language: 'sql',
        code: `CREATE TABLE user_hospital_mapping (\n  user_name VARCHAR,\n  hospital_id VARCHAR,\n  access_reason VARCHAR\n);\n\nINSERT INTO user_hospital_mapping VALUES\n  ('analyst@hospital-a.com', 'HOSP_001', 'Employee'),\n  ('analyst@hospital-b.com', 'HOSP_002', 'Employee'),\n  ('admin@platform.com', 'ALL', 'Platform Admin');`
      }},
      { type: 'paragraph', content: 'This defines: who can see which hospital\'s data.' },

      { type: 'subheader', content: 'Step 2: Create the RLS Policy' },
      { type: 'code', content: {
        language: 'sql',
        code: `CREATE ROW ACCESS POLICY hospital_isolation_policy\nAS (hospital_id VARCHAR) RETURNS BOOLEAN ->\n  CASE\n    -- Admins see everything\n    WHEN CURRENT_ROLE() = 'ACCOUNTADMIN' THEN TRUE\n    \n    -- Regular users see only their hospital\n    WHEN EXISTS (\n      SELECT 1 FROM user_hospital_mapping\n      WHERE user_name = CURRENT_USER()\n        AND hospital_id = hospital_id -- the row's hospital_id\n    ) THEN TRUE\n    \n    -- Default deny\n    ELSE FALSE\n  END;`
      }},
      { type: 'paragraph', content: 'What this does:' },
      { type: 'list', content: { ordered: false, items: [
        'Checks who is querying (CURRENT_USER())',
        'Looks them up in user_hospital_mapping',
        'Returns TRUE only for rows matching their allowed hospital_id',
        'Default deny: if not explicitly allowed, block the row'
      ]}},

      { type: 'subheader', content: 'Step 3: Apply Policy to Tables' },
      { type: 'code', content: {
        language: 'sql',
        code: `ALTER TABLE encounters \n  ADD ROW ACCESS POLICY hospital_isolation_policy \n  ON (hospital_id);\n\nALTER TABLE patients \n  ADD ROW ACCESS POLICY hospital_isolation_policy \n  ON (hospital_id);`
      }},
      { type: 'paragraph', content: 'Now when anyone queries those tables, Snowflake automatically filters rows based on the policy.' },

      { type: 'paragraph', content: 'Example:' },
      { type: 'code', content: {
        language: 'sql',
        code: `-- User: analyst@hospital-a.com\nSELECT * FROM encounters;\n\n-- Snowflake internally rewrites this to:\nSELECT * FROM encounters\nWHERE hospital_id IN (\n  SELECT hospital_id FROM user_hospital_mapping\n  WHERE user_name = 'analyst@hospital-a.com'\n);\n-- Returns only HOSP_001 rows`
      }},
      { type: 'paragraph', content: 'The power: even if the analyst runs SELECT * with no filters, they only see their hospital. The database enforces it.' },

      { type: 'subheader', content: 'This is the "Easy" Part' },
      { type: 'paragraph', content: 'Creating one policy and applying it to one table is straightforward. The hard part comes when you have:' },
      { type: 'list', content: { ordered: false, items: [
        '50+ dbt models generating new tables constantly',
        'Models created by different engineers over months',
        'Incremental materializations that rebuild tables',
        'CI/CD pipelines creating temporary schemas'
      ]}},
      { type: 'paragraph', content: 'How do you guarantee every model, everywhere, always has RLS applied?' },
      { type: 'paragraph', content: 'That\'s where most platforms fail.' },

      { type: 'header', id: 'dbt-hard', content: 'Where It Gets Hard: dbt + Multi-Tenancy' },
      { type: 'paragraph', content: 'dbt is a transformation framework. You write SQL models like this:' },
      { type: 'code', content: {
        language: 'sql',
        title: 'models/marts/fct_encounters.sql',
        code: `SELECT \n  encounter_id,\n  hospital_id,\n  patient_id,\n  admission_date,\n  length_of_stay\nFROM {{ ref('stg_encounters') }}\nWHERE discharge_date IS NOT NULL`
      }},
      { type: 'paragraph', content: 'dbt runs this SQL and creates a table `fct_encounters` in Snowflake.' },
      { type: 'paragraph', content: 'The problem: dbt creates tables. RLS policies apply to tables. Who ensures the policy gets applied?' },

      { type: 'subheader', content: 'Why dbt Increases RLS Risk' },
      { type: 'image', content: { src: isometricsImages.rls_breaks, alt: 'RLS Breaking Scenarios' } },
      { type: 'paragraph', content: 'Risk 1: New models forget RLS' },
      { type: 'paragraph', content: 'Engineer creates `fct_provider_performance.sql`. They test it. It works. They merge the PR. It deploys.' },
      { type: 'paragraph', content: 'Nobody remembered to apply the RLS policy to `fct_provider_performance`. Leak exists in production.' },

      { type: 'paragraph', content: 'Risk 2: Incremental models recreate tables' },
      { type: 'code', content: {
        language: 'sql',
        title: 'models/marts/fct_encounters.sql',
        code: `{{ config(\n  materialized='incremental',\n  unique_key='encounter_id'\n) }}`
      }},
      { type: 'paragraph', content: 'When dbt runs incrementally, it sometimes recreates the entire table (depending on schema changes). When the table is recreated, Snowflake drops the RLS policy. You have to reapply it.' },
      { type: 'paragraph', content: 'If you forget? Leak.' },

      { type: 'paragraph', content: 'Risk 3: dbt security drift over time' },
      { type: 'list', content: { ordered: false, items: [
        'Month 1: 20 models, all have RLS',
        'Month 3: 35 models, 2 missing RLS (nobody noticed)',
        'Month 6: 50 models, 5 missing RLS',
        'Month 12: 100 models, 15 missing RLS'
      ]}},
      { type: 'paragraph', content: 'Security degrades silently because there\'s no enforcement mechanism.' },

      { type: 'subheader', content: 'The Manual Approach Fails' },
      { type: 'paragraph', content: '"Just remember to apply RLS after creating each model."' },
      { type: 'paragraph', content: 'This doesn\'t scale. Engineers forget. New hires don\'t know the rule. Automated dbt runs don\'t include manual steps.' },
      { type: 'paragraph', content: 'You need automation that makes it impossible to deploy a model without RLS.' },

      { type: 'header', id: 'clean-implementation', content: 'Snowflake RLS: The Clean Implementation' },

      { type: 'subheader', content: 'Step 1: Mapping Table (Who Can See What)' },
      { type: 'code', content: {
        language: 'sql',
        code: `CREATE OR REPLACE TABLE security.user_hospital_mapping (\n  user_name STRING,\n  hospital_id STRING,\n  access_reason STRING\n);\n\nINSERT INTO security.user_hospital_mapping VALUES\n  ('analyst@hospital-a.com', 'HOSP_001', 'Hospital Employee'),\n  ('analyst@hospital-b.com', 'HOSP_002', 'Hospital Employee');`
      }},
      { type: 'paragraph', content: 'This is the simplest, most auditable foundation: explicit allow list.' },

      { type: 'subheader', content: 'Step 2: Row Access Policy (Default Deny)' },
      { type: 'paragraph', content: 'This version is intentionally written to avoid ambiguous naming:' },
      { type: 'code', content: {
        language: 'sql',
        code: `CREATE OR REPLACE ROW ACCESS POLICY security.hospital_isolation_policy\nAS (row_hospital_id STRING)\nRETURNS BOOLEAN ->\n  EXISTS (\n    SELECT 1\n    FROM security.user_hospital_mapping m\n    WHERE m.user_name = CURRENT_USER()\n      AND m.hospital_id = row_hospital_id\n  );`
      }},
      { type: 'paragraph', content: 'Why this is correct:' },
      { type: 'list', content: { ordered: false, items: [
        '`row_hospital_id` clearly represents the table row\'s tenant',
        'No accidental `hospital_id = hospital_id` logic',
        'Users only see rows they are mapped to'
      ]}},

      { type: 'subheader', content: 'Step 3: Apply to Tenant-Scoped Tables' },
      { type: 'code', content: {
        language: 'sql',
        code: `ALTER TABLE marts.encounters\n  ADD ROW ACCESS POLICY security.hospital_isolation_policy\n  ON (hospital_id);\n\nALTER TABLE marts.patients\n  ADD ROW ACCESS POLICY security.hospital_isolation_policy\n  ON (hospital_id);`
      }},
      { type: 'paragraph', content: 'Now tenant isolation is enforced at query time for every user.' },

      { type: 'header', id: 'real-challenge', content: 'The Real Challenge: dbt + RLS = Policy Drift' },
      { type: 'paragraph', content: 'RLS is easy to apply to 2 tables.' },
      { type: 'paragraph', content: 'The real issue is scale:' },
      { type: 'list', content: { ordered: false, items: [
        '50+ dbt models',
        'New models every week',
        'Incremental rebuilds',
        'CI schemas and preview environments'
      ]}},
      { type: 'paragraph', content: 'This is where systems fail:' },
      { type: 'list', content: { ordered: false, items: [
        'A new table ships without RLS',
        'A rebuild drops security',
        'Nobody notices until leakage happens'
      ]}},
      { type: 'paragraph', content: 'So I removed the human step entirely.' },

      { type: 'header', id: 'enforced-rls', content: 'How I Enforced RLS Across All dbt Models (Automatic + Safe)' },
      { type: 'image', content: { src: isometricsImages.rls, alt: 'RLS Implementation' } },

      { type: 'subheader', content: 'Step 1: dbt Macro That Applies RLS Only When Needed' },
      { type: 'code', content: {
        language: 'sql',
        title: 'macros/apply_rls_policy.sql',
        code: `{% macro apply_rls_policy() %}\n  {% set policy_name = target.database ~ '.raw_phi.hospital_isolation_policy' %}\n\n  {% set apply_policy_sql %}\n    ALTER TABLE {{ this }}\n    ADD ROW ACCESS POLICY {{ policy_name }} ON (hospital_id);\n  {% endset %}\n\n  {% if execute %}\n    {% do run_query(apply_policy_sql) %}\n    {% do log("RLS policy: " ~ policy_name ~ " applied successfully to " ~ this, info=True) %}\n  {% endif %}\n{% endmacro %}`
      }},
      { type: 'paragraph', content: 'What this solves:' },
      { type: 'list', content: { ordered: false, items: [
        'Tenant-scoped tables always get RLS',
        'Non-tenant reference tables don\'t error (ICD codes, CPT codes, etc.)',
        'No "remember to apply security" step exists anymore'
      ]}},

      { type: 'subheader', content: 'Step 2: Apply It by Default Across the Whole Project' },
      { type: 'code', content: {
        language: 'yaml',
        title: 'dbt_project.yml',
        code: `models:\n  isometrics_healthcare:\n    staging:\n      +post_hook: ["{{ apply_rls_policy() }}"]\n    intermediate:\n      +post_hook: ["{{ apply_rls_policy() }}"]\n    marts:\n      +post_hook: ["{{ apply_rls_policy() }}"]`
      }},
      { type: 'paragraph', content: 'Result:' },
      { type: 'list', content: { ordered: true, items: [
        'Engineer creates a new model',
        'dbt builds it',
        'Post-hook enforces RLS'
      ]}},
      { type: 'paragraph', content: 'No PR can accidentally introduce an unsecured tenant table.' },

      { type: 'header', id: 'leak-proof-ci', content: 'Leak-Proof CI: Testing Like an Attacker' },
      { type: 'image', content: { src: isometricsImages.cicd, alt: 'CI/CD Pipeline' } },
      { type: 'paragraph', content: 'CI (Continuous Integration) is your safety net. Before code reaches production, robots run tests to find bugs.' },
      { type: 'paragraph', content: 'For multi-tenant systems, CI must test like an attacker trying to steal data.' },

      { type: 'subheader', content: 'The CI Pipeline Structure' },
      { type: 'paragraph', content: 'Step 1: Every PR gets an isolated schema' },
      { type: 'code', content: {
        language: 'yaml',
        title: '.github/workflows/dbt_ci.yml',
        code: `env:\n  CI_SCHEMA: dbt_ci_{{ github.event.pull_request.number }}`
      }},
      { type: 'list', content: { ordered: false, items: [
        'PR #47 runs in schema `dbt_ci_47`',
        'PR #48 runs in schema `dbt_ci_48`'
      ]}},
      { type: 'paragraph', content: 'Why isolation matters:' },
      { type: 'list', content: { ordered: false, items: [
        'Tests don\'t interfere with each other',
        'You can test dangerous scenarios safely',
        'Cost control: destroy schema after tests pass'
      ]}},

      { type: 'paragraph', content: 'Step 2: Load synthetic data' },
      { type: 'code', content: {
        language: 'sql',
        code: `-- CI loads test data with known cross-tenant scenarios\nINSERT INTO raw_encounters VALUES\n  ('ENC_001', 'HOSP_001', 'PAT_001', …), -- Hospital A\n  ('ENC_002', 'HOSP_002', 'PAT_002', …); -- Hospital B`
      }},

      { type: 'paragraph', content: 'Step 3: Run dbt' },
      { type: 'code', content: {
        language: 'bash',
        code: `dbt run --select staging\ndbt run --select intermediate \ndbt run --select marts`
      }},

      { type: 'paragraph', content: 'Step 4: Run leak detection tests' },
      { type: 'paragraph', content: 'This is where it gets interesting.' },

      { type: 'image', content: { src: isometricsImages.ci_testing, alt: 'CI Testing Process' } },

      { type: 'subheader', content: 'Test 1: Cross-Tenant Leakage Detection' },
      { type: 'code', content: {
        language: 'sql',
        title: 'tests/singular/assert_no_cross_hospital_encounters.sql',
        code: `SELECT\n  e.encounter_id,\n  e.hospital_id AS encounter_hospital,\n  p.hospital_id AS patient_hospital\nFROM {{ ref('stg_encounters') }} e\nJOIN {{ ref('stg_patients') }} p\n  ON e.patient_id = p.patient_id\nWHERE e.hospital_id != p.hospital_id`
      }},
      { type: 'paragraph', content: 'What this catches:' },
      { type: 'list', content: { ordered: false, items: [
        'Hospital A encounter linked to Hospital B patient',
        'Proves tenant boundaries were violated during a JOIN'
      ]}},
      { type: 'paragraph', content: 'If this returns ANY rows, the test fails. Deploy blocked.' },

      { type: 'subheader', content: 'Test 2: RLS Policy Verification' },
      { type: 'code', content: {
        language: 'sql',
        title: 'tests/singular/assert_rls_policy_applied.sql',
        code: `SELECT\n  table_name,\n  'Missing RLS policy' AS error\nFROM information_schema.tables\nWHERE table_schema = 'MARTS'\n  AND table_type = 'BASE TABLE'\n  AND NOT EXISTS (\n    SELECT 1 FROM snowflake.account_usage.policy_references\n    WHERE ref_entity_name = table_name\n      AND policy_name = 'HOSPITAL_ISOLATION_POLICY'\n  )`
      }},
      { type: 'paragraph', content: 'What this catches:' },
      { type: 'list', content: { ordered: false, items: [
        'A new model was created without RLS',
        'RLS was accidentally dropped'
      ]}},
      { type: 'paragraph', content: 'If ANY mart table is missing RLS, deploy blocked.' },

      { type: 'subheader', content: 'Bonus Tests' },
      { type: 'paragraph', content: 'Test 3: Foreign key integrity within tenants' },
      { type: 'list', content: { ordered: false, items: [
        'Hospital A encounter references Hospital B provider',
        'Referential integrity violation across tenant boundaries'
      ]}},
      { type: 'paragraph', content: 'Test 4: Clinical safety rules' },
      { type: 'list', content: { ordered: false, items: [
        'Test data accidentally has a patient receiving a medication they\'re allergic to',
        'Health scores, metrics tests'
      ]}},

      { type: 'paragraph', content: 'Step 5: Teardown (cost control)' },
      { type: 'code', content: {
        language: 'sql',
        code: `-- After tests pass/fail\nDROP SCHEMA IF EXISTS dbt_ci_47 CASCADE;`
      }},
      { type: 'paragraph', content: 'Why this matters:' },
      { type: 'list', content: { ordered: false, items: [
        'CI schemas can accumulate',
        'Each schema costs money if left running',
        'Cleanup after every PR prevents cost bloat'
      ]}},

      { type: 'subheader', content: 'The Result' },
      { type: 'paragraph', content: 'Before code merges:' },
      { type: 'list', content: { ordered: false, items: [
        '250+ tests run',
        'Leakage scenarios tested',
        'RLS verified on all tables',
        'Foreign keys checked',
        'Clinical safety validated'
      ]}},
      { type: 'paragraph', content: 'If ANY test fails, deploy blocked.' },
      { type: 'paragraph', content: 'This is what "leak-proof CI" means. You\'re not hoping security works. You\'re proving it works before production.' },

      { type: 'header', id: 'incremental', content: 'Incremental Models: Performance Without Corruption' },
      { type: 'paragraph', content: 'Let\'s talk about a subtle problem that silently destroys data correctness: wrong incremental strategy.' },

      { type: 'subheader', content: 'What "Incremental" Means' },
      { type: 'code', content: {
        language: 'sql',
        code: `-- Normal dbt model:\n-- Runs every time: DROP TABLE, CREATE TABLE, INSERT ALL DATA\nSELECT * FROM source_table\n\n-- Incremental model:\n-- First run: INSERT ALL DATA\n-- Future runs: INSERT/UPDATE only NEW/CHANGED data\nSELECT * FROM source_table\nWHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})`
      }},
      { type: 'paragraph', content: 'Why incremental matters:' },
      { type: 'list', content: { ordered: false, items: [
        '3M encounters = expensive full refresh every run',
        'Incremental = faster, cheaper, less warehouse load'
      ]}},

      { type: 'subheader', content: 'The Danger: Wrong Strategy Silently Corrupts Data' },
      { type: 'paragraph', content: 'dbt supports multiple incremental strategies:' },

      { type: 'paragraph', content: '1. `append` (add new rows only)' },
      { type: 'list', content: { ordered: false, items: [
        'When to use: Audit logs, event streams (data never changes, only new events arrive)',
        'What breaks: If source data can UPDATE (like billing status changing from "Pending" to "Paid"), append strategy never updates existing rows. You have stale data forever.'
      ]}},

      { type: 'paragraph', content: '2. `delete+insert` (delete partition, insert fresh data)' },
      { type: 'list', content: { ordered: false, items: [
        'When to use: High-volume fact tables where data rarely changes after initial load (encounters, claims)',
        'How it works: (1) Identify changed rows by unique_key (2) Delete those rows (3) Insert fresh versions',
        'Performance: Very fast because it doesn\'t scan the entire table for matches (like MERGE does)'
      ]}},

      { type: 'paragraph', content: '3. `merge` (UPDATE existing, INSERT new)' },
      { type: 'list', content: { ordered: false, items: [
        'When to use: Data that frequently changes (billing transactions changing status, patient demographics updating)',
        'Cost: Slower because Snowflake scans both tables to find matches'
      ]}},
      { type: 'code', content: {
        language: 'sql',
        code: `MERGE INTO target\nUSING source\nON target.id = source.id\nWHEN MATCHED THEN UPDATE SET …\nWHEN NOT MATCHED THEN INSERT …`
      }},

      { type: 'subheader', content: 'The Gotcha I Learned the Hard Way' },
      { type: 'paragraph', content: 'I initially used `append` for billing transactions because "we\'re just adding new billing records."' },
      { type: 'paragraph', content: 'Wrong.' },
      { type: 'paragraph', content: 'Billing records change status: "Pending" → "Paid", "Denied" → "Approved". With `append`, old status never updated. Dashboard showed incorrect payment rates. Silent data corruption.' },
      { type: 'paragraph', content: 'Fix: Switch to `merge` strategy. Now status updates propagate correctly.' },

      { type: 'subheader', content: 'Clustering Matters for Incremental Performance' },
      { type: 'code', content: {
        language: 'sql',
        code: `{{ config(\n  cluster_by=['hospital_id', 'admission_date']\n) }}`
      }},
      { type: 'paragraph', content: 'Why cluster on `hospital_id`:' },
      { type: 'list', content: { ordered: false, items: [
        'Multi-tenant = every query filters by hospital',
        'Clustering puts each hospital\'s data physically together',
        'Snowflake skips irrelevant micro-partitions',
        '10x query speedup on large tables'
      ]}},
      { type: 'paragraph', content: 'Why cluster on date:' },
      { type: 'list', content: { ordered: false, items: [
        'Most queries filter recent data ("last 30 days")',
        'Date clustering = skip old partitions',
        'Incremental runs faster (only scan recent partitions)'
      ]}},

      { type: 'subheader', content: 'Takeaway' },
      { type: 'list', content: { ordered: false, items: [
        '`append` = fastest but dangerous if data updates',
        '`delete+insert` = good balance for mostly-static data',
        '`merge` = slower but required if data changes frequently',
        'Full refresh = too expensive for 3M+ rows'
      ]}},
      { type: 'paragraph', content: 'Choose based on your data\'s behavior, not speed alone.' },

      { type: 'header', id: 'monitoring', content: 'Monitoring: Freshness + Quality + Access + Cost' },
      { type: 'paragraph', content: 'You\'ve built a secure, high-performance multi-tenant platform. How do you know it\'s working?' },

      { type: 'subheader', content: 'The Streamlit Monitoring Dashboard' },
      { type: 'paragraph', content: 'I built a Streamlit dashboard showing:' },

      { type: 'paragraph', content: '1. SLA Freshness' },
      { type: 'code', content: {
        language: 'sql',
        code: `SELECT \n  hospital_id,\n  MAX(loaded_at_timestamp) AS last_load,\n  DATEDIFF('minute', last_load, CURRENT_TIMESTAMP()) AS freshness_minutes\nFROM staging.stg_encounters\nGROUP BY hospital_id`
      }},
      { type: 'paragraph', content: 'SLA target: Data fresh within the tenant requirements.' },
      { type: 'paragraph', content: 'Dashboard shows:' },
      { type: 'list', content: { ordered: false, items: [
        '✅ Compliant: < 240 minutes',
        '⚠️ Warning: 240–360 minutes',
        '🚨 Breach: > 360 minutes'
      ]}},
      { type: 'paragraph', content: 'Why this matters: Stale data hiding behind "pipeline green" is dangerous. Freshness SLA surfaces this immediately.' },

      { type: 'paragraph', content: '2. Data Quality Score' },
      { type: 'code', content: {
        language: 'sql',
        code: `SELECT\n  hospital_id,\n  COUNT(*) AS total_encounters,\n  SUM(CASE WHEN length_of_stay < 0 THEN 1 ELSE 0 END) AS invalid_los,\n  SUM(CASE WHEN discharge_date < admission_date THEN 1 ELSE 0 END) AS invalid_dates,\n  100.0 * (total_encounters - invalid_los - invalid_dates) / total_encounters AS quality_pct\nFROM marts.fct_encounters\nGROUP BY hospital_id`
      }},
      { type: 'paragraph', content: 'Dashboard shows:' },
      { type: 'list', content: { ordered: false, items: [
        'Quality score per hospital',
        'Breakdown of validation failures',
        'Trend over time'
      ]}},
      { type: 'paragraph', content: 'Why this matters: Incremental models can silently accumulate bad data. Quality scoring catches this before users complain.' },

      { type: 'paragraph', content: '3. HIPAA Audit Trail' },
      { type: 'code', content: {
        language: 'sql',
        code: `SELECT\n  access_timestamp,\n  user_name,\n  role_name,\n  phi_tables_accessed,\n  records_accessed,\n  is_unauthorized,\n  compliance_note\nFROM marts.fct_hipaa_audit_trail\nWHERE access_timestamp >= DATEADD('day', -7, CURRENT_DATE())\nORDER BY access_timestamp DESC`
      }},
      { type: 'paragraph', content: 'What this tracks:' },
      { type: 'list', content: { ordered: false, items: [
        'Every query accessing PHI tables',
        'Which user, what role, when',
        'Unauthorized access attempts (blocked by RLS but logged)'
      ]}},
      { type: 'paragraph', content: 'Why this matters: HIPAA requires audit trails. This proves who accessed what patient data and why.' },

      { type: 'paragraph', content: '4. Per-Tenant Cost Attribution' },
      { type: 'code', content: {
        language: 'sql',
        code: `SELECT\n  hospital_id,\n  DATE_TRUNC('day', query_start_time) AS day,\n  SUM(credits_used * 4.0) AS estimated_cost_usd\nFROM snowflake.account_usage.query_history\nWHERE database_name = 'ISOMETRICS_DEV'\n  AND query_text LIKE '%hospital_id%'\nGROUP BY hospital_id, day\nORDER BY day DESC, estimated_cost_usd DESC`
      }},
      { type: 'paragraph', content: 'Dashboard shows:' },
      { type: 'list', content: { ordered: false, items: [
        'Cost per hospital per day',
        'Warehouse usage trends',
        'Expensive queries'
      ]}},
      { type: 'paragraph', content: 'Why this matters: Multi-tenant platforms need fair cost allocation. High-usage hospitals should potentially pay more.' },

      { type: 'subheader', content: 'Real-Time Alerts' },
      { type: 'paragraph', content: 'The dashboard also triggers alerts:' },
      { type: 'code', content: {
        language: 'python',
        code: `# Streamlit alerting logic\nif freshness_minutes > 360:  # 6 hours\n    st.error("🚨 SLA BREACH: Data is 6+ hours stale")\n\nif unauthorized_access_count > 0:\n    st.error("🚨 SECURITY ALERT: Unauthorized PHI access detected")\n\nif quality_score < 95:\n    st.warning("⚠️ DATA QUALITY: Score below 95%")`
      }},
      { type: 'paragraph', content: 'Engineers see these alerts immediately. No waiting for weekly reports to discover problems.' },

      { type: 'header', id: 'tech-stack', content: 'Tech Stack & Performance Optimization' },

      { type: 'subheader', content: 'Core Technologies' },
      { type: 'paragraph', content: 'Data Platform:' },
      { type: 'list', content: { ordered: false, items: [
        'Snowflake: Multi-cluster warehouses (XSMALL for dev, SMALL for prod), time travel, zero-copy cloning',
        'dbt 1.11: Jinja templating, incremental materializations, snapshot histories, macro libraries',
        'Python 3.11: Synthetic data generation with Faker, Pandas for transformations',
        'Streamlit: Real-time monitoring dashboard with Plotly visualizations'
      ]}},

      { type: 'paragraph', content: 'DevOps & CI/CD:' },
      { type: 'list', content: { ordered: false, items: [
        'GitHub Actions: Automated testing on every PR, isolated CI schemas per branch',
        'SnowSQL: Schema provisioning, RLS policy deployment, cleanup automation'
      ]}},

      { type: 'paragraph', content: 'Security & Compliance:' },
      { type: 'list', content: { ordered: false, items: [
        'Snowflake RLS: Database-enforced tenant isolation, policy-based access control',
        'Account Usage Views: HIPAA audit trail construction, query history analysis'
      ]}},

      { type: 'subheader', content: 'Performance Optimization' },
      { type: 'paragraph', content: 'Key strategies:' },
      { type: 'list', content: { ordered: false, items: [
        'Clustering: Clustered fact tables by (hospital_id, admission_date) to speed up tenant + recent-date queries',
        'Incremental models: Used the right strategy per table (append for logs, delete+insert for stable high-volume tables, merge for frequently updated tables)',
        'Warehouse sizing: Enabled auto-suspend/auto-resume and used smaller warehouses for dev/CI to control compute cost',
        'Query tuning: Filtered by tenant + date early (before joins) to reduce scanned data and improve join performance'
      ]}},

      { type: 'header', id: 'learned', content: 'What I Learned' },
      { type: 'list', content: { ordered: false, items: [
        'RLS can vanish: dbt table recreation can drop Snowflake RLS silently, so I reapply it using post-hooks',
        'Wrong incremental strategy breaks data: Using append for changing records caused stale statuses, so I switched to merge for correctness',
        'CI must catch leakage: Tests should validate no cross-tenant joins, not just "table exists"',
        'Green pipeline ≠ fresh data: Added freshness/SLA checks to detect stale loads early'
      ]}},

      { type: 'header', id: 'real-world', content: 'Why This Matters for Real-World Systems' },
      { type: 'paragraph', content: 'This architecture pattern applies beyond healthcare analytics:' },

      { type: 'subheader', content: '1. Multi-Tenant SaaS Platforms (Salesforce, Workday, etc.)' },
      { type: 'list', content: { ordered: false, items: [
        'Same isolation requirements (customer A can\'t see customer B)',
        'Same RLS enforcement needs',
        'Same CI testing complexity'
      ]}},

      { type: 'subheader', content: '2. Financial Data Platforms (FinTech, Banking)' },
      { type: 'list', content: { ordered: false, items: [
        'Account-level isolation instead of hospital-level',
        'Similar audit trail requirements (SOC 2, PCI-DSS)',
        'Similar cost attribution needs'
      ]}},

      { type: 'subheader', content: '3. IoT/Device Analytics (Manufacturing, Logistics)' },
      { type: 'list', content: { ordered: false, items: [
        'Device-level or factory-level isolation',
        'High-volume incremental ingestion (sensors generating data constantly)',
        'Same clustering optimization patterns'
      ]}},

      { type: 'subheader', content: '4. Any Data Platform With:' },
      { type: 'list', content: { ordered: false, items: [
        'Multiple customers sharing infrastructure',
        'Regulatory compliance requirements (HIPAA, SOC 2, GDPR)',
        'Need for tenant-level cost visibility',
        'Performance requirements (sub-second queries on billions of rows)'
      ]}},

      { type: 'subheader', content: 'The Patterns Transfer' },
      { type: 'list', content: { ordered: false, items: [
        'RLS automation via dbt post-hooks',
        'Incremental strategy selection matrix',
        'Clustering on tenant_id + time_column',
        'CI tests proving isolation works'
      ]}},

      { type: 'header', id: 'tradeoffs', content: 'Design Trade-offs & Limitations' },
      { type: 'paragraph', content: 'No architectural decision is free. This platform deliberately optimizes for consistency, correctness, and operational simplicity over absolute portability or lowest cost.' },

      { type: 'subheader', content: '1. Snowflake Vendor Lock-In' },
      { type: 'paragraph', content: 'What I gained:' },
      { type: 'list', content: { ordered: false, items: [
        'Zero-copy cloning for CI environments (instant schema duplication)',
        'Native RLS enforcement without application-layer complexity',
        'Automatic clustering and micro-partition pruning',
        'Account Usage views for audit trails'
      ]}},
      { type: 'paragraph', content: 'Why I chose this: Multi-tenant RLS that actually works is harder than it looks. Building application-layer isolation is:' },
      { type: 'list', content: { ordered: false, items: [
        '10x more code to maintain',
        '100x more security surface area',
        'Guaranteed to have bugs'
      ]}},
      { type: 'paragraph', content: 'Snowflake\'s RLS is database-enforced. Even if someone hacks in and runs raw SQL, they can\'t bypass it. That\'s worth vendor lock-in.' },
      { type: 'paragraph', content: 'Bottom line: Security correctness > portability.' },

      { type: 'subheader', content: '2. dbt-Centric Architecture' },
      { type: 'paragraph', content: 'What I gained:' },
      { type: 'list', content: { ordered: false, items: [
        'Version-controlled transformations (every change in Git)',
        'Automated testing framework (250+ tests on every PR)',
        'Documentation generation (lineage graphs, column descriptions)',
        'Incremental materializations (6s vs. 4m for 3M rows)'
      ]}},
      { type: 'paragraph', content: 'Why I chose this: For analytics workloads (not operational dashboards), batch is sufficient. Requirements:' },
      { type: 'list', content: { ordered: false, items: [
        'Data fresh within 4 hours (not 4 seconds)',
        'Correctness > speed (especially in healthcare systems)',
        'Testing infrastructure > rapid deployment'
      ]}},
      { type: 'paragraph', content: 'dbt\'s testing framework catches cross-tenant leaks before production. That\'s more valuable than sub-second freshness.' },
      { type: 'paragraph', content: 'Bottom line: Batch + testing > streaming + bugs.' },

      { type: 'subheader', content: '3. Macro-Based RLS Automation Over Manual Application' },
      { type: 'paragraph', content: 'What I gained:' },
      { type: 'list', content: { ordered: false, items: [
        'Zero manual steps (engineer creates model → RLS auto-applied)',
        'Consistent enforcement (impossible to deploy without RLS)',
        'Visible in logs (see confirmation in dbt output)',
        'Fails loudly (missing policy = build fails)'
      ]}},
      { type: 'paragraph', content: 'Why I chose this: Security through automation > security through discipline.' },
      { type: 'paragraph', content: 'Manual RLS application fails because:' },
      { type: 'list', content: { ordered: false, items: [
        'Engineers forget',
        'New hires don\'t know the rule',
        'Automated dbt runs have no "manual step" mechanism'
      ]}},
      { type: 'paragraph', content: 'Bottom line: Automation guarantees enforcement > manual steps guarantee eventual failure.' },

      { type: 'subheader', content: 'Trade-off Summary' },
      { type: 'paragraph', content: 'Dimension | Optimized For | Traded Away' },
      { type: 'paragraph', content: 'Security | Database-enforced isolation | Platform portability' },
      { type: 'paragraph', content: 'Correctness | Comprehensive testing | Real-time latency' },
      { type: 'paragraph', content: 'Compliance | Synthetic test data | Production realism' },
      { type: 'paragraph', content: 'Simplicity | Snowflake native features | Vendor independence' },
      { type: 'paragraph', content: 'Reliability | Automation over discipline | Manual control' },

      { type: 'subheader', content: 'Would I Make Different Choices for Different Requirements?' },
      { type: 'paragraph', content: 'Yes:' },
      { type: 'list', content: { ordered: false, items: [
        'Operational dashboards (sub-second latency required): Choose streaming architecture (Kafka + Flink)',
        'Cost-constrained (minimizing spend > feature velocity): Choose BigQuery (5x cheaper per query)',
        'Multi-cloud portability (must run on AWS/Azure/GCP): Choose Databricks (cloud-agnostic)'
      ]}},
      { type: 'paragraph', content: 'But for healthcare analytics SaaS:' },
      { type: 'list', content: { ordered: false, items: [
        'Correctness and compliance > cost',
        'Testing infrastructure > rapid deployment',
        'Database-enforced security > application-layer complexity'
      ]}},
      { type: 'paragraph', content: 'These trade-offs optimize for systems that can\'t afford to be wrong.' },

      { type: 'header', id: 'real-lesson', content: 'The Real Lesson: Multi-Tenancy is a Security + Automation Discipline Problem' },
      { type: 'paragraph', content: 'Building a multi-tenant analytics platform taught me this:' },

      { type: 'subheader', content: 'Filters Are Not Security. They\'re Suggestions.' },
      { type: 'paragraph', content: 'The only real security is database-level enforcement that works even when:' },
      { type: 'list', content: { ordered: false, items: [
        'Engineers forget',
        'Queries are sloppy',
        'JOINs cross boundaries',
        'Someone hacks in and runs raw SQL'
      ]}},

      { type: 'subheader', content: 'Automation is Not Optional. It\'s the Foundation.' },
      { type: 'paragraph', content: 'You cannot rely on:' },
      { type: 'list', content: { ordered: false, items: [
        '"Remember to apply RLS"',
        '"Don\'t forget the WHERE clause"',
        'Manual checklists',
        'Engineers being careful'
      ]}},
      { type: 'paragraph', content: 'You need:' },
      { type: 'list', content: { ordered: false, items: [
        'dbt automation (post-hooks applying RLS automatically)',
        'CI testing (250+ tests proving isolation works)',
        'Real-time monitoring (freshness, quality, access, cost)'
      ]}},

      { type: 'subheader', content: 'One Leaked Row Kills Your Platform' },
      { type: 'paragraph', content: 'Not "minor bug." Trust destroyed, contracts voided, compliance violations filed.' },
      { type: 'paragraph', content: 'In healthcare, that row might expose PHI. That\'s not a data leak. That\'s a HIPAA incident. That\'s end-of-company territory.' },

      { type: 'header', id: 'final', content: 'Final thought' },
      { type: 'paragraph', content: 'Multi-tenant systems are inherently dangerous because all customers share infrastructure. The discipline required to make them secure is higher than single-tenant systems.' },
      { type: 'paragraph', content: 'If you\'re building one:' },
      { type: 'list', content: { ordered: false, items: [
        'Enforce isolation at the database layer (RLS, not filters)',
        'Automate security (dbt hooks, not manual steps)',
        'Test like an attacker (cross-tenant leakage scenarios in CI)',
        'Monitor in real-time (freshness, quality, violations, cost)'
      ]}},
      { type: 'paragraph', content: 'Do these four things, and you can sleep at night.' },
      { type: 'paragraph', content: 'Skip any of them, and you\'re one query away from disaster.' },

      { type: 'callout', content: {
        title: 'Explore the Full Implementation',
        text: 'GitHub Repository: https://github.com/Pathakdarshan12/Isometrics-Healthcare-Multi-Tenant-SaaS-Analytics-Platform',
        icon: '💻',
        color: 'blue'
      }},
      { type: 'paragraph', content: 'What\'s included: Architecture & Design, Security Implementation, Performance Optimizations, Testing Framework, GitHub Actions CI/CD pipeline with isolated testing schemas, Monitoring Dashboard' },

      { type: 'header', id: 'connect', content: 'Let\'s Connect' },
      { type: 'paragraph', content: 'If you\'re building data platforms, dealing with multi-tenant security complexity, or evaluating data engineering candidates, I\'d love to discuss:' },
      { type: 'list', content: { ordered: false, items: [
        'Multi-tenant isolation strategies beyond basic WHERE filters',
        'dbt testing frameworks that actually catch bugs before production',
        'Incremental materialization performance tuning (when MERGE kills you)',
        'Security automation patterns (making it impossible to deploy insecure code)',
        'Healthcare analytics architecture (HIPAA compliance without sacrificing performance)'
      ]}},
      { type: 'paragraph', content: 'LinkedIn: https://www.linkedin.com/in/pathakdarshan12/' }
    ]
  }
];
