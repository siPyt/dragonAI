import React from 'react';

import { useEffect, useState } from 'react';

function getTodayIdx() {
  return new Date().getDay();
}

export default function SifuStreakTracker() {
  const [week, setWeek] = useState(() => {
    const stored = localStorage.getItem('streak-week');
    return stored ? JSON.parse(stored) : [false, false, false, false, false, false, false];
  });
  const [current, setCurrent] = useState(() => {
    const stored = localStorage.getItem('streak-current');
    return stored ? parseInt(stored) : 0;
  });
  const [best, setBest] = useState(() => {
    const stored = localStorage.getItem('streak-best');
    return stored ? parseInt(stored) : 0;
  });

  useEffect(() => {
    localStorage.setItem('streak-week', JSON.stringify(week));
    localStorage.setItem('streak-current', current.toString());
    localStorage.setItem('streak-best', best.toString());
  }, [week, current, best]);

  const markToday = () => {
    const idx = getTodayIdx();
    if (!week[idx]) {
      const newWeek = [...week];
      newWeek[idx] = true;
      setWeek(newWeek);
      setCurrent(current + 1);
      if (current + 1 > best) setBest(current + 1);
    }
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section className="martial-card streak-tracker">
      <h2>Training Streak</h2>
      <div className="dragon-streak-row">
        {week.map((trained: boolean, i: number) => (
          <div key={i} className={trained ? 'dragon-streak-day dragon-streak-trained' : 'dragon-streak-day dragon-streak-untrained'}>{days[i]}</div>
        ))}
      </div>
      <button className="ledger-button dragon-btn-mb" onClick={markToday}>Mark Today as Trained</button>
      <p>Current Streak: <span className="dragon-score">{current}</span> days</p>
      <p>Best Streak: <span style={{ color: '#4361ee', fontWeight: 'bold' }}>{best}</span> days</p>
      <p className="plan-note">Train every day to build your streak! Sifu rewards consistency.</p>
    </section>
  );
}