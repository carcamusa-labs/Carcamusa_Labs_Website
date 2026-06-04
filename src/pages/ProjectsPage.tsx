import { Link } from "react-router-dom";
import { InnerPageLayout } from "../components/InnerPageLayout";
import { useTranslation } from "../i18n/useTranslation";

export function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <InnerPageLayout titleKey="pageTitle.projects">
      <h2>{t("projects.heading")}</h2>
      <h3>{t("projects.subheading")}</h3>
      <div className="projects_grid_container_outer">
        <div className="grid_container_inner_left">
          <div className="grid_container_imageslot">
            <pre className="projects_sql_preview" aria-hidden="true">
              {`SELECT
  month,
  SUM(mrr + expansion_mrr)
    AS total_mrr
FROM subscriptions
GROUP BY month
ORDER BY month;`}
            </pre>
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <Link to="/hospitality-saas-analysis">{t("projects.hospitalityTitle")}</Link>
                </b>
              </h3>
              <h4 className="projects_project_platform">{t("projects.platformData")}</h4>
              <h5 className="projects_project_stack">{t("projects.hospitalityStack")}</h5>
            </div>
            <div className="grid_container_smalltext">
              <p>{t("projects.hospitalityDesc")}</p>
              <p>2026</p>
            </div>
          </div>
        </div>

        <div className="grid_container_inner_right">
          <div className="grid_container_imageslot">
            <img src="/assets/visuals/projects_images/projects_kazoku.PNG" alt="" />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href="https://carcamusa-labs.itch.io/kazoku">「Kazoku」</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">{t("projects.platformPlaydate")}</h4>
              <h5 className="projects_project_stack">Lua · Playdate SDK</h5>
            </div>
            <div className="grid_container_smalltext">
              <p>{t("projects.kazokuDesc")}</p>
              <p>2025</p>
            </div>
          </div>
        </div>

        <div className="grid_container_inner_left">
          <div className="grid_container_imageslot">
            <img src="/assets/visuals/projects_images/projects_drumpad.PNG" alt="" />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href="https://github.com/carcamusa-labs/WEB_HTML-CSS-JavaScript_Drumkit">Drumpad</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">{t("projects.platformWeb")}</h4>
              <h5 className="projects_project_stack">HTML · CSS · JavaScript</h5>
            </div>
            <div className="grid_container_smalltext">
              <p>{t("projects.drumpadDesc")}</p>
              <p>2023</p>
            </div>
          </div>
        </div>

        <div className="grid_container_inner_right">
          <div className="grid_container_imageslot">
            <img src="/assets/visuals/projects_images/projects_shashin.png" alt="" />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href="https://github.com/carcamusa-labs/WEB_Saisho_Shashin">最初写真 (Saisho Shashin)</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">{t("projects.platformWeb")}</h4>
              <h5 className="projects_project_stack">HTML · CSS</h5>
            </div>
            <div className="grid_container_smalltext">
              <p>{t("projects.shashinDesc")}</p>
              <p>2023</p>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}
