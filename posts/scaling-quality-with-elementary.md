
# The Self-Healing Data Pipeline

Data observability is no longer a luxury. It's the foundation of a data-driven culture.

<warningbox title="CRITICAL RISK">
Silent data failures are worse than pipeline failures. If your dashboards show wrong numbers, your team's credibility is permanently damaged.
</warningbox>

## Quality Automation

We utilize Elementary to capture schema changes in real-time.

```yaml file="models/staging/schema.yml"
models:
  - name: stg_orders
    tests:
      - elementary.schema_changes
      - elementary.column_anomaly:
          column_name: order_amount
          anomaly_type: z_score
          threshold: 3
```

<successbox title="SUCCESS STORY">
By implementing anomaly detection, we caught a 400% spike in 'invalid_currency' records before they reached the CFO's monthly report.
</successbox>
