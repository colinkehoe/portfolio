import type { ReactNode } from "react";

/** Two-column section frame: sticky label on the left, content on the right. */
export default function Section({
  id,
  tag,
  children,
}: {
  id: string;
  tag: string;
  children: ReactNode;
}) {
  return (
    <section className="sec" id={id}>
      <div className="wrap sec-grid">
        <div className="sec-tag">{tag}</div>
        <div>{children}</div>
      </div>
    </section>
  );
}
