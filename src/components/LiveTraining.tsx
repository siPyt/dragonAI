import React, { useState, useRef } from 'react';
import { elevenlabsTTS } from '../utils/elevenlabsTTS';

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
];

function getRandomCombo() {
  return combos[Math.floor(Math.random() * combos.length)];
}

export default function LiveTraining() {
  const [active, setActive] = useState(false);
  const [currentCombo, setCurrentCombo] = useState('');
  const timerRef = useRef(null as null | number);

  const speak = async (text: string) => {
    try {
      const audioBlob = await elevenlabsTTS(text);
      if (audioBlob) {
        const url = URL.createObjectURL(audioBlob);
        const audio = new Audio(url);
        audio.play();
      }
    } catch {}
  };

  const start = () => {
    setActive(true);
    nextCombo();
  };

  const stop = () => {
    setActive(false);
    setCurrentCombo('');
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };

  const nextCombo = async () => {
    if (!active) return;
    const combo = getRandomCombo();
    setCurrentCombo(combo);
    await speak(combo);
    timerRef.current = window.setTimeout(nextCombo, 2000 + Math.random() * 2000);
  };

  React.useEffect(() => {
    if (!active) return;
    nextCombo();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, [active]);

  return (
    <section className="martial-card live-training">
      <h2>Live Training (Voice Combos)</h2>
      {!active ? (
        <button className="ledger-button" onClick={start}>Start Live Training</button>
      ) : (
        <button className="ledger-button" onClick={stop}>Stop</button>
      )}
      {active && (
        <div className="dragon-section">
          <h3 className="dragon-combo">{currentCombo}</h3>
          <p>Sifu is calling out combos. React instantly!</p>
        </div>
      )}
      <p className="plan-note">Press start and follow the voice. Combos change every few seconds.</p>
    </section>
  );
}