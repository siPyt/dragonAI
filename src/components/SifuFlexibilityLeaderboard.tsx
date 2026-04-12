import React from 'react';

// Example: In a real app, this would be dynamic, based on user data/localStorage
const leaderboard = [
  { date: '2024-06-01', score: '22 cm' },
  { date: '2024-06-02', score: '23 cm' },
  { date: '2024-06-03', score: '24 cm' },
  { date: '2024-06-04', score: '25 cm' },
  { date: '2024-06-05', score: '26 cm' },
];

export default function SifuFlexibilityLeaderboard() {
  return (
    <section className="martial-card flexibility-leaderboard">
      <h2>Flexibility Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Best Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, i) => (
            <tr key={i} style={{ background: i === leaderboard.length - 1 ? '#d4f3ef' : 'inherit' }}>
              <td>{entry.date}</td>
              <td style={{ fontWeight: i === leaderboard.length - 1 ? 'bold' : 'normal', color: i === leaderboard.length - 1 ? '#43aa8b' : '#222' }}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="plan-note">Try to beat your best flexibility score! Sifu is watching.</p>
    </section>
  );
}