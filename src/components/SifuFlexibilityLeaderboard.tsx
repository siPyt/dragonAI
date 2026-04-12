import React, { useState, useEffect } from 'react';

export default function SifuFlexibilityLeaderboard() {
  const [best, setBest] = useState(() => {
    const stored = localStorage.getItem('flexibility-best');
    return stored ? JSON.parse(stored) : { date: '', score: 0 };
  });

  // Listen for new best from FlexibilityAssessment (if implemented)
  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && e.detail.score > best.score) {
        setBest(e.detail);
        localStorage.setItem('flexibility-best', JSON.stringify(e.detail));
      }
    };
    window.addEventListener('new-best-flexibility', handler);
    return () => window.removeEventListener('new-best-flexibility', handler);
  }, [best]);

  return (
    <section className="martial-card flexibility-leaderboard">
      <h2>Flexibility Leaderboard</h2>
      <table className="dragon-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Best Score (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="dragon-table-best">
            <td>{best.date}</td>
            <td className="dragon-table-best-value">{best.score}</td>
          </tr>
        </tbody>
      </table>
      <p className="plan-note">Try to beat your best flexibility score! Sifu is watching.</p>
    </section>
  );
}