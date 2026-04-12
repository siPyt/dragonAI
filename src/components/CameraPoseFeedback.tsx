import { useEffect, useRef, useState } from 'react';

export default function CameraPoseFeedback() {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    async function getCamera() {
      // Placeholder for pose analysis logic (TensorFlow.js/MediaPipe integration coming soon)
      const analyzePose = () => {
        alert('Pose analysis coming soon! This will use AI to give you feedback on your stance and form.');
      };

      return (
        <div className="camera-pose-feedback">
          <h3>Camera Feedback (Coming Soon)</h3>
          <p>
            This feature will use your camera to analyze your stance and form. For now, use the camera preview to check your posture.
          </p>
          <video ref={videoRef} autoPlay playsInline width="320" height="240" style={{ border: '1px solid #ccc', borderRadius: 8 }} />
          <div style={{ marginTop: 8 }}>
            <button onClick={startCamera} disabled={cameraActive}>
              {cameraActive ? 'Camera On' : 'Start Camera'}
            </button>
            <button onClick={stopCamera} disabled={!cameraActive} style={{ marginLeft: 8 }}>
              Stop Camera
            </button>
            <button onClick={analyzePose} disabled={!cameraActive} style={{ marginLeft: 8 }}>
              Analyze Pose
            </button>
          </div>
        </div>
      );

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
