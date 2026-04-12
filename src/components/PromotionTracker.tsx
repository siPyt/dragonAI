import { useEffect, useState } from 'react';

const levels = [
  { name: 'Beginner', criteria: (data) => data.days >= 7 && data.streak >= 3 },
  { name: 'Intermediate', criteria: (data) => data.days >= 30 && data.streak >= 7 },
  { name: 'Advanced', criteria: (data) => data.days >= 90 && data.streak >= 21 },
  { name: 'JKD Practitioner', criteria: (data) => data.days >= 180 && data.streak >= 30 },
  { name: 'JKD Sifu', criteria: (data) => data.days >= 365 && data.streak >= 60 }
];

function getAttendance() {
  const saved = window.localStorage.getItem('dragonai-attendance');
  return saved ? JSON.parse(saved) : {};
}

function getStats() {
  const attendance = getAttendance();
  const days = Object.keys(attendance).filter((d) => attendance[d]).length;
  let streak = 0;
  let maxStreak = 0;
  let prev = null;
  Object.keys(attendance)
    .sort()
    .forEach((d) => {
      if (!attendance[d]) return;
      if (!prev) {
        streak = 1;
      } else {
        const diff = (new Date(d) - new Date(prev)) / (1000 * 60 * 60 * 24);
        if (diff === 1) streak++;
        else streak = 1;
      }
      if (streak > maxStreak) maxStreak = streak;
      prev = d;
    });
  return { days, streak: maxStreak };
}

export default function PromotionTracker() {
  const [level, setLevel] = useState(levels[0].name);
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    const s = getStats();
    setStats(s);
    for (let i = levels.length - 1; i >= 0; i--) {
      if (levels[i].criteria(s)) {
        setLevel(levels[i].name);
        break;
      }
    }
  }, []);

  return (
    <section className="martial-card promotion-tracker">
      <h2>Promotion Tracker</h2>
      <div className="promotion-level">Current Level: <strong>{level}</strong></div>
      <div className="promotion-stats">Total Days Trained: {stats.days} | Best Streak: {stats.streak}</div>
      <p className="plan-note">Sifu will promote you only when you meet real, consistent criteria—no shortcuts.</p>
    </section>
  );
}
