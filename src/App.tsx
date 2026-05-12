import { Navigate, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { ArtworkAssetsPage } from "./pages/ArtworkAssetsPage";
import { CvContactPage } from "./pages/CvContactPage";
import { HomePage } from "./pages/HomePage";
import { LinksPage } from "./pages/LinksPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ReferralsPage } from "./pages/ReferralsPage";
import { StorePage } from "./pages/StorePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/1_about_carcamusa_labs.html" element={<AboutPage />} />
      <Route path="/2_cv_contact.html" element={<CvContactPage />} />
      <Route path="/3_projects.html" element={<ProjectsPage />} />
      <Route path="/4_artwork_assets.html" element={<ArtworkAssetsPage />} />
      <Route path="/5_store.html" element={<StorePage />} />
      <Route path="/6_referrals_mentors.html" element={<ReferralsPage />} />
      <Route path="/links.html" element={<LinksPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
