import type { CSSProperties } from "react";
import Section from "./Section";
import { KIT } from "../content";

export default function Toolkit() {
  return (
    <Section id="toolkit" tag="toolkit">
      <h2>What I reach for.</h2>
      <div className="kit">
        {KIT.map((g) => (
          <div key={g.head} style={{ "--k": `var(--${g.accent})` } as CSSProperties}>
            <h3>{g.head}</h3>
            <ul>
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
