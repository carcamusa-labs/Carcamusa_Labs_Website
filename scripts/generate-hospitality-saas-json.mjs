import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceDir = path.join(root, "assets/data/hospitality-saas");

function parseCsv(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index]?.trim() ?? ""]));
  });
}

function num(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function groupBy(rows, keyFn) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  }
  return map;
}

const subscriptions = parseCsv(fs.readFileSync(path.join(sourceDir, "subscriptions.csv"), "utf8")).map(
  (row) => ({
    hotel_id: row.hotel_id,
    month: row.month,
    plan: row.plan,
    mrr: num(row.mrr),
    churn_flag: num(row.churn_flag),
    expansion_mrr: num(row.expansion_mrr),
  }),
);

const costs = parseCsv(fs.readFileSync(path.join(sourceDir, "costs.csv"), "utf8")).map((row) => ({
  month: row.month,
  cloud_costs: num(row.cloud_costs),
  support_costs: num(row.support_costs),
  sales_marketing_costs: num(row.sales_marketing_costs),
}));

const months = [...new Set(subscriptions.map((row) => row.month))].sort();

const mrrRows = months.map((month) => {
  const monthRows = subscriptions.filter((row) => row.month === month);
  const total_mrr = round(
    monthRows.reduce((sum, row) => sum + row.mrr + row.expansion_mrr, 0),
  );
  return { month, total_mrr };
});

const arrRows = mrrRows.map((row) => ({
  month: row.month,
  total_mrr: row.total_mrr,
  arr: round(row.total_mrr * 12),
}));

const churnRows = months.map((month) => {
  const monthRows = subscriptions.filter((row) => row.month === month);
  const active_customers = new Set(monthRows.map((row) => row.hotel_id)).size;
  const churned_customers = monthRows.reduce((sum, row) => sum + row.churn_flag, 0);
  const churn_rate_percentage =
    active_customers === 0 ? null : round((churned_customers * 100) / active_customers);
  return { month, active_customers, churned_customers, churn_rate_percentage };
});

const nrrRows = months.map((month) => {
  const monthRows = subscriptions.filter((row) => row.month === month);
  const base_mrr = monthRows.reduce((sum, row) => sum + row.mrr, 0);
  const expansion_mrr = monthRows.reduce((sum, row) => sum + row.expansion_mrr, 0);
  const churned_mrr = monthRows.reduce(
    (sum, row) => sum + (row.churn_flag === 1 ? row.mrr : 0),
    0,
  );
  const nrr_percentage =
    base_mrr === 0 ? null : round(((base_mrr + expansion_mrr - churned_mrr) * 100) / base_mrr);
  return { month, nrr_percentage };
});

const arpaRows = months.map((month) => {
  const monthRows = subscriptions.filter((row) => row.month === month);
  const total_revenue = monthRows.reduce((sum, row) => sum + row.mrr + row.expansion_mrr, 0);
  const total_customers = new Set(monthRows.map((row) => row.hotel_id)).size;
  const arpa = total_customers === 0 ? null : round(total_revenue / total_customers);
  return { month, arpa };
});

const costByMonth = new Map(
  costs.map((row) => [
    row.month,
    round(row.cloud_costs + row.support_costs + row.sales_marketing_costs),
  ]),
);

const profitabilityRows = mrrRows.map((row) => {
  const revenue = row.total_mrr;
  const total_costs = costByMonth.get(row.month) ?? 0;
  const profit = round(revenue - total_costs);
  const profit_margin_percentage =
    revenue === 0 ? null : round((profit * 100) / revenue);
  return {
    month: row.month,
    revenue,
    costs: total_costs,
    profit,
    profit_margin_percentage,
  };
});

const total_revenue = round(
  subscriptions.reduce((sum, row) => sum + row.mrr + row.expansion_mrr, 0),
);
const total_costs = round(
  costs.reduce(
    (sum, row) => sum + row.cloud_costs + row.support_costs + row.sales_marketing_costs,
    0,
  ),
);
const sanityRows = [
  {
    total_revenue,
    total_costs,
    total_profit: round(total_revenue - total_costs),
  },
];

const sqlPath = path.join(sourceDir, "complete-sql-financial-analysis-hospitality.sql");
const sqlFile = fs.readFileSync(sqlPath, "utf8");

