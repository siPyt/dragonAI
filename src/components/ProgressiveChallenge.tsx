import React, { useState } from 'react';

// A comprehensive set of fitness drills, each with equipment tags, level, and source
const fitnessDrills = [
  { name: 'Jump Rope Warmup', description: 'Jump rope at a moderate pace for 5 minutes.', equipment: ['jump rope'], source: 'The Art of Expressing the Human Body, p. 42', levels: ['Initiate', 'Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Pushups', description: 'Perform 3 sets of 15-25 pushups. Use pushup bars if available.', equipment: ['none', 'mat'], source: 'The Art of Expressing the Human Body, p. 55', levels: ['Initiate', 'Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Pull-ups', description: 'Do 3 sets of 5-10 pull-ups. Use a pull-up bar.', equipment: ['pull-up bar'], source: 'The Art of Expressing the Human Body, p. 56', levels: ['Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Bodyweight Squats', description: 'Perform 3 sets of 20 squats. Hold a medicine ball or dumbbell for added resistance.', equipment: ['none', 'medicine ball', 'dumbbells'], source: 'The Art of Expressing the Human Body, p. 60', levels: ['Initiate', 'Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Plank', description: 'Hold a plank for 1 minute. Repeat 2-3 times.', equipment: ['none', 'mat'], source: 'The Art of Expressing the Human Body, p. 62', levels: ['Initiate', 'Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Dumbbell Shoulder Press', description: '3 sets of 12 reps with moderate weight.', equipment: ['dumbbells'], source: 'The Art of Expressing the Human Body, p. 70', levels: ['Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Medicine Ball Slams', description: '3 sets of 10 explosive slams.', equipment: ['medicine ball'], source: 'The Art of Expressing the Human Body, p. 75', levels: ['Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Kettlebell Swings', description: '3 sets of 15 swings.', equipment: ['kettlebell'], source: 'The Art of Expressing the Human Body, p. 80', levels: ['Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Resistance Band Rows', description: '3 sets of 15 rows.', equipment: ['resistance bands'], source: 'The Art of Expressing the Human Body, p. 85', levels: ['Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Core Circuit', description: '30 seconds each: mountain climbers, bicycle crunches, leg raises. Repeat 3 times.', equipment: ['none', 'mat'], source: 'The Art of Expressing the Human Body, p. 90', levels: ['Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
  { name: 'Cool Down Stretch', description: 'Full body stretch for 5 minutes.', equipment: ['none', 'mat'], source: 'The Art of Expressing the Human Body, p. 100', levels: ['Initiate', 'Year 1: Fighter', 'Year 2: Practitioner', 'Year 3: Senior', 'Year 4+: Sifu'] },
];


function getCurrentLevel(): string {
  // Matches logic from InfoTab and TrainingSessionGenerator
  try {
    const attendance = JSON.parse(window.localStorage.getItem('dragon_ai-attendance') || '{}');
    const days = Object.keys(attendance).filter((d) => attendance[d]).length;
    let streak = 0;
    let maxStreak = 0;
    let prev: string | null = null;
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
    return level;
  } catch {
    return 'Initiate';
  }
}


// Categorize drills for session structure
const fitnessCategories = {
  warmup: ['Jump Rope Warmup'],
  upper: ['Pushups', 'Pull-ups', 'Dumbbell Shoulder Press', 'Resistance Band Rows'],
  lower: ['Bodyweight Squats', 'Kettlebell Swings'],
  core: ['Plank', 'Core Circuit'],
  power: ['Medicine Ball Slams'],
  cooldown: ['Cool Down Stretch']
};

function generateFitnessSession(selectedEquipment: string[]): typeof fitnessDrills {
  const level = getCurrentLevel();
  // Helper to filter by equipment and level
  const filter = (names: string[]) =>
    fitnessDrills.filter(drill =>
      names.includes(drill.name) &&
      drill.equipment.some(eq => selectedEquipment.includes(eq) || eq === 'none') &&
      drill.levels.includes(level)
    );

  // Always try to include one from each category
  const pick = (arr: typeof fitnessDrills) => arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
  const session: typeof fitnessDrills = [];
  const warmup = pick(filter(fitnessCategories.warmup));
  if (warmup) session.push(warmup);
  const upper = pick(filter(fitnessCategories.upper));
  if (upper) session.push(upper);
  const lower = pick(filter(fitnessCategories.lower));
  if (lower) session.push(lower);
  const core = pick(filter(fitnessCategories.core));
  if (core) session.push(core);
  // Optionally add power if available
  const power = pick(filter(fitnessCategories.power));
  if (power) session.push(power);
  const cooldown = pick(filter(fitnessCategories.cooldown));
  if (cooldown) session.push(cooldown);
  // Remove duplicates (by name)
  const unique = session.filter((d, idx, arr) => arr.findIndex(dd => dd.name === d.name) === idx);
  return unique;
}

// Props: selectedEquipment: string[]
const PhysicalFitnessSessionGenerator: React.FC<{ selectedEquipment: string[] }> = ({ selectedEquipment }) => {
  const [session, setSession] = useState<typeof fitnessDrills>([]);

  const handleGenerate = () => {
    const drills = generateFitnessSession(selectedEquipment);
    setSession(drills);
  };

  return (
    <section className="martial-card physical-fitness-session">
      <h2>Generate Physical Fitness Session</h2>
      <p style={{marginBottom: 8}}>A comprehensive session inspired by <em>The Art of Expressing the Human Body</em>, adapted to your available equipment.</p>
      <button className="ledger-button" onClick={handleGenerate}>Generate Session</button>
      {session.length > 0 && (
        <div className="session-drill-list">
          {session.map((drill, idx) => (
            <article key={drill.name} className="drill-card">
              <h3>{idx + 1}. {drill.name}</h3>
              <p>{drill.description}</p>
              <span className="drill-source">{drill.source}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PhysicalFitnessSessionGenerator;