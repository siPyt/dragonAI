import { useEffect, useRef, useState } from 'react';

// Placeholder for future pose detection integration
export default function FlexibilityAssessment() {
  const [score, setScore] = useState(null);
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
    setScore('Recorded (manual for now)');
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
          <video ref={videoRef} autoPlay playsInline width={320} height={240} style={{ borderRadius: 8, background: '#222' }} />
          <button className="ledger-button" onClick={markComplete}>Mark Complete</button>
        </div>
      )}
      {score && <div className="assessment-score">Result: {score}</div>}
      <p className="plan-note">Track your flexibility over time. Sifu will adapt your plan as you improve.</p>
      <div style={{ marginTop: 16 }}>
        <button onClick={handleSave} style={{ marginRight: 8 }}>Save</button>
        <button onClick={handleReset} style={{ marginRight: 8 }}>Reset</button>
        <button onClick={measureWithCamera}>Measure with Camera (Soon)</button>
      </div>
    </section>
  );
}
