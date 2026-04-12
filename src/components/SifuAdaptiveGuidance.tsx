import React from 'react';

// Dummy analysis for now; in future, pull from SkillTracker, streaks, etc.
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

function getAdvice() {
  let streak = 0;
  try {
    const streakData = localStorage.getItem('streak-current');
    if (streakData) streak = parseInt(streakData);
  } catch {}
  let ratings = [];
  try {
    const stored = localStorage.getItem('skill-ratings');
    if (stored) ratings = JSON.parse(stored);
  } catch {}
  let weakSkill = '';
  if (ratings.length === skills.length) {
    let min = Math.min(...ratings);
    let idx = ratings.findIndex((r) => r === min);
    if (min < 3) weakSkill = skills[idx];
  }
  if (streak < 4) {
    return 'Your streak is short. Sifu says: "Consistency is the key to mastery. Train every day, even if only for a few minutes."';
  }
  if (weakSkill) {
    return `Your weakest skill is ${weakSkill}. Sifu says: "Focus on your ${weakSkill} today. Simplicity and repetition lead to improvement."`;
  }
  return 'Sifu says: "Keep refining. The way is in training."';
}

export default function SifuAdaptiveGuidance() {
  const advice = getAdvice();
  return (
    <div className="martial-card sifu-adaptive-guidance dragon-adaptive">
      <h3>Personalized Sifu Guidance</h3>
      <p className="dragon-adaptive-text">{advice}</p>
    </div>
  );
}