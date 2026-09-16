import { useEffect, useState } from "react";

export default function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={"nav" + (stuck ? " stuck" : "")}>
      <div className="nav-in">
        <a className="sig" href="#top">
          <span className="dot" />
          colin kehoe
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#toolkit">Toolkit</a>
          <a href="#background">Background</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
