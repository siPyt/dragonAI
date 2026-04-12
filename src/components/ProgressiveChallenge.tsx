import React, { useState } from 'react';

const baseChallenges = [
  'Shadowbox for 2 minutes nonstop, focusing on footwork and defense.',
  'Perform 50 lead leg kicks (each side).',
  'Complete 3 rounds of jab-cross-lead hook combos (1 min each).',
  'Defend 20 random attacks (parry/slip/cover) with a partner or shadow.',
  'Hold on-guard stance for 5 minutes, switching leads halfway.',
  'Perform 30 clinch escapes (each side).',
  'Execute 40 lead elbows and 40 rear elbows.',
  'Do 3 rounds of pad work or air combos, focusing on speed.',
  'Write a reflection on your weakest skill and how to improve it.',
  'Perform 100 jumping jacks, then 2 minutes of shadowboxing.',
];

function getChallenge(day: number) {
  // Cycle through and increase reps/time every 7 days
  const idx = day % baseChallenges.length;
  const week = Math.floor(day / 7) + 1;
  let challenge = baseChallenges[idx];
  if (challenge.includes('minute')) {
    challenge = challenge.replace(/(\d+) minute/, (m, n) => `${parseInt(n) + week} minute`);
  }
  if (challenge.match(/\d+/)) {
    challenge = challenge.replace(/(\d+)/g, (m) => `${parseInt(m) + week * 5}`);
  }
  return challenge;
}

export default function ProgressiveChallenge() {
  const [day, setDay] = useState(() => {
    const stored = localStorage.getItem('progressive-challenge-day');
    return stored ? parseInt(stored) : 0;
  });
  const [complete, setComplete] = useState(() => {
    const stored = localStorage.getItem('progressive-challenge-complete');
    return stored === 'true';
  });

  // Reset challenge at start of week
  React.useEffect(() => {
    const today = new Date();
    if (today.getDay() === 0) { // Sunday
      setDay(0);
      setComplete(false);
      localStorage.setItem('progressive-challenge-day', '0');
      localStorage.setItem('progressive-challenge-complete', 'false');
    }
  }, []);

  const challenge = getChallenge(day);

  const markComplete = () => {
    setComplete(true);
    localStorage.setItem('progressive-challenge-complete', 'true');
  };

  const nextDay = () => {
    setDay((d) => {
      const next = d + 1;
      localStorage.setItem('progressive-challenge-day', next.toString());
      localStorage.setItem('progressive-challenge-complete', 'false');
      setComplete(false);
      return next;
    });
  };

  return (
    <section className="martial-card progressive-challenge">
      <h2>Progressive Challenge</h2>
      <p><strong>Day {day + 1}:</strong> {challenge}</p>
      {!complete ? (
        <button className="ledger-button" onClick={markComplete}>Mark Complete</button>
      ) : (
        <button className="ledger-button" onClick={nextDay}>Next Challenge</button>
      )}
      <p className="plan-note">Each day, a new challenge appears, increasing in difficulty. Sifu expects your best effort!</p>
    </section>
  );
}