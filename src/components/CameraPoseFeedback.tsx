import { useEffect, useRef, useState } from 'react';

export default function CameraPoseFeedback() {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);



  return (
    <section className="martial-card camera-pose-feedback">
      <h2>Camera Pose Feedback (Beta)</h2>
      <button className="ledger-button" onClick={() => setActive((a) => !a)}>
        {active ? 'Stop Camera' : 'Start Camera'}
      </button>
      {active && (
        <div className="camera-preview">
          <video ref={videoRef} autoPlay playsInline width={320} height={240} style={{ borderRadius: 8, background: '#222' }} />
        </div>
      )}
      {error && <div className="camera-error">{error}</div>}
      <p className="plan-note">(Pose analysis and feedback coming soon. For now, use the camera to check your stance and form visually.)</p>
    </section>
  );
}
