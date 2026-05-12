export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div>
        <p>
          <span className="date">{year}</span> - CARCAMUSA_LABS by Martin Rosa (Nitram)
        </p>
        <p>All rights reserved</p>
      </div>
    </footer>
  );
}
