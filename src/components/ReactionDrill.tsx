import React, { useState, useRef } from 'react';

const combos = [
  'Jab-Cross',
  'Lead Hook-Cross',
  'Cross-Lead Hook',
  'Jab-Lead Leg Kick',
  'Jab-Cross-Lead Hook',
  'Cross-Body Cross',
  'Jab-Lead Elbow',
  'Jab-Cross-Lead Knee',
  'Jab-Lead Uppercut',
  'Cross-Lead Hook-Body Cross',
  // Add more authentic JKD combos as needed
];

function getRandomCombo() {
  return combos[Math.floor(Math.random() * combos.length)];
}

export default function ReactionDrill() {
  const [active, setActive] = useState(false);
  const [currentCombo, setCurrentCombo] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [history, setHistory] = useState<{combo: string, time: number}[]>([]);
  const [best, setBest] = useState(() => {
    const stored = localStorage.getItem('reflex-best');
    return stored ? JSON.parse(stored) : { date: '', combo: '', time: 9999 };
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startDrill = () => {
    setActive(true);
    setHistory([]);
    nextCombo();
  };

  const stopDrill = () => {
    setActive(false);
    setCurrentCombo('');
    setWaiting(false);
    setReactionTime(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const nextCombo = () => {
    setWaiting(true);
    setCurrentCombo('');
    setReactionTime(null);
    // Wait random 1-4 seconds
    const delay = 1000 + Math.random() * 3000;
    timerRef.current = setTimeout(() => {
      const combo = getRandomCombo();
      setCurrentCombo(combo);
      setWaiting(false);
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleReact = () => {
    if (!currentCombo) return;
    const time = Date.now() - startTimeRef.current;
    setReactionTime(time);
    setHistory((h) => [...h, { combo: currentCombo, time }]);
    if (time < best.time) {
      const newBest = { date: new Date().toISOString().slice(0,10), combo: currentCombo, time };
      setBest(newBest);
      localStorage.setItem('reflex-best', JSON.stringify(newBest));
      window.dispatchEvent(new CustomEvent('new-best-reaction', { detail: newBest }));
    }
    setCurrentCombo('');
    setTimeout(nextCombo, 1000); // Next combo after 1s
  };

  return (
    <section className="martial-card reaction-drill">
      <h2>Reaction Drill (Sifu Calls)</h2>
      {!active ? (
        <button className="ledger-button" onClick={startDrill}>Start Drill</button>
      ) : (
        <button className="ledger-button" onClick={stopDrill}>Stop Drill</button>
      )}
      {active && (
        <div className="dragon-section">
          {waiting && <p>Sifu is watching... Get ready!</p>}
          {currentCombo && (
            <>
              <h3 className="dragon-combo">{currentCombo}</h3>
              <button className="ledger-button" onClick={handleReact}>React!</button>
              {reactionTime !== null && <p>Reaction Time: {reactionTime} ms</p>}
            </>
          )}
        </div>
      )}
      {history.length > 0 && (
        <div className="dragon-section">
          <h4>History</h4>
          <ul>
            {history.slice(-5).map((h, i) => (
              <li key={i}>{h.combo}: {h.time} ms</li>
            ))}
          </ul>
        </div>
      )}
      <p className="plan-note">Sifu will call out combos at random. React as fast as you can!</p>
    </section>
  );
}