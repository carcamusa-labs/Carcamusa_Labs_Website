import { Link } from "react-router-dom";

const SECTIONS: { to: string; label: string }[] = [
  { to: "/1_about_carcamusa_labs.html", label: "1. About" },
  { to: "/2_cv_contact.html", label: "2. Contact" },
  { to: "/3_projects.html", label: "3. Projects" },
  { to: "/4_artwork_assets.html", label: "4. Artwork" },
  { to: "/5_store.html", label: "5. Store" },
  { to: "/6_referrals_mentors.html", label: "6. Referrals" },
];

export function HomeMobileNav() {
  return (
    <nav className="home-mobile-nav" aria-label="Section quick links">
      {SECTIONS.map((item) => (
        <Link key={item.to} to={item.to} className="home-mobile-nav__btn">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
