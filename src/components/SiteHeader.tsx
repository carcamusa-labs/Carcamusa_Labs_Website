export function SiteHeader({ langLinkId }: { langLinkId?: string }) {
  return (
    <header>
      <div className="logo_container" />
      <h1 className="main_title">
        <span className="main_title_desktop">CARCAMUSA_LABS</span>
        <span className="main_title_mobile" aria-hidden="true">
          <span className="main_title_mobile_line main_title_mobile_line1">CARCAMUSA</span>
          <span className="main_title_mobile_line main_title_mobile_line2">_LABS</span>
        </span>
        <span className="by"> by Martin Rosa</span>
      </h1>
      <nav className="menu">
        <ul>
          <li>
            <a href="#" id={langLinkId}>
              あ / A
            </a>
            <ul>
              <li className="button_EN">
                <a href="#">🇺🇸</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
