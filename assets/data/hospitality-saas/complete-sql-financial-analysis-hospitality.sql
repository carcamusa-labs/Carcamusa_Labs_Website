-- =========================================================
-- SAAS FINANCIAL ANALYSIS PROJECT
-- FULL KPI SUITE (MRR, ARR, CHURN, NRR, ARPA, PROFITABILITY)
-- =========================================================

/* =========================================================
   KPI: Monthly Recurring Revenue (MRR)
========================================================= */

SELECT
    month,
    CAST(ROUND(SUM(mrr + ISNULL(expansion_mrr, 0)), 2) AS DECIMAL(18, 2)) AS total_mrr
FROM subscriptions
GROUP BY month
ORDER BY month;


/* =========================================================
   KPI: Annual Recurring Revenue (ARR)
========================================================= */

WITH mrr AS (
    SELECT
        month,
        SUM(mrr + ISNULL(expansion_mrr, 0)) AS total_mrr
    FROM subscriptions
    GROUP BY month
)
SELECT
    month,
    CAST(ROUND(total_mrr, 2) AS DECIMAL(18, 2)) AS total_mrr,
    CAST(ROUND(total_mrr * 12, 2) AS DECIMAL(18, 2)) AS arr
FROM mrr
ORDER BY month;


/* =========================================================
   KPI: Churn Rate (%)
========================================================= */

WITH base AS (
    SELECT
        month,
        COUNT(DISTINCT hotel_id) AS active_customers,
        SUM(CAST(churn_flag AS INT)) AS churned_customers
    FROM subscriptions
    GROUP BY month
)
SELECT
    month,
    active_customers,
    churned_customers,
    CASE
        WHEN active_customers = 0 THEN NULL
        ELSE CAST(
            ROUND(churned_customers * 100.0 / active_customers, 2)
            AS DECIMAL(10, 2)
        )
    END AS churn_rate_percentage
FROM base
ORDER BY month;


/* =========================================================
   KPI: Net Revenue Retention (NRR)
========================================================= */

WITH base AS (
    SELECT
        month,
        SUM(mrr) AS base_mrr,
        SUM(ISNULL(expansion_mrr, 0)) AS expansion_mrr,
        SUM(CASE WHEN churn_flag = 1 THEN mrr ELSE 0 END) AS churned_mrr
    FROM subscriptions
    GROUP BY month
)
SELECT
    month,
    CASE
        WHEN base_mrr = 0 THEN NULL
        ELSE CAST(
            ROUND(
                (base_mrr + expansion_mrr - churned_mrr) * 100.0 / base_mrr,
                2
            )
            AS DECIMAL(10, 2)
        )
    END AS nrr_percentage
FROM base
ORDER BY month;


/* =========================================================
   KPI: Average Revenue Per Account (ARPA)
========================================================= */

WITH revenue AS (
    SELECT
        month,
        SUM(mrr + ISNULL(expansion_mrr, 0)) AS total_revenue
    FROM subscriptions
    GROUP BY month
),
customers AS (
    SELECT
        month,
        COUNT(DISTINCT hotel_id) AS total_customers
    FROM subscriptions
    GROUP BY month
)
SELECT
    r.month,
    CASE
        WHEN c.total_customers = 0 THEN NULL
        ELSE CAST(
            ROUND(r.total_revenue * 1.0 / c.total_customers, 2)
            AS DECIMAL(18, 2)
        )
    END AS arpa
FROM revenue AS r
INNER JOIN customers AS c
    ON r.month = c.month
ORDER BY r.month;


/* =========================================================
   KPI: Profitability (Revenue vs Costs)
========================================================= */

WITH revenue AS (
    SELECT
        month,
        SUM(mrr + ISNULL(expansion_mrr, 0)) AS total_revenue
    FROM subscriptions
    GROUP BY month
),
costs_cte AS (
    SELECT
        month,
        CAST(cloud_costs AS DECIMAL(18, 2))
        + CAST(support_costs AS DECIMAL(18, 2))
        + CAST(sales_marketing_costs AS DECIMAL(18, 2)) AS total_costs
    FROM costs
)
SELECT
    r.month,
    CAST(ROUND(r.total_revenue, 2) AS DECIMAL(18, 2)) AS revenue,
    CAST(ROUND(c.total_costs, 2) AS DECIMAL(18, 2)) AS costs,
    CAST(ROUND(r.total_revenue - c.total_costs, 2) AS DECIMAL(18, 2)) AS profit,
    CASE
        WHEN r.total_revenue = 0 THEN NULL
        ELSE CAST(
            ROUND(
                (r.total_revenue - c.total_costs) * 100.0 / r.total_revenue,
                2
            )
            AS DECIMAL(10, 2)
        )
    END AS profit_margin_percentage
FROM revenue AS r
INNER JOIN costs_cte AS c
    ON r.month = c.month
ORDER BY r.month;


-- =========================================================
-- FINAL CHECK: Total Revenue vs Total Costs (Sanity Check)
-- =========================================================
-- Purpose:
-- This final query validates the overall financial health
-- of the SaaS business by comparing total accumulated
-- recurring revenue against total operational costs.
--
-- This acts as a closing insight for the analysis,
-- confirming whether the company is profitable or not
-- at a global level (not monthly).
-- =========================================================

WITH subscription_totals AS (
    -- Total recurring revenue across all periods
    SELECT
        SUM(
            CAST(mrr AS DECIMAL(18, 2))
            + ISNULL(CAST(expansion_mrr AS DECIMAL(18, 2)), 0)
        ) AS total_revenue
    FROM subscriptions
),
cost_totals AS (
    -- Total operational costs across all periods
    SELECT
        SUM(
            CAST(cloud_costs AS DECIMAL(18, 2))
            + CAST(support_costs AS DECIMAL(18, 2))
            + CAST(sales_marketing_costs AS DECIMAL(18, 2))
        ) AS total_costs
    FROM costs
)
SELECT
    s.total_revenue,
    c.total_costs,
    s.total_revenue - c.total_costs AS total_profit  -- Global profit (final business outcome)
FROM subscription_totals AS s
CROSS JOIN cost_totals AS c;
