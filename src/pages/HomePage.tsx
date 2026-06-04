import { useEffect } from "react";
import { HomeHexRoulette } from "../components/HomeHexRoulette";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { useTranslation } from "../i18n/useTranslation";

export function HomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.home");
  }, [t]);

  return (
    <>
      <SiteHeader langLinkId="lang_logo" />
      <div id="cube-wrapper">
        <HomeHexRoulette />
      </div>
      <SiteFooter />
    </>
  );
}
