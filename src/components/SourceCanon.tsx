const sourceBlocks = [
  {
    title: 'Tao of Jeet Kune Do',
    focus: ['Principles and philosophy', 'Economy, simplicity, and interception', 'Personal expression within disciplined practice'],
    quote: 'Use the source as a compass for principles, not as permission to invent.'
  },
  {
    title: 'Bruce Lee\'s Fighting Method',
    focus: ['Lead-side timing and stop-hit work', 'Ranges, footwork, and application', 'Functional drilling structure'],
    quote: 'Technical answers should return to what can actually be trained.'
  },
  {
    title: 'Memories and Fitness Writings',
    focus: ['Conditioning routines', 'Discipline and self-observation', 'The relation between body preparation and expression'],
    quote: 'Daily notes and conditioning belong to the same way as formal technique.'
  }
];

const SourceCanon: React.FC = () => {
  return (
    <section className="component-full-width">
      <div className="section-heading-block">
        <p className="section-kicker">Source Study</p>
        <h1>Study lanes stay inside the canon.</h1>
        <p>Each lane narrows the assistant and the user back to the approved texts so the product feels like disciplined study rather than open-ended content generation.</p>
      </div>

      <div className="source-canon-grid">
        {sourceBlocks.map((source) => (
          <article key={source.title} className="martial-card">
            <p className="section-kicker">Approved Source</p>
            <h2>{source.title}</h2>
            <ul className="source-focus-list">
              {source.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <span className="source-quote">{source.quote}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SourceCanon;