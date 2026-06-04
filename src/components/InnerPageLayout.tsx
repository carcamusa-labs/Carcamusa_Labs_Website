import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "../i18n/useTranslation";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function InnerPageLayout({
  titleKey,
  children,
}: {
  titleKey: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t(titleKey);
  }, [titleKey, t]);

  return (
    <>
      <SiteHeader />
      <h1>
        <Link to="/" className="to_index">
          {t("common.index")}
        </Link>
      </h1>
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
