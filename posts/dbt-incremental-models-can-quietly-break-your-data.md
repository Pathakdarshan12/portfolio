# dbt Incremental Models Can Quietly Break Your Data (Here's How to Fix It)

> **Warning**  
> *The worst data bugs are the ones you discover too late.*

## Let's Start Simple: What Even Is Incremental Loading?

Imagine you have a giant notebook where you write down every customer order. Every day, you need to update your master list.

*Option 1: Full Refresh (The Safe Way)*
- Erase your entire master list
- Copy everything from the notebook again
- Takes forever, but you know it's correct

*Option 2: Incremental (The Fast Way)*
- Only copy the new orders since yesterday
- Much faster, uses less resources
- But... what if you miss something?

## Why Incremental Models Look So Good

When you first learn about incremental models, they seem amazing. Instead of rebuilding entire tables every time, you only process new data. Your pipelines run faster. Your cloud costs drop. Everyone's happy.

```sql
{{ config(
    materialized='incremental',
    unique_key='order_id'
) }}

select * from {{ source('raw', 'orders') }}

{% if is_incremental() %}
    where created_at >= (select max(created_at) from {{ this }})
{% endif %}
```

But here's the catch: *When it breaks, it breaks silently.*

## Four Ways Incremental Models Fail Silently

### 1. Schema Changes You Don't Notice

Imagine this: Your source system adds a new column called `discount_amount`. Your incremental model keeps running every hour. Everything shows green. Dashboards look fine.

But now you have a problem. All records loaded *before* the new column have no discount data. All records loaded *after* have it. Your table is split—half complete, half incomplete.

> **Danger**
> *Why you won't notice:* The model doesn't fail. It keeps adding data to your existing table, just ignoring the new column. Your data checks might never catch this because nothing technically broke. You just stopped capturing important business information.

### 2. Duplicate Records Everywhere

This is the worst failure. Your `unique_key` isn't actually unique.

```sql
{{ config(
    materialized='incremental',
    unique_key='user_id',  -- WRONG!
    incremental_strategy='append'
) }}
```

You're tracking user events, but you used `user_id` as the unique key with append strategy. Every time the same user creates an event, you append it. User #1234 creates 50 events? You now have 50 rows with `user_id=1234`.

When someone asks "How many active users?" you count distinct user IDs... and get the right answer. But when someone asks "How many total events?" your number is way off.

> **Danger**
> *Why you won't notice:* Both queries return reasonable-looking numbers. The problem only shows up with certain types of counting. By the time someone notices, you have months of bad data.

*Real example:* A SaaS company was double-counting trial conversions. They thought their conversion rate was 4.2% when it was actually 2.1%. They almost doubled their marketing spend based on wrong numbers.

### 3. Late Data That Never Gets Loaded

Data doesn't arrive in order. An event from yesterday might show up today. A correction from last month might arrive now.

```sql
{% if is_incremental() %}
    where created_at > (select max(created_at) from {{ this }})
{% endif %}
```

This filter assumes data arrives in order. It doesn't.

When a late record arrives with `created_at = '2024-01-15'` and your table already has data through `2024-01-20`, this record gets filtered out. Forever. It's not bad data—just late. And your model ignored it.

> **Danger**
> *Why you won't notice:* No errors. No warnings. Just missing data. Unless you're checking against the source (most teams aren't), you'll never know those records disappeared.

*Real cost:* In financial services, one missing payment record can mean compliance violations and regulatory fines.

### 4. Partial Loads That Leave Gaps

Incremental runs aren't all-or-nothing by default. If your job processes 1 million records and crashes at record 750,000, you've loaded 750,000 records and lost 250,000.

Your table is now half-updated, half-stale. The next run might skip those missing records completely because it thinks everything up to that timestamp is done.

> **Danger**
> *Why you won't notice:* Your system marks the run as "failed," someone reruns it, it succeeds, everyone moves on. But there's now a permanent gap in your data that nobody knows about.

## How to Actually Protect Your Data

### Rule #1: Do Full Refreshes Regularly Anyway

Even with perfect logic, small errors compound over time. Schedule a complete rebuild:

* Weekly for critical tables
* Monthly for everything else
* During low-usage hours (weekends, nights)

Think of it like resetting your phone. Annoying but necessary.

### Rule #2: Count Everything, Every Time

After every incremental run, compare counts:

```sql
-- Source count
SELECT COUNT(*) FROM source_orders;
-- Result: 1,000,500

-- Target count
SELECT COUNT(*) FROM warehouse_orders;
-- Result: 1,000,350

-- You're missing 150 records. Why?
```

Set up automated alerts when counts don't match. Don't just trust that your job "succeeded."

### Rule #3: Reload Recent Data on Every Run

Instead of only grabbing "new" data, grab new data plus the last few days:

```sql
WHERE created_date >= (
  SELECT MAX(created_date) - 3 days
  FROM warehouse_table
)
```

This gives you three benefits:

* Catches late-arriving data
* Fixes records that were corrected in the source
* Gives you a safety buffer for weird edge cases

Yes, you're processing some records twice. That's the point. It's insurance.

### Rule #4: Your Unique Key Better Actually Be Unique

Test this. Don't assume.

```sql
SELECT
  order_id,
  COUNT(*) as how_many_times
FROM source_orders
GROUP BY order_id
HAVING COUNT(*) > 1;
```

If this returns any rows, your unique key isn't unique. Fix it before using incremental loading.

For event data, use something like event_id + timestamp + user_id. For dimension tables, use your natural business key (customer_id, product_sku, etc).

### Rule #5: Make Schema Changes Loud

Configure your incremental models to fail when columns are added or removed:

```yaml
config:
  materialized: incremental
  unique_key: order_id
  on_schema_change: fail
```

This forces you to make a decision: Do I need to backfill old data? Can I ignore this change? Should I do a full refresh?

Don't let schema changes happen silently.

### Rule #6: Don't Use Incremental Loading Unless You Really Need It

*Honest question:* How big is your table?

* Under 1 million rows? Just rebuild it every time.
* Under 10 million rows? Rebuild it.
* Under 50 million rows? Seriously consider rebuilding it.

The speed gain from incremental loading is often not worth the risk. Your warehouse is fast. Storage is cheap. Data quality problems are expensive.

---

## The Bottom Line

Incremental loading is a trade-off:

*You gain:*

* Faster pipelines
* Lower compute costs
* Less storage usage

*You risk:*

* Silent data corruption
* Missing records
* Duplicate data
* Months of wrong decisions

That's not a bad trade-off if you know what you're doing. But most teams don't set up proper safeguards.

---

## Quick Reference: When to Use Each Approach

*Full Refresh (Rebuild Everything):*

* Tables under 50 million rows
* Critical financial data
* Tables you can't afford to get wrong

*Incremental Loading (Only New Data):*

* Tables over 100 million rows
* Event logs that truly append-only
* When you have proper monitoring and reconciliation
* When you've been doing data engineering for a while

*The Gray Area (50–100 million rows):*

* Test both approaches
* Measure actual performance difference
* Consider cost vs. risk
* Default to full refresh unless incremental is clearly better

---

*Build defensively. Test obsessively. Trust nothing.*