import { useEffect, useState } from 'react';

interface Drill {
  range: 'Kicking' | 'Punching' | 'Trapping' | 'Grappling';
  name: string;
  description: string;
  source: string;
  levels: string[]; // Promotion levels this drill helps with
}

const drills: Drill[] = [
  // Kicking
  {
    range: 'Kicking',
    name: 'Lead Side Stop Kick',
    description: 'Intercept the opponent’s advance with a lead leg stop kick to the knee or midsection. Focus on timing and minimal telegraphing.',
    source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 34',
    levels: ['Initiate', 'Year 1: Fighter']
  },
  {
    range: 'Kicking',
    name: 'Pendulum Side Kick',
    description: 'Use the pendulum step to close distance and deliver a fast side kick to the opponent’s midsection.',
    source: 'Tao of Jeet Kune Do, p. 56',
    levels: ['Initiate', 'Year 1: Fighter']
  },
  // Punching
  {
    range: 'Punching',
    name: 'Lead Straight Punch',
    description: 'From on-guard, fire a non-telegraphed lead straight punch to the opponent’s chin. Recover instantly to guard.',
    source: 'Bruce Lee’s Fighting Method, Vol. 1, p. 22',
    levels: ['Initiate', 'Year 1: Fighter']
  },
  {
    range: 'Punching',
    name: 'Jab-Cross-Hook Combo',
    description: 'Throw a jab, cross, and lead hook in rapid succession, focusing on speed and flow.',
    source: 'The Art of Expressing the Human Body, p. 88',
    levels: ['Year 1: Fighter', 'Year 2: Practitioner']
  },
  // Trapping
  {
    range: 'Trapping',
    name: 'Pak Sao-Lap Sao Drill',
    description: 'Use a pak sao (slapping hand) to clear the opponent’s guard, then lap sao (pulling hand) to control and strike.',
    source: 'Bruce Lee’s Fighting Method, Vol. 3, p. 41',
    levels: ['Year 1: Fighter', 'Year 2: Practitioner']
  },
  {
    range: 'Trapping',
    name: 'Chi Sao Sensitivity',
    description: 'Practice rolling hands with a partner, focusing on feeling for openings and immediate counterattack.',
    source: 'Tao of Jeet Kune Do, p. 102',
    levels: ['Year 2: Practitioner', 'Year 3: Senior']
  },
  // Grappling
  {
    range: 'Grappling',
    name: 'Standing Clinch Escape',
    description: 'From a clinch, use hip movement and hand fighting to break free and create striking distance.',
    source: 'Living the Martial Way, p. 112',
    levels: ['Year 2: Practitioner', 'Year 3: Senior']
  },
  {
    range: 'Grappling',
    name: 'Sprawl and Counter',
    description: 'When the opponent shoots for a takedown, sprawl your legs back and counter with a crossface or underhook.',
    source: 'The Art of Expressing the Human Body, p. 144',
    levels: ['Year 2: Practitioner', 'Year 3: Senior']
  }
];

function getRandomDrill(range: Drill['range']) {
  const options = drills.filter((d) => d.range === range);
  return options[Math.floor(Math.random() * options.length)];
}


import PromotionTracker from './PromotionTracker';
import SifuPromotionCriteria from './SifuPromotionCriteria';
import PromotionChecklist from './PromotionChecklist';

interface TrainingSessionGeneratorProps {
  equipment: string[];
}

