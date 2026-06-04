import { InnerPageLayout } from "../components/InnerPageLayout";
import { useTranslation } from "../i18n/useTranslation";

export function CvContactPage() {
  const { t } = useTranslation();

  return (
    <InnerPageLayout titleKey="pageTitle.cv">
      <h2>{t("cv.heading")}</h2>
      <h3>{t("cv.download")}</h3>
      <div className="cv-download-wrap">
        <a
          href="/assets/visuals/downloadables/CV-Martin-Rosa_QA-Engineer_(EN).pdf"
          className="download_a"
          download
        >
          <div className="download_button">{t("cv.downloadButton")}</div>
        </a>
      </div>
      <h3 className="cv-preview-heading">{t("cv.preview")}</h3>
      <embed
        className="cv"
        src="/assets/visuals/downloadables/CV-Martin-Rosa_QA-Engineer_(EN).pdf"
        width="100%"
        height="700px"
        type="application/pdf"
      />
      <h3>{t("cv.moreInfo")}</h3>
      <div className="grid_container_outer cv-skills-outer">
        <div className="grid_container_inner_left">
          <h2>{t("cv.skillsStack")}</h2>
          <h3>
            <b>{t("cv.programmingTools")}</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Git</b> · <b>GitHub</b> · <b>GitLab</b>
            </li>
            <li>
              <b>HTML</b> · <b>CSS</b> · <b>JavaScript</b> · <b>TypeScript</b>
            </li>
            <li>
              <b>React</b> · <b>Vue</b>
            </li>
            <li>
              <b>Java</b> ({t("cv.skillJavaNote")})
            </li>
            <li>
              <b>Lua</b> · <b>Godot Scripting (GDS)</b>
            </li>
            <li>
              <b>Xcode</b> · <b>Android Studio</b> · <b>iOS Simulators</b>
            </li>
          </ul>

          <h3>
            <b>{t("cv.qaTools")}</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Appium</b> · <b>Cucumber</b> · <b>WebdriverIO</b> · <b>Gradle</b> · <b>Gherkin</b>
            </li>
            <li>
              <b>TestLodge</b> · <b>Testomat.io</b> · <b>BrowserStack</b> · <b>Allure</b>
            </li>
            <li>{t("cv.skillQaLine3")}</li>
          </ul>

          <h3>
            <b>{t("cv.gameDev")}</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Unity</b> · <b>Godot</b> · <b>Playdate</b> · <b>LÖVE2D</b>
            </li>
          </ul>

          <h3>
            <b>{t("cv.designMultimedia")}</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Adobe Illustrator</b> · <b>Photoshop</b> · <b>Aseprite</b> · <b>Krita</b> · <b>Blender</b> ·{" "}
              <b>GIMP</b>
            </li>
            <li>
              <b>{t("cv.prepress")}</b>
            </li>
          </ul>

          <h3>
            <b>{t("cv.dataAnalytics")}</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Amplitude</b> · <b>Braze</b>
            </li>
          </ul>

          <h3>
            <b>{t("cv.projectManagement")}</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Kanban</b> · <b>Trello</b> · <b>Jira</b> · <b>GH Projects</b> · <b>Scrum</b> · <b>Agile</b>
            </li>
          </ul>
        </div>

        <div className="grid_container_inner_right">
          <h2>{t("cv.myProfile")}</h2>
          <p>{t("cv.profileText")}</p>
          <h2>{t("cv.education")}</h2>
          <p>{t("cv.educationLine")}</p>
          <h2>{t("cv.training")}</h2>
          <ul>
            <li>{t("cv.training1")}</li>
            <li>{t("cv.training2")}</li>
            <li>{t("cv.training3")}</li>
            <li>{t("cv.training4")}</li>
            <li>{t("cv.training5")}</li>
            <li>{t("cv.training6")}</li>
            <li>{t("cv.training7")}</li>
            <li>{t("cv.training8")}</li>
            <li>{t("cv.training9")}</li>
            <li>{t("cv.training10")}</li>
            <li>{t("cv.training11")}</li>
            <li>{t("cv.training12")}</li>
          </ul>
          <h2>{t("cv.languages")}</h2>
          <ul>
            <li>
              <b>{t("cv.langNameSpanish")}</b>: {t("cv.langSpanish")}
            </li>
            <li>
              <b>{t("cv.langNameEnglish")}</b>: {t("cv.langEnglish")}
            </li>
            <li>
              <b>{t("cv.langNamePortuguese")}</b>: {t("cv.langPortuguese")}
            </li>
            <li>
              <b>{t("cv.langNameJapanese")}</b>: {t("cv.langJapanese")}
            </li>
            <li>
              <b>{t("cv.langNameItalian")}</b>: {t("cv.langItalian")}
            </li>
            <li>
              <b>{t("cv.langNamePolish")}</b>: {t("cv.langPolish")}
            </li>
          </ul>
        </div>
      </div>

      <h3>{t("cv.contactMedia")}</h3>
      <div className="grid_container_outer cv-contact-outer">
        <div className="grid_container_inner_left">
          <p>{t("cv.phone")}</p>
          <p>
            {t("cv.emailPro")}{" "}
            <a href="mailto:martin.rosa@carcamusalabs.com">martin.rosa@carcamusalabs.com</a>
          </p>
          <p>
            {t("cv.emailPersonal")}{" "}
            <a href="mailto:nitram@carcamusalabs.com">nitram@carcamusalabs.com</a>
          </p>
          <p>{t("cv.location")}</p>
        </div>
        <div className="grid_container_inner_right">
          <h3>
            <b>{t("cv.findMe")}</b>
          </h3>
          <p>
            LinkedIn - <a href="https://www.linkedin.com/in/martin-rosa/">in/martin-rosa/</a>
          </p>
          <p>
            {t("cv.instagramUpdates")}{" "}
            <a href="https://www.instagram.com/carcamusa_labs/">@carcamusa_labs</a>
          </p>
          <p>
            Itch.io - <a href="https://carcamusa-labs.itch.io">carcamusa-labs.itch.io</a>
          </p>
        </div>
      </div>
    </InnerPageLayout>
  );
}
