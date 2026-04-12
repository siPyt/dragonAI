import { useState } from 'react';

interface Drill {
  range: 'Kicking' | 'Punching' | 'Trapping' | 'Grappling';
  name: string;
  description: string;
  source: string;
}

const drills: Drill[] = [
  // Kicking
  {
    range: 'Kicking',
    name: 'Lead Side Stop Kick',
    description: 'Intercept the opponent’s advance with a lead leg stop kick to the knee or midsection. Focus on timing and minimal telegraphing.',
    source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 34'
  },
  {
    range: 'Kicking',
    name: 'Pendulum Side Kick',
    description: 'Use the pendulum step to close distance and deliver a fast side kick to the opponent’s midsection.',
    source: 'Tao of Jeet Kune Do, p. 56'
  },
  // Punching
  {
    range: 'Punching',
    name: 'Lead Straight Punch',
    description: 'From on-guard, fire a non-telegraphed lead straight punch to the opponent’s chin. Recover instantly to guard.',
    source: 'Bruce Lee’s Fighting Method, Vol. 1, p. 22'
  },
  {
    range: 'Punching',
    name: 'Jab-Cross-Hook Combo',
    description: 'Throw a jab, cross, and lead hook in rapid succession, focusing on speed and flow.',
    source: 'The Art of Expressing the Human Body, p. 88'
  },
  // Trapping
  {
    range: 'Trapping',
    name: 'Pak Sao-Lap Sao Drill',
    description: 'Use a pak sao (slapping hand) to clear the opponent’s guard, then lap sao (pulling hand) to control and strike.',
    source: 'Bruce Lee’s Fighting Method, Vol. 3, p. 41'
  },
  {
    range: 'Trapping',
    name: 'Chi Sao Sensitivity',
    description: 'Practice rolling hands with a partner, focusing on feeling for openings and immediate counterattack.',
    source: 'Tao of Jeet Kune Do, p. 102'
  },
  // Grappling
  {
    range: 'Grappling',
    name: 'Standing Clinch Escape',
    description: 'From a clinch, use hip movement and hand fighting to break free and create striking distance.',
    source: 'Living the Martial Way, p. 112'
  },
  {
    range: 'Grappling',
    name: 'Sprawl and Counter',
    description: 'When the opponent shoots for a takedown, sprawl your legs back and counter with a crossface or underhook.',
    source: 'The Art of Expressing the Human Body, p. 144'
  }
];

function getRandomDrill(range: Drill['range']) {
  const options = drills.filter((d) => d.range === range);
  return options[Math.floor(Math.random() * options.length)];
}

export default function TrainingSessionGenerator() {
  const [session, setSession] = useState<Drill[]>([]);

  function generateSession() {
    const newSession = [
      getRandomDrill('Kicking'),
      getRandomDrill('Punching'),
      getRandomDrill('Trapping'),
      getRandomDrill('Grappling')
    ];
    setSession(newSession);
  }

  return (
    <section className="martial-card training-session-generator">
      <h2>Generate Complete Training Session</h2>
      <button className="ledger-button" onClick={generateSession}>Generate Session</button>
      {session.length > 0 && (
        <div className="session-drill-list">
          {session.map((drill, idx) => (
            <article key={drill.name} className="drill-card">
              <h3>{idx + 1}. {drill.range} Range: {drill.name}</h3>
              <p>{drill.description}</p>
              <span className="drill-source">{drill.source}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
