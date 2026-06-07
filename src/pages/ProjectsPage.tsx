import { InnerPageLayout } from "../components/InnerPageLayout";
import { useTranslation } from "../i18n/useTranslation";

const PROJECT_URLS = {
  hospitality: {
    github: "https://github.com/carcamusa-labs/Hosp_SaaS_Analysis",
    demo: "https://carcamusa-labs.github.io/Hosp_SaaS_Analysis/",
  },
  fotomatic: {
    github: "https://github.com/carcamusa-labs/WEB_Fotomatic",
    demo: "https://carcamusa-labs.github.io/WEB_Fotomatic/",
  },
  drumpad: {
    github: "https://github.com/carcamusa-labs/WEB_HTML-CSS-JavaScript_Drumkit",
    demo: "https://carcamusa-labs.github.io/WEB_HTML-CSS-JavaScript_Drumkit/",
  },
  shashin: {
    github: "https://github.com/carcamusa-labs/WEB_Saisho_Shashin",
    demo: "https://carcamusa-labs.github.io/WEB_Saisho_Shashin/",
  },
} as const;

function ProjectLinks({
  github,
  demo,
}: {
  github: string;
  demo: string;
}) {
  const { t } = useTranslation();

  return (
    <p className="projects_project_links">
      <a href={github} target="_blank" rel="noreferrer">
        {t("projects.viewGithub")}
      </a>
      {" · "}
      <a href={demo} target="_blank" rel="noreferrer">
        {t("projects.liveDemo")}
      </a>
    </p>
  );
}

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
                  <a href={PROJECT_URLS.hospitality.demo}>{t("projects.hospitalityTitle")}</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">{t("projects.platformData")}</h4>
              <h5 className="projects_project_stack">{t("projects.hospitalityStack")}</h5>
              <ProjectLinks github={PROJECT_URLS.hospitality.github} demo={PROJECT_URLS.hospitality.demo} />
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
            <img
              src="/assets/visuals/projects_images/projects_fotomatic.png"
              alt="Vintage camera — Fotomatic project preview"
            />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href={PROJECT_URLS.fotomatic.demo}>Fotomatic</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">{t("projects.platformWeb")}</h4>
              <h5 className="projects_project_stack">HTML · CSS</h5>
              <ProjectLinks github={PROJECT_URLS.fotomatic.github} demo={PROJECT_URLS.fotomatic.demo} />
            </div>
            <div className="grid_container_smalltext">
              <p>{t("projects.fotomaticDesc")}</p>
              <p>2023</p>
            </div>
          </div>
        </div>

        <div className="grid_container_inner_right">
          <div className="grid_container_imageslot">
            <img src="/assets/visuals/projects_images/projects_drumpad.PNG" alt="" />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href={PROJECT_URLS.drumpad.demo}>Drumpad</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">{t("projects.platformWeb")}</h4>
              <h5 className="projects_project_stack">HTML · CSS · JavaScript</h5>
              <ProjectLinks github={PROJECT_URLS.drumpad.github} demo={PROJECT_URLS.drumpad.demo} />
            </div>
            <div className="grid_container_smalltext">
              <p>{t("projects.drumpadDesc")}</p>
              <p>2023</p>
            </div>
          </div>
        </div>

        <div className="grid_container_inner_left">
          <div className="grid_container_imageslot">
            <img src="/assets/visuals/projects_images/projects_shashin.png" alt="" />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href={PROJECT_URLS.shashin.demo}>最初写真 (Saisho Shashin)</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">{t("projects.platformWeb")}</h4>
              <h5 className="projects_project_stack">HTML · CSS</h5>
              <ProjectLinks github={PROJECT_URLS.shashin.github} demo={PROJECT_URLS.shashin.demo} />
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
