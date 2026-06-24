const modelStats = [
  ["Model", "Praha Voice-1"],
  ["Latency", "Sub-second"],
  ["Audio", "48 kHz"],
  ["Access", "API live"],
];

const capabilities = [
  {
    title: "Expressive speech",
    copy: "Natural cadence, clean emphasis, and stable long-form narration for product, media, and agent voice output.",
  },
  {
    title: "Realtime generation",
    copy: "Low-latency text-to-speech for assistants, reading apps, support flows, and interactive voice interfaces.",
  },
  {
    title: "Production control",
    copy: "Voice selection, style control, streaming responses, and API behavior built for real application teams.",
  },
];

const useCases = [
  ["Voice agents", "Responsive speech for AI assistants and customer workflows."],
  ["Narration", "Long-form audio for lessons, articles, onboarding, and docs."],
  ["Product UX", "Generated voice prompts for apps, tools, and accessibility layers."],
  ["Localization", "Consistent speech output across markets and product surfaces."],
];

const voices = ["Atlas", "Mira", "Nora", "Sol"];

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Praha Labs home">
          <span className="brand-mark" aria-hidden="true" />
          <span>Praha Labs</span>
        </a>
        <nav>
          <a href="#model">Model</a>
          <a href="#studio">Studio</a>
          <a href="#api">API</a>
          <a href="/demo">Demo</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Praha Labs voice model</p>
          <h1>Text-to-speech that sounds ready for product.</h1>
          <p className="hero-lede">
            Praha Voice-1 turns text into clear, expressive speech for agents,
            apps, narration, and developer workflows. Built by Praha Labs for
            teams that need voice output with control, speed, and polish.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button primary" href="/demo">
              Try Voice-1
            </a>
            <a className="button secondary" href="#api">
              View API
            </a>
          </div>
        </div>

        <aside className="voice-console" aria-label="Praha Voice-1 preview">
          <div className="console-header">
            <span>Praha Voice-1</span>
            <strong>Live</strong>
          </div>
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 46 }).map((_, index) => (
              <span key={index} style={{ "--i": index } as React.CSSProperties} />
            ))}
          </div>
          <div className="voice-readout">
            {modelStats.map(([label, value]) => (
              <div className="readout-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="status-strip" aria-label="Model facts">
        {modelStats.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section id="model" className="section work-section">
        <div className="section-heading">
          <p className="eyebrow">Model</p>
          <h2>A voice model for apps that speak back.</h2>
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

      <section id="studio" className="voice-studio section">
        <div>
          <p className="eyebrow">Voice studio</p>
          <h2>Choose a voice, set the style, stream the result.</h2>
        </div>
        <div className="voice-grid" aria-label="Available voices">
          {voices.map((voice) => (
            <article className="voice-card" key={voice}>
              <div className="voice-avatar" aria-hidden="true">
                {voice.slice(0, 1)}
              </div>
              <h3>{voice}</h3>
              <p>Balanced, production-ready English voice for app and agent output.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="api" className="section api-section">
        <div className="section-heading">
          <p className="eyebrow">API</p>
          <h2>Generate speech from a simple request.</h2>
        </div>
        <div className="code-panel" aria-label="API example">
          <pre>
            <code>{`POST /api/inference
{
  "model": "praha-voice-1",
  "voice": "atlas",
  "text": "Welcome to Praha Labs."
}`}</code>
          </pre>
        </div>
      </section>

      <section className="section usecase-section">
        <div>
          <p className="eyebrow">Use cases</p>
          <h2>Built for every product surface where voice matters.</h2>
        </div>
        <div className="milestones">
          {useCases.map(([title, copy], index) => (
            <article className="milestone" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <p className="eyebrow">Praha Labs</p>
        <h2>Ship voice into your product.</h2>
        <a className="button primary" href="/demo">
          Open the demo
        </a>
      </section>
    </main>
  );
}
