const capabilities = [
  {
    title: "Inference demos",
    copy: "A prepared demo shell for guided sample inference once the first model is ready.",
  },
  {
    title: "Model operations",
    copy: "Private evaluation, latency budgets, and release gates before anything public ships.",
  },
  {
    title: "Builder access",
    copy: "API-shaped surfaces for experiments, documentation, and controlled early access.",
  },
];

const milestones = [
  ["Private workbench", "Live internally"],
  ["Demo shell", "Built"],
  ["Sample inference", "Next"],
  ["Public release", "Queued"],
];

const telemetry = [
  ["Release", "Not public"],
  ["Demo", "Prepared"],
  ["Runtime", "Compact"],
  ["Access", "Invite first"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Praha Labs home">
          <span className="brand-mark" aria-hidden="true" />
          <span>Praha Labs</span>
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#roadmap">Roadmap</a>
          <a href="/demo">Demo</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Private AI lab / pre-release</p>
          <h1>Quiet systems for the next model launch.</h1>
          <p className="hero-lede">
            Praha Labs is preparing compact AI systems, demos, and developer
            access. No model is public yet; the first release will arrive with
            the evaluation trail already in place.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button primary" href="mailto:hello@prahalabs.ai">
              Request early access
            </a>
            <a className="button secondary" href="/demo">
              Inspect demo shell
            </a>
          </div>
        </div>

        <aside className="signal-room" aria-label="Praha Labs launch state">
          <div className="room-header">
            <span>Launch monitor</span>
            <strong>Private</strong>
          </div>
          <div className="signal-core" aria-hidden="true">
            <span className="trace trace-a" />
            <span className="trace trace-b" />
            <span className="trace trace-c" />
            <span className="node node-a" />
            <span className="node node-b" />
            <span className="node node-c" />
          </div>
          <div className="telemetry">
            {telemetry.map(([label, value]) => (
              <div className="telemetry-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="status-strip" aria-label="Current lab status">
        {telemetry.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section id="work" className="section work-section">
        <div className="section-heading">
          <p className="eyebrow">Work in progress</p>
          <h2>Built for the moment demos become real.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((item, index) => (
            <article className="capability" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="section roadmap-section">
        <div className="section-heading">
          <p className="eyebrow">Release path</p>
          <h2>The public surface opens only after the model clears the gate.</h2>
        </div>
        <div className="milestones">
          {milestones.map(([title, status], index) => (
            <article className="milestone" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{status}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <p className="eyebrow">Early access</p>
        <h2>Join before the first public model.</h2>
        <a className="button primary" href="mailto:hello@prahalabs.ai">
          Contact the lab
        </a>
      </section>
    </main>
  );
}
