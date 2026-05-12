import { useEffect } from "react";

export function LinksPage() {
  const year = new Date().getFullYear();

  useEffect(() => {
    document.title = "Carcamusa_Labs - Links";
    document.body.classList.add("links-page");
    return () => {
      document.body.classList.remove("links-page");
    };
  }, []);

  return (
    <>
      <div id="links_initial-paragraph-container">
        <h4>
          Yo, thanks for visiting. I&apos;m Nitram from <span>「Carcamusa_Labs」</span>.
          <br />
          Uruguayan indie game dev living in Toledo, Spain.
          <br />I try to make retro-inspired games for a living.
        </h4>
        <h4>
          来てくれておおきに！
          <br />
          ワイは <span>「Carcamusa_Labs」</span> のニトラムやで。
          <br />
          スペインのトレドに住んでいる、ウルグアイ人やで。
          <br />
          レトロ風のゲーム作ってメシ食お思てんねん。
        </h4>
        <h4 id="links_my-links">My links:</h4>
      </div>
      <div id="links_buttons-container">
        <a className="links_cl-button" id="links_cl-instagram-button" href="https://www.instagram.com/carcamusa_labs/">
          <div className="links_cl-button-image-container" id="img_ig" />
          <div className="links_cl-button-texts-container">
            <p className="links_cl-button-text-main">Instagram</p>
            <p className="links_cl-button-text-secondary">[ Where I post my projects&apos; updates ]</p>
          </div>
        </a>
        <a className="links_cl-button" id="links_cl-itchio-button" href="https://carcamusa-labs.itch.io">
          <div className="links_cl-button-image-container" id="img_iio" />
          <div className="links_cl-button-texts-container">
            <p className="links_cl-button-text-main">Itch.io</p>
            <p className="links_cl-button-text-secondary">[ Get my games here! ]</p>
          </div>
        </a>
        <a className="links_cl-button" id="links_cl-website-button" href="https://carcamusalabs.com">
          <div className="links_cl-button-image-container" id="img_clabs" />
          <div className="links_cl-button-texts-container">
            <p className="links_cl-button-text-main">Website</p>
            <p className="links_cl-button-text-secondary">
              [ Full site (Cube nav is best on a big screen tho) ]
            </p>
          </div>
        </a>
        <a className="links_cl-button" id="links_cl-bmac-button" href="https://buymeacoffee.com/carcamusa_labs">
          <div className="links_cl-button-image-container" id="img_bmac" />
          <div className="links_cl-button-texts-container">
            <p className="links_cl-button-text-main">Buy Me a Coffee!</p>
            <p className="links_cl-button-text-secondary">
              [ Or food for my cats, and get your username featured in my games&apos; credits! ]
            </p>
          </div>
        </a>

        <div className="links_footer">
          <h4 className="links_footer-text">
            <span className="date">{year}</span> - CARCAMUSA_LABS by Nitram (Nitram)
          </h4>
          <h4 className="links_footer-text">All rights reserved</h4>
        </div>
      </div>
    </>
  );
}
