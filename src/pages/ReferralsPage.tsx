import { useEffect, useState } from "react";
import { InnerPageLayout } from "../components/InnerPageLayout";
import { useTranslation } from "../i18n/useTranslation";
import { assetUrl } from "../utils/assetUrl";

interface ReferralEntry {
  name: string;
  known_from: string;
  job_title: string;
  job_img: string;
  gh_user: string | null;
  lkdin_user: string | null;
  website: string | null;
}

export function ReferralsPage() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<ReferralEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(assetUrl("assets/json/referrals_list.json"));
        const data = (await res.json()) as ReferralEntry[];
        if (!cancelled) setEntries(data);
      } catch (e) {
        console.error("Error loading data:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const devIcon = assetUrl("assets/visuals/logos/dev_icon.png");
  const qaIcon = assetUrl("assets/visuals/logos/qa_icon.png");

  return (
    <InnerPageLayout titleKey="pageTitle.referrals">
      <h2>{t("referrals.heading")}</h2>
      <h3>{t("referrals.subheading")}</h3>

      <div className="referrals_referralcards_container">
        {entries.map((entry) => (
          <div key={entry.name} className="referrals_card">
            <div className="referrals_card_leftarea_wrapper">
              <div className="referrals_card_imageslot">
                <img src={entry.job_img === "Dev" ? devIcon : qaIcon} alt={entry.job_img} />
              </div>
              <h4 className="referrals_card_jobtitle">{entry.job_title}</h4>
            </div>
            <div className="referrals_card_rightarea_wrapper">
              <h2 className="referrals_card_referralname">{entry.name}</h2>
              <h3 className="referrals_card_referralKnownFrom">{entry.known_from}</h3>
              <div className="referrals_social_media_links_wrapper">
                {entry.lkdin_user ? (
                  <a href={entry.lkdin_user}>
                    <img
                      className="referrals_card_referral_lk"
                      src={assetUrl("assets/visuals/logos/linkedin_logo.png")}
                      alt={t("common.linkedIn")}
                    />
                  </a>
                ) : null}
                {entry.gh_user ? (
                  <a href={entry.gh_user}>
                    <img
                      className="referrals_card_referral_gh"
                      src={assetUrl("assets/visuals/logos/github_logo.png")}
                      alt={t("common.github")}
                    />
                  </a>
                ) : null}
                {entry.website ? (
                  <a href={entry.website}>
                    <img
                      className="referrals_card_referral_web"
                      src={assetUrl("assets/visuals/logos/website_logo.png")}
                      alt={t("common.website")}
                    />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </InnerPageLayout>
  );
}
