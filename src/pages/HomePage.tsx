import { useEffect } from "react";
import { HomeHexRoulette } from "../components/HomeHexRoulette";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export function HomePage() {
  useEffect(() => {
    document.title = "Carcamusa_Labs";
  }, []);

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
