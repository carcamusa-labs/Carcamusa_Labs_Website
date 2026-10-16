import { CollapsibleSection } from "../components/CollapsibleSection";
import { InnerPageLayout } from "../components/InnerPageLayout";
import { QuickAnnouncement } from "../components/QuickAnnouncement";
import { useTranslation } from "../i18n/useTranslation";

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <InnerPageLayout titleKey="pageTitle.about">
      <QuickAnnouncement />

      <h2>{t("about.heading")}</h2>
      <p className="indented_p">
        {t("about.introBefore")} <b>Carcamusa_Labs</b>
        {t("about.introAfter")}
      </p>
      <img src="/assets/visuals/other/its_a_me.jpeg" alt={t("common.selfPortraitAlt")} id="about_selfie" />

      <CollapsibleSection title={t("about.collapsibleAbout")}>
        <p className="indented_p">{t("about.roleBefore")}</p>
        <p className="indented_p">
          <b>{t("about.labsBefore")}</b>
          {t("about.labsAfter")}
        </p>
        <p className="indented_p">{t("about.explore")}</p>
        <ul>
          <li>
            <b>{t("about.section1Title")}</b> – {t("about.section1Desc")}
          </li>
          <li>
            <b>{t("about.section2Title")}</b> – {t("about.section2Desc")}
          </li>
          <li>
            <b>{t("about.section3Title")}</b> – {t("about.section3Desc")}
          </li>
          <li>
            <b>{t("about.section4Title")}</b> – {t("about.section4Desc")}
          </li>
          <li>
            <b>{t("about.section5Title")}</b> – {t("about.section5Desc")}
          </li>
          <li>
            <b>{t("about.section6Title")}</b> – {t("about.section6Desc")}
          </li>
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title={t("about.collapsibleJourney")}>
        <p className="indented_p">
          {t("about.journey1Before")} <b>{t("about.countryUruguay")}</b> {t("about.journey1Mid")}{" "}
          <b>{t("about.countrySpain")}</b>
          {t("about.journey1After")}
        </p>
        <p className="indented_p">{t("about.journey2")}</p>
        <p className="indented_p">{t("about.journey3")}</p>
        <p>
          <b>{t("about.languagesLabel")}</b>
        </p>
        <ul className="last_p">
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
            <b>{t("cv.langNamePolish")}</b>: {t("cv.langPolish")}
          </li>
        </ul>
      </CollapsibleSection>
    </InnerPageLayout>
  );
}
