import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div>
        <p>
          <span className="date">{year}</span> - {t("footer.line")}
        </p>
        <p>
          <Link to="/tools/sfx" className="footer-sfx-link">
            {t("nav.sfx")}
          </Link>
        </p>
        <p>{t("common.allRightsReserved")}</p>
      </div>
    </footer>
  );
}
