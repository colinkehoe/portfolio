import { useEffect, useState, type CSSProperties } from "react";
import Section from "./Section";
import { PROJECTS, type Project } from "../content";

/**
 * The work section, plotted.
 *
 * The projects sit on two axes — research/running and models/systems — so the
 * shape of the body of work is visible before any single item is read. Picking
 * a point swaps the detail panel beside it.
 *
 * Below the breakpoint the plot would be unreadable at thumb size, so it falls
 * back to a plain list of the same data.
 */

const PLOT_MIN_WIDTH = 820;

function useIsWide(min: number) {
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= min
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${min}px)`);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [min]);

  return wide;
}

function accentStyle(p: Project): CSSProperties {
  return { "--c": `var(--${p.accent})` } as CSSProperties;
}

function Detail({ p }: { p: Project }) {
  return (
    <div className="detail" style={accentStyle(p)}>
      <div className="detail-head">
        <h3 className="detail-title">{p.title}</h3>
        {p.status && <span className="proj-status">{p.status}</span>}
      </div>
      <p className="detail-lang">{p.lang}</p>
      <p className="detail-desc">{p.desc}</p>
      <div className="proj-tags">
        {p.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      <div className="detail-links">
        {p.url ? (
          <a className="detail-link" href={p.url} target="_blank" rel="noopener noreferrer">
            Read the code
          </a>
        ) : (
          <p className="detail-link detail-link-off">No public repo yet</p>
        )}
        {p.demo && (
          <a className="detail-link" href={import.meta.env.BASE_URL + p.demo}>
            Open the demo
          </a>
        )}
      </div>
    </div>
  );
}

/** Narrow-screen fallback: the same projects as a simple list. */
function WorkList() {
  return (
    <div className="work">
      {PROJECTS.map((p) => {
        const inner = (
          <>
            <div className="proj-head">
              <h3 className="proj-title">{p.title}</h3>
              <span className="proj-lang">{p.lang}</span>
              {p.status && <span className="proj-status">{p.status}</span>}
            </div>
            <p className="proj-desc">{p.desc}</p>
            <div className="proj-tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </>
        );

        return p.url ? (
          <a
            key={p.title}
            className="proj"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            style={accentStyle(p)}
          >
            {inner}
          </a>
        ) : (
          <div key={p.title} className="proj proj-static" style={accentStyle(p)}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

export default function Work() {
  const wide = useIsWide(PLOT_MIN_WIDTH);
  const [active, setActive] = useState(0);
  const current = PROJECTS[active];

  return (
    <Section id="work" tag="selected work">
      <h2>Six projects, plotted.</h2>
      <p className="lede plot-note">
        Across from a research question to a thing that runs, and up from systems code to models
        and data. Pick a point.
      </p>

      {wide ? (
        <div className="plot-wrap">
          <div className="plot">
            <div className="plot-grid" aria-hidden="true" />

            <ul className="plot-points">
              {PROJECTS.map((p, i) => (
                <li key={p.title}>
                  <button
                    type="button"
                    className={
                      "pt" +
                      (i === active ? " is-on" : "") +
                      // Points on the right half put their label to the left,
                      // so long names don't run off the edge of the plot.
                      (p.x > 0.55 ? " pt-flip" : "")
                    }
                    style={{
                      ...accentStyle(p),
                      left: `${p.x * 100}%`,
                      bottom: `${p.y * 100}%`,
                    }}
                    aria-pressed={i === active}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <span className="pt-dot" />
                    <span className="pt-label">{p.short}</span>
                  </button>
                </li>
              ))}
            </ul>

            <span className="ax ax-y-top">models &amp; data</span>
            <span className="ax ax-y-bot">systems</span>
            <span className="ax ax-x-left">research</span>
            <span className="ax ax-x-right">running</span>
          </div>

          <Detail p={current} />
        </div>
      ) : (
        <WorkList />
      )}
    </Section>
  );
}
