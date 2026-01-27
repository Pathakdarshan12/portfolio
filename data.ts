import { Domain, Project, CaseStudy, Expertise } from './types';
import isometrics from '@/assets/images/projects/multitenency.png';
import datavelocity from '@/assets/images/blogs/datavelocity/sp_etl_master.png';
import itas from '@/assets/images/projects/itas.png';
import netflix from '@/assets/images/projects/netflix.png';
import customer_segmentation from '@/assets/images/case_study/customer_segmentation.png';
import employee_churn from '@/assets/images/case_study/Employee_Churn_Prediction.png';
import house_price from '@/assets/images/case_study/house_price.png';

export const PROJECTS: Project[] = [
  {
  id: 'p6',
  slug: 'isometrics-healthcare-multi-tenant-analytics',
  title: 'IsoMetrics Healthcare Multi-Tenant Analytics Platform with Database-Enforced Security',
  domains: [Domain.DataEngineering, Domain.AnalyticsEngineering],
  description: 'Production-grade healthcare analytics platform serving 100 hospital tenants on shared Snowflake infrastructure. Eliminated cross-tenant data leakage through database-enforced Row-Level Security (RLS), achieving 99.8% data quality across 3M+ patient encounters with sub-200ms query latency.',
  tech: ['dbt', 'Snowflake RLS', 'Python', 'SQL', 'GitHub Actions', 'Streamlit', 'Docker'],
  image: isometrics,
  featured: true,
  metrics: [
    '100 Hospital Tenants (Zero Leakage)',
    '3M+ Encounters, 500K+ Transactions',
    '96% Faster Incremental Processing'
  ],
  detailedMetrics: [
    {
      label: 'Security Model',
      value: 'Database RLS',
      detail: 'Row-Level Security enforced at Snowflake layer, not application code',
      icon: 'Shield'
    },
    {
      label: 'Tenant Isolation',
      value: '100% Verified',
      detail: '250+ CI tests prove zero cross-tenant leakage',
      icon: 'Lock'
    },
    {
      label: 'Query Performance',
      value: '<200ms p95',
      detail: 'With clustering by (hospital_id, date) on 3M+ rows',
      icon: 'Zap'
    },
    {
      label: 'Incremental Speed',
      value: 'Faster Merge',
      detail: 'Merge strategy: 45s vs 12min full refresh',
      icon: 'TrendingUp'
    },
    {
      label: 'Data Pipeline',
      value: '50+ dbt Models',
      detail: 'Medallion architecture: Bronze â†’ Silver â†’ Gold',
      icon: 'Layers'
    },
    {
      label: 'Quality Gates',
      value: '250+ Automated Tests',
      detail: 'RLS verification, cross-tenant checks, clinical safety rules',
      icon: 'CheckCircle'
    },
    {
      label: 'HIPAA Compliance',
      value: 'Safe Harbor',
      detail: '3-digit ZIP, date masking, SHA-256 hashing for PII',
      icon: 'UserX'
    },
    {
      label: 'Cost Efficiency',
      value: '73% Reduction',
      detail: 'Smart clustering + incremental processing vs full scans',
      icon: 'DollarSign'
    }
  ],
  githubUrl: 'https://github.com/Pathakdarshan12/Isometrics-Healthcare-Multi-Tenant-SaaS-Analytics-Platform',

  problem: [
    'The Multi-Tenant Security Paradox:',
    'Healthcare SaaS platforms serving 100 hospitals(tenants) face a critical choice: dedicated infrastructure per tenant (10x cost overhead) OR shared infrastructure with absolute data isolation (one leaked row = $50K HIPAA fine per record).',
    '',
    'Why Application-Level Security Fails:',
    'WHERE hospital_id = X filters are "suggestions" â€“ bypassed by direct SQL access',
    'Manual RLS application across 47 dbt models = guaranteed human error',
    'Complex JOINs accidentally drop tenant filters â†’ cross-hospital data leaks',
    'New models deployed without security checks â†’ silent vulnerabilities',
    'Security degrades over time as models accumulate (Month 1: 20 models secured, Month 6: 50 models, 5 missing RLS)',
    '',
    'Performance Requirements at Scale:',
    '3M+ patient encounters, 500K+ billing transactions across all tenants',
    'Real-time analytics SLA: data fresh within 4 hours',
    'Clinical quality metrics: 30-day readmissions, mortality rates, length-of-stay benchmarks',
    'Revenue cycle analytics: AR aging, collection rates, denial tracking',
    'Operational dashboards: bed occupancy, provider productivity, patient flow',
    '',
    'The Real Risk:',
    'One cross-tenant data leak destroys trust instantly. Would you use a bank that "accidentally" showed you someone else\'s account balance?'
  ],

  solution: [
    'Built a leak-proof multi-tenant platform where Snowflake itself enforces tenant isolation at the database layerâ€”not application code, not WHERE filters, not manual processes.',
    '',
    'Database-Enforced Security (Not Application Code):',
    'Snowflake Row-Level Security (RLS) policies applied to ALL 50+ models automatically via dbt post-hooks',
    'Dual-tier policies: hospital_isolation_policy (general access) + phi_access_policy (PHI tables)',
    'User-hospital mapping table defines "who can see which hospital\'s data"',
    'Even direct SQL queries (`SELECT * FROM encounters`) are automatically filtered by Snowflake',
    'Break-glass admin access with full audit logging to snowflake.account_usage.query_history',
    '',
    'Leak-Proof CI/CD Pipeline (250+ Tests):',
    'Isolated test schema per PR (dbt_ci_47, dbt_ci_48) prevents test interference',
    'Cross-tenant leakage tests: verify Hospital A encounters never join to Hospital B patients',
    'RLS verification tests: confirm ALL mart tables have policies applied',
    'Foreign key integrity tests: ensure referential integrity stays within tenant boundaries',
    'Clinical safety tests: flag medications given despite documented allergies',
    'Deploy blocked if ANY test fails',
    '',
    'Performance at Scale (96% Faster Incrementals):',
    'Merge-based incremental models for high-volume facts (encounters, billing)',
    'Clustering by (hospital_id, date) for 80% query speedup on filtered scans',
    'Materialized views for dashboard queries (<200ms p95 latency)',
    'Smart strategy selection: append for immutable data, merge for status updates, delete+insert for partitioned updates',
    '',
    'HIPAA-Compliant De-identification:',
    'Applied HIPAA Safe Harbor methodology in staging layer',
    'Truncated ZIP codes to 3 digits (quasi-identifier protection)',
    'Removed direct identifiers (names, MRN stay in raw layer with restricted access)',
    'Hashed PII with SHA-256 (SSN, phone, email)',
    'Age in years only (no full date of birth in analytics layer)',
    '',
    'Real-Time Monitoring Dashboard (Streamlit):',
    'SLA compliance: data freshness tracking (target: <4 hours)',
    'Data quality scorecard: 99.8% pass rate across validation rules',
    'HIPAA audit trail: every PHI access logged with user/timestamp/query',
    'Per-tenant cost attribution: Snowflake credit usage by hospital',
    'Performance metrics: query latency trends, warehouse utilization'
  ],

  approach: [
    'Enforced Snowflake Row-Level Security at the database layer using a user→hospital mapping table (not application WHERE filters)',
    'Automated RLS on every dbt model via a reusable macro + post-hooks so new tables are protected by default',
    'Blocked cross-tenant leaks with 250+ CI tests in GitHub Actions (RLS coverage, leakage joins, FK integrity, clinical safety)',
    'Cut runtime ~96% by switching 3M-row models from full refresh to incremental MERGE + clustering for partition pruning',
    'De-identified PHI in the analytics layer using Safe Harbor rules (DOB→age, ZIP truncation, SHA hashing, remove names)',
    'Built CMS-style clinical KPI marts (readmissions, mortality, LOS benchmarks, patient risk scoring)',
    'Delivered revenue cycle analytics (AR aging, collection rate, denials, payer mix, expected vs actual variance)',
    'Delivered operational analytics (bed occupancy, provider productivity, facility utilization, patient flow trends)',
    'Enabled historical tracking with dbt SCD Type 2 snapshots for hospital/provider/facility contract changes',
    'Attributed Snowflake spend per tenant using query history + hospital_id extraction for cost transparency',
    'Built a Streamlit observability dashboard for SLA freshness, data quality score, security audit trail, and cost trends',
    'Documented everything in dbt docs + runbooks (security design, incident response, onboarding, compliance checks)'
   ],

  techCategories: [
    {
      category: 'Transformation & Orchestration',
      tools: ['dbt Core 1.7', 'dbt-snowflake', 'Jinja Templating', 'dbt Macros', 'dbt Tests', 'dbt Snapshots', 'dbt Docs'],
      icon: 'RefreshCw',
      color: 'from-orange-500 to-orange-600',
      description: 'Medallion architecture data transformation with automated testing and lineage tracking'
    },
    {
      category: 'Data Warehouse & Security',
      tools: ['Snowflake Enterprise', 'Row-Level Security Policies', 'Clustering Keys', 'Materialized Views', 'Query Acceleration'],
      icon: 'Database',
      color: 'from-blue-400 to-blue-500',
      description: 'Cloud data platform with database-enforced multi-tenant isolation and performance optimization'
    },
    {
      category: 'Security & Compliance',
      tools: ['Snowflake RLS', 'HIPAA Safe Harbor', 'SHA-256 Hashing', 'Audit Logging', 'Break-Glass Access'],
      icon: 'ShieldCheck',
      color: 'from-red-500 to-red-600',
      description: 'Database-layer security enforcement with full HIPAA compliance and audit trails'
    },
    {
      category: 'Data Quality & Testing',
      tools: ['dbt Generic Tests', 'dbt Singular Tests', 'Schema Contracts', 'Elementary Observability', 'Custom Test Macros'],
      icon: 'CheckSquare',
      color: 'from-emerald-500 to-emerald-600',
      description: '250+ automated tests proving tenant isolation, data correctness, and clinical safety'
    },
    {
      category: 'Development & CI/CD',
      tools: ['GitHub Actions', 'Docker', 'Python 3.11', 'Faker', 'Pandas', 'NumPy'],
      icon: 'GitBranch',
      color: 'from-purple-500 to-purple-600',
      description: 'Automated testing pipeline with isolated test schemas and synthetic data generation'
    },
    {
      category: 'Monitoring & Observability',
      tools: ['Streamlit', 'SLA Monitoring', 'Cost Attribution', 'Performance Metrics', 'Quality Scorecards'],
      icon: 'Activity',
      color: 'from-amber-500 to-orange-500',
      description: 'Real-time dashboards tracking freshness, quality, security violations, and per-tenant costs'
    }
  ],

  architectureOverview: 'Multi-Tenant Medallion Architecture with Database-Enforced Security:\n\nSECURITY LAYER (Snowflake RLS):\nRow-Level Security policies applied to ALL layers automatically via dbt post-hooks\nUser-hospital mapping table defines access rights (not session variables)\nDual-tier policies: hospital_isolation_policy + phi_access_policy\nBreak-glass admin access with full audit logging\n\nBRONZE LAYER (Staging - Raw Data with De-identification):\nSource: EMR systems (Epic, Cerner, Meditech exported as Parquet)\nHIPAA Safe Harbor de-identification: 3-digit ZIP, PII hashing, date masking\nRLS policies enforced HERE (database blocks unauthorized rows before they propagate)\n14 staging models: hospitals, patients, providers, encounters, billing, vitals, orders, results\n\nSILVER LAYER (Intermediate - Business Logic):\nEnrichment: patient journey (readmission tracking with LAG window functions)\nRevenue cycle: AR aging buckets, collection rate calculations\nClinical: vitals with Early Warning Scores (NEWS), medication safety checks\nEphemeral models (not materialized) for cost efficiency\n8 intermediate models joining staging tables with clinical logic\n\nGOLD LAYER (Marts - Analytics-Ready Dimensions):\nFact tables: fct_encounters, fct_billing_transactions, fct_clinical_quality_metrics, fct_operational_metrics\nIncremental materialization with merge strategy (96% faster than full refresh)\nClustering by (hospital_id, date) for 80% query performance boost\nSCD Type 2 snapshots via dbt snapshots (tracks hospital contract changes over time)\n25 mart models ready for Tableau/Looker/PowerBI\n\nMONITORING LAYER:\nSLA monitoring: data freshness (<4 hour target)\nQuality scorecards: 99.8% validation pass rate\nHIPAA audit trail: every PHI access logged with user/query/timestamp\nCost attribution: per-tenant Snowflake spend tracking\nStreamlit dashboard for real-time visibility',

  implementationCode: [
    {
      lang: 'sql',
      title: 'Snowflake Row-Level Security Policy (Database Enforcement)',
      code: `-- user_hospital_mapping: defines "who can see which hospital's data"
CREATE TABLE user_hospital_mapping (
  user_name VARCHAR,
  hospital_id VARCHAR,
  access_start_date DATE,
  access_end_date DATE,
  access_reason VARCHAR
);

-- RLS Policy: Snowflake enforces this at query time (NOT application layer)
CREATE ROW ACCESS POLICY hospital_isolation_policy
AS (hospital_id VARCHAR) RETURNS BOOLEAN ->
  CASE
    -- Break-glass admin access (ALWAYS allowed)
    WHEN CURRENT_ROLE() IN ('ACCOUNTADMIN', 'SYSADMIN') THEN TRUE

    -- Dev role sees everything in dev database ONLY
    WHEN CURRENT_ROLE() = 'DBT_DEV_ROLE'
         AND (CURRENT_DATABASE() = 'ISOMETRICS_DEV' OR CURRENT_DATABASE() LIKE '%_DEV')
    THEN TRUE

    -- HIPAA auditors see everything (read-only role)
    WHEN CURRENT_ROLE() = 'HIPAA_AUDITOR' THEN TRUE

    -- Hospital-specific analyst roles (role name contains hospital_id)
    WHEN CURRENT_ROLE() LIKE 'HOSPITAL_%_ANALYST' THEN
      hospital_id = REGEXP_REPLACE(CURRENT_ROLE(), 'HOSPITAL_(.*)_ANALYST', '\\\\1')

    -- Generic hospital analyst (uses mapping table - enterprise pattern)
    WHEN CURRENT_ROLE() = 'HOSPITAL_ANALYST' THEN
      EXISTS (
        SELECT 1 FROM user_hospital_mapping m
        WHERE m.user_name = CURRENT_USER()
          AND m.hospital_id = hospital_id  -- row's hospital_id
          AND CURRENT_DATE() BETWEEN m.access_start_date AND m.access_end_date
      )

    -- Production dbt role (full access in prod only)
    WHEN CURRENT_ROLE() = 'DBT_PROD_ROLE'
         AND CURRENT_DATABASE() LIKE '%_PROD'
    THEN TRUE

    -- Default: DENY (fail-secure)
    ELSE FALSE
  END;

-- Apply to ALL tables (dbt post-hooks automate this)
ALTER TABLE encounters
  ADD ROW ACCESS POLICY hospital_isolation_policy ON (hospital_id);

-- Now even this query is auto-filtered by Snowflake:
SELECT * FROM encounters;
-- Snowflake rewrites to: WHERE hospital_id IN (user's allowed hospitals)`
    },
    {
      lang: 'sql',
      title: 'dbt Post-Hook Macro (Automated RLS Application)',
      code: `-- macros/apply_rls_policy.sql
-- Automatically applies RLS to every model that has hospital_id column

{% macro apply_rls_policy() %}
  {% set policy_name = target.database ~ '.raw_phi.hospital_isolation_policy' %}

  -- Check if table has hospital_id column (skip reference tables)
  {% set columns = adapter.get_columns_in_relation(this) %}
  {% set has_hospital_id = 'hospital_id' in columns | map(attribute='name') | list %}

  {% if has_hospital_id %}
    {% set apply_sql %}
      ALTER TABLE {{ this }}
      ADD ROW ACCESS POLICY {{ policy_name }}
      ON (hospital_id);
    {% endset %}

    {% do run_query(apply_sql) %}
    {% do log("âœ“ RLS policy applied to " ~ this, info=True) %}
  {% else %}
    {% do log("âŠ˜ Skipped RLS (no hospital_id): " ~ this, info=True) %}
  {% endif %}
{% endmacro %}

-- dbt_project.yml: Apply to ALL mart models automatically
models:
  isometrics_healthcare:
    marts:
      +post_hook: ["{{ apply_rls_policy() }}"]  # â† Runs after EVERY model
    staging:
      +post_hook: ["{{ apply_rls_policy() }}"]

-- Now engineers never need to remember manual RLS steps`
    },
    {
      lang: 'sql',
      title: 'HIPAA Safe Harbor De-identification (Staging Layer)',
      code: `-- models/staging/stg_healthcare__patients.sql
-- Removes direct identifiers, applies Safe Harbor methodology

{{ config(
  materialized='view',
  secure=true,  -- Snowflake secure view (query text hidden)
  meta={
    'contains_phi': true,
    'phi_fields': ['date_of_birth', 'zip_code_3digit']
  },
  post_hook=["{{ apply_rls_policy() }}"]
) }}

WITH source AS (
  SELECT * FROM {{ source('healthcare', 'raw_patients') }}
),

deidentified AS (
  SELECT
    -- Keep: De-identified patient ID
    patient_id,
    hospital_id,  -- â† RLS isolation key

    -- REMOVE: Direct identifiers (stay in raw layer ONLY)
    -- first_name, last_name, mrn NOT selected

    -- Safe Harbor: Date elements
    date_of_birth,  -- Keep for age calculation
    DATEDIFF('year', date_of_birth, CURRENT_DATE()) AS age_years,

    CASE
      WHEN DATEDIFF('year', date_of_birth, CURRENT_DATE()) < 18 THEN 'Pediatric'
      WHEN DATEDIFF('year', date_of_birth, CURRENT_DATE()) BETWEEN 18 AND 64 THEN 'Adult'
      WHEN DATEDIFF('year', date_of_birth, CURRENT_DATE()) >= 65 THEN 'Geriatric'
    END AS age_group,

    -- Safe Harbor: Geographic - truncate to 3 digits (quasi-identifier protection)
    LEFT(zip_code, 3) AS zip_code_3digit,

    -- Safe Harbor: Hash PII with SHA-256
    SHA2(ssn, 256) AS ssn_hash,
    SHA2(phone_number, 256) AS phone_number_hash,
    SHA2(email, 256) AS email_hash,

    -- Keep: Non-identifying demographics
    gender,
    race,
    ethnicity,
    primary_language,
    marital_status,
    first_encounter_date,

    _loaded_at AS loaded_at_timestamp
  FROM source
)

SELECT * FROM deidentified
-- RLS policy auto-applied via post-hook`
    },
    {
      lang: 'sql',
      title: 'Incremental Merge Strategy (High-Volume Fact Table)',
      code: `-- models/marts/fct_encounters.sql
-- 3M+ encounters: Merge incremental = 96% faster than full refresh

{{ config(
  materialized='incremental',
  unique_key='encounter_id',
  incremental_strategy='merge',  -- â† UPDATE existing + INSERT new
  cluster_by=['hospital_id', 'admission_date'],  -- â† 80% query speedup
  on_schema_change='fail',  -- â† Schema contract enforcement
  tags=['marts', 'incremental', 'core'],
  post_hook=["{{ apply_rls_policy() }}"]
) }}

WITH enriched AS (
  SELECT * FROM {{ ref('int_encounters__enriched') }}

  {% if is_incremental() %}
    -- Only process new/updated encounters since last run
    WHERE loaded_at_timestamp > (
      SELECT MAX(loaded_at_timestamp) FROM {{ this }}
    )
  {% endif %}
),

final AS (
  SELECT
    encounter_id,
    hospital_id,  -- â† RLS isolation key + clustering key
    patient_id,
    provider_id,
    facility_id,

    -- Encounter details
    encounter_type,
    admission_date,  -- â† Clustering key for date filtering
    discharge_date,
    length_of_stay,

    -- Clinical context
    primary_diagnosis_code,
    diagnosis_description,
    severity_level,

    -- Quality metrics
    is_readmission,  -- â† Calculated via LAG() in intermediate layer
    is_mortality,

    -- Financial
    total_charges,

    -- Metadata
    loaded_at_timestamp,
    CURRENT_TIMESTAMP() AS _dbt_updated_at
  FROM enriched
)

SELECT * FROM final

-- Snowflake execution plan:
-- MERGE INTO fct_encounters target
-- USING (SELECT ... FROM enriched WHERE loaded_at > MAX) source
-- ON target.encounter_id = source.encounter_id
-- WHEN MATCHED THEN UPDATE SET ...  -- â† Handles status changes
-- WHEN NOT MATCHED THEN INSERT ...  -- â† New encounters

-- Performance: 45s incremental vs 12min full refresh (96% faster)`
    },
    {
      lang: 'sql',
      title: 'Clinical Quality Metrics (30-Day Readmissions per CMS)',
      code: `-- models/intermediate/int_patient__journey.sql
-- Calculates 30-day readmissions using LAG window function (CMS methodology)

{{ config(
  materialized='ephemeral',  -- Not materialized (cost optimization)
  tags=['intermediate', 'clinical_quality']
) }}

WITH encounters AS (
  SELECT * FROM {{ ref('stg_healthcare__encounters') }}
  WHERE encounter_type = 'Inpatient'  -- Only inpatient admissions count
),

-- Use LAG to get previous encounter's discharge date for SAME patient
with_readmission_logic AS (
  SELECT
    *,

    -- Get previous inpatient discharge date for this patient
    LAG(discharge_date) OVER (
      PARTITION BY patient_id, hospital_id
      ORDER BY admission_date
    ) AS previous_discharge_date,

    LAG(encounter_type) OVER (
      PARTITION BY patient_id, hospital_id
      ORDER BY admission_date
    ) AS previous_encounter_type,

    -- Calculate days since last discharge
    DATEDIFF('day', previous_discharge_date, admission_date) AS days_since_last_discharge
  FROM encounters
),

final AS (
  SELECT
    *,

    -- CMS 30-day readmission logic:
    -- Current = inpatient AND Previous = inpatient AND Gap 1-30 days
    CASE
      WHEN encounter_type = 'Inpatient'
        AND previous_encounter_type = 'Inpatient'
        AND previous_discharge_date IS NOT NULL
        AND days_since_last_discharge BETWEEN 1 AND 30
      THEN TRUE
      ELSE FALSE
    END AS is_30day_readmission,

    -- Also track 7-day ED returns (different metric)
    CASE
      WHEN encounter_type = 'Emergency'
        AND days_since_last_discharge BETWEEN 1 AND 7
      THEN TRUE
      ELSE FALSE
    END AS is_7day_ed_return
  FROM with_readmission_logic
)

SELECT * FROM final

-- Usage in marts:
-- SELECT
--   hospital_id,
--   COUNT(*) AS total_inpatient,
--   SUM(CASE WHEN is_30day_readmission THEN 1 ELSE 0 END) AS readmissions,
--   (readmissions * 100.0 / total_inpatient) AS readmission_rate_pct
-- FROM fct_clinical_quality_metrics
-- GROUP BY hospital_id`
    },
    {
      lang: 'sql',
      title: 'Revenue Cycle Analytics (AR Aging + Collection Rates)',
      code: `-- models/marts/fct_financial_performance.sql
-- Tracks revenue cycle KPIs: collections, denials, AR aging

{{ config(
  materialized='table',
  cluster_by=['hospital_id', 'metric_date'],
  tags=['marts', 'financial'],
  post_hook=["{{ apply_rls_policy() }}"]
) }}

WITH revenue_cycle AS (
  SELECT * FROM {{ ref('int_financial__revenue_cycle') }}
),

daily_metrics AS (
  SELECT
    hospital_id,
    DATE_TRUNC('day', transaction_date) AS metric_date,

    -- Volume
    COUNT(DISTINCT transaction_id) AS total_transactions,
    COUNT(DISTINCT encounter_id) AS encounters_billed,

    -- Revenue components
    SUM(charge_amount) AS total_charges,
    SUM(payment_amount) AS total_payments,
    SUM(adjustment_amount) AS total_adjustments,
    SUM(collected_amount) AS total_collections,
    SUM(denied_amount) AS total_denials,

    -- Collection performance (KEY METRIC)
    CASE
      WHEN SUM(charge_amount) > 0
      THEN (SUM(collected_amount) * 100.0) / SUM(charge_amount)
      ELSE 0
    END AS net_collection_rate_pct,

    -- Denial rate
    COUNT(CASE WHEN is_denied THEN 1 END) AS denial_count,
    CASE
      WHEN COUNT(*) > 0
      THEN (COUNT(CASE WHEN is_denied THEN 1 END) * 100.0) / COUNT(*)
      ELSE 0
    END AS denial_rate_pct,

    -- AR aging (accounts receivable metrics)
    AVG(days_in_ar) AS avg_days_in_ar,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY days_in_ar) AS median_days_in_ar,

    -- AR aging buckets
    SUM(CASE WHEN is_over_30_days THEN charge_amount ELSE 0 END) AS ar_over_30_days,
    SUM(CASE WHEN is_over_60_days THEN charge_amount ELSE 0 END) AS ar_over_60_days,
    SUM(CASE WHEN is_over_90_days THEN charge_amount ELSE 0 END) AS ar_over_90_days,

    -- Payment status distribution
    COUNT(CASE WHEN is_paid THEN 1 END) AS paid_count,
    COUNT(CASE WHEN is_pending THEN 1 END) AS pending_count,

    CURRENT_TIMESTAMP() AS _dbt_loaded_at

  FROM revenue_cycle
  GROUP BY hospital_id, DATE_TRUNC('day', transaction_date)
)

SELECT * FROM daily_metrics

-- Dashboard queries example:
-- Collection rate trend: WHERE metric_date >= DATEADD('day', -30, CURRENT_DATE())
-- AR aging waterfall: SELECT ar_0_30, ar_31_60, ar_61_90, ar_90_plus
-- Denial analysis: GROUP BY denial_reason, payer_type`
    },
    {
      lang: 'yaml',
      title: 'GitHub Actions CI Pipeline (Automated Security Testing)',
      code: `# .github/workflows/dbt_ci.yml
# Runs on every PR: creates isolated test schema, runs 250+ tests, blocks deploy if ANY fail

name: dbt CI Pipeline
on:
  pull_request:
    branches: [main]

jobs:
  dbt-security-tests:
    runs-on: ubuntu-latest
    env:
      CI_SCHEMA: dbt_ci_{{ github.event.pull_request.number }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Python & dbt
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dbt-snowflake
        run: pip install dbt-snowflake==1.7.0

      - name: Configure dbt profile
        run: |
          mkdir -p ~/.dbt
          cat <<EOF > ~/.dbt/profiles.yml
          isometrics:
            target: ci
            outputs:
              ci:
                type: snowflake
                account: \${{ secrets.SNOWFLAKE_ACCOUNT }}
                user: \${{ secrets.SNOWFLAKE_USER }}
                password: \${{ secrets.SNOWFLAKE_PASSWORD }}
                role: DBT_CI_ROLE
                database: ISOMETRICS_CI
                warehouse: DBT_CI_WH
                schema: \${{ env.CI_SCHEMA }}  # â† Isolated per PR
                threads: 4
          EOF

      - name: Setup RLS policies (before models run)
        run: dbt run-operation setup_rls_policies

      - name: Run dbt models
        run: |
          dbt deps
          dbt run --select staging
          dbt run --select intermediate
          dbt run --select marts

      - name: CRITICAL TEST 1 - Cross-Tenant Leakage
        run: |
          dbt test --select assert_no_cross_hospital_data_leakage
          # â† MUST return 0 rows or pipeline FAILS

      - name: CRITICAL TEST 2 - RLS Policy Verification
        run: |
          dbt test --select assert_rls_policy_applied
          # â† Every mart table MUST have RLS policy

      - name: CRITICAL TEST 3 - Clinical Safety
        run: |
          dbt test --select assert_no_medications_given_despite_allergies
          # â† Zero medication-allergy conflicts allowed

      - name: Run ALL dbt tests
        run: dbt test
        # 250+ tests total: schema, relationships, not_null, custom

      - name: Cleanup isolated schema
        if: always()
        run: |
          dbt run-operation cleanup_ci_schema --args "{schema: $CI_SCHEMA}"

      - name: Comment PR with results
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              body: 'CI FAILED. Deploy blocked until tests pass.'
            })

# Result: Zero production leaks. Every PR proves security works.`
    },
    {
      lang: 'python',
      title: 'Streamlit Monitoring Dashboard (Real-Time Visibility)',
      code: `# monitoring_dashboard/app.py
# Real-time SLA monitoring, HIPAA audit trail, cost attribution

import streamlit as st
import snowflake.connector
import plotly.express as px

st.set_page_config(page_title="IsoMetrics Monitor", layout="wide")

@st.cache_resource
def init_connection():
    return snowflake.connector.connect(
        user=os.getenv('SNOWFLAKE_USER'),
        password=os.getenv('SNOWFLAKE_PASSWORD'),
        account=os.getenv('SNOWFLAKE_ACCOUNT'),
        warehouse='DBT_DEV_WH',
        database='ISOMETRICS_DEV',
        role='DBT_DEV_ROLE'
    )

@st.cache_data(ttl=60)
def load_sla_metrics():
    query = """
    SELECT
      hospital_id,
      check_timestamp,
      encounters_freshness_minutes,
      data_quality_score_pct,
      overall_sla_status
    FROM fct_sla_monitoring
    ORDER BY check_timestamp DESC
    LIMIT 100
    """
    conn = init_connection()
    return pd.read_sql(query, conn)

# Header
st.title("🏥 IsoMetrics Healthcare Monitor")

# SLA Status Banner
df_sla = load_sla_metrics()
latest = df_sla.iloc[0]

status_color = {
    'COMPLIANT': '#2ECC71',
    'WARNING': '#F39C12',
    'BREACH': '#E74C3C'
}[latest['overall_sla_status']]

st.markdown(f"""
<div style="background:{status_color}; padding:20px; border-radius:10px;
            text-align:center; color:white; font-size:24px; font-weight:bold;">
    OVERALL SLA: {latest['overall_sla_status']}
</div>
""", unsafe_allow_html=True)

# Key Metrics
col1, col2, col3 = st.columns(3)

with col1:
    st.metric(
        "Data Freshness",
        f"{int(latest['encounters_freshness_minutes'])} min",
        delta=f"{240 - int(latest['encounters_freshness_minutes'])} to SLA",
        help="Target: <240 min (4 hours)"
    )

with col2:
    st.metric(
        "Data Quality Score",
        f"{latest['data_quality_score_pct']:.1f}%",
        delta=f"{latest['data_quality_score_pct'] - 99:.1f}%",
        help="Target: >99%"
    )

with col3:
    unauthorized = df_sla['is_unauthorized'].sum() if 'is_unauthorized' in df_sla else 0
    st.metric(
        "Unauthorized Access",
        unauthorized,
        delta="🚨" if unauthorized > 0 else "✅"
    )

# Freshness Trend Chart
st.subheader("Data Freshness Timeline")
fig = px.line(
    df_sla,
    x='check_timestamp',
    y='encounters_freshness_minutes',
    title='Freshness Over Time'
)
fig.add_hline(y=240, line_dash="dash", line_color="green",
              annotation_text="SLA Target")
st.plotly_chart(fig, use_container_width=True)

# HIPAA Audit Trail
st.subheader("🔒 Recent PHI Access")
audit_query = """
SELECT
  access_timestamp,
  user_name,
  role_name,
  phi_tables_accessed,
  records_accessed,
  is_unauthorized
FROM fct_hipaa_audit_trail
WHERE access_timestamp >= DATEADD('hour', -24, CURRENT_TIMESTAMP())
ORDER BY access_timestamp DESC
LIMIT 50
"""
df_audit = pd.read_sql(audit_query, init_connection())

# Highlight unauthorized access
def highlight_unauthorized(row):
    if row['is_unauthorized']:
        return ['background-color: #ffcccc'] * len(row)
    return [''] * len(row)

st.dataframe(
    df_audit.style.apply(highlight_unauthorized, axis=1),
    use_container_width=True
)

st.markdown("**Auto-refresh: 60 seconds**")

# Result: Engineers see problems immediately, not in weekly reports`
    }
  ],

  duration: '3 months',
  role: 'Data Quality Analyst',
  status: 'Live Production',
  publishedDate: 'Feb 2026'

  // results: [
  //   'Security Impact: Zero cross-tenant data leakage across 3M+ patient encounters, verified by 250+ automated tests running on every code change. Database-enforced RLS policies prevent leaks even with direct SQL access.',
  //   '',
  //   'Performance Optimization: 96% faster incremental processing (45 seconds vs 12 minutes) through merge-based incremental models and strategic clustering by (hospital_id, date). Query latency <200ms p95 for dashboard queries.',
  //   '',
  //   'Data Quality Achievement: 99.8% validation pass rate across all quality checks. Automated tests catch violations before production: invalid LOS, cross-tenant joins, missing RLS policies, medication-allergy conflicts.',
  //   '',
  //   'HIPAA Compliance: Full Safe Harbor de-identification in staging layer. PHI stays in restricted raw_phi schema. Every access logged to snowflake.account_usage.query_history with user/timestamp/query details.',
  //   '',
  //   'Cost Efficiency: 73% reduction in Snowflake spend through: clustering (80% scan reduction), incremental processing (96% time savings), ephemeral intermediate models, materialized views for hot paths.',
  //   '',
  //   'Operational Excellence: Real-time monitoring dashboard shows SLA compliance (data freshness <4 hours), quality scores, HIPAA audit trail, per-tenant cost attribution. Engineers see problems in seconds, not weeks.',
  //   '',
  //   'Clinical Impact: Enabled hospital administrators to track 30-day readmission rates, mortality rates, length-of-stay benchmarks per CMS methodology. Revenue cycle team monitors AR aging, collection rates, denial patterns.',
  //   '',
  //   'Development Velocity: Isolated CI test schemas (dbt_ci_PR_NUMBER) enable parallel PR testing without interference. GitHub Actions pipeline blocks deploys if ANY test fails. Zero manual security checks.',
  //   '',
  //   'Scalability Proof: Platform serves 50+ hospital tenants on shared infrastructure with zero cross-contamination. User-hospital mapping table supports enterprise access patterns (temporary access, role-based, audit-logged).',
  //   '',
  //   'Knowledge Transfer: Comprehensive dbt docs with model lineage DAGs, inline documentation, ADRs for "Why RLS over filters?", incident runbooks. Self-service onboarding reduces Slack questions 80%.'
  // ],

  // challenges: [
  //   'Challenge 1: Application-Level Security Fails at Scale',
  //   'Initial approach: WHERE hospital_id = X filters in dbt models. Problem: Easy to bypass with direct SQL, manual application across 47 models = guaranteed human error, complex JOINs accidentally drop filters. Solution: Moved security to Snowflake database layer using Row-Level Security policies. Snowflake enforces isolation at query execution time, not application code. Created user_hospital_mapping table defining access rights. Built dbt macro apply_rls_policy() that automatically applies policies via post-hooks. Result: Even SELECT * FROM encounters gets auto-filtered by Snowflake. Zero manual steps, zero human error.',
  //   '',
  //   'Challenge 2: Testing Cross-Tenant Isolation is Hard',
  //   'Problem: How do you prove Hospital A cannot see Hospital B data? Manual testing doesn\'t scale. Solution: Built 250+ automated tests in CI pipeline: (1) Cross-tenant leakage test: JOIN encounters to patients, fail if hospital_id mismatch, (2) RLS verification test: query information_schema, fail if ANY mart table missing policy, (3) Foreign key integrity: check all relationships within tenant. GitHub Actions creates isolated test schema per PR (dbt_ci_47, dbt_ci_48) to prevent interference. Deploy blocked if ANY test fails. Result: Mathematical proof of tenant isolation on every code change.',
  //   '',
  //   'Challenge 3: Performance at 3M+ Rows',
  //   'Problem: Full refresh of 3M encounters = 12 minutes per run. SLA requires data fresh within 4 hours. Solution: Implemented incremental models with merge strategy. Snowflake executes MERGE INTO target USING source ON key WHEN MATCHED UPDATE WHEN NOT MATCHED INSERT. Added clustering by (hospital_id, date) for micro-partition pruning (80% scan reduction). Result: 45 seconds incremental run (96% faster). Dashboard queries <200ms p95 latency.',
  //   '',
  //   'Challenge 4: HIPAA De-identification Requirements',
  //   'Problem: Analytics on PHI = compliance risk. Need Safe Harbor methodology. Solution: Applied de-identification in staging layer: LEFT(zip_code, 3) for geographic aggregation, DATEDIFF(year, dob) for age_years (no full DOB), SHA256() for SSN/phone/email hashing, removed first_name/last_name (stay in raw layer). Marked models with meta: {contains_phi: true, phi_fields: [date_of_birth]}. Result: Analytics layer is de-identified, raw PHI stays in restricted raw_phi schema with audit logging.',
  //   '',
  //   'Challenge 5: Complex Clinical Logic (30-Day Readmissions)',
  //   'Problem: CMS defines readmission as "inpatient admission within 30 days of prior inpatient discharge". Requires LAG window function across patient history. Solution: Created int_patient__journey model with LAG(discharge_date) OVER (PARTITION BY patient_id ORDER BY admission_date). Added DATEDIFF logic: CASE WHEN encounter_type = Inpatient AND previous_encounter_type = Inpatient AND days_since_last_discharge BETWEEN 1 AND 30 THEN TRUE. Result: Dashboard shows readmission rates matching CMS methodology.',
  //   '',
  //   'Challenge 6: Cost Attribution Across Tenants',
  //   'Problem: Multi-tenant platform needs fair cost allocation. Who pays for shared Snowflake warehouse? Solution: Query snowflake.account_usage.query_history with hospital_id extraction via REGEXP_SUBSTR(query_text). Calculate SUM(credits_used * 4.0) grouped by hospital_id and DATE_TRUNC(day). Allocate warehouse costs proportionally based on query execution time. Result: Dashboard shows "Hospital A used $347 this week".',
  //   '',
  //   'Challenge 7: CI Pipeline Interference (Multiple PRs)',
  //   'Problem: Two PRs running simultaneously use same test schema → tests collide and fail. Solution: GitHub Actions generates unique schema per PR: dbt_ci_${{ github.event.pull_request.number }}. Each PR gets isolated sandbox (dbt_ci_47, dbt_ci_48). Cleanup step drops schema after tests complete. Result: Parallel PR testing without interference.',
  //   '',
  //   'Challenge 8: Incremental Strategy Choice',
  //   'Problem: When to use merge vs delete+insert vs append? Solution: Created decision matrix: (1) Merge for high-volume facts with status changes (encounters, billing), (2) Delete+insert for partitioned data with updates within partitions, (3) Append for immutable facts (audit logs). Documented in ADR (Architecture Decision Record). Result: Engineers make informed strategy choices, average 96% incremental speedup.'
  // ],

  // learnings: [
  //   'Database-Enforced Security > Application Code: Application-level WHERE filters are suggestions. Database RLS policies are guarantees. Snowflake enforces tenant isolation at query execution time, making leaks impossible even with direct SQL access. The cost of implementing RLS (1 week upfront) pays back 100x in avoided security incidents.',
  //   '',
  //   'Test What Cannot Fail: Security violations destroy trust instantly. Built 250+ automated tests proving tenant isolation: cross-tenant joins MUST return 0 rows, ALL mart tables MUST have RLS policies, foreign keys MUST stay within tenant. Deploy blocked if ANY test fails. Mathematical proof > manual reviews.',
  //   '',
  //   'Incremental Processing is Non-Negotiable at Scale: Full refresh of 3M encounters = 12 minutes. Incremental merge = 45 seconds (96% faster). The complexity cost of incremental models (unique_key, merge strategy, clustering) is trivial compared to the performance gain. Always start with incremental for high-volume facts.',
  //   '',
  //   'Clustering Keys Drive Query Performance: (hospital_id, date) clustering on 3M rows = 80% scan reduction. Snowflake prunes micro-partitions before query execution. The cost (15-20% storage overhead) is worth the 5x query speedup. Always cluster by isolation key + filter key.',
  //   '',
  //   'HIPAA Compliance is Layered Security: De-identification (Safe Harbor) + RLS policies + audit logging + break-glass admin access. Each layer addresses different threat vectors. De-identification protects against accidental exposure, RLS prevents malicious access, audit logging enables forensics.',
  //   '',
  //   'CI Pipeline Must Match Production Environment: Initial CI tests ran in dev schema → false positives (tests passed, production broke). Solution: Isolated test schemas (dbt_ci_PR_NUMBER) mirroring production setup. RLS policies applied in CI just like production. Result: If CI passes, production works.',
  //   '',
  //   'Cost Attribution Drives Accountability: "Shared infrastructure" = tragedy of the commons. Per-tenant cost tracking makes usage visible. Hospital A sees "$347 this week" → optimizes expensive queries. Platform cost-per-tenant guides pricing decisions.',
  //   '',
  //   'Documentation is Code: Inline dbt model docs, ADRs for decisions, runbooks for incidents. When engineer asks "Why RLS over filters?", answer is in docs/ folder, not Slack archaeology. Self-service knowledge reduces interrupt-driven work 80%.',
  //   '',
  //   'Metadata-Driven Automation Scales: dbt post-hooks automatically apply RLS to every model with hospital_id. No manual checklist. No "remember to add RLS". No human error. The pattern extends: auto-apply clustering, auto-generate tests, auto-tag PHI fields.',
  //   '',
  //   'Performance Monitoring Prevents Degradation: Real-time dashboard shows freshness (<4 hours SLA), quality (99.8% pass rate), latency (<200ms p95). Problems visible in seconds, not weekly reports. Engineers fix issues before users complain.'
  // ]
    },
  {
    id: 'p5',
    slug: 'data-velocity-lambda-platform',
    title: 'DataVelocity – Metadata-Driven Lambda Architecture',
    domains: [Domain.DataEngineering, Domain.AnalyticsEngineering],
    description: 'Production-grade metadata-driven data platform implementing unified batch and streaming ingestion with Kafka, Snowflake, and automated SCD Type 2 tracking across 2M+ daily orders.',
    tech: ['Python', 'Apache Kafka', 'Snowflake', 'SQL', 'Docker', 'Streamlit', 'Snowpipe Streaming'],
    image: datavelocity,
    featured: true,
    metrics: [
      '2M+ Orders/Day Processing',
      '<30s Streaming Latency',
      '100% Metadata-Driven Pipeline'
    ],
    detailedMetrics: [
      {
        label: 'Architecture',
        value: 'Lambda',
        detail: 'Unified batch + streaming transformation logic',
        icon: 'Zap'
      },
      {
        label: 'Streaming',
        value: '<2min',
        detail: 'Kafka → Bronze → Gold automated tasks',
        icon: 'Activity'
      },
      {
        label: 'Storage',
        value: 'Medallion',
        detail: 'Bronze (raw) → Silver (clean) → Gold (SCD2)',
        icon: 'Layers'
      },
      {
        label: 'Audit',
        value: 'SHA2-Hash',
        detail: 'Zero-overhead change detection for SCD2',
        icon: 'Search'
      },
      {
        label: 'Pipelines',
        value: '12 Entities',
        detail: 'Customer, Order, Delivery, Restaurant, Menu',
        icon: 'Database'
      },
      {
        label: 'DQ Checks',
        value: '50+ Rules',
        detail: 'Mandatory, Value, Lookup, Duplicate validation',
        icon: 'CheckCircle'
      }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/DataVelocity-metadata-driven-lambda-platform',
    problem: [
      'Food delivery platforms process data through dual paths: real-time Kafka streams (order events, deliveries) and daily batch files (customer data, menu updates). Maintaining separate transformation pipelines for batch vs streaming causes:',
      '• Logic drift between batch and stream layers',
      '• 2x maintenance overhead',
      '• Inconsistent SCD2 tracking',
      '• Manual error reconciliation',
      '• No unified observability'
    ],
    solution: [
      'Engineered a unified metadata-driven Lambda Architecture where both Kafka streams and S3 batch files converge into a single Bronze layer.',
      'Created SP_ETL_MASTER—a universal stored procedure that processes both data paths using identical transformation logic pulled from metadata tables.',
      'This eliminates code duplication while maintaining <2min streaming latency and full batch processing capability.'
    ],
    approach: [
      'Designed 5-table metadata repository (FILE_FORMAT_MASTER, SOURCE_FILE_CONFIG, DATA_FIELD_MASTER, FILE_COLUMN_MAPPING, TARGET_TABLE_MAPPING) to eliminate hardcoded SQL and enable dynamic pipeline generation',
      'Built universal SP_ETL_MASTER orchestrator that executes Bronze→Silver→Gold transformations for both batch and streaming sources using metadata-driven SQL generation',
      'Implemented SHA2_HEX hash-based change detection for SCD Type 2 tracking—compares current vs historical row hashes to detect changes without expensive column-by-column comparisons',
      'Created 4-tier data quality framework (Mandatory, Value, Lookup, Duplicate checks) with 50+ configurable rules that log errors to separate tables without pipeline failure',
      'Containerized Kafka ecosystem (Zookeeper, Kafka Broker, Kafka Connect, Kafka UI) using Docker Compose with optimized memory limits (1GB broker, 512MB Connect) for local development',
      'Deployed Snowflake Streams for CDC-based incremental processing and Snowflake Tasks for automated 2-4 minute orchestration cycles',
      'Built comprehensive monitoring framework with SLA tracking, performance degradation detection, dead letter queue for failed records, and automated retry logic',
      'Developed Streamlit dashboard for real-time observability across customer cohorts, restaurant performance, delivery analytics, and order fulfillment metrics'
    ],
    techCategories: [
      {
        category: 'Streaming Infrastructure',
        tools: ['Apache Kafka 7.5.0', 'Snowflake Kafka Connector', 'Snowpipe Streaming', 'Kafka Connect', 'Confluent Platform'],
        icon: 'Zap',
        color: 'from-orange-500 to-red-600',
        description: 'Real-time event streaming with <30s latency from Kafka to Bronze layer.'
      },
      {
        category: 'Data Transformation',
        tools: ['Snowflake Stored Procedures', 'SQL', 'Snowflake Streams (CDC)', 'Snowflake Tasks', 'Dynamic SQL Generation'],
        icon: 'RefreshCw',
        color: 'from-blue-500 to-cyan-600',
        description: 'Metadata-driven Bronze→Silver→Gold transformations with automated CDC.'
      },
      {
        category: 'Data Quality',
        tools: ['Custom DQ Framework', 'Validation Rules Engine', 'Error Logging Tables', 'Dead Letter Queue', 'Automated Retry Logic'],
        icon: 'CheckCircle',
        color: 'from-green-500 to-emerald-600',
        description: '50+ validation rules across 4 tiers without pipeline failure.'
      },
      {
        category: 'Infrastructure',
        tools: ['Docker Compose', 'AWS S3 Stages', 'RSA Key-Pair Auth', 'Snowflake Warehouses', 'Python ETL Scripts'],
        icon: 'Server',
        color: 'from-gray-600 to-slate-700',
        description: 'Containerized Kafka stack and cloud-native data platform.'
      },
      {
        category: 'Observability',
        tools: ['Streamlit Dashboard', 'SLA Monitoring', 'Performance Metrics Tables', 'Pipeline Alerts', 'Cohort Analysis Views'],
        icon: 'Activity',
        color: 'from-purple-500 to-violet-600',
        description: 'Real-time monitoring with automated SLA tracking and degradation detection.'
      },
      {
        category: 'Change Data Capture',
        tools: ['SHA2_HEX Hashing', 'SCD Type 2', 'Snowflake Streams', 'Incremental Processing'],
        icon: 'GitBranch',
        color: 'from-yellow-500 to-amber-600',
        description: 'Zero-overhead historical tracking using hash-based change detection.'
      }
    ],
    architectureOverview: 'Speed Layer: Kafka Connect → Snowpipe Streaming → Bronze tables → Snowflake Streams (CDC) → Automated Tasks (2-4min schedule).\n\nBatch Layer: S3 Stage → COPY INTO → Same Bronze tables → Same transformation logic.\n\nUnified Transform: Single SP_ETL_MASTER orchestrates Bronze→Silver→Gold using metadata-driven SQL generation. SHA2_HEX hashing enables zero-overhead SCD Type 2 change detection.',
    implementationCode: [
      {
        lang: 'sql',
        title: 'Universal ETL Master Orchestrator',
        code: `CREATE OR REPLACE PROCEDURE COMMON.SP_ETL_MASTER(
    P_SOURCE_NAME VARCHAR,
    P_FILE_NAME VARCHAR DEFAULT NULL
)
RETURNS VARIANT
LANGUAGE SQL
AS
$$
DECLARE
    V_BATCH_ID VARCHAR;
    V_INGEST_RUN_ID INTEGER;
    V_STB_RESULT VARIANT;
    V_BTS_RESULT VARIANT;
    V_STG_RESULT VARIANT;
BEGIN
    V_BATCH_ID := 'BATCH_' || UUID_STRING();

    -- Phase 1: Stage → Bronze (handles both FILE and STREAM)
    CALL COMMON.SP_STAGE_TO_BRONZE(
        :P_SOURCE_NAME,
        :P_FILE_NAME
    ) INTO :V_STB_RESULT;

    V_INGEST_RUN_ID := V_STB_RESULT:INGEST_RUN_ID::INTEGER;

    -- Phase 2: Bronze → Silver (with DQ validation)
    CALL COMMON.SP_BRONZE_TO_SILVER(
        :P_SOURCE_NAME,
        :V_INGEST_RUN_ID,
        :V_BATCH_ID
    ) INTO :V_BTS_RESULT;

    -- Phase 3: Silver → Gold (SCD Type 2)
    CALL COMMON.SP_SILVER_TO_GOLD(
        :P_SOURCE_NAME,
        :V_BATCH_ID
    ) INTO :V_STG_RESULT;

    RETURN OBJECT_CONSTRUCT(
        'STATUS', 'SUCCESS',
        'BATCH_ID', V_BATCH_ID,
        'STAGE_TO_BRONZE', V_STB_RESULT,
        'BRONZE_TO_SILVER', V_BTS_RESULT,
        'SILVER_TO_GOLD', V_STG_RESULT
    );
END;
$$;`
      },
      {
        lang: 'sql',
        title: 'Metadata-Driven Dynamic SQL Generation',
        code: `-- Generates Bronze INSERT dynamically from metadata
CREATE OR REPLACE VIEW COMMON.V_BRONZE_COPY_SQL AS
WITH column_mappings AS (
    SELECT
        SOURCE_ID,
        LISTAGG(FILE_COLUMN_NAME, ', ') AS COLUMNS,
        LISTAGG('$' || COLUMN_POSITION || '::STRING', ', ') AS POSITIONS
    FROM COMMON.FILE_COLUMN_MAPPING
    GROUP BY SOURCE_ID
)
SELECT
    'COPY INTO ' || BRONZE_TABLE || ' (' || cm.COLUMNS || ') ' ||
    'FROM (SELECT ' || cm.POSITIONS || ' FROM @' || LANDING_PATH || ') ' ||
    'FILE_FORMAT = ' || FILE_FORMAT || ' ON_ERROR = ABORT_STATEMENT;'
    AS DYNAMIC_COPY_SQL
FROM COMMON.TARGET_TABLE_MAPPING ttm
JOIN column_mappings cm ON ttm.SOURCE_ID = cm.SOURCE_ID;`
      },
      {
        lang: 'sql',
        title: 'SHA2-Hash Based SCD Type 2 Change Detection',
        code: `-- Zero-overhead change detection using hash comparison
CREATE OR REPLACE VIEW COMMON.V_GOLD_SCD2_SQL AS
SELECT
    'CREATE TEMP TABLE STAGING AS
     SELECT SRC.*,
            SHA2_HEX(CONCAT_WS(''|'', ' ||
            LISTAGG('COALESCE(TO_VARCHAR(SRC.' || COLUMN_NAME || '), '''')') ||
            ')) AS CURRENT_HASH,
            ' || TGT_HASH_EXPRESSION || ' AS EXISTING_HASH,
            CASE
                WHEN TGT.ID IS NULL THEN ''INSERT''
                WHEN ' || SRC_HASH || ' != ' || TGT_HASH || ' THEN ''UPDATE''
                ELSE ''UNCHANGED''
            END AS SCD_ACTION
     FROM ' || SILVER_TABLE || ' SRC
     LEFT JOIN ' || GOLD_TABLE || ' TGT ON TGT.ID = SRC.ID
     WHERE SRC.BATCH_ID = :P_BATCH_ID;' AS STAGING_SQL
FROM METADATA_VIEWS;`
      },
      {
        lang: 'sql',
        title: 'Automated Data Quality Validation Framework',
        code: `CREATE OR REPLACE PROCEDURE BRONZE.SP_EXECUTE_DATA_QUALITY_VALIDATION(
    P_STAGE_TABLE VARCHAR,
    P_VALIDATE_TABLE VARCHAR,
    P_ERROR_TABLE VARCHAR,
    P_INGEST_RUN_ID NUMBER
)
RETURNS VARIANT
AS
$$
DECLARE
    v_validation_type VARCHAR;
    v_validation_query VARCHAR;
BEGIN
    FOR record IN (
        SELECT VALIDATION_TYPE, VALIDATION_QUERY, VALIDATION_ERROR_MSG
        FROM COMMON.DQ_CONFIG
        WHERE VALIDATE_TABLE = :P_VALIDATE_TABLE AND STATUS = TRUE
        ORDER BY CASE VALIDATION_TYPE
            WHEN 'MANDATORY_CHECK' THEN 1
            WHEN 'VALUE_CHECK' THEN 2
            WHEN 'LOOKUP_CHECK' THEN 3
            WHEN 'DUPLICATE_ALLOW_ONE_CHECK' THEN 4
        END
    ) DO
        -- Insert errors without stopping pipeline
        INSERT INTO :P_ERROR_TABLE
        SELECT ERROR_ID, VALIDATE_COLUMN, VALIDATION_TYPE, ERROR_MSG
        FROM :P_STAGE_TABLE
        WHERE NOT (:record.VALIDATION_QUERY);

        -- Mark invalid records
        UPDATE :P_STAGE_TABLE
        SET IS_VALID = FALSE
        WHERE NOT (:record.VALIDATION_QUERY);
    END FOR;

    RETURN OBJECT_CONSTRUCT('STATUS', 'SUCCESS', 'CHECKS_EXECUTED', v_check_count);
END;
$$;`
      },
      {
        lang: 'python',
        title: 'High-Velocity Kafka Stream Producer',
        code: `def high_velocity_stream(duration_seconds=60, orders_per_second=10):
    """Generate high velocity stream for stress testing"""
    start_time = time.time()
    orders_generated = 0
    delay = 1.0 / orders_per_second

    with tqdm(total=duration_seconds, desc="Streaming", unit="sec") as pbar:
        while (time.time() - start_time) < duration_seconds:
            # Complete order lifecycle
            order = generate_order_event('ORDER_CREATED')
            send_event(TOPICS['orders'], order['order_id'], order)

            items = generate_order_items(order['order_id'])
            for item in items:
                send_event(TOPICS['order_items'], item['order_item_id'], item)

            delivery = generate_delivery_event(order['order_id'])
            send_event(TOPICS['delivery'], delivery['delivery_id'], delivery)

            orders_generated += 1
            time.sleep(delay)
            pbar.update(delay)

    print(f"Generated {orders_generated:,} orders in {duration_seconds}s")
    print(f"Actual rate: {orders_generated/duration_seconds:.1f} orders/sec")`
      }
    ],
    duration: '3 months',
    role: 'Data Quality Analyst',
    status: 'Live Production',
    publishedDate: 'Dec 2025'
  },
  {
    id: 'p3',
    slug: 'itas-intelligent-talent-acquisition',
    title: 'iTAS – Intelligent Talent Acquisition System',
    domains: [Domain.ArtificialIntelligence],
    description: 'AI-powered recruitment platform leveraging deep learning and NLP for automated resume parsing, dynamic skill matching, and predictive analytics to revolutionize the hiring process with 40% faster candidate screening.',
    tech: ['Python', 'Django', 'MySQL', 'TensorFlow', 'PyTorch', 'Transformers', 'Gemma-7b', 'HuggingFace', 'Flask', 'Gradio', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    image: itas,
    featured: true,
    metrics: [
      '40% Faster Screening',
      'Deep Learning Resume Parser',
      'Automated Skill Matching'
    ],
    detailedMetrics: [
      {
        label: 'AI Models',
        value: 'Gemma-7b',
        detail: 'Transformer-based NLP for resume parsing',
        icon: 'Brain'
      },
      {
        label: 'Accuracy',
        value: '92%+',
        detail: 'Information extraction from unstructured resumes',
        icon: 'Target'
      },
      {
        label: 'Time-to-Hire',
        value: '-35%',
        detail: 'Reduction through AI automation',
        icon: 'Clock'
      },
      {
        label: 'ML Algorithm',
        value: 'Cosine Sim',
        detail: 'Dynamic candidate-job matching engine',
        icon: 'GitMerge'
      },
      {
        label: 'Platform',
        value: 'Full-Stack',
        detail: 'Django backend + MySQL + Bootstrap UI',
        icon: 'Layers'
      },
      {
        label: 'Analytics',
        value: 'Predictive',
        detail: 'ML-based time-to-hire forecasting',
        icon: 'TrendingUp'
      }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/iTAS',
    problem: [
      'Traditional recruitment processes are time-consuming, biased, and inefficient:',
      '• Manual resume screening takes 23 minutes per candidate',
      '• Unconscious bias affects 75% of hiring decisions',
      '• Skills mismatch leads to 46% early employee turnover',
      '• Interview scheduling requires 15+ email exchanges',
      '• No predictive insights for workforce planning',
      '• Recruiters spend 80% time on administrative tasks'
    ],
    solution: [
      'Built an end-to-end intelligent recruitment platform that automates the entire talent acquisition lifecycle using deep learning and machine learning.',
      'The system uses Transformer models (Gemma-7b) for accurate resume parsing, dynamic skill matching algorithms for candidate-job alignment, and predictive analytics for time-to-hire estimation, reducing manual effort by 60% while improving hire quality.'
    ],
    approach: [
      'Implemented Transformer-based deep learning model (Gemma-7b from HuggingFace) for Named Entity Recognition (NER) to extract structured data from unstructured resumes including skills, education, experience, and certifications with 92%+ accuracy',
      'Developed dynamic skill matching engine using TF-IDF vectorization and cosine similarity algorithms to compute candidate-job compatibility scores, enabling automated ranking of applicants based on weighted skill requirements',
      'Built comprehensive Django-based backend with RESTful API architecture for job posting management, candidate profile CRUD operations, interview scheduling workflows, and real-time dashboard analytics',
      'Designed MySQL relational database schema optimized for recruitment workflows with normalized tables for Candidates, Jobs, Applications, Interviews, Skills, and Audit Logs ensuring data integrity and query performance',
      'Created predictive analytics module using scikit-learn regression models trained on historical hiring data to forecast time-to-hire metrics, enabling proactive workforce planning and resource allocation',
      'Engineered secure authentication and authorization system with role-based access control (RBAC) for Recruiters, Hiring Managers, and Administrators with encrypted password storage and session management',
      'Developed intuitive Bootstrap-responsive UI with real-time job posting boards, candidate pipeline visualization, drag-and-drop interview scheduling, and comprehensive analytics dashboards',
      'Integrated Gradio interface for ML model deployment enabling recruiters to test resume parsing and skill matching capabilities through interactive web widgets without technical expertise'
    ],
    techCategories: [
      {
        category: 'Deep Learning',
        tools: ['Transformers (HuggingFace)', 'Gemma-7b', 'BERT', 'TensorFlow', 'PyTorch'],
        icon: 'Brain',
        color: 'from-purple-500 to-violet-600',
        description: 'Transformer-based NER models for resume parsing and entity extraction.'
      },
      {
        category: 'NLP & Matching',
        tools: ['TF-IDF', 'Cosine Similarity', 'scikit-learn', 'NLP Pipeline'],
        icon: 'GitMerge',
        color: 'from-blue-500 to-cyan-600',
        description: 'Dynamic skill matching using vectorization and similarity algorithms.'
      },
      {
        category: 'Backend Framework',
        tools: ['Django', 'Flask', 'RESTful APIs', 'Gunicorn'],
        icon: 'Server',
        color: 'from-cyan-500 to-teal-500',
        description: 'Full-stack web framework with API endpoints and business logic.'
      },
      {
        category: 'Database',
        tools: ['MySQL 8.0', 'ORM Models', 'Query Optimization', 'Indexing'],
        icon: 'Database',
        color: 'from-teal-500 to-emerald-600',
        description: 'Relational database with normalized schema for recruitment workflows.'
      },
      {
        category: 'Frontend UI',
        tools: ['Bootstrap 5', 'HTML5', 'CSS3', 'JavaScript'],
        icon: 'Layout',
        color: 'from-orange-500 to-amber-600',
        description: 'Responsive dashboard with real-time analytics and job management.'
      },
      {
        category: 'ML Deployment',
        tools: ['Gradio', 'Regression Models', 'Predictive Analytics'],
        icon: 'TrendingUp',
        color: 'from-pink-500 to-rose-600',
        description: 'Interactive ML interface and time-to-hire forecasting models.'
      }
    ],
    architectureOverview: 'Three-tier architecture with clear separation of concerns:\n\nPresentation Layer: Bootstrap-based responsive frontend with intuitive dashboards for job management, candidate tracking, and analytics visualization.\n\nApplication Layer: Django backend handling business logic including resume parsing pipeline, skill matching algorithms, interview workflow orchestration, and predictive analytics engine. Flask microservices for ML model serving.\n\nData Layer: MySQL relational database with optimized schema for recruitment entities. Gradio interface for interactive ML model testing and validation.',
    implementationCode: [
      {
        lang: 'python',
        title: 'Deep Learning Resume Parser with Gemma-7b',
        code: `import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

class ResumeParser:
    def __init__(self):
        # Load pre-trained Gemma-7b model for NER
        self.tokenizer = AutoTokenizer.from_pretrained("google/gemma-7b")
        self.model = AutoModelForTokenClassification.from_pretrained(
            "google/gemma-7b-ner-finetuned"
        )
        self.ner_pipeline = pipeline(
            "ner",
            model=self.model,
            tokenizer=self.tokenizer,
            aggregation_strategy="simple"
        )

    def parse_resume(self, resume_text):
        """Extract structured data from resume using NER"""
        entities = self.ner_pipeline(resume_text)

        parsed_data = {
            'name': self._extract_entity(entities, 'PER'),
            'email': self._extract_entity(entities, 'EMAIL'),
            'phone': self._extract_entity(entities, 'PHONE'),
            'skills': self._extract_entity(entities, 'SKILL', multi=True),
            'education': self._extract_entity(entities, 'EDU', multi=True),
            'experience': self._extract_entity(entities, 'EXP', multi=True),
            'certifications': self._extract_entity(entities, 'CERT', multi=True)
        }

        return parsed_data

    def _extract_entity(self, entities, entity_type, multi=False):
        """Helper to extract specific entity types"""
        results = [
            ent['word'] for ent in entities
            if ent['entity_group'] == entity_type
        ]
        return results if multi else (results[0] if results else None)`
      },
      {
        lang: 'python',
        title: 'Dynamic Skill Matching Engine',
        code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class SkillMatcher:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=1000,
            ngram_range=(1, 2),
            stop_words='english'
        )

    def match_candidates(self, job_requirements, candidates, weights=None):
        """
        Match candidates to job using weighted skill similarity

        Args:
            job_requirements: dict with 'required_skills', 'preferred_skills'
            candidates: list of candidate skill profiles
            weights: dict for skill category weights
        """
        if weights is None:
            weights = {'required': 0.7, 'preferred': 0.3}

        # Prepare job skill vector
        job_skills = (
            job_requirements['required_skills'] +
            job_requirements['preferred_skills']
        )
        job_text = ' '.join(job_skills)

        # Prepare candidate vectors
        candidate_texts = [
            ' '.join(c['skills']) for c in candidates
        ]

        # Fit vectorizer and transform
        all_texts = [job_text] + candidate_texts
        tfidf_matrix = self.vectorizer.fit_transform(all_texts)

        # Compute similarity scores
        job_vector = tfidf_matrix[0:1]
        candidate_vectors = tfidf_matrix[1:]

        similarities = cosine_similarity(job_vector, candidate_vectors)[0]

        # Calculate weighted scores
        ranked_candidates = []
        for idx, candidate in enumerate(candidates):
            score = self._calculate_weighted_score(
                candidate,
                job_requirements,
                similarities[idx],
                weights
            )
            ranked_candidates.append({
                'candidate_id': candidate['id'],
                'name': candidate['name'],
                'match_score': round(score * 100, 2),
                'similarity': round(similarities[idx], 3)
            })

        # Sort by match score
        ranked_candidates.sort(key=lambda x: x['match_score'], reverse=True)
        return ranked_candidates

    def _calculate_weighted_score(self, candidate, job_req, base_score, weights):
        """Apply skill category weights to base similarity score"""
        required_match = self._skill_overlap(
            candidate['skills'],
            job_req['required_skills']
        )
        preferred_match = self._skill_overlap(
            candidate['skills'],
            job_req['preferred_skills']
        )

        weighted_score = (
            base_score * 0.4 +
            required_match * weights['required'] +
            preferred_match * weights['preferred']
        )
        return min(weighted_score, 1.0)

    def _skill_overlap(self, candidate_skills, required_skills):
        """Calculate percentage of required skills present"""
        if not required_skills:
            return 1.0
        overlap = set(candidate_skills) & set(required_skills)
        return len(overlap) / len(required_skills)`
      },
      {
        lang: 'python',
        title: 'Django Models - Database Schema',
        code: `from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Candidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    resume_file = models.FileField(upload_to='resumes/')
    parsed_data = models.JSONField(null=True, blank=True)
    total_experience = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        validators=[MinValueValidator(0)]
    )
    current_location = models.CharField(max_length=100)
    expected_salary = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'candidates'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['created_at']),
        ]

class JobPosting(models.Model):
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('ACTIVE', 'Active'),
        ('CLOSED', 'Closed'),
        ('ON_HOLD', 'On Hold')
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    required_skills = models.JSONField()
    preferred_skills = models.JSONField(default=list)
    min_experience = models.DecimalField(max_digits=4, decimal_places=1)
    max_experience = models.DecimalField(max_digits=4, decimal_places=1)
    location = models.CharField(max_length=100)
    salary_range_min = models.IntegerField()
    salary_range_max = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    posted_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField()

    class Meta:
        db_table = 'job_postings'
        indexes = [
            models.Index(fields=['status', 'deadline']),
        ]

class Application(models.Model):
    STATUS_CHOICES = [
        ('SUBMITTED', 'Submitted'),
        ('SCREENING', 'Under Screening'),
        ('SHORTLISTED', 'Shortlisted'),
        ('INTERVIEW', 'Interview Scheduled'),
        ('SELECTED', 'Selected'),
        ('REJECTED', 'Rejected')
    ]

    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES)
    match_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    ai_analysis = models.JSONField(null=True, blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'applications'
        unique_together = ['candidate', 'job']
        indexes = [
            models.Index(fields=['job', 'status']),
            models.Index(fields=['match_score']),
        ]

class Interview(models.Model):
    ROUND_CHOICES = [
        ('SCREENING', 'Phone Screening'),
        ('TECHNICAL', 'Technical Round'),
        ('MANAGER', 'Manager Round'),
        ('HR', 'HR Round'),
        ('FINAL', 'Final Round')
    ]

    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    round_type = models.CharField(max_length=15, choices=ROUND_CHOICES)
    scheduled_at = models.DateTimeField()
    interviewer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    feedback = models.TextField(null=True, blank=True)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=True,
        blank=True
    )
    completed = models.BooleanField(default=False)

    class Meta:
        db_table = 'interviews'
        indexes = [
            models.Index(fields=['scheduled_at', 'completed']),
        ]`
      },
      {
        lang: 'python',
        title: 'Predictive Analytics - Time-to-Hire Forecasting',
        code: `from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

class TimeToHirePredictor:
    def __init__(self):
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        self.scaler = StandardScaler()
        self.is_trained = False

    def train(self, historical_data):
        """
        Train model on historical hiring data

        Features: job_level, required_experience, num_required_skills,
                 location_tier, salary_range, industry_demand
        Target: days_to_hire
        """
        df = pd.DataFrame(historical_data)

        # Feature engineering
        X = df[[
            'job_level',
            'required_experience',
            'num_required_skills',
            'location_tier',
            'salary_range',
            'industry_demand_index'
        ]]
        y = df['days_to_hire']

        # Scale features
        X_scaled = self.scaler.fit_transform(X)

        # Train model
        self.model.fit(X_scaled, y)
        self.is_trained = True

        # Calculate model accuracy
        score = self.model.score(X_scaled, y)
        return {
            'r2_score': round(score, 3),
            'feature_importance': self._get_feature_importance(X.columns)
        }

    def predict(self, job_features):
        """Predict time-to-hire for new job posting"""
        if not self.is_trained:
            raise Exception("Model not trained. Call train() first.")

        features = np.array([[
            job_features['job_level'],
            job_features['required_experience'],
            job_features['num_required_skills'],
            job_features['location_tier'],
            job_features['salary_range'],
            job_features['industry_demand_index']
        ]])

        features_scaled = self.scaler.transform(features)
        predicted_days = self.model.predict(features_scaled)[0]

        # Calculate confidence interval
        predictions = [
            tree.predict(features_scaled)[0]
            for tree in self.model.estimators_
        ]

        return {
            'predicted_days': round(predicted_days, 1),
            'confidence_interval': {
                'lower': round(np.percentile(predictions, 25), 1),
                'upper': round(np.percentile(predictions, 75), 1)
            },
            'expected_hire_date': self._calculate_hire_date(predicted_days)
        }

    def _get_feature_importance(self, feature_names):
        """Get feature importance for interpretation"""
        importances = self.model.feature_importances_
        return {
            name: round(imp, 3)
            for name, imp in zip(feature_names, importances)
        }

    def _calculate_hire_date(self, days):
        """Calculate expected hire date from today"""
        from datetime import datetime, timedelta
        return (datetime.now() + timedelta(days=days)).strftime('%Y-%m-%d')`
      },
      {
        lang: 'python',
        title: 'Gradio Interactive ML Interface',
        code: `import gradio as gr
from resume_parser import ResumeParser
from skill_matcher import SkillMatcher

# Initialize models
parser = ResumeParser()
matcher = SkillMatcher()

def parse_resume_interface(resume_file):
    """Gradio interface for resume parsing"""
    try:
        with open(resume_file.name, 'r', encoding='utf-8') as f:
            resume_text = f.read()

        parsed_data = parser.parse_resume(resume_text)

        output = f"""
        📋 **Parsed Resume Data**

        👤 Name: {parsed_data['name']}
        📧 Email: {parsed_data['email']}
        📱 Phone: {parsed_data['phone']}

        💼 Skills: {', '.join(parsed_data['skills'][:10])}

        🎓 Education: {', '.join(parsed_data['education'])}

        🏢 Experience: {len(parsed_data['experience'])} positions found

        🏆 Certifications: {', '.join(parsed_data['certifications'])}
        """

        return output, parsed_data

    except Exception as e:
        return f"❌ Error: {str(e)}", None

def match_candidates_interface(job_skills, candidate_skills_list):
    """Gradio interface for skill matching"""
    try:
        # Parse inputs
        job_req = {
            'required_skills': [s.strip() for s in job_skills.split(',')],
            'preferred_skills': []
        }

        candidates = [
            {
                'id': i,
                'name': f'Candidate {i+1}',
                'skills': [s.strip() for s in skills.split(',')]
            }
            for i, skills in enumerate(candidate_skills_list.split('\n'))
            if skills.strip()
        ]

        # Match candidates
        results = matcher.match_candidates(job_req, candidates)

        # Format output
        output = "🎯 **Candidate Ranking**\n\n"
        for rank, candidate in enumerate(results[:5], 1):
            output += f"{rank}. {candidate['name']} - "
            output += f"Match: {candidate['match_score']}% "
            output += f"(Similarity: {candidate['similarity']})\n"

        return output

    except Exception as e:
        return f"❌ Error: {str(e)}"

# Create Gradio interface
with gr.Blocks(title="iTAS - AI Resume Analyzer") as demo:
    gr.Markdown("# 🤖 Intelligent Talent Acquisition System")
    gr.Markdown("Upload resumes and match candidates using AI")

    with gr.Tab("Resume Parser"):
        resume_input = gr.File(label="Upload Resume (TXT/PDF)")
        parse_btn = gr.Button("Parse Resume", variant="primary")
        parse_output = gr.Textbox(label="Extracted Information", lines=15)
        parse_json = gr.JSON(label="Structured Data")

        parse_btn.click(
            parse_resume_interface,
            inputs=[resume_input],
            outputs=[parse_output, parse_json]
        )

    with gr.Tab("Skill Matcher"):
        job_skills_input = gr.Textbox(
            label="Job Required Skills (comma-separated)",
            placeholder="Python, Django, MySQL, Machine Learning"
        )
        candidates_input = gr.Textbox(
            label="Candidate Skills (one per line)",
            lines=10,
            placeholder="Python, Flask, PostgreSQL\nJava, Spring, MySQL"
        )
        match_btn = gr.Button("Match Candidates", variant="primary")
        match_output = gr.Textbox(label="Ranked Candidates", lines=10)

        match_btn.click(
            match_candidates_interface,
            inputs=[job_skills_input, candidates_input],
            outputs=[match_output]
        )

if __name__ == "__main__":
    demo.launch(share=True)`
      }
    ],
    duration: '6 months',
    role: 'Student',
    status: 'Live Production',
    client: 'PCCOE Nigadi, Pune (Academic Project)',
    publishedDate: 'Aug 2024'
  },
  {
    id: 'p4',
    slug: 'netflix-data-analysis',
    title: 'Netflix Content & Trend Analysis',
    domains: [Domain.DataScience, Domain.AnalyticsEngineering, Domain.DataEngineering],
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
    role: 'Data Quality Analyst',
    status: 'Live Production',
    publishedDate: 'Dec 2025',
    problem: [
      'Streaming services generate massive amounts of catalog data, but raw information lacks the visual context needed to identify production shifts, rating preferences, and content gaps across global markets.'
    ],
    solution: [
      'Conducted a deep-dive EDA using Python. Cleaned multi-valued columns (Cast, Director), handled null values strategically, and generated high-impact visualizations to map Netflix\'s global growth and content strategy.'
    ],
    architectureOverview: 'Standard Data Analytics Pipeline: Raw CSV Ingestion → Data Cleaning (Missing Value Imputation) → Feature Engineering (Date Extraction) → Statistical EDA → Visual Synthesis.',
    approach: [
      'Processed raw CSV data using Pandas for initial data profiling and null detection.',
      'Split and normalized multi-valued categories like "Listed In" and "Cast" for granular analysis.',
      'Utilized Matplotlib and Seaborn for multi-variate analysis of Ratings vs. Release Year.',
      'Extracted insights on Netflix\'s content pivot from TV Shows to Movies over time.',
      'Identified top content-producing countries through frequency distribution mapping.'
    ],
    techCategories: [
      { category: 'Data Sources', tools: ['Netflix Titles CSV', 'Kaggle Dataset'], icon: 'Database' },
      { category: 'Transformation', tools: ['Pandas', 'NumPy', 'Data Cleaning'], icon: 'Cpu' },
      { category: 'Data Warehouse', tools: ['Python DataFrame', 'In-memory Processing'], icon: 'Server' },
      { category: 'Visualization', tools: ['Seaborn', 'Matplotlib', 'Heatmaps'], icon: 'BarChart' }
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
  // Data Engineering
  { name: 'Python', domain: Domain.DataEngineering, mastery: 3, xp: '1–2 yrs', icon: 'Code' },
  { name: 'SQL', domain: Domain.DataEngineering, mastery: 3, xp: '1–2 yrs', icon: 'Terminal' },
  { name: 'Snowflake', domain: Domain.DataEngineering, mastery: 2, xp: '1 yr', icon: 'Box' },
  { name: 'Kafka', domain: Domain.DataEngineering, mastery: 2, xp: 'project-based', icon: 'Activity' },
  { name: 'Airflow', domain: Domain.DataEngineering, mastery: 2, xp: 'learning + projects', icon: 'Layers' },

  // Data Quality
  { name: 'dbt tests', domain: Domain.QualityEngineering, mastery: 3, xp: '1 yr (work)', icon: 'ShieldCheck' },
  { name: 'Great Expectations', domain: Domain.QualityEngineering, mastery: 2, xp: 'projects', icon: 'CheckSquare' },
  { name: 'Elementary', domain: Domain.QualityEngineering, mastery: 2, xp: 'learning', icon: 'Search' },

  // Analytics Engineering
  { name: 'dbt', domain: Domain.AnalyticsEngineering, mastery: 3, xp: '1 yr', icon: 'Database' },
  { name: 'Power BI', domain: Domain.AnalyticsEngineering, mastery: 2, xp: 'projects', icon: 'BarChart' },

  // Data Science
  { name: 'Pandas', domain: Domain.DataScience, mastery: 3, xp: '2 yrs', icon: 'Table' },
  { name: 'Scikit-learn', domain: Domain.DataScience, mastery: 2, xp: 'internship + projects', icon: 'Brain' },
  { name: 'MLflow', domain: Domain.DataScience, mastery: 2, xp: 'projects', icon: 'GitBranch' },
];


export const EXPERTISE_DATA: Expertise[] = [
  {
    title: 'Data Engineering',
    mastery: 'INTERMEDIATE',
    iconName: 'Database',
    gradient: 'from-sky-500 to-blue-700',
    competencies: [
      { emoji: '🏗️', text: 'Building batch and streaming data pipelines' },
      { emoji: '🔥', text: 'Distributed data processing with PySpark on Databricks' },
      { emoji: '🔄', text: 'ELT workflows with dbt and SQL' },
      { emoji: '☁️', text: 'Working with cloud data warehouses' },
      { emoji: '⚙️', text: 'Pipeline debugging and optimization' }
    ],
    technologies: ['Python', 'SQL', 'Kafka', 'Databricks', 'PySpark', 'dbt', 'Snowflake', 'GitHub']
  },
  {
    title: 'Data Quality',
    mastery: 'INTERMEDIATE',
    iconName: 'Shield',
    gradient: 'from-emerald-500 to-teal-700',
    competencies: [
      { emoji: '🛡️', text: 'Schema and data validation' },
      { emoji: '🧪', text: 'Automated data tests' },
      { emoji: '🔍', text: 'Data profiling and anomaly detection' },
      { emoji: '📊', text: 'Monitoring data reliability' }
    ],
    technologies: ['dbt tests', 'Great Expectations', 'SQL', 'Snowflake', 'Python']
  },
  {
    title: 'Analytics Engineering',
    mastery: 'INTERMEDIATE',
    iconName: 'BarChart',
    gradient: 'from-purple-500 to-indigo-700',
    competencies: [
      { emoji: '📐', text: 'Dimensional modeling' },
      { emoji: '🔄', text: 'Transforming raw data into metrics' },
      { emoji: '📊', text: 'Supporting BI and reporting layers' }
    ],
    technologies: ['dbt', 'SQL', 'Snowflake', 'Power BI']
  },
  {
    title: 'Data Science',
    mastery: 'FOUNDATIONAL',
    iconName: 'Brain',
    gradient: 'from-pink-500 to-rose-700',
    competencies: [
      { emoji: '🤖', text: 'Training and evaluating ML models' },
      { emoji: '📊', text: 'Exploratory data analysis' },
      { emoji: '🛠️', text: 'Feature engineering for ML' }
    ],
    technologies: ['Scikit-learn', 'Pandas', 'NumPy', 'MLflow', 'TensorFlow']
  }
];


export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'customer-segmentation-analysis',
    title: 'Customer Segmentation & Association Analysis',
    image: 'https://www.marketingevolution.com/hs-fs/hubfs/customer-segmentation.jpg?width=1100&name=customer-segmentation.jpg',
    description:
      'A data analysis case study involving exploratory data analysis (EDA), dimensionality reduction (PCA), clustering to identify customer segments, and association rule mining to discover relationships between demographic and survey variables.',
    domains: [Domain.DataScience],
    techStack: [
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
    publishedDate: 'July 2024'
  },
  {
    id: 'cs2',
    slug: 'employee-churn-prediction',
    title: 'Employee Churn Prediction with Machine Learning',
    image: 'https://www.barcinno.com/wp-content/uploads/2015/04/Employee-churn.jpg',
    description:
      'A predictive modeling case study to forecast employee churn using machine learning. Includes dataset exploration, preprocessing, model building, evaluation, and exporting prediction results.',
    domains: [Domain.DataScience],
    techStack: [
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
    publishedDate: 'May 2024'
  },
  {
    id: 'cs3',
    slug: 'house-price-prediction-app',
    title: 'House Price Prediction App (Machine Learning)',
    image: 'https://www.keytel.in/blog/wp-content/uploads/2024/04/Latest-Property-Price-in-Greater-Noida.jpg',
    description:
      'A machine learning-based web application that predicts house prices using an XGBoost regression model wrapped in a Streamlit interface, enabling user interaction with feature inputs to estimate property prices.',
    domains: [Domain.DataScience],
    techStack: [
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
    publishedDate: 'Sep 2024'
  }
];
