import Section from "./Section";

export default function About() {
  return (
    <Section id="about" tag="about">
      <h2>A scatter plot is just a sky you can label.</h2>
      <p className="lede">
        I work on the part of machine learning that decides whether a result is real: how the data
        was split, what the model could have memorized, and which metric would have caught the
        failure. I spent a year at UMSL as a research assistant building{" "}
        <b>model evaluation techniques</b> in Python, and the habit stuck.
      </p>
      <p className="lede">
        Day to day I'm the data and systems person at the St. Charles County Prosecuting Attorney's
        Office — the office's statistics, its databases, its vendors, and the numbers the annual
        budget is argued from. Before that I spent four years teaching, from Calculus III down to
        kids writing their first game loop, which is still the fastest way I know to find out
        whether you actually understand something.
      </p>
    </Section>
  );
}