function extractSql(blockTitle) {
  const marker = `KPI: ${blockTitle}`;
  const start = sqlFile.indexOf(marker);
  if (start === -1) return "";
  const slice = sqlFile.slice(start);
  const selectStart = slice.indexOf("SELECT");
  const end = slice.indexOf("/*", selectStart);
  const block = end === -1 ? slice.slice(selectStart) : slice.slice(selectStart, end);
  return block.trim();
}

const sanitySqlStart = sqlFile.indexOf("WITH subscription_totals");
const sanitySql =
  sanitySqlStart === -1 ? "" : sqlFile.slice(sanitySqlStart).trim();

const showcase = {
  projectTitle: "Hospitality SaaS — Financial Analysis",
  projectSubtitle: "SQL KPI suite · sample portfolio demo",
  disclaimer:
    "Results shown use representative sample data exported for this static demo. In production, the same queries would run against live subscription and cost tables.",
  queries: [
    {
      id: "mrr",
      buttonLabel: "MRR",
      title: "Monthly Recurring Revenue (MRR)",
      description:
        "Aggregates base MRR plus expansion MRR by month. This is the core pulse of recurring revenue — useful for tracking growth trends and seasonality across hotel subscriptions.",
      sql: extractSql("Monthly Recurring Revenue (MRR)"),
      columns: ["month", "total_mrr"],
      rows: mrrRows,
    },
    {
      id: "arr",
      buttonLabel: "ARR",
      title: "Annual Recurring Revenue (ARR)",
      description:
        "Annualizes each month's MRR (× 12) to express run-rate revenue. Helpful when comparing SaaS performance to annual targets or investor benchmarks.",
      sql: extractSql("Annual Recurring Revenue (ARR)"),
      columns: ["month", "total_mrr", "arr"],
      rows: arrRows,
    },
    {
      id: "churn",
      buttonLabel: "Churn",
      title: "Churn Rate",
      description:
        "Shows active hotels per month, how many churned, and churn as a percentage. Spikes highlight retention issues worth investigating by segment or cohort.",
      sql: extractSql("Churn Rate (%)"),
      columns: ["month", "active_customers", "churned_customers", "churn_rate_percentage"],
      rows: churnRows,
    },
    {
      id: "nrr",
      buttonLabel: "NRR",
      title: "Net Revenue Retention (NRR)",
      description:
        "Measures how much existing revenue is retained after expansion and churn. Values above 100% mean expansion outweighs lost MRR — a strong SaaS health signal.",
      sql: extractSql("Net Revenue Retention (NRR)"),
      columns: ["month", "nrr_percentage"],
      rows: nrrRows,
    },
    {
      id: "arpa",
      buttonLabel: "ARPA",
      title: "Average Revenue Per Account (ARPA)",
      description:
        "Total monthly recurring revenue divided by active hotels. Tracks whether monetization per customer is improving, independent of customer count.",
      sql: extractSql("Average Revenue Per Account (ARPA)"),
      columns: ["month", "arpa"],
      rows: arpaRows,
    },
    {
      id: "profitability",
      buttonLabel: "Profitability",
      title: "Profitability (Revenue vs Costs)",
      description:
        "Joins subscription revenue with operational costs (cloud, support, sales & marketing) to show monthly profit and margin. Surfaces months where growth spending outpaces revenue.",
      sql: extractSql("Profitability (Revenue vs Costs)"),
      columns: ["month", "revenue", "costs", "profit", "profit_margin_percentage"],
      rows: profitabilityRows,
    },
    {
      id: "sanity",
      buttonLabel: "Sanity Check",
      title: "Total Revenue vs Total Costs",
      description:
        "A closing sanity check: lifetime accumulated revenue against total operating costs. Confirms whether the business is globally profitable beyond month-to-month noise.",
      sql: sanitySql,
      columns: ["total_revenue", "total_costs", "total_profit"],
      rows: sanityRows,
    },
  ],
};

const outDir = path.join(root, "assets/json/hospitality-saas-showcase");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "queries.json"), `${JSON.stringify(showcase, null, 2)}\n`, "utf8");

const sqlOutDir = path.join(root, "assets/data/hospitality-saas");
fs.mkdirSync(sqlOutDir, { recursive: true });
fs.copyFileSync(sqlPath, path.join(sqlOutDir, "complete-sql-financial-analysis-hospitality.sql"));

console.log(`Wrote ${showcase.queries.length} queries to assets/json/hospitality-saas-showcase/queries.json`);
