import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";

const DISMISS_KEY = "carcamusa_crxsspr3ss_announcement_dismissed";

function isDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function QuickAnnouncement() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(() => !isDismissed());

  if (!visible) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* sessionStorage unavailable */
    }
    setVisible(false);
  };

  return (
    <div className="temp_announcement_container">
      <button
        type="button"
        className="temp_announcement_close"
        onClick={dismiss}
        aria-label={t("common.dismissAnnouncement")}
      >
        ×
      </button>
      <div className="temp_announcement_img_container">
        <img
          src="/assets/visuals/logos/crxsspr3ss_announcement.png"
          alt={t("announcement.imageAlt")}
        />
      </div>
      <div className="temp_announcement_text_container">
        <h1 className="quick_announcement_h1">{t("announcement.title")}</h1>
        <p>
          {t("announcement.p1Before")} <b>Playdate</b> {t("announcement.p1After")}{" "}
          <b>CRXSSPR3SS</b>
          {t("announcement.p1End")}{" "}
          <b>
            <a href="https://carcamusa-labs.itch.io/crxsspr3ss">itch.io</a>
          </b>
          .
        </p>
        <p>
          {t("announcement.catalogBefore")} <b>Playdate Catalog</b>
          {t("announcement.catalogAfter")}{" "}
          <b>
            <a href="https://carcamusa-labs.itch.io/crxsspr3ss">itch.io</a>
          </b>
          {t("announcement.catalogEnd")}
        </p>
        <p>
          {t("announcement.instagramBefore")}{" "}
          <b>
            <a href="https://www.instagram.com/carcamusa_labs/">{t("announcement.instagramLink")}</a>
          </b>
          .
        </p>
        <p>
          <b>{t("announcement.thanks")}</b>
        </p>
      </div>
    </div>
  );
}
