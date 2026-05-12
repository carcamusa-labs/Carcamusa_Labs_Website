import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCubeAnimation } from "../hooks/useCubeAnimation";
import { HomeMobileNav } from "../components/HomeMobileNav";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export function HomePage() {
  const { wrapperRef, cubeRef } = useCubeAnimation();

  useEffect(() => {
    document.title = "Carcamusa_Labs";
  }, []);

  return (
    <>
      <SiteHeader langLinkId="lang_logo" />
      <HomeMobileNav />
      <div id="cube-wrapper" ref={wrapperRef}>
        <div className="cube" id="cube" ref={cubeRef}>
          <div className="face">
            <Link to="/1_about_carcamusa_labs.html">
              1. About
              <br />
              Carcamusa_Labs
            </Link>
          </div>
          <div className="face">
            <Link to="/2_cv_contact.html">
              2. CV,
              <br />
              Contact
              <br />
              & Media
            </Link>
          </div>
          <div className="face">
            <Link to="/3_projects.html">3. Projects</Link>
          </div>
          <div className="face">
            <Link to="/4_artwork_assets.html">
              4. Artwork
              <br />
              & Other Assets
            </Link>
          </div>
          <div className="face">
            <Link to="/5_store.html">5. Store</Link>
          </div>
          <div className="face">
            <Link to="/6_referrals_mentors.html">
              6. Referrals
              <br />
              & Mentors
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
