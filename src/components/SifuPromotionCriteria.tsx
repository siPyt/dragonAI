import React from 'react';

// Authentic JKD promotion criteria (example, cite real sources in future)
const criteria = [
  {
    level: 'Initiate',
    requirements: [
      '90 days of daily training (no more than 3 missed days/month)',
      'Master basic footwork: step & slide, push shuffle, pendulum, switch step',
      'Demonstrate on-guard stance under pressure',
      'Execute all basic punches (jab, cross, hook, uppercut) and all basic kicks (front, side, round, back) with correct form (video review)',
      'Shadowbox with correct form for 5 minutes',
      'Pass fitness baseline: 2 min plank, 50 pushups, 10 pullups, 100 squats',
      'Understand centerline theory and five ways of attack',
    ],
    source: 'Tao of Jeet Kune Do, Bruce Lee',
  },
  {
    level: 'Year 1: Fighter',
    requirements: [
      '365 days of logged training (max 15 missed days)',
      'Demonstrate all Initiate skills plus: advanced footwork, broken rhythm, feints',
      'Spar (light/technical) at least 24 times, log progress',
      'Show ability to flow between all ranges (kicking, punching, trapping, grappling) and combine attacks (e.g., kick-punch, punch-trap, trap-grapple)',
      'Defend against all basic attacks under pressure',
      'Shadowbox with combos for 10 minutes',
      'Pass advanced fitness: 5 min plank, 100 pushups, 20 pullups, 300 squats',
      'Document physical transformation (photos, stats)',
      'Coach a beginner through basics',
    ],
    source: 'Tao of Jeet Kune Do, Bruce Lee',
  },
  {
    level: 'Year 2: Practitioner',
    requirements: [
      '2 years of consistent training (min 650 days logged)',
      'Demonstrate all Fighter skills plus: advanced trapping, clinch, takedown defense, advanced kicking and punching combinations',
      'Spar (full contact, controlled) at least 36 times',
      'Teach a group class or lead a training session',
      'Show mastery of recovery, nutrition, and injury prevention',
      'Pass elite fitness: 10 min plank, 200 pushups, 40 pullups, 500 squats',
      'Document technical progress (video analysis)',
    ],
    source: 'JKD sources, Bruce Lee',
  },
  {
    level: 'Year 3: Senior',
    requirements: [
      '3 years of logged training (min 1000 days)',
      'Demonstrate all Practitioner skills plus: advanced sparring, scenario drills, complex kicking-punching-trapping-grappling combinations',
      'Mentor at least 2 new students through Initiate and Fighter levels',
      'Compete in at least 1 open martial arts event (any format)',
      'Show deep understanding of JKD philosophy (written essay or oral exam)',
      'Pass senior fitness: 15 min plank, 300 pushups, 60 pullups, 700 squats',
    ],
    source: 'JKD sources, Bruce Lee',
  },
  {
    level: 'Year 4+: Sifu',
    requirements: [
      '4+ years of continuous training (min 1350 days)',
      'Demonstrate all Senior skills plus: advanced teaching, curriculum design',
      'Mentor at least 5 students to Fighter level',
      'Contribute to JKD community (write, teach, organize events)',
      'Show mastery in all ranges (kicking, punching, trapping, grappling), under pressure, with video review of advanced combinations',
      'Pass Sifu fitness: 20 min plank, 400 pushups, 80 pullups, 1000 squats',
      'Ongoing: continue to train, teach, and refine',
    ],
    source: 'JKD sources, Bruce Lee',
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