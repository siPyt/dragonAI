import { useEffect, useState } from 'react';

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function ProgressTracker() {
  const [attendance, setAttendance] = useState(() => {
    const saved = window.localStorage.getItem('dragonai-attendance');
    return saved ? JSON.parse(saved) : {};
  });
  const [today, setToday] = useState(getToday());

  useEffect(() => {
    window.localStorage.setItem('dragonai-attendance', JSON.stringify(attendance));
  }, [attendance]);

  function markToday() {
    setAttendance((prev) => ({ ...prev, [today]: true }));
  }

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().slice(0, 10);
  });

  return (
    <section className="martial-card progress-tracker">
      <h2>Progress Tracker</h2>
      <div className="attendance-row">
        {days.map((d) => (
          <span key={d} className={attendance[d] ? 'attended' : 'missed'} title={d}>
            {attendance[d] ? '●' : '○'}
          </span>
        ))}
      </div>
      <button className="ledger-button" onClick={markToday} disabled={!!attendance[today]}>
        {attendance[today] ? 'Today Marked' : 'Mark Today as Trained'}
      </button>
      <p className="plan-note">Track your consistency. Sifu will use this for promotion and feedback.</p>
    </section>
  );
}
