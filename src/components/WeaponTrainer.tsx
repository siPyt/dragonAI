import React, { useState } from 'react';

// Authentic weapon/technique list (expand as needed)
const weapons = [
  {
    name: 'Lead Straight Punch',
    source: "Bruce Lee’s Fighting Method, Vol. 1, p. 22",
    breakdown: [
      'From on-guard, keep shoulders relaxed and chin tucked.',
      'Fire the lead hand directly toward the target using a vertical fist (palm facing inward).',
      'Do not telegraph—initiate with a slight forward body lean.',
      'Snap the punch out and instantly retract to guard.',
      'Exhale sharply as you punch.'
    ],
    training: [
      'Heavy bag: 10 sets of 10 explosive lead straight punches, focus on speed and snap.',
      'Shadowboxing: 3 rounds, only lead straight punch, max speed, full recovery.',
      'Focus mitts: React to a cue, fire lead straight punch instantly.',
      'Plyometric pushups: 3 sets of 10 for explosive power.',
      'Medicine ball chest passes: 3 sets of 10 for punch explosiveness.'
    ]
  },
  {
    name: 'Side Kick',
    source: 'Tao of Jeet Kune Do, p. 56',
    breakdown: [
      'Begin in fighting stance, weight on rear leg.',
      'Chamber the knee, then extend leg in a side kick, striking with the heel.',
      'Retract leg and return to stance, maintaining balance.',
      'Keep hands up and posture upright.'
    ],
    training: [
      'Heavy bag: 5 sets of 10 explosive side kicks each leg.',
      'Wall drill: Hold side kick position for 10 seconds, 5 reps each leg.',
      'Partner: Target pad side kicks, focus on speed and accuracy.',
      'Plyometric jumps: 3 sets of 10 for leg explosiveness.'
    ]
  },
  {
    name: 'Lead Hook',
    source: "Bruce Lee’s Fighting Method, Vol. 1, p. 25",
    breakdown: [
      'From guard, rotate lead hip and shoulder.',
      'Swing lead arm in a tight arc, elbow bent, palm facing you.',
      'Strike with the first two knuckles.',
      'Retract instantly to guard.'
    ],
    training: [
      'Heavy bag: 5 sets of 10 explosive lead hooks.',
      'Focus mitts: React to cue, throw lead hook.',
      'Shadowboxing: 3 rounds, focus on lead hook speed and recovery.',
      'Resistance band hooks: 3 sets of 10 for power.'
    ]
  },
  {
    name: 'Rear Cross',
    source: 'The Art of Expressing the Human Body, p. 88',
    breakdown: [
      'From guard, rotate rear hip and shoulder forward.',
      'Drive rear fist straight toward target, using a vertical or slightly turned fist.',
      'Pivot on the ball of the rear foot for power.',
      'Retract hand quickly and return to guard.'
    ],
    training: [
      'Heavy bag: 5 sets of 10 explosive rear crosses.',
      'Focus mitts: React to cue, throw rear cross.',
      'Shadowboxing: 3 rounds, focus on rear cross speed and snap.',
      'Medicine ball rotational throws: 3 sets of 10.'
    ]
  },
  {
    name: 'Lead Uppercut',
    source: 'Pro Boxing Advanced',
    breakdown: [
      'From close range, drop lead shoulder and bend knees slightly.',
      'Drive lead fist upward in a tight arc, palm facing you.',
      'Rotate hips and extend legs for power.',
      'Retract instantly to guard.'
    ],
    training: [
      'Heavy bag: 5 sets of 10 explosive lead uppercuts.',
      'Focus mitts: React to cue, throw lead uppercut.',
      'Shadowboxing: 3 rounds, focus on lead uppercut speed and recovery.',
      'Resistance band uppercuts: 3 sets of 10.'
    ]
  },
  {
    name: 'Lead Side Stop Kick',
    source: "Bruce Lee’s Fighting Method, Vol. 2, p. 34",
    breakdown: [
      'Stand in on-guard stance, weight on rear leg.',
      'Lift lead knee, keeping body upright.',
      'Extend lead leg in a straight line, striking with the heel to opponent’s knee or midsection.',
      'Retract leg instantly and return to on-guard stance.',
      'Maintain non-telegraphic movement and keep both hands up.'
    ],
    training: [
      'Heavy bag: 5 sets of 10 lead side stop kicks.',
      'Partner: Target pad stop kicks, focus on timing.',
      'Wall drill: Hold stop kick position for 10 seconds, 5 reps.',
      'Plyometric lunges: 3 sets of 10 for explosiveness.'
    ]
  }
];

const WeaponTrainer: React.FC = () => {
  const [selected, setSelected] = useState(weapons[0].name);
  const weapon = weapons.find(w => w.name === selected);

  return (
    <section className="martial-card weapon-trainer">
      <h2>Weapon Trainer (JKD Authentic)</h2>
      <label htmlFor="weapon-select"><strong>Choose a Weapon/Technique:</strong></label>
      <select
        id="weapon-select"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        style={{ marginLeft: 8 }}
      >
        {weapons.map(w => (
          <option key={w.name} value={w.name}>{w.name}</option>
        ))}
      </select>
      {weapon && (
        <div style={{ marginTop: 16 }}>
          <h3>Step-by-Step Breakdown</h3>
          <ol>
            {weapon.breakdown.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
          <h3>Bruce Lee Training Methods</h3>
          <ul>
            {weapon.training.map((drill, i) => <li key={i}>{drill}</li>)}
          </ul>
          <div className="drill-source">Source: {weapon.source}</div>
        </div>
      )}
    </section>
  );
};

export default WeaponTrainer;
