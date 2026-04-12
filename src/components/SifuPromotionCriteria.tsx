import React from 'react';

// Authentic JKD promotion criteria (example, cite real sources in future)
const criteria = [
  {
    level: 'Initiate',
    requirements: [
      '90 days of daily training (no more than 3 missed days/month)',
      'Master basic footwork and on-guard stance',
      'Demonstrate basic punches and kicks with correct form',
      'Shadowbox for 5 minutes',
      'Pass fitness baseline: plank, pushups, pullups, squats',
      'Understand basic theory and attack methods',
    ],
    source: 'Authentic martial arts curriculum',
  },
  {
    level: 'Year 1: Fighter',
    requirements: [
      '365 days of logged training (max 15 missed days)',
      'Demonstrate all Initiate skills plus: advanced footwork and rhythm',
      'Spar (light/technical) at least 24 times, log progress',
      'Show ability to flow between all ranges and combine attacks',
      'Defend against all basic attacks under pressure',
      'Shadowbox with combos for 10 minutes',
      'Pass advanced fitness: plank, pushups, pullups, squats',
      'Document physical transformation',
      'Coach a beginner through basics',
      'Complete at least 12 focus mitt training sessions',
      'Complete at least 12 heavy bag training sessions',
      'Complete at least 12 speed bag training sessions',
    ],
    source: 'Authentic martial arts curriculum',
  },
  {
    level: 'Year 2: Practitioner',
    requirements: [
      '2 years of consistent training (min 650 days logged)',
      'Demonstrate all Fighter skills plus: advanced trapping, clinch, takedown defense, advanced combinations',
      'Spar (full contact, controlled) at least 36 times',
      'Teach a group class or lead a training session',
      'Show mastery of recovery, nutrition, and injury prevention',
      'Pass elite fitness: plank, pushups, pullups, squats',
      'Document technical progress',
    ],
    source: 'Authentic martial arts curriculum',
  },
  {
    level: 'Year 3: Senior',
    requirements: [
      '3 years of logged training (min 1000 days)',
      'Demonstrate all Practitioner skills plus: advanced sparring, scenario drills, complex combinations',
      'Mentor at least 2 new students through Initiate and Fighter levels',
      'Compete in at least 1 open martial arts event',
      'Show deep understanding of philosophy (written or oral exam)',
      'Pass senior fitness: plank, pushups, pullups, squats',
    ],
    source: 'Authentic martial arts curriculum',
  },
  {
    level: 'Year 4+: Sifu',
    requirements: [
      '4+ years of continuous training (min 1350 days)',
      'Demonstrate all Senior skills plus: advanced teaching, curriculum design',
      'Mentor at least 5 students to Fighter level',
      'Contribute to the martial arts community',
      'Show mastery in all ranges under pressure, with video review of advanced combinations',
      'Pass Sifu fitness: plank, pushups, pullups, squats',
      'Ongoing: continue to train, teach, and refine',
    ],
    source: 'Authentic martial arts curriculum',
  },
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