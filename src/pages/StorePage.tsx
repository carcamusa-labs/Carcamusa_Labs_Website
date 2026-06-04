import { InnerPageLayout } from "../components/InnerPageLayout";
import { useTranslation } from "../i18n/useTranslation";

export function StorePage() {
  const { t } = useTranslation();

  return (
    <InnerPageLayout titleKey="pageTitle.store">
      <h2>{t("store.heading")}</h2>
      <h3>{t("store.underConstruction")}</h3>
      <h3>{t("store.welcome")}</h3>
      <p>{t("store.body")}</p>
      <p>
        {t("store.romeroBefore")} <b>John Romero</b>
        {t("store.romeroMid")} <b>Doom</b>
        {t("store.romeroOther")} <b>Wolfenstein 3D</b> {t("store.romeroAnd")} <b>Quake</b>
        {t("store.romeroEnd")}
        <br />
      </p>
      <div className="store_romero_wrap">
        <img
          className="store_romero_photo"
          src="/assets/visuals/other/romero&me.jpeg"
          alt={t("common.romeroPhotoAlt")}
        />
      </div>
    </InnerPageLayout>
  );
}
