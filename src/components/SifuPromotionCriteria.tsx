import React from 'react';

// Authentic JKD promotion criteria (example, cite real sources in future)
const criteria = [
  {
    level: 'Beginner',
    requirements: [
      'Consistent daily attendance (minimum 30 days)',
      'Demonstrate basic footwork (step and slide, push shuffle, pendulum)',
      'Show correct on-guard stance',
      'Execute jab, cross, lead hook, rear straight, lead uppercut, rear uppercut',
      'Basic defense: parry, slip, cover',
      'Shadowbox with correct form for 2 minutes',
      'Understand centerline theory (as per Tao of Jeet Kune Do)',
    ],
    source: 'Tao of Jeet Kune Do, Bruce Lee',
  },
  {
    level: 'Intermediate',
    requirements: [
      '60+ days consistent training',
      'Demonstrate all beginner skills plus: lead/rear elbow, knee, basic kicks (lead leg, rear leg, side kick)',
      'Show ability to flow between ranges (kicking, punching, trapping, grappling)',
      'Defend against basic attacks (parry, slip, cover, footwork escape)',
      'Shadowbox with combos for 3 minutes',
      'Apply basic trapping (pak sao, lop sao)',
      'Understand five ways of attack (Tao of Jeet Kune Do)',
    ],
    source: 'Tao of Jeet Kune Do, Bruce Lee',
  },
  // Add more levels as needed
];

export default function SifuPromotionCriteria() {
  // Simple icon for each level (could be replaced with SVGs)
  const icons: Record<string, string> = {
    Beginner: '🥋',
    Intermediate: '⚡',
    Advanced: '🐉',
    // Add more as needed
  };
  return (
    <section className="martial-card promotion-criteria">
      <h2>Promotion Criteria (Source-Locked)</h2>
      {criteria.map((c) => (
        <div key={c.level}>
          <div className="promotion-criteria-level">
            <span className="promotion-criteria-level-icon">{icons[c.level] || '🥋'}</span>
            <h3>{c.level}</h3>
          </div>
          <ul className="promotion-criteria-list">
            {c.requirements.map((r, i) => (
              <li key={i} className="promotion-criteria-badge">{r}</li>
            ))}
          </ul>
          <div className="promotion-criteria-source">Source: {c.source}</div>
        </div>
      ))}
      <p className="plan-note">Sifu will only promote you when you meet all criteria, based on real JKD sources.</p>
    </section>
  );
}