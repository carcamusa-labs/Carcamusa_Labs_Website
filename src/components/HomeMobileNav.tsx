import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";

const SECTION_ROUTES = [
  "/1_about_carcamusa_labs.html",
  "/2_cv_contact.html",
  "/3_projects.html",
  "/4_artwork_assets.html",
  "/5_store.html",
  "/6_referrals_mentors.html",
] as const;

const SECTION_LABEL_KEYS = [
  "nav.about",
  "nav.contact",
  "nav.projects",
  "nav.artwork",
  "nav.store",
  "nav.referrals",
] as const;

export function HomeMobileNav() {
  const { t } = useTranslation();

  return (
    <nav className="home-mobile-nav" aria-label={t("nav.quickLinks")}>
      {SECTION_ROUTES.map((to, i) => (
        <Link key={to} to={to} className="home-mobile-nav__btn">
          {t(SECTION_LABEL_KEYS[i])}
        </Link>
      ))}
    </nav>
  );
}
