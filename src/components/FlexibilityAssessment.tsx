import { useEffect, useRef, useState } from 'react';

// Placeholder for future pose detection integration
export default function FlexibilityAssessment() {
  const [score, setScore] = useState<number|null>(null);
  const [inputScore, setInputScore] = useState('');
  const [best, setBest] = useState(() => {
    const stored = localStorage.getItem('flexibility-best');
    return stored ? JSON.parse(stored) : { date: '', score: 0 };
  });
  const [active, setActive] = useState(false);
  const [instructions, setInstructions] = useState('');
  const videoRef = useRef(null);
  // Placeholder for future camera-based flexibility measurement
  const measureWithCamera = () => {
    alert('Camera-based flexibility measurement coming soon! This will use AI to assess your flexibility.');
  };

  useEffect(() => {
    if (!active) return;
    setInstructions('Sit-and-reach: Sit on the floor, legs straight, reach forward as far as you can. Hold for 3 seconds. (Camera will be used for future measurement.)');
    // In future: analyze pose, estimate reach distance
  }, [active]);

  function markComplete() {
    const val = parseInt(inputScore);
    if (!isNaN(val)) {
      setScore(val);
      if (val > best.score) {
        const newBest = { date: new Date().toISOString().slice(0,10), score: val };
        setBest(newBest);
        localStorage.setItem('flexibility-best', JSON.stringify(newBest));
        window.dispatchEvent(new CustomEvent('new-best-flexibility', { detail: newBest }));
      }
    }
    setActive(false);
  }

  return (
    <section className="martial-card flexibility-assessment">
      <h2>Flexibility Assessment (Beta)</h2>
      <button className="ledger-button" onClick={() => setActive((a) => !a)}>
        {active ? 'Cancel' : 'Start Assessment'}
      </button>
      {active && (
        <div className="assessment-instructions">
          <p>{instructions}</p>
           <video ref={videoRef} autoPlay playsInline width={320} height={240} className="dragon-video" width={320} height={240} />
           <div className="dragon-section">
             <label>Enter your reach (cm): <input type="number" value={inputScore} onChange={e => setInputScore(e.target.value)} className="dragon-input" style={{ width: 60 }} /></label>
           </div>
           <button className="ledger-button" onClick={markComplete}>Mark Complete</button>
        </div>
      )}
      {score !== null && <div className="assessment-score">Result: {score} cm</div>}
      <p className="plan-note">Track your flexibility over time. Sifu will adapt your plan as you improve.</p>
       <div className="dragon-section">
        <button onClick={handleSave} className="dragon-btn-mr">Save</button>
        <button onClick={handleReset} className="dragon-btn-mr">Reset</button>
        <button onClick={measureWithCamera}>Measure with Camera (Soon)</button>
      </div>
    </section>
  );
}
