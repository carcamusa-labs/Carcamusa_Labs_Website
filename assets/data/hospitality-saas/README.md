# Hospitality SaaS — Financial Analysis (SQL)

End-to-end SQL analysis of a fictional **hospitality SaaS** business: monthly subscription revenue, churn, retention, unit economics, and profitability versus operating costs.

## Overview

This project models a B2B SaaS product sold to hotels. Each hotel (`hotel_id`) has a monthly subscription record with base MRR, optional expansion MRR, and a churn flag. Operating costs are tracked monthly by category (cloud, support, sales & marketing).

The main script runs a **full KPI suite** in sequence:

| KPI | Description |
|-----|-------------|
| **MRR** | Monthly Recurring Revenue (base MRR + expansion) |
| **ARR** | Annualized run rate (MRR × 12) |
| **Churn rate** | Share of active customers who churned in the month |
| **NRR** | Net Revenue Retention (expansion and churn impact on MRR) |
| **ARPA** | Average Revenue Per Account |
| **Profitability** | Monthly revenue, costs, profit, and margin % |
| **Sanity check** | Lifetime total revenue vs total costs and global profit |

## Repository structure

```
sql-financial-analysis-hospitality/
├── complete-sql-financial-analysis-hospitality.sql   # All KPI queries
├── customers.csv          # Hotel master data (acquisition, size, country)
├── subscriptions.csv      # Monthly subscription facts (MRR, churn, expansion)
├── costs.csv              # Monthly operational costs
└── README.md
```

## Data model

### `customers.csv`

| Column | Description |
|--------|-------------|
| `hotel_id` | Unique hotel identifier |
| `country` | Hotel location |
| `hotel_size` | Room count (proxy for property size) |
| `acquisition_channel` | `sales`, `partner`, or `inbound` |
| `start_date` | Customer start date |

### `subscriptions.csv`

| Column | Description |
|--------|-------------|
| `hotel_id` | Links to `customers` |
| `month` | Reporting month (`YYYY-MM`) |
| `plan` | Subscription tier |
| `mrr` | Base monthly recurring revenue |
| `churn_flag` | `1` if the hotel churned that month, else `0` |
| `expansion_mrr` | Additional MRR from upsell/expansion |

### `costs.csv`

| Column | Description |
|--------|-------------|
| `month` | Reporting month (`YYYY-MM`) |
| `cloud_costs` | Infrastructure spend |
| `support_costs` | Customer support spend |
| `sales_marketing_costs` | Go-to-market spend |

## Requirements

- **Database:** Microsoft SQL Server (or Azure SQL) — queries use T-SQL (`ISNULL`, `CAST`, `DECIMAL` precision).
- **Data load:** Import the three CSV files as tables named `customers`, `subscriptions`, and `costs` (matching the script).

### Quick start (SQL Server)

1. Create a database and import the CSVs (e.g. **Import Flat File** in SSMS, or `BULK INSERT` / `OPENROWSET` with a format file).
2. Open `complete-sql-financial-analysis-hospitality.sql`.
3. Run each query block separately (blocks are separated by section comments), or execute the full file if your client supports multiple batches.

> **Note:** The KPI script uses `subscriptions` and `costs`. The `customers` table is included for segmentation and future analysis (country, channel, hotel size).

## KPI definitions (as implemented)

- **MRR:** `SUM(mrr + expansion_mrr)` per month (expansion treated as additive recurring revenue).
- **ARR:** `MRR × 12` for the same month.
- **Churn rate:** `churned_customers / active_customers × 100`, where active customers are distinct `hotel_id` per month.
- **NRR:** `(base_mrr + expansion_mrr − churned_mrr) / base_mrr × 100`, with churned MRR summed only where `churn_flag = 1`.
- **ARPA:** Total MRR (including expansion) divided by distinct active hotels per month.
- **Profit margin:** `(revenue − costs) / revenue × 100` per month.

Division-by-zero cases return `NULL` instead of failing the query.

## Example use cases

- Board or investor reporting on SaaS health metrics
- Portfolio / case study for data analyst or BI roles
- Teaching recurring-revenue metrics in a hospitality or vertical-SaaS context

## License

Add a license file if you plan to share publicly (e.g. MIT). This repo ships sample data for learning and demonstration.

## Contributing

Feel free to open issues or pull requests with improvements, additional KPIs, or dialect ports (PostgreSQL, BigQuery, etc.).
