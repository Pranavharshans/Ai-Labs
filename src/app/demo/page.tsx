import Link from "next/link";

const samples = [
  "Welcome to Praha Labs. This is Praha Voice-1 speaking in a clear product voice.",
  "Generate narration, assistant replies, and onboarding audio from a single API.",
  "Text-to-speech should feel fast, controlled, and ready for real users.",
];

export default function DemoPage() {
  return (
    <main className="demo-page">
      <section className="demo-shell">
        <p className="eyebrow">Praha Voice-1 demo</p>
        <h1>Generate speech from text.</h1>
        <p>
          This demo page presents the product surface for Praha Voice-1. Connect
          it to the inference endpoint when the hosted audio backend is attached.
        </p>
        <div className="demo-composer" aria-label="Text-to-speech composer">
          <label htmlFor="demo-text">Input text</label>
          <textarea id="demo-text" defaultValue={samples[0]} rows={5} />
          <div className="demo-controls">
            <button type="button" className="button primary">
              Generate audio
            </button>
            <Link className="button secondary" href="/">
              Back to Praha Labs
            </Link>
          </div>
        </div>
        <div className="sample-stack" aria-label="Sample prompts">
          {samples.map((sample) => (
            <p key={sample}>{sample}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
