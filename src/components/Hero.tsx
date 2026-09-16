import { ME } from "../content";

export default function Hero({
  clustered,
  onToggle,
}: {
  clustered: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="wrap hero" id="top">
      <p className="hero-role">{ME.role}</p>
      <h1>
        Colin
        <br />
        Kehoe
      </h1>
      <p className="hero-sub">
        I build models that hold up outside the notebook, and I spent a year researching
        <b> how to tell whether they do</b>. Currently running data and systems for a county
        prosecutor's office, in St. Louis.
      </p>

      <div className="hero-actions">
        <button
          className="btn btn-cluster"
          data-on={String(clustered)}
          onClick={onToggle}
          aria-pressed={clustered}
        >
          {clustered ? "Scatter the stars" : "Cluster the stars"}
        </button>
        <a className="btn" href="#work">
          See the work
        </a>
        <a className="btn" href={ME.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="btn" href={ME.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <div className="legend" data-on={String(clustered)} aria-hidden={!clustered}>
        <span>
          <i style={{ background: "var(--magenta)" }} />
          group a
        </span>
        <span>
          <i style={{ background: "var(--mint)" }} />
          group b
        </span>
        <span>
          <i style={{ background: "var(--amber)" }} />
          group c
        </span>
        <span>
          <i style={{ background: "var(--violet)" }} />
          group d
        </span>
      </div>
    </header>
  );
}
