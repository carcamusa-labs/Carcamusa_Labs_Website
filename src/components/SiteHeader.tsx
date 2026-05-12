export function SiteHeader({ langLinkId }: { langLinkId?: string }) {
  return (
    <header>
      <div className="logo_container" />
      <h1 className="main_title">
        CARCAMUSA_LABS<span className="by"> by Martin Rosa</span>
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
