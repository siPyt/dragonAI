import React from 'react';

// Example: In a real app, this would be dynamic, based on user data/localStorage
const leaderboard = [
  { date: '2024-06-01', combo: 'Jab-Cross', time: 320 },
  { date: '2024-06-02', combo: 'Lead Hook-Cross', time: 295 },
  { date: '2024-06-03', combo: 'Jab-Lead Leg Kick', time: 278 },
  { date: '2024-06-04', combo: 'Jab-Cross-Lead Hook', time: 310 },
  { date: '2024-06-05', combo: 'Cross-Body Cross', time: 265 },
];

export default function SifuReflexLeaderboard() {
  return (
    <section className="martial-card reflex-leaderboard">
      <h2>Reflex Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Combo</th>
            <th>Reaction Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, i) => (
            <tr key={i} style={{ background: i === 0 ? '#d4f3ef' : 'inherit' }}>
              <td>{entry.date}</td>
              <td>{entry.combo}</td>
              <td style={{ fontWeight: i === 0 ? 'bold' : 'normal', color: i === 0 ? '#43aa8b' : '#222' }}>{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="plan-note">Try to beat your best reaction time! Sifu is watching.</p>
    </section>
  );
}