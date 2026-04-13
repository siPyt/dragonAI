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
  // Add more weapons/techniques here
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
