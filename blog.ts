
import { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'how-i-built-a-lambda-architecture',
    title: 'Building a Unified Lambda Architecture with Snowflake & Kafka',
    date: 'March 15, 2024',
    category: 'Data Engineering',
    excerpt: 'Deep dive into architecting a single source of truth for both streaming and batch data using metadata-driven patterns.',
    content: 'Legacy markdown fallback...',
    tags: ['Snowflake', 'Kafka', 'Architecture'],
    readingTime: '12 min',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    author: {
      name: 'Darshan Pathak',
      role: 'Data Architect',
      avatar: 'https://picsum.photos/seed/dp-profile/200/200',
      linkedin: 'https://linkedin.com/in/pathakdarshan12'
    },
    structuredContent: [
        { type: 'header', id: 'problem', content: 'The Problem Nobody Talks About' },
        { type: 'paragraph', content: 'Most data platforms force you to choose: batch OR streaming. Build both, and you maintain two codebases. That\'s where pipelines break in production.' },
        { type: 'paragraph', content: 'Lambda architectures promise the best of both worlds but usually deliver twice the complexity. Batch procedures and streaming queries drift apart. Quality checks become inconsistent. When a delivery status changes in Kafka, it needs the exact same validation as a CSV upload - except most teams implement it twice and watch them diverge over six months.' },
        { type: 'quote', content: { text: 'I spent three months solving this exact problem.', type: 'info' } },
        { type: 'paragraph', content: 'The result? DataVelocity - a production-grade platform that processes CSV batch loads AND real-time Kafka events through the same medallion architecture (Bronze → Silver → Gold). Same validation rules. Same SCD Type 2 logic. Same quality gates. One codebase.' },

        { type: 'header', id: 'architecture', content: 'The Three-Layer Architecture' },
        { type: 'subheader', id: 'layer1', content: 'Layer 1: Dual Ingestion (Batch + Speed)' },
        { type: 'paragraph', content: 'Critical insight: Both paths converge at Bronze. From that point forward, they use identical stored procedures. Not "similar." Not "mostly the same." Literally the exact same SQL code.' },
        { type: 'code', content: {
            language: 'sql',
            title: 'Unified Task Execution',
            code: `CREATE TASK TASK_ORDERS_STREAM_TO_GOLD
WAREHOUSE = ADHOC_WH
SCHEDULE = '2 MINUTE'
WHEN SYSTEM$STREAM_HAS_DATA('STREAM_ORDERS_CHANGES')
AS CALL SP_ETL_MASTER('ORDER_PIPELINE_STREAM', NULL);`
        }},

        { type: 'subheader', id: 'layer2', content: 'Layer 2: Medallion Transformation' },
        { type: 'list', content: {
            ordered: false,
            items: [
                'Bronze Layer: Raw data with minimal transformation, preserving original values for replay.',
                'Silver Layer: MERGE-based upserts using business keys with centralized validation.',
                'Gold Layer: Dimensional models with SCD Type 2 and Fact tables.'
            ]
        }},

        { type: 'header', id: 'decisions', content: 'Five Engineering Decisions That Made This Work' },
        { type: 'callout', content: {
            title: 'Decision #1: Dual-Stage Streaming',
            text: 'Most architectures push Kafka events directly into transformation logic. I used lightweight landing tables + CDC streams to decouple ingestion from business logic.',
            icon: '⚡',
            color: 'blue'
        }},
        { type: 'paragraph', content: 'This approach resulted in sub-5-second ingestion latency while allowing streaming and batch to use identical procedures from Bronze onwards.' },

        { type: 'code', content: {
            language: 'sql',
            title: 'CDC Capture Stream',
            code: `-- Landing table (Snowpipe Streaming writes here)
CREATE TABLE BRONZE.ORDERS_STREAM (
    RECORD_METADATA VARIANT,  -- Kafka offset, partition
    RECORD_CONTENT VARIANT,   -- Raw event payload
    INGESTED_AT TIMESTAMP_TZ,
    BATCH_ID VARCHAR(36)
);

-- CDC captures changes for downstream processing
CREATE STREAM STREAM_ORDERS_CHANGES ON TABLE ORDERS_STREAM;`
        }},

        { type: 'callout', content: {
            title: 'Decision #2: Metadata-Driven Validation',
            text: 'Hardcoding rules is a death trap. I implemented a configuration-driven framework where adding a validation rule is just an INSERT statement.',
            icon: '🛡️',
            color: 'green'
        }},

        { type: 'metrics', content: [
            { label: 'Latency', value: '< 15s', icon: '⚡' },
            { label: 'Code Reuse', value: '100%', icon: '♻️' },
            { label: 'Data Quality', value: '95%+', icon: '✅' }
        ]},

        { type: 'header', id: 'outcome', content: 'What This Architecture Delivered' },
        { type: 'paragraph', content: 'This project demonstrates that you can unify batch and streaming without sacrificing performance. By using hash-based SCD2 and explicit staging tables, we achieved production-grade reliability with a single codebase.' },
        { type: 'divider', content: { style: 'stars' } },
        { type: 'paragraph', content: 'If you are building data platforms and dealing with Lambda Architecture complexity, lets connect.' }
    ]
  },
  {
    id: 'b2',
    slug: 'dbt-incremental-models-can-quietly-break-your-data',
    title: 'dbt Incremental Models Can Quietly Break Your Data',
    date: 'February 28, 2024',
    category: 'Analytics Engineering',
    excerpt: 'Strategies for managing isolated client data while maintaining a dry codebase in large scale Snowflake deployments.',
    content: 'Full content here...',
    tags: ['dbt', 'Snowflake', 'SaaS'],
    readingTime: '8 min',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    author: {
      name: 'Darshan Pathak',
      role: 'Data Quality Analyst',
      avatar: 'https://picsum.photos/seed/dp-profile/200/200',
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

        { type: 'header', id: 'why-good', content: 'Why Incremental Models Look So Good' },
        { type: 'paragraph', content: 'When you first learn about incremental models, they seem amazing. Instead of rebuilding entire tables every time, you only process new data. Your pipelines run faster. Your cloud costs drop. Everyone\'s happy.' },
        { type: 'code', content: { language: 'sql', code: `{{ config(\n    materialized='incremental',\n    unique_key='order_id'\n) }}\n\nselect * from {{ source('raw', 'orders') }}\n\n{% if is_incremental() %}\n    where created_at >= (select max(created_at) from {{ this }})\n{% endif %}` } },
        { type: 'paragraph', content: "But here's the catch: When it breaks, it breaks silently." },

        { type: 'header', id: 'failures', content: 'Four Ways Incremental Models Fail Silently' },

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
  }
];