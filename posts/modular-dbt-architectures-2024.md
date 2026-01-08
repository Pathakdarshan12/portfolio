
# Mastering Modular dbt

Building a data platform in 2024 isn't just about moving data; it's about building a **scalable software product**. In this post, we explore how to structure dbt projects that don't just work, but thrive under pressure.

## Why Modularity Matters

When projects grow, "spaghetti SQL" becomes the primary bottleneck. By applying modular principles, we achieve:
- **Faster CI/CD**: Only test what changed.
- **Lower Costs**: Optimize compute through incremental logic.
- **Higher Trust**: Clear data lineage and ownership.

<infobox title="PRO TIP">
Always use a four-layer architecture: Staging, Intermediate, Marts, and Reporting. This creates a clear path from raw source to business value.
</infobox>

<metricscard 
  title="Impact of Modular Design"
  items='[{"label": "Build Time Reduction", "value": "45%", "icon": "Zap"}, {"label": "Schema Drift Coverage", "value": "100%", "icon": "ShieldCheck"}, {"label": "Self-Service Users", "value": "200+", "icon": "Users"}]' 
/>

## Implementation Detail

Here is how we handle complex healthcare patient transformations. Notice the incremental strategy.

```sql file="marts/healthcare/fct_patient_visits.sql"
{{ config(materialized='incremental', unique_key='visit_id') }}

with staging as (
    select * from {{ ref('stg_healthcare__visits') }}
    {% if is_incremental() %}
    where visit_date >= (select max(visit_date) from {{ this }})
    {% endif %}
),

final as (
    select
        visit_id,
        patient_id,
        visit_date,
        diagnosis_code,
        {{ dbt_utils.generate_surrogate_key(['patient_id', 'visit_date']) }} as visit_hash
    from staging
)

select * from final
```

<tipbox>
Use the `dbt_utils.generate_surrogate_key` macro early in your staging layer to ensure consistent identity throughout the DAG.
</tipbox>

## Technical Stack Used

<techstack 
  groups='[{"category": "Storage", "tools": ["Snowflake", "S3"]}, {"category": "Transformation", "tools": ["dbt Core", "Python"]}, {"category": "Quality", "tools": ["Elementary", "Monte Carlo"]}]' 
/>

## Architecture Overview

<architecturediagram 
  src="https://images.unsplash.com/photo-1558494949-ef8b56821822?auto=format&fit=crop&q=80&w=1200"
  caption="Flow from raw sources through a multi-layered Snowflake architecture."
/>

### Key Takeaways
1. **Decouple Sources**: Staging should do nothing but rename and cast.
2. **Abstract Logic**: Use Intermediate models for complex joins.
3. **Automate Quality**: If it isn't tested, it's broken.
