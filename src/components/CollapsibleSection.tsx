import type { ReactNode } from "react";

export function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details className="site-collapsible" open={defaultOpen || undefined}>
      <summary className="site-collapsible__summary">{title}</summary>
      <div className="site-collapsible__content">{children}</div>
    </details>
  );
}
