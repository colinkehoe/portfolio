/**
 * =============================================================
 *  SITE CONTENT
 *  Everything you'd want to change about the site lives here.
 *  No layout or styling code below — just data.
 * =============================================================
 */

export type Accent = "magenta" | "mint" | "amber" | "violet";

export interface Person {
  name: string;
  role: string;
  location: string;
  github: string;
  linkedin: string;
  email: string;
  /** Optional link to a résumé PDF. Leave "" to hide the row. */
  resume: string;
}

export interface Project {
  title: string;
  /** Short name used as the point label on the plot. */
  short: string;
  /**
   * Position on the work plot, each 0..1.
   *   x: 0 = research question, 1 = built and running
   *   y: 0 = systems / software, 1 = models / data
   * These are editorial judgements, not measurements — move them until
   * the shape of the plot tells the story you want it to.
   */
  x: number;
  y: number;
  /** Primary language, shown next to the title. */
  lang: string;
  /** Optional badge, e.g. "Building now". Omit for finished work. */
  status?: string;
  accent: Accent;
  /** Leave "" for work with no public repo yet — renders unlinked. */
  url: string;
  desc: string;
  tags: string[];
}

export interface KitGroup {
  head: string;
  accent: Accent;
  items: string[];
}

export interface Role {
  when: string;
  role: string;
  org: string;
  place?: string;
  detail?: string;
  tags?: string[];
  /** Highlights the entry as unfinished. Remove once filled in. */
  todo?: boolean;
}

/* ------------------------------------------------------------ */

export const ME: Person = {
  name: "Colin Kehoe",
  role: "Data scientist and machine learning engineer",
  location: "St. Louis, Missouri",
  github: "https://github.com/colinkehoe",
  linkedin: "https://www.linkedin.com/in/colin-kehoe-a58b96240/",
  email: "kehoecolin012@gmail.com",
  resume: "",
};

export const PROJECTS: Project[] = [
  {
    title: "Automated exoplanet vetting",
    short: "exoplanets",
    x: 0.44,
    y: 0.92,
    lang: "Python",
    status: "Building now",
    accent: "violet",
    url: "",
    desc: "Most transit candidates are not planets — they're eclipsing binaries, background blends, or instrument systematics. This model reads survey photometry and predicts whether a signal is a real planet, then scores the survivors on the stellar and orbital properties that bear on habitability.",
    tags: ["Time series", "Imbalanced classification", "Astronomy data"],
  },
  {
    title: "Predicting political bias in news",
    short: "news bias",
    x: 0.32,
    y: 0.66,
    lang: "Jupyter Notebook",
    accent: "magenta",
    url: "https://github.com/colinkehoe/Political-Bias-ML",
    desc: "Classifying the lean of news articles as left, center, or right across a 37,554-article AllSides corpus. Evaluated on both random and media-based splits, so the model is scored on outlets it has never read.",
    tags: ["NLP", "Text classification", "Evaluation design"],
  },
  {
    title: "Contingency space",
    short: "contingency",
    x: 0.1,
    y: 0.82,
    lang: "Jupyter Notebook",
    accent: "mint",
    url: "https://github.com/colinkehoe/contingency-space",
    desc: "Undergraduate research at UMSL on model evaluation: reading classifier performance as a geometry of confusion-matrix outcomes rather than a single scalar score — where a model actually sits in that space, and what moves it.",
    tags: ["Model evaluation", "Metrics", "Research"],
  },
  {
    title: "A compiler, front to back",
    short: "compiler",
    x: 0.6,
    y: 0.2,
    lang: "C++",
    accent: "amber",
    url: "https://github.com/colinkehoe/4280-Compiler",
    desc: "A complete compiler for a custom language: scanner, recursive-descent parser, semantic checks, and code generation for a stack machine. Built for CS-4280 at UMSL.",
    tags: ["C++", "Parsing", "Code generation"],
  },
  {
    title: "Vought International",
    short: "discord bot",
    x: 0.92,
    y: 0.12,
    lang: "TypeScript",
    accent: "violet",
    url: "https://github.com/colinkehoe/voughtintl-new",
    desc: "A general-purpose Discord bot running for The Boys community server — commands, moderation, and event handling on a typed Node stack.",
    tags: ["TypeScript", "Node", "Discord API"],
  },
  {
    title: "Snake, for teaching",
    short: "snake",
    x: 0.78,
    y: 0.34,
    lang: "Python",
    accent: "mint",
    url: "https://github.com/colinkehoe/Snake",
    desc: "A small Pygame build of Snake written to be read, not just played — kept deliberately plain as a worked example for students learning game loops and state.",
    tags: ["Python", "Pygame", "Teaching"],
  },
];

export const KIT: KitGroup[] = [
  {
    head: "Modeling",
    accent: "magenta",
    items: ["scikit-learn", "PyTorch", "Transformers", "Gradient boosting", "Model evaluation"],
  },
  {
    head: "Data",
    accent: "mint",
    items: ["Python", "pandas / NumPy", "SQL", "Jupyter", "Feature engineering"],
  },
  {
    head: "Engineering",
    accent: "amber",
    items: ["C++", "TypeScript / Node", "Git", "Unity / Unreal", "Compilers"],
  },
  {
    head: "Also useful",
    accent: "violet",
    items: ["Reporting and statistics", "Database maintenance", "Teaching", "Technical writing"],
  },
];

export const BACKGROUND: Role[] = [
  {
    when: "Jun 2026 — now",
    role: "Digital Evidence Manager",
    org: "St. Charles County Prosecuting Attorney's Office",
    place: "St. Charles, Missouri",
    detail:
      "The office's data and systems person. I maintain the case databases, report monthly and annual statistics — including the numbers the office's budget proposal is built on — and run in-house IT. I manage the Karpel, Axon, and Coreforce relationships, and work with police departments on intake and referral standards, including training them on the external portal they use to pull case information.",
    tags: ["Reporting", "Databases", "Vendor management", "Systems"],
  },
  {
    when: "Aug 2024 — Oct 2025",
    role: "Undergraduate Research Assistant",
    org: "University of Missouri–St. Louis",
    place: "St. Louis, Missouri · Hybrid",
    detail:
      "Developed machine learning model evaluation techniques in Python — the research behind the contingency-space work above, on reading classifier performance as a geometry rather than a single score.",
    tags: ["Python", "pandas", "Model evaluation"],
  },
  {
    when: "Aug 2022 — Feb 2025",
    role: "Instructor",
    org: "The Coder School",
    place: "St. Louis, Missouri",
    detail:
      "Taught programming to students one-on-one and in small groups, including 2-D and 3-D game design. Mostly the advanced track — Unity, Unreal Engine, and C++.",
    tags: ["C++", "Unity", "Unreal Engine", "Game design"],
  },
  {
    when: "Jul 2022 — Jun 2024",
    role: "Instructor",
    org: "Mathnasium",
    place: "St. Peters, Missouri",
    detail:
      "Taught math across the whole range, from elementary arithmetic through Calculus II and III, rebuilding the explanation until it landed.",
    tags: ["Calculus", "Curriculum", "Tutoring"],
  },
  {
    when: "Aug 2021 — May 2026",
    role: "B.S. Computer Science",
    org: "University of Missouri–St. Louis",
    place: "Machine learning and data science emphasis",
    detail:
      "Coursework and undergraduate research across machine learning, statistics, compilers, and systems.",
  },
];
