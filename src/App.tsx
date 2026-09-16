import { useState } from "react";
import StarField from "./components/StarField";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Toolkit from "./components/Toolkit";
import Background from "./components/Background";
import Contact from "./components/Contact";

export default function App() {
  const [clustered, setClustered] = useState(false);

  return (
    <>
      {/* Fixed backdrop layers, behind everything. */}
      <div className="nebula" aria-hidden="true" />
      <StarField clustered={clustered} />
      <div className="grain" aria-hidden="true" />

      <div className="page">
        <Nav />
        <Hero clustered={clustered} onToggle={() => setClustered((c) => !c)} />
        <About />
        <Work />
        <Toolkit />
        <Background />
        <Contact />
      </div>
    </>
  );
}
