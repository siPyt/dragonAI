import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import SifuPromotionCriteria from './SifuPromotionCriteria';

const criteria = [
  {
    level: 'Initiate',
    summary: 'Build your foundation: stance, footwork, basic punches/kicks, fitness, and JKD theory.',
  },
  {
    level: 'Year 1: Fighter',
    summary: 'Advance your skills: combos, sparring, rhythm, flow, and coaching basics. Start integrating fitness and weapon basics.',
  },
  {
    level: 'Year 2: Practitioner',
    summary: 'Master advanced trapping, clinch, takedown defense, and teach others. Focus on recovery, nutrition, and advanced fitness.',
  },
  {
    level: 'Year 3: Senior',
    summary: 'Mentor others, compete, and demonstrate mastery in all ranges. Deepen your understanding of JKD philosophy and advanced skills.',
  },
  {
    level: 'Year 4+: Sifu',
    summary: 'Teach, design curriculum, and contribute to the JKD community. Demonstrate mastery in all areas and continue lifelong refinement.',
  },
];

export default function InfoTab() {
  const [currentLevel, setCurrentLevel] = useState('Initiate');
  useEffect(() => {
    // Try to read current level from localStorage (matches TrainingSessionGenerator logic)
    try {
      const attendance = JSON.parse(window.localStorage.getItem('dragon_ai-attendance') || '{}');
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
            const diff = (new Date(d).getTime() - new Date(prev).getTime()) / (1000 * 60 * 60 * 24);
            if (diff === 1) streak++;
            else streak = 1;
          }
          if (streak > maxStreak) maxStreak = streak;
          prev = d;
        });
      let level = 'Initiate';
      if (days >= 1350 && maxStreak >= 60) level = 'Year 4+: Sifu';
      else if (days >= 1000 && maxStreak >= 45) level = 'Year 3: Senior';
      else if (days >= 650 && maxStreak >= 30) level = 'Year 2: Practitioner';
      else if (days >= 365 && maxStreak >= 15) level = 'Year 1: Fighter';
      setCurrentLevel(level);
    } catch {}
  }, []);

  const currentSummary = criteria.find((c) => c.level === currentLevel)?.summary;

  return (
    <IonPage>
      <IonContent fullscreen className="martial-content">
        <section className="martial-card info-tab">
          <h2>JKD Roadmap & Advancement Criteria</h2>
          <div style={{marginBottom: 16}}>
            <strong>Your Current Level:</strong> {currentLevel}
            {currentSummary && <div style={{marginTop: 4, color: '#333'}}><em>Focus:</em> {currentSummary}</div>}
          </div>
          <h3>Four-Year JKD Roadmap</h3>
          <ul style={{marginBottom: 16}}>
            {criteria.map((c) => (
              <li key={c.level} style={{marginBottom: 8}}>
                <strong>{c.level}:</strong> {c.summary}
              </li>
            ))}
          </ul>
          <SifuPromotionCriteria />
          <p className="plan-note">All advancement is based on real JKD sources. Review criteria here any time. Your sessions and progression are guided by this roadmap.</p>
        </section>
      </IonContent>
    </IonPage>
  );
}