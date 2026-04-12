import { useEffect, useRef, useState } from 'react';

const combos = [
  // Direct Attack
  {
    type: 'Direct Attack',
    call: 'Lead Straight Punch',
    source: 'Bruce Lee’s Fighting Method, Vol. 1, p. 22'
  },
  {
    type: 'Direct Attack',
    call: 'Lead Side Stop Kick',
    source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 34'
  },
  // Attack by Drawing
  {
    type: 'Attack by Drawing',
    call: 'Feint low, then lead hook high',
    source: 'Tao of Jeet Kune Do, p. 67'
  },
  {
    type: 'Attack by Drawing',
    call: 'Step back, bait, then intercept with cross',
    source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 41'
  },
  // Progressive Indirect Attack
  {
    type: 'Progressive Indirect Attack',
    call: 'Jab, feint, then low side kick',
    source: 'Tao of Jeet Kune Do, p. 70'
  },
  // Hand Immobilization Attack
  {
    type: 'Hand Immobilization Attack',
    call: 'Pak sao, then straight punch',
    source: 'Bruce Lee’s Fighting Method, Vol. 3, p. 41'
  },
  // Attack by Combination
  {
    type: 'Attack by Combination',
    call: 'Jab, cross, lead hook, rear uppercut',
    source: 'The Art of Expressing the Human Body, p. 88'
  }
];

function getRandomCombo() {
  return combos[Math.floor(Math.random() * combos.length)];
}

export default function SifuCallsShadowBoxing() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    function nextCall() {
      const combo = getRandomCombo();
      setCurrent(combo);
      setHistory((h) => [combo, ...h].slice(0, 10));
      timerRef.current = setTimeout(nextCall, 3000 + Math.random() * 2000);
    }
    nextCall();
    return () => clearTimeout(timerRef.current);
  }, [running]);

  return (
    <section className="martial-card sifu-calls-shadowboxing">
      <h2>Sifu Calls: Shadowboxing</h2>
      <button className="ledger-button" onClick={() => setRunning((r) => !r)}>
        {running ? 'Stop' : 'Start'} Sifu Calls
      </button>
      {current && running && (
        <div className="current-call">
          <strong>{current.type}:</strong> {current.call}
          <span className="combo-source">({current.source})</span>
        </div>
      )}
      <div className="call-history">
        <h4>Recent Combos</h4>
        <ul>
          {history.map((c, i) => (
            <li key={i}>
              <strong>{c.type}:</strong> {c.call} <span className="combo-source">({c.source})</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="plan-note">Sifu will call out real JKD combos. React as fast as you can, with correct form. (Camera feedback coming soon.)</p>
    </section>
  );
}
