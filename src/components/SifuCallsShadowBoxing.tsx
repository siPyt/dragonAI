import { useEffect, useRef, useState } from 'react';
import { elevenlabsTTS } from '../utils/elevenlabsTTS';

interface Combo {
  type: string;
  call: string;
  source: string;
}

const combos: Combo[] = [
  // Direct Attack
  { type: 'Direct Attack', call: 'Lead Straight Punch', source: 'Bruce Lee’s Fighting Method, Vol. 1, p. 22' },
  { type: 'Direct Attack', call: 'Lead Side Stop Kick', source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 34' },
  { type: 'Direct Attack', call: 'Rear Cross', source: 'The Art of Expressing the Human Body, p. 88' },
  { type: 'Direct Attack', call: 'Pendulum Side Kick', source: 'Tao of Jeet Kune Do, p. 56' },
  // Attack by Drawing
  { type: 'Attack by Drawing', call: 'Feint low, then lead hook high', source: 'Tao of Jeet Kune Do, p. 67' },
  { type: 'Attack by Drawing', call: 'Step back, bait, then intercept with cross', source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 41' },
  // Progressive Indirect Attack
  { type: 'Progressive Indirect Attack', call: 'Jab, feint, then low side kick', source: 'Tao of Jeet Kune Do, p. 70' },
  { type: 'Progressive Indirect Attack', call: 'Jab, cross, feint, lead hook', source: 'The Art of Expressing the Human Body, p. 89' },
  // Hand Immobilization Attack
  { type: 'Hand Immobilization Attack', call: 'Pak sao, then straight punch', source: 'Bruce Lee’s Fighting Method, Vol. 3, p. 41' },
  { type: 'Hand Immobilization Attack', call: 'Lap sao, backfist', source: 'Bruce Lee’s Fighting Method, Vol. 3, p. 42' },
  // Pro Boxing Trapping Combos
  { type: 'Boxing Trapping', call: 'Parry the jab, counter with cross', source: 'Pro Boxing Fundamentals' },
  { type: 'Boxing Trapping', call: 'Catch the jab, return a quick cross', source: 'Pro Boxing Fundamentals' },
  { type: 'Boxing Trapping', call: 'Smother opponent’s punches, throw a short uppercut', source: 'Pro Boxing Fundamentals' },
  { type: 'Boxing Trapping', call: 'Clinch to neutralize, then pivot out', source: 'Pro Boxing Fundamentals' },
  { type: 'Boxing Trapping', call: 'Control lead hand, throw a lead hook', source: 'Pro Boxing Fundamentals' },
  { type: 'Boxing Trapping', call: 'Double parry, return cross', source: 'Pro Boxing Advanced' },
  { type: 'Boxing Trapping', call: 'Shoulder bump, then lead hook', source: 'Pro Boxing Advanced' },
  { type: 'Boxing Trapping', call: 'Frame with forearm, pivot and counter', source: 'Pro Boxing Advanced' },
  { type: 'Boxing Trapping', call: 'Tie up wrist, throw uppercut', source: 'Pro Boxing Advanced' },
  // Attack by Combination
  { type: 'Attack by Combination', call: 'Jab, cross, lead hook, rear uppercut', source: 'The Art of Expressing the Human Body, p. 88' },
  { type: 'Attack by Combination', call: 'Jab, cross, lead hook, low side kick', source: 'Tao of Jeet Kune Do, p. 71' },
];


function getRandomCombo(): Combo {
  return combos[Math.floor(Math.random() * combos.length)];
}


export default function SifuCallsShadowBoxing() {
  const [current, setCurrent] = useState<Combo | null>(null);
  const [history, setHistory] = useState<Combo[]>([]);
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callTimeRef = useRef<number | null>(null);


  useEffect(() => {
    if (!running) return;
    let cancelled = false;
    async function speakCombo(combo: Combo) {
      try {
        const audioBlob = await elevenlabsTTS(combo.call);
        if (audioBlob && !cancelled) {
          const url = URL.createObjectURL(audioBlob);
          const audio = new Audio(url);
          audio.play();
        }
      } catch {}
    }
    function nextCall() {
      const combo = getRandomCombo();
      setCurrent(combo);
      setHistory((h: Combo[]) => [combo, ...h].slice(0, 10));
      callTimeRef.current = Date.now();
      speakCombo(combo);
      timerRef.current = setTimeout(nextCall, 3000 + Math.random() * 2000);
    }
    nextCall();
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [running]);


  function markResponded() {
    if (!callTimeRef.current) return;
    const rt = Date.now() - callTimeRef.current;
    setResponseTimes((rts: number[]) => [rt, ...rts].slice(0, 10));
    callTimeRef.current = null;
  }


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
          <button className="respond-button" onClick={markResponded}>Responded</button>
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
      <div className="response-times">
        <h4>Recent Response Times (ms)</h4>
        <ul>
          {responseTimes.map((rt, i) => (
            <li key={i}>{rt}</li>
          ))}
        </ul>
      </div>
      <p className="plan-note">Sifu will call out real JKD combos. React as fast as you can, with correct form. (Camera feedback coming soon.)</p>
    </section>
  );
}
