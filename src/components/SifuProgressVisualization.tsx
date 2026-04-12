import React from 'react';

// Example: In a real app, this would be dynamic, based on user data and localStorage
const progress = {
  level: 'Beginner',
  criteria: [
    { label: 'Consistent daily attendance (minimum 30 days)', met: true },
    { label: 'Demonstrate basic footwork (step and slide, push shuffle, pendulum)', met: false },
    { label: 'Show correct on-guard stance', met: true },
    { label: 'Execute jab, cross, lead hook, rear straight, lead uppercut, rear uppercut', met: false },
    { label: 'Basic defense: parry, slip, cover', met: true },
    { label: 'Shadowbox with correct form for 2 minutes', met: false },
    { label: 'Understand centerline theory (as per Tao of Jeet Kune Do)', met: true },
  ],
};

export default function SifuProgressVisualization() {
  return (
    <section className="martial-card progress-visualization">
      <h2>Promotion Progress</h2>
      <h3>{progress.level}</h3>
      <ul>
        {progress.criteria.map((c, i) => (
          <li key={i} style={{ color: c.met ? '#43aa8b' : '#e63946', fontWeight: c.met ? 'bold' : 'normal' }}>
            {c.met ? '✔️' : '❌'} {c.label}
          </li>
        ))}
      </ul>
      <p className="plan-note">Sifu will only promote you when all criteria are met. Keep training!</p>
    </section>
  );
}