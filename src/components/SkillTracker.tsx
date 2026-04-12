import React, { useState } from 'react';

const skills = [
  'On-guard stance',
  'Footwork (step & slide, push shuffle, pendulum)',
  'Jab',
  'Cross',
  'Lead Hook',
  'Rear Straight',
  'Lead Uppercut',
  'Rear Uppercut',
  'Parry',
  'Slip',
  'Cover',
  'Pak Sao',
  'Lop Sao',
  'Lead Leg Kick',
  'Rear Leg Kick',
  'Side Kick',
  'Knee',
  'Elbow',
  'Clinch Escape',
  'Shadowboxing',
];

export default function SkillTracker() {
  const [ratings, setRatings] = useState(() => {
    const stored = localStorage.getItem('skill-ratings');
    return stored ? JSON.parse(stored) : skills.map(() => 0);
  });

  const setRating = (idx: number, value: number) => {
    setRatings((prev) => {
      const updated = prev.map((r, i) => (i === idx ? value : r));
      localStorage.setItem('skill-ratings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <section className="martial-card skill-tracker">
      <h2>Skill Tracker</h2>
      <table className="dragon-table">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, idx) => (
            <tr key={skill}>
              <td>{skill}</td>
              <td>
                {[1,2,3,4,5].map((n) => (
                  <span
                    key={n}
                    className={
                      'dragon-skill-dot ' + (ratings[idx] >= n ? 'dragon-skill-dot-filled' : 'dragon-skill-dot-empty')
                    }
                    onClick={() => setRating(idx, n)}
                  >
                    ●
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="plan-note">Rate your confidence in each skill. Sifu will adapt your plan to address weaknesses.</p>
    </section>
  );
}