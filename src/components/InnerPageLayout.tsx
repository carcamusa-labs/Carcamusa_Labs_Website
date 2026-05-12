import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function InnerPageLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <SiteHeader />
      <h1>
        <Link to="/" className="to_index">
          &lt; INDEX
        </Link>
      </h1>
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
