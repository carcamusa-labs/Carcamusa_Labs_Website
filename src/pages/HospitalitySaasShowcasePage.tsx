import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { useTranslation } from "../i18n/useTranslation";
import { assetUrl } from "../utils/assetUrl";

interface ShowcaseQuery {
  id: string;
  buttonLabel: string;
  title: string;
  description: string;
  sql: string;
  columns: string[];
  rows: Record<string, string | number | null>[];
}

interface ShowcaseData {
  projectTitle: string;
  projectSubtitle: string;
  disclaimer: string;
  queries: ShowcaseQuery[];
}

function formatCell(value: string | number | null, column: string): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") {
    if (column.includes("percentage")) return `${value}%`;
    if (Number.isInteger(value)) return value.toLocaleString("en-US");
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return String(value);
}

function formatColumnLabel(column: string): string {
  return column.replace(/_/g, " ");
}

export function HospitalitySaasShowcasePage() {
  const { t } = useTranslation();
  const [data, setData] = useState<ShowcaseData | null>(null);
  const [activeId, setActiveId] = useState<string>("mrr");

  useEffect(() => {
    document.title = "Carcamusa_Labs — Hospitality SaaS SQL Showcase";
    document.body.classList.add("sql-showcase-page");
    return () => {
      document.body.classList.remove("sql-showcase-page");
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(assetUrl("assets/json/hospitality-saas-showcase/queries.json"));
        const json = (await res.json()) as ShowcaseData;
        if (!cancelled) {
          setData(json);
          if (json.queries.length > 0) setActiveId(json.queries[0].id);
        }
      } catch (e) {
        console.error("Error loading showcase data:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeQuery = data?.queries.find((query) => query.id === activeId) ?? data?.queries[0];

  return (
    <>
      <SiteHeader byLine=" by Daniela Rosa" />

      <h1>
        <Link to="/" className="to_index">
          {t("common.index")}
        </Link>
      </h1>

      <main className="sql-showcase-main">
        {data ? (
          <>
            <h2 className="sql-showcase-page-heading">
              <span className="sql-showcase-page-title">{data.projectTitle}</span>
              <span className="sql-showcase-heading-sep" aria-hidden="true">
                {" · "}
              </span>
              <span className="sql-showcase-subtitle">{data.projectSubtitle}</span>
            </h2>
            <p className="sql-showcase-disclaimer">{data.disclaimer}</p>

            <nav className="sql-showcase-nav" aria-label="SQL KPI queries">
              {data.queries.map((query) => (
                <button
                  key={query.id}
                  type="button"
                  className={`sql-showcase-nav-btn${query.id === activeQuery?.id ? " is-active" : ""}`}
                  onClick={() => setActiveId(query.id)}
                  aria-pressed={query.id === activeQuery?.id}
                >
                  {query.buttonLabel}
                </button>
              ))}
            </nav>

            {activeQuery ? (
              <section
                key={activeQuery.id}
                className="sql-showcase-panel sql-showcase-panel-fade"
                aria-live="polite"
              >
                <div className="sql-showcase-panel-main">
                  <h3 className="sql-showcase-query-title">{activeQuery.title}</h3>

                  <p className="sql-showcase-block-label">[ QUERY ]</p>
                  <pre className="sql-showcase-code">
                    <code>{activeQuery.sql}</code>
                  </pre>

                  <p className="sql-showcase-block-label">[ RESULT ]</p>
                  <div className="sql-showcase-table-wrap sql-showcase-result-fade">
                    <table className="sql-showcase-table">
                      <thead>
                        <tr>
                          {activeQuery.columns.map((column) => (
                            <th key={column}>{formatColumnLabel(column)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeQuery.rows.map((row, rowIndex) => (
                          <tr key={`${activeQuery.id}-${rowIndex}`}>
                            {activeQuery.columns.map((column) => (
                              <td key={column}>{formatCell(row[column] ?? null, column)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="sql-showcase-row-count">
                    {activeQuery.rows.length} row{activeQuery.rows.length === 1 ? "" : "s"}
                  </p>
                </div>
                <aside className="sql-showcase-panel-aside">
                  <h4>About this query</h4>
                  <p>{activeQuery.description}</p>
                </aside>
              </section>
            ) : null}
          </>
        ) : (
          <p className="sql-showcase-loading">Loading showcase…</p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
