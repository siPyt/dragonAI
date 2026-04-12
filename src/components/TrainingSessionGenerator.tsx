import { useEffect, useState } from 'react';

interface Drill {
  range: 'Kicking' | 'Punching' | 'Trapping' | 'Grappling';
  name: string;
  description: string;
  source: string;
  levels: string[]; // Promotion levels this drill helps with
}

// Five Ways of Attack (JKD)
const drills: Drill[] = [
  // Direct Attack
  { range: 'Punching', name: 'Lead Straight Punch', description: 'Direct attack: Fire a non-telegraphed lead straight punch to the chin. Recover instantly to guard.', source: 'Bruce Lee’s Fighting Method, Vol. 1, p. 22', levels: ['Initiate', 'Year 1: Fighter'] },
  { range: 'Kicking', name: 'Lead Side Stop Kick', description: 'Direct attack: Intercept with a lead leg stop kick to the knee or midsection.', source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 34', levels: ['Initiate', 'Year 1: Fighter'] },
  // Attack by Combination
  { range: 'Punching', name: 'Jab-Cross-Hook Combo', description: 'Attack by combination: Jab, cross, and lead hook in rapid succession.', source: 'The Art of Expressing the Human Body, p. 88', levels: ['Year 1: Fighter', 'Year 2: Practitioner'] },
  { range: 'Kicking', name: 'Jab, Cross, Low Side Kick', description: 'Attack by combination: Jab, cross, then low side kick.', source: 'Tao of Jeet Kune Do, p. 71', levels: ['Year 2: Practitioner', 'Year 3: Senior'] },
  // Progressive Indirect Attack
  { range: 'Kicking', name: 'Jab, Feint, Low Side Kick', description: 'Progressive indirect attack: Jab, feint, then low side kick.', source: 'Tao of Jeet Kune Do, p. 70', levels: ['Year 2: Practitioner', 'Year 3: Senior'] },
  { range: 'Punching', name: 'Jab, Cross, Feint, Lead Hook', description: 'Progressive indirect attack: Jab, cross, feint, lead hook.', source: 'The Art of Expressing the Human Body, p. 89', levels: ['Year 2: Practitioner', 'Year 3: Senior'] },
  // Attack by Drawing
  { range: 'Punching', name: 'Feint Low, Lead Hook High', description: 'Attack by drawing: Feint low, then lead hook high.', source: 'Tao of Jeet Kune Do, p. 67', levels: ['Year 1: Fighter', 'Year 2: Practitioner'] },
  { range: 'Punching', name: 'Step Back, Bait, Intercept Cross', description: 'Attack by drawing: Step back, bait, then intercept with cross.', source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 41', levels: ['Year 2: Practitioner', 'Year 3: Senior'] },
  // Hand Immobilization Attack (minimize trapping, add pro boxing trapping)
  { range: 'Punching', name: 'Pak Sao, Straight Punch', description: 'Hand immobilization: Pak sao, then straight punch (minimal trapping).', source: 'Bruce Lee’s Fighting Method, Vol. 3, p. 41', levels: ['Year 1: Fighter', 'Year 2: Practitioner'] },
  // Pro boxing trapping/hand control
  { range: 'Punching', name: 'Parry and Counter', description: 'Boxing trapping: Parry the jab and immediately counter with a cross.', source: 'Pro Boxing Fundamentals', levels: ['Initiate', 'Year 1: Fighter', 'Year 2: Practitioner'] },
  { range: 'Punching', name: 'Catch and Shoot', description: 'Boxing trapping: Catch the jab with rear hand, return a quick cross.', source: 'Pro Boxing Fundamentals', levels: ['Initiate', 'Year 1: Fighter', 'Year 2: Practitioner'] },
  { range: 'Punching', name: 'Smother and Uppercut', description: 'Boxing trapping: Smother opponent’s punches, then throw a short uppercut inside.', source: 'Pro Boxing Fundamentals', levels: ['Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior'] },
  { range: 'Grappling', name: 'Clinch and Tie-Up', description: 'Boxing trapping: Enter the clinch to neutralize offense, then pivot out or break.', source: 'Pro Boxing Fundamentals', levels: ['Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior'] },
  { range: 'Punching', name: 'Hand Control and Lead Hook', description: 'Boxing trapping: Control opponent’s lead hand, then throw a lead hook around the guard.', source: 'Pro Boxing Fundamentals', levels: ['Year 2: Practitioner', 'Year 3: Senior'] },
  // Grappling (optional, not trapping)
  { range: 'Grappling', name: 'Standing Clinch Escape', description: 'From a clinch, use hip movement and hand fighting to break free and create striking distance.', source: 'Living the Martial Way, p. 112', levels: ['Year 2: Practitioner', 'Year 3: Senior'] },
  { range: 'Grappling', name: 'Sprawl and Counter', description: 'When the opponent shoots for a takedown, sprawl your legs back and counter with a crossface or underhook.', source: 'The Art of Expressing the Human Body, p. 144', levels: ['Year 2: Practitioner', 'Year 3: Senior'] },
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
    // Ensure all five ways of attack are covered, minimize trapping
    const direct = drills.filter(d => d.description.toLowerCase().includes('direct attack') && isDrillAvailable(d) && d.levels.includes(currentLevel));
    const combo = drills.filter(d => d.description.toLowerCase().includes('combination') && isDrillAvailable(d) && d.levels.includes(currentLevel));
    const indirect = drills.filter(d => d.description.toLowerCase().includes('indirect') && isDrillAvailable(d) && d.levels.includes(currentLevel));
    const drawing = drills.filter(d => d.description.toLowerCase().includes('drawing') && isDrillAvailable(d) && d.levels.includes(currentLevel));
    const immobilization = drills.filter(d => d.description.toLowerCase().includes('immobilization') && isDrillAvailable(d) && d.levels.includes(currentLevel));
    // Pick one from each, fallback to any available if empty
    const pick = (arr: Drill[]) => arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
    const sessionDrills = [
      pick(direct),
      pick(combo),
      pick(indirect),
      pick(drawing),
      pick(immobilization)
    ].filter(Boolean) as Drill[];
    // Always add a grappling drill if available
    const grappling = drills.filter(d => d.range === 'Grappling' && isDrillAvailable(d) && d.levels.includes(currentLevel));
    if (grappling.length) sessionDrills.push(pick(grappling)!);
    setSession(sessionDrills);
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
