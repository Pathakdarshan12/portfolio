import { Domain, Project, CaseStudy, Expertise } from './types';
import isometrics from '@/assets/images/projects/isometrics_architecture.png';
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
    title: 'IsoMetrics Healthcare – HIPAA-Compliant Multi-Tenant Analytics Platform',
    domains: [Domain.DataEngineering],
    description: 'Production-grade multi-tenant healthcare analytics platform serving 100+ hospitals on shared infrastructure with HIPAA-compliant row-level security, processing 500K+ daily encounters with 99.8% data quality pass rate.',
    tech: ['dbt', 'Snowflake', 'Python', 'SQL', 'Docker', 'GitHub Actions', 'Streamlit'],
    image: isometrics,
    featured: true,
    metrics: [
      '100+ Hospital Tenants Isolated',
      '500K+ Daily Encounters Processed',
      '99.8% Data Quality Pass Rate'
    ],
    detailedMetrics: [
      {
        label: 'Architecture',
        value: 'Multi-Tenant',
        detail: '100+ hospitals with complete data isolation',
        icon: 'Shield'
      },
      {
        label: 'Security',
        value: 'RLS Enforced',
        detail: 'Database-level row access policies (HIPAA compliant)',
        icon: 'Lock'
      },
      {
        label: 'Performance',
        value: '<200ms p95',
        detail: 'Query latency with clustering by tenant_id + date',
        icon: 'Zap'
      },
      {
        label: 'Incremental',
        value: '96% Faster',
        detail: 'Merge strategy vs full refresh (45s vs 12m)',
        icon: 'TrendingUp'
      },
      {
        label: 'Data Models',
        value: '47 dbt Models',
        detail: 'Staging → Intermediate → Marts (Medallion)',
        icon: 'Layers'
      },
      {
        label: 'Data Quality',
        value: '89 Automated Tests',
        detail: 'Cross-tenant isolation, referential integrity, business logic',
        icon: 'CheckCircle'
      },
      {
        label: 'PHI Protection',
        value: 'Safe Harbor',
        detail: 'HIPAA de-identification (3-digit ZIP, hashed PII)',
        icon: 'UserX'
      },
      {
        label: 'Cost Savings',
        value: '73% Reduction',
        detail: 'vs full refresh with smart clustering',
        icon: 'DollarSign'
      }
    ],
    githubUrl: 'https://github.com/Pathakdarshan12/Isometrics-Healthcare-Multi-Tenant-SaaS-Analytics-Platform',
    problem: [
      'Healthcare SaaS platforms face a critical challenge: delivering powerful analytics to 100+ hospital customers while ensuring absolute data isolation. A single data leak = $50K HIPAA fine per record.',
      'The Multi-Tenant Dilemma:',
      '• Dedicated infrastructure per hospital = 10x cost overhead',
      '• Shared infrastructure without isolation = catastrophic HIPAA violation risk',
      '• Manual access controls = human error vulnerability',
      '• Application-level security = bypassed by SQL access',
      '• Inconsistent de-identification = compliance gaps',
      'Performance at Scale:',
      '• 500K+ daily encounters across all tenants',
      '• Real-time analytics SLA (<2 hour freshness)',
      '• Complex clinical quality metrics (30-day readmissions, mortality rates)',
      '• Revenue cycle analytics (AR aging, collection rates)',
      '• Provider performance scorecards'
    ],
    solution: [
      'Engineered a production-grade multi-tenant healthcare analytics platform using Snowflake Row-Level Security (RLS) as the enforcement mechanism—not application code. Built a complete dbt-driven transformation pipeline (Staging → Intermediate → Marts) with incremental processing, automated data quality checks, and comprehensive HIPAA compliance features.',
      'Security Architecture:',
      '• Database-enforced RLS policies on `hospital_id` column (not bypassable)',
      '• Dual-tier policies: `hospital_isolation_policy` + `phi_access_policy`',
      '• Break-glass access for admins with full audit logging',
      '• HIPAA Safe Harbor de-identification (3-digit ZIP, date truncation, hashed PII)',
      'Performance Optimizations:',
      '• Incremental models with merge strategy (96% faster than full refresh)',
      '• Clustering by `(hospital_id, date)` for 80% query speedup',
      '• Materialized views for sub-second dashboard queries',
      '• Cost-optimized warehouse auto-suspend'
    ],
    approach: [
      'Multi-Tenant Security Design: Implemented Snowflake Row-Level Security with two-tier policy architecture—`hospital_isolation_policy` for general isolation and `phi_access_policy` for PHI-containing tables. Used user-hospital mapping table instead of session variables for enterprise-grade access control with full audit trail.',
      'HIPAA-Compliant Data De-identification: Applied HIPAA Safe Harbor methodology in staging layer—truncated ZIP codes to 3 digits, removed direct identifiers (names, MRN), hashed SSN/phone/email with SHA-256, kept only year of birth for age calculations. Marked all PHI-containing models in dbt metadata.',
      'Medallion Architecture with dbt: Built 47 dbt models across three layers: Staging (bronze) for raw data ingestion, Intermediate (silver) for business logic enrichment, Marts (gold) for analytics-ready dimensional models. All transformations version-controlled and CI/CD tested.',
      'Incremental Processing Strategy: Implemented merge-based incremental models for high-volume fact tables (encounters, billing transactions) using `unique_key` and `incremental_strategy=merge`. Achieved 96% performance improvement (45s vs 12m) with proper clustering by `(hospital_id, date)`.',
      'Automated Data Quality Framework: Created 89 automated tests including: generic tests for RLS column presence, singular tests for cross-tenant leakage prevention, custom tests for readmission logic validation, schema contract enforcement with `on_schema_change=fail`.',
      'Clinical Quality Metrics: Developed fact tables for clinical KPIs—30-day readmission rates per CMS methodology, mortality rates by diagnosis severity, length of stay benchmarks by encounter type, patient risk stratification (high/medium/low), 7-day ED return rates.',
      'Revenue Cycle Analytics: Built billing transaction mart with AR aging buckets (0-30, 31-60, 61-90, 90+ days), collection rate calculations, denial reason tracking, payer mix analysis, expected vs actual payment variance detection.',
      'Operational Metrics: Engineered daily operational fact tables tracking bed occupancy rates, provider productivity (encounters per day), facility utilization, patient flow patterns (admission sources, discharge dispositions), weekend vs weekday admission trends.',
      'SCD Type 2 for Historical Tracking: Implemented dbt snapshots for slowly changing dimensions (hospitals, providers, facilities) using check strategy to capture contract tier changes, bed count updates, provider specialty transitions with valid_from/valid_to timestamps.',
      'Comprehensive Documentation: Generated dbt docs with lineage DAGs, created architecture decision records (ADRs), wrote incident runbooks for RLS column missing scenarios, documented tenant onboarding procedures, maintained HIPAA compliance checklists.',
      'CI/CD Pipeline: Configured GitHub Actions for automated testing on pull requests, slim CI using state:modified for faster feedback, production deployment with approval gates, Elementary data observability integration for monitoring.',
      'Monitoring & Observability: Built SLA monitoring fact tables (data freshness, quality score, pipeline status), cost attribution views per hospital, HIPAA audit trail placeholders (production uses `account_usage.query_history`), performance degradation alerts.'
    ],
    techCategories: [
      {
        category: 'Transformation & Orchestration',
        tools: ['dbt Core 1.7.0', 'dbt-snowflake', 'Jinja Templating', 'dbt Macros', 'dbt Tests', 'dbt Snapshots', 'dbt Docs'],
        icon: 'RefreshCw',
        color: 'from-orange-500 to-orange-600',
        description: 'Data transformation pipelines and workflow orchestration for analytics engineering'
      },
      {
        category: 'Data Warehouse',
        tools: ['Snowflake', 'Row-Level Security Policies', 'Snowflake Streams (CDC)', 'Snowflake Tasks', 'Clustering Keys', 'Materialized Views'],
        icon: 'Database',
        color: 'from-blue-400 to-blue-500',
        description: 'Cloud data platform with advanced security, CDC capabilities, and performance optimization'
      },
      {
        category: 'Security & Compliance',
        tools: ['RLS Policies', 'HIPAA Safe Harbor De-identification', 'SHA-256 Hashing', 'Audit Logging', 'Break-Glass Access Controls'],
        icon: 'ShieldCheck',
        color: 'from-red-500 to-red-600',
        description: 'Enterprise-grade security controls and HIPAA compliance mechanisms for healthcare data'
      },
      {
        category: 'Data Quality',
        tools: ['dbt Generic Tests', 'dbt Singular Tests', 'Schema Contracts', 'Cross-Tenant Leakage Tests', 'Elementary Data Observability'],
        icon: 'CheckSquare',
        color: 'from-emerald-500 to-emerald-600',
        description: 'Comprehensive testing framework ensuring data accuracy, consistency, and tenant isolation'
      },
      {
        category: 'Development & CI/CD',
        tools: ['GitHub Actions', 'Docker', 'Python 3.11', 'Faker (Synthetic Data)', 'Pandas', 'NumPy'],
        icon: 'GitBranch',
        color: 'from-purple-500 to-purple-600',
        description: 'Modern development workflow with containerization, automation, and synthetic data generation'
      },
      {
        category: 'Observability',
        tools: ['Streamlit Dashboard', 'SLA Monitoring Views', 'Cost Attribution Tables', 'Performance Metrics', 'Data Quality Scorecards'],
        icon: 'Activity',
        color: 'from-amber-500 to-orange-500',
        description: 'Real-time monitoring and visualization of system health, costs, and data quality metrics'
      }
    ],
    architectureOverview: 'Medallion Architecture with Multi-Tenant Isolation:\n\nBronze Layer (Staging):\n• Raw data ingestion with HIPAA de-identification\n• 3-digit ZIP truncation, PII hashing, date masking\n• RLS policies applied at this layer\n• Source: EMR systems (Epic, Cerner, Meditech)\n\nSilver Layer (Intermediate):\n• Business logic enrichment (patient journey, revenue cycle)\n• Calculated fields (age groups, LOS, readmission flags)\n• Ephemeral models for performance\n\nGold Layer (Marts):\n• Analytics-ready dimensional models\n• Fact tables: encounters, billing, clinical quality, operational metrics\n• SCD Type 2 snapshots for historical tracking\n• Clustered by `(hospital_id, date)` for query performance\n\nSecurity Enforcement:\n• Row-Level Security policies on ALL layers\n• User-hospital mapping table for access control\n• Dual-tier policies: isolation + PHI protection\n• Full audit trail in `account_usage.query_history`',
    implementationCode: [
      {
        lang: 'sql',
        title: 'Snowflake Row-Level Security Policy (Hospital Isolation)',
        code: `-- HIPAA-Compliant Multi-Tenant Isolation Policy
CREATE OR REPLACE ROW ACCESS POLICY hospital_isolation_policy
AS (hospital_id VARCHAR) RETURNS BOOLEAN ->
  CASE
    -- ACCOUNTADMIN and SYSADMIN see everything (break-glass)
    WHEN CURRENT_ROLE() IN ('ACCOUNTADMIN', 'SYSADMIN') THEN TRUE

    -- DBT development role (blanket access in dev environments)
    WHEN CURRENT_ROLE() = 'DBT_DEV_ROLE' AND
         CURRENT_DATABASE() LIKE '%_DEV' THEN TRUE

    -- Hospital-specific analyst roles (role name contains hospital_id)
    WHEN CURRENT_ROLE() LIKE 'HOSPITAL_%_ANALYST' THEN
      hospital_id = REGEXP_REPLACE(CURRENT_ROLE(), 'HOSPITAL_(.*)_ANALYST', '\\1')

    -- Generic hospital analyst (uses mapping table)
    WHEN CURRENT_ROLE() = 'HOSPITAL_ANALYST' THEN
      EXISTS (
        SELECT 1
        FROM AUDIT.user_hospital_mapping m
        WHERE m.user_name = CURRENT_USER()
          AND m.hospital_id = hospital_id
          AND CURRENT_DATE() BETWEEN m.access_start_date AND m.access_end_date
      )

    -- Production dbt role (blanket access in prod)
    WHEN CURRENT_ROLE() = 'DBT_PROD_ROLE' AND
         CURRENT_DATABASE() LIKE '%_PROD' THEN TRUE

    -- Default: DENY (fail-secure)
    ELSE FALSE
  END
COMMENT = 'HIPAA-compliant hospital isolation - All access logged';

-- Apply policy to all mart tables
ALTER TABLE fct_encounters ADD ROW ACCESS POLICY hospital_isolation_policy ON (hospital_id);
ALTER TABLE fct_billing_transactions ADD ROW ACCESS POLICY hospital_isolation_policy ON (hospital_id);`
      },
      {
        lang: 'sql',
        title: 'HIPAA Safe Harbor De-identification (Staging Layer)',
        code: `-- stg_healthcare__patients.sql
-- Implements HIPAA Safe Harbor de-identification
{{
  config(
    materialized='view',
    tags=['staging', 'bronze', 'patients'],
    meta={
      'contains_phi': true,
      'phi_fields': ['date_of_birth', 'zip_code'],
      'owner': 'healthcare-data-team@company.com'
    }
  )
}}

with source as (
    select * from {{ source('healthcare', 'raw_patients') }}
),

deidentified as (
    select
        -- Primary Key
        patient_id,

        -- Foreign Keys
        hospital_id,  -- 🔒 CRITICAL for RLS

        -- NOTE: We're NOT selecting first_name, last_name, mrn
        -- Those stay in raw layer for authorized access only

        date_of_birth,  -- Required for age calculations

        -- Calculate age (de-identified)
        datediff('year', date_of_birth, current_date()) as age_years,

        -- Age group classification
        case
            when datediff('year', date_of_birth, current_date()) < 18 then 'Pediatric'
            when datediff('year', date_of_birth, current_date()) between 18 and 64 then 'Adult'
            when datediff('year', date_of_birth, current_date()) >= 65 then 'Geriatric'
            else 'Unknown'
        end as age_group,

        gender,
        race,
        ethnicity,

        -- HIPAA Safe Harbor: Zip code first 3 digits only
        left(zip_code, 3) as zip_code_3digit,

        primary_language,
        marital_status,

        -- Metadata
        _loaded_at as loaded_at_timestamp

    from source
)

select * from deidentified`
      },
      {
        lang: 'sql',
        title: 'Incremental Merge Strategy (High-Volume Fact Table)',
        code: `-- fct_encounters.sql
-- Incremental strategy: delete+insert for performance
{{
  config(
    materialized='incremental',
    unique_key='encounter_id',
    incremental_strategy='delete+insert',
    cluster_by=['hospital_id', 'admission_date_day'],
    on_schema_change='fail',
    tags=['marts', 'incremental', 'encounters']
  )
}}

with enriched_encounters as (
    select * from {{ ref('int_encounters__enriched') }}
),

final as (
    select
        -- Keys
        encounter_id,
        hospital_id,  -- 🔒 CRITICAL for RLS
        patient_id,
        provider_id,

        -- Hospital Context
        hospital_name,
        hospital_type,
        region,

        -- Patient Demographics
        age_years,
        age_group,
        gender,

        -- Clinical Details
        encounter_type,
        admission_date,
        discharge_date,
        length_of_stay,
        total_charges,

        -- Quality Indicators
        is_readmission,
        is_mortality,

        -- Date Dimensions (for partitioning)
        admission_date_day,
        admission_date_month,
        admission_date_quarter,

        -- Metadata
        loaded_at_timestamp,
        current_timestamp() as _dbt_updated_at

    from enriched_encounters

    {% if is_incremental() %}
        -- Incremental logic: Only process new or updated encounters
        where loaded_at_timestamp > (
            select max(loaded_at_timestamp)
            from {{ this }}
        )
    {% endif %}
)

select * from final`
      },
      {
        lang: 'sql',
        title: 'Clinical Quality Metrics (30-Day Readmissions)',
        code: `-- fct_clinical_quality_metrics.sql
-- CMS-compliant readmission rate calculation
{{ config(
    materialized='table',
    tags=['marts', 'clinical', 'quality'],
    cluster_by=['hospital_id', 'metric_date']
) }}

with patient_journey as (
    select * from {{ ref('int_patient__journey') }}
),

base_metrics as (
    select
        hospital_id,
        admission_date_day as metric_date,

        -- Volume Metrics
        count(distinct encounter_id) as total_encounters,
        count(distinct case when encounter_type = 'Inpatient' then encounter_id end)
            as inpatient_encounters,

        -- 30-Day Readmissions (CMS methodology)
        sum(case when is_30day_return then 1 else 0 end) as readmissions_30day,

        -- Denominator: All inpatient discharges
        count(distinct case when encounter_type = 'Inpatient' then encounter_id end)
            as inpatient_denominator,

        -- Mortality
        sum(case when is_mortality then 1 else 0 end) as mortality_count,

        -- Length of Stay
        avg(length_of_stay) as avg_length_of_stay,
        percentile_cont(0.5) within group (order by length_of_stay) as median_los,

        -- Risk Stratification
        count(distinct case when patient_risk_category = 'High Risk' then patient_id end)
            as high_risk_patients,

        current_timestamp() as _dbt_loaded_at

    from patient_journey
    group by hospital_id, admission_date_day
)

select
    *,

    -- CMS 30-Day Readmission Rate
    {{ calculate_readmission_rate('is_readmission', 'encounter_type') }}
        as readmission_rate_30day_pct,

    -- Mortality Rate
    case
        when total_encounters > 0
        then (mortality_count * 100.0) / total_encounters
        else 0
    end as mortality_rate_pct

from base_metrics`
      },
      {
        lang: 'sql',
        title: 'Cross-Tenant Leakage Prevention Test',
        code: `-- tests/singular/assert_no_cross_hospital_encounters.sql
-- CRITICAL TEST: Ensure no encounters reference patients from different hospitals

select
    e.encounter_id,
    e.hospital_id as encounter_hospital,
    p.hospital_id as patient_hospital,
    '🚨 CRITICAL: Cross-tenant data leakage detected!' as error_message
from {{ ref('stg_healthcare__encounters') }} e
join {{ ref('stg_healthcare__patients') }} p
    on e.patient_id = p.patient_id
where e.hospital_id != p.hospital_id  -- Violation!`
      },
      {
        lang: 'python',
        title: 'Synthetic Healthcare Data Generator (HIPAA-Safe)',
        code: `"""
IsoMetrics Healthcare Data Generator
Generates realistic multi-tenant healthcare data with HIPAA compliance
"""
import pandas as pd
import hashlib
from faker import Faker
from datetime import timedelta
import random

fake = Faker()
Faker.seed(42)

def generate_patients(hospital: pd.Series, num_patients: int) -> pd.DataFrame:
    """Generate HIPAA-safe synthetic patient data"""
    patients = []

    for i in range(num_patients):
        gender = random.choice(['M', 'F', 'Other'])
        dob = fake.date_of_birth(minimum_age=0, maximum_age=95)

        patients.append({
            'patient_id': f'PAT_{i:010d}',
            'hospital_id': hospital['hospital_id'],  # Tenant isolation

            # PHI fields (would be in raw layer only in production)
            'mrn': f"{hospital['hospital_id']}-{i:08d}",
            'ssn_hash': hashlib.sha256(f"SSN-{i}".encode()).hexdigest()[:16],
            'first_name': fake.first_name_male() if gender == 'M' else fake.first_name_female(),
            'last_name': fake.last_name(),

            # De-identified fields (exposed in staging)
            'date_of_birth': dob,
            'gender': gender,
            'race': random.choice(['White', 'Black', 'Asian', 'Hispanic', 'Other']),
            'zip_code': fake.zipcode(),  # Would be truncated to 3 digits in staging
            'phone_number_hash': hashlib.sha256(fake.phone_number().encode()).hexdigest()[:16],
        })

    return pd.DataFrame(patients)

def generate_encounters(hospital_id: str, num_encounters: int) -> pd.DataFrame:
    """Generate clinical encounter events"""
    encounters = []

    for i in range(num_encounters):
        enc_type = random.choices(
            ['Inpatient', 'Outpatient', 'Emergency', 'Observation'],
            weights=[0.20, 0.50, 0.25, 0.05]
        )[0]

        admission_dt = fake.date_time_this_year()
        los = calculate_los(enc_type)  # Realistic LOS by type
        discharge_dt = admission_dt + timedelta(days=los)

        encounters.append({
            'encounter_id': f'ENC_{i:012d}',
            'hospital_id': hospital_id,  # Tenant isolation key
            'patient_id': f'PAT_{random.randint(1, 10000):010d}',
            'admission_date': admission_dt,
            'discharge_date': discharge_dt,
            'length_of_stay': los,
            'encounter_type': enc_type,
            'total_charges': calculate_charges(enc_type, los),
            'is_readmission': random.random() < 0.05  # 5% readmission rate
        })

    return pd.DataFrame(encounters)`
      },
      {
        lang: 'yaml',
        title: 'dbt Model Configuration with HIPAA Metadata',
        code: `# models/staging/healthcare/_healthcare__models.yml
version: 2

models:
  - name: stg_healthcare__patients
    description: >
      ⚠️ PHI WARNING: Patient demographics (partially de-identified).
      Names and MRN remain in raw layer only.
    meta:
      contains_phi: true
      phi_fields: ['date_of_birth', 'zip_code_3digit']
      owner: 'healthcare-data-team@company.com'
    columns:
      - name: patient_id
        description: "De-identified patient ID"
        tests:
          - not_null
          - unique
      - name: hospital_id
        description: "🔒 CRITICAL: Hospital identifier for RLS"
        tests:
          - not_null
          - relationships:
              to: ref('stg_healthcare__hospitals')
              field: hospital_id
      - name: age_years
        description: "Current age in years (de-identified)"
        tests:
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 120
      - name: zip_code_3digit
        description: "HIPAA Safe Harbor: First 3 digits of ZIP only"
        tests:
          - not_null

  - name: stg_healthcare__encounters
    description: >
      ⚠️ PHI WARNING: Patient encounters (admissions/visits).
      Primary fact table for healthcare analytics.
    meta:
      contains_phi: true
      phi_fields: ['admission_date', 'discharge_date']
    tests:
      - no_cross_tenant_leakage:  # Custom test
          tenant_column: hospital_id
    columns:
      - name: encounter_id
        tests:
          - not_null
          - unique
      - name: hospital_id
        description: "🔒 CRITICAL for RLS"
        tests:
          - not_null
      - name: length_of_stay
        tests:
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 365`
      },
      {
        lang: 'yaml',
        title: 'GitHub Actions CI/CD Pipeline',
        code: `# .github/workflows/dbt_ci.yml
name: dbt CI/CD Pipeline

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  dbt_test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dbt
        run: |
          pip install dbt-core==1.7.0 dbt-snowflake

      - name: dbt deps
        run: dbt deps

      - name: dbt run (slim CI - modified models only)
        run: |
          dbt run --select state:modified+ --defer --state ./prod-manifest/
        env:
          SNOWFLAKE_ACCOUNT: \${{ secrets.SNOWFLAKE_ACCOUNT }}
          SNOWFLAKE_USER: \${{ secrets.SNOWFLAKE_USER }}
          SNOWFLAKE_PASSWORD: \${{ secrets.SNOWFLAKE_PASSWORD }}

      - name: dbt test (critical tests)
        run: |
          dbt test --select tag:critical

      - name: dbt test (RLS validation)
        run: |
          dbt test --select test_name:no_cross_tenant_leakage

  deploy_to_prod:
    needs: dbt_test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: dbt run (production)
        run: dbt run --target prod

      - name: dbt test (production)
        run: dbt test --target prod

      - name: Generate dbt docs
        run: |
          dbt docs generate
          dbt docs serve &`
      }
    ],
    duration: '4 months',
    role: 'Lead Analytics Engineer',
    status: 'Live Production',
    publishedDate: '2024-01'
  },
  {
    id: 'p5',
    slug: 'data-velocity-lambda-platform',
    title: 'DataVelocity – Metadata-Driven Lambda Architecture',
    domains: [Domain.DataEngineering],
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
    role: 'Lead Data Engineer',
    status: 'Live Production',
    publishedDate: '2024-01'
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
    role: 'Lead AI Engineer & Full-Stack Developer',
    status: 'Live Production',
    client: 'PCCOE Nigadi, Pune (Academic Project)',
    publishedDate: '2024-05'
  },
  {
    id: 'p4',
    slug: 'netflix-data-analysis',
    title: 'Netflix Content & Trend Analysis',
    domains: [Domain.DataScience],
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

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'customer-segmentation-analysis',
    title: 'Customer Segmentation & Association Analysis',
    image: customer_segmentation,
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
    publishedDate: '2025'
  },
  {
    id: 'cs2',
    slug: 'employee-churn-prediction',
    title: 'Employee Churn Prediction with Machine Learning',
    image: employee_churn,
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
    publishedDate: '2025'
  },
  {
    id: 'cs3',
    slug: 'house-price-prediction-app',
    title: 'House Price Prediction App (Machine Learning)',
    image: house_price,
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
    publishedDate: '2025'
  }
];
