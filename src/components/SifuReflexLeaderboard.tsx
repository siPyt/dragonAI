import React, { useState, useEffect } from 'react';

export default function SifuReflexLeaderboard() {
  const [best, setBest] = useState(() => {
    const stored = localStorage.getItem('reflex-best');
    return stored ? JSON.parse(stored) : { date: '', combo: '', time: 9999 };
  });

  // Listen for new best from ReactionDrill (if implemented)
  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && e.detail.time < best.time) {
        setBest(e.detail);
        localStorage.setItem('reflex-best', JSON.stringify(e.detail));
      }
    };
    window.addEventListener('new-best-reaction', handler);
    return () => window.removeEventListener('new-best-reaction', handler);
  }, [best]);

  return (
    <section className="martial-card reflex-leaderboard">
      <h2>Reflex Leaderboard</h2>
      <table className="dragon-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Combo</th>
            <th>Best Reaction Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="dragon-table-best">
            <td>{best.date}</td>
            <td>{best.combo}</td>
            <td className="dragon-table-best-value">{best.time}</td>
          </tr>
        </tbody>
      </table>
      <p className="plan-note">Try to beat your best reaction time! Sifu is watching.</p>
    </section>
  );
}