import { ME } from "../content";

interface Link {
  name: string;
  val: string;
  href: string;
  external?: boolean;
}

export default function Contact() {
  const links: Link[] = [
    { name: "Email", val: ME.email, href: "mailto:" + ME.email },
    { name: "GitHub", val: "github.com/colinkehoe", href: ME.github, external: true },
    {
      name: "LinkedIn",
      val: "linkedin.com/in/colin-kehoe",
      href: ME.linkedin,
      external: true,
    },
  ];

  if (ME.resume) {
    links.push({ name: "Résumé", val: "PDF", href: ME.resume, external: true });
  }

  return (
    <section className="sec contact" id="contact">
      <div className="wrap sec-grid">
        <div className="sec-tag">contact</div>
        <div>
          <h2>Tell me what you're trying to predict.</h2>
          <p className="lede">
            Open to data science and ML engineering roles, and happy to talk through a problem even
            if there's no role attached.
          </p>

          <div className="clinks">
            {links.map((l) => (
              <a
                className="clink"
                key={l.name}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="clink-name">{l.name}</span>
                <span className="clink-val">{l.val}</span>
              </a>
            ))}
          </div>

          <footer>
            <span>Colin Kehoe, {new Date().getFullYear()}</span>
            <span>{ME.location}</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