const getCurrentLevel = () => {
  // This should match PromotionTracker logic
  const attendance = JSON.parse(window.localStorage.getItem('dragon_ai-attendance') || '{}');
  const days = Object.keys(attendance).filter((d) => attendance[d]).length;
  let streak = 0;
  let maxStreak = 0;
  let prev: string | null = null;
  Object.keys(attendance)
    .sort()
    .forEach((d: string) => {
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
  if (days >= 1350 && maxStreak >= 60) return 'Year 4+: Sifu';
  if (days >= 1000 && maxStreak >= 45) return 'Year 3: Senior';
  if (days >= 650 && maxStreak >= 30) return 'Year 2: Practitioner';
  if (days >= 365 && maxStreak >= 15) return 'Year 1: Fighter';
  return 'Initiate';
};

const TrainingSessionGenerator: React.FC<TrainingSessionGeneratorProps> = ({ equipment }) => {
  const [session, setSession] = useState<Drill[]>([]);
  const [currentLevel, setCurrentLevel] = useState<string>(getCurrentLevel());
  const [userInfo, setUserInfo] = useState<{height: string, weight: string, age: string} | null>(null);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);

  useEffect(() => {
    setCurrentLevel(getCurrentLevel());
    const saved = window.localStorage.getItem('dragon_ai-user-info');
    if (saved) {
      setUserInfo(JSON.parse(saved));
    } else {
      setShowUserInfoForm(true);
    }
  }, []);

  function handleUserInfoSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const heightFeet = (form.elements.namedItem('heightFeet') as HTMLInputElement).value;
    const heightInches = (form.elements.namedItem('heightInches') as HTMLInputElement).value;
    const weight = (form.elements.namedItem('weight') as HTMLInputElement).value;
    const age = (form.elements.namedItem('age') as HTMLInputElement).value;
    const height = `${heightFeet}'${heightInches}\"`;
    const info = { height, weight, age };
    setUserInfo(info);
    window.localStorage.setItem('dragon_ai-user-info', JSON.stringify(info));
    setShowUserInfoForm(false);
  }

  function isDrillAvailable(drill: Drill) {
    if (equipment.includes('none')) return true;
    // Example: adapt for user info (e.g., age-based restrictions)
    if (userInfo) {
      const ageNum = parseInt(userInfo.age, 10);
      if (drill.name.toLowerCase().includes('burpee') && ageNum > 55) return false;
      // Add more logic as needed
    }
    return true;
  }

  function getRandomAvailableDrill(range: Drill['range'], level: string) {
    const options = drills.filter((d) => d.range === range && isDrillAvailable(d) && d.levels.includes(level));
    return options[Math.floor(Math.random() * options.length)];
  }

  function generateSession() {
    const newSession = [
      getRandomAvailableDrill('Kicking', currentLevel),
      getRandomAvailableDrill('Punching', currentLevel),
      getRandomAvailableDrill('Trapping', currentLevel),
      getRandomAvailableDrill('Grappling', currentLevel)
    ];
    setSession(newSession);
  }

  return (
    <section className="martial-card training-session-generator">
      <h2>Generate Complete Training Session</h2>
      {showUserInfoForm && (
        <form className="user-info-form" onSubmit={handleUserInfoSubmit} style={{marginBottom: 16}}>
          <h3>Tell Sifu about you</h3>
          <label>
            Height:
            <input name="heightFeet" type="number" min="3" max="7" required style={{ width: 50, marginRight: 4 }} placeholder="ft" /> ft
            <input name="heightInches" type="number" min="0" max="11" required style={{ width: 50, marginLeft: 8, marginRight: 4 }} placeholder="in" /> in
          </label>
          <label>
            Weight (lbs): <input name="weight" type="number" min="50" max="500" required />
          </label>
          <label>
            Age: <input name="age" type="number" min="10" max="100" required />
          </label>
          <button className="ledger-button" type="submit">Save</button>
        </form>
      )}
      {userInfo && (
        <div className="plan-note">Current Goal: <strong>{currentLevel}</strong> | Age: {userInfo.age}, Height: {userInfo.height}, Weight: {userInfo.weight} lbs</div>
      )}
      <PromotionChecklist currentLevel={currentLevel} />
      <button className="ledger-button" onClick={generateSession} disabled={showUserInfoForm}>Generate Session</button>
      <div style={{ margin: '1em 0' }}>
        <SifuPromotionCriteria />
      </div>
      {session.length > 0 && (
        <div className="session-drill-list">
          {session.map((drill, idx) => (
            <article key={drill.name} className="drill-card">
              <h3>{idx + 1}. {drill.range} Range: {drill.name}</h3>
              <p>{drill.description}</p>
              <span className="drill-source">{drill.source}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrainingSessionGenerator;
