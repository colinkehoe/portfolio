import Section from "./Section";
import { BACKGROUND } from "../content";

export default function Background() {
  return (
    <Section id="background" tag="background">
      <h2>Statistics, systems, and a lot of teaching.</h2>
      <div className="tl">
        {BACKGROUND.map((b) => (
          <div className={"tl-item" + (b.todo ? " todo" : "")} key={b.role + b.when}>
            <div className="tl-when">{b.when}</div>
            <div>
              <h3 className="tl-what">{b.role}</h3>
              <p className="tl-where">
                {b.org}
                {b.place ? " — " + b.place : ""}
              </p>
              {b.detail && <p className="tl-detail">{b.detail}</p>}
              {b.tags && (
                <div className="proj-tags">
                  {b.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
