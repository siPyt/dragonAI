import React from 'react';

// Example: In a real app, this would be dynamic, based on user data/localStorage
const streak = {
  current: 7,
  best: 14,
  week: [true, true, true, false, true, true, true], // Sun-Sat
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function SifuStreakTracker() {
  return (
    <section className="martial-card streak-tracker">
      <h2>Training Streak</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        {streak.week.map((trained, i) => (
          <div key={i} style={{
            width: 32, height: 32, borderRadius: 16, background: trained ? '#43aa8b' : '#e63946', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 16
          }}>{days[i]}</div>
        ))}
      </div>
      <p>Current Streak: <span style={{ color: '#43aa8b', fontWeight: 'bold' }}>{streak.current}</span> days</p>
      <p>Best Streak: <span style={{ color: '#4361ee', fontWeight: 'bold' }}>{streak.best}</span> days</p>
      <p className="plan-note">Train every day to build your streak! Sifu rewards consistency.</p>
    </section>
  );
}