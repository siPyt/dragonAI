import React, { useState } from 'react';

// A comprehensive set of fitness drills, each with equipment tags and source
const fitnessDrills = [
  { name: 'Jump Rope Warmup', description: 'Jump rope at a moderate pace for 5 minutes.', equipment: ['jump rope'], source: 'The Art of Expressing the Human Body, p. 42' },
  { name: 'Pushups', description: 'Perform 3 sets of 15-25 pushups. Use pushup bars if available.', equipment: ['none', 'mat'], source: 'The Art of Expressing the Human Body, p. 55' },
  { name: 'Pull-ups', description: 'Do 3 sets of 5-10 pull-ups. Use a pull-up bar.', equipment: ['pull-up bar'], source: 'The Art of Expressing the Human Body, p. 56' },
  { name: 'Bodyweight Squats', description: 'Perform 3 sets of 20 squats. Hold a medicine ball or dumbbell for added resistance.', equipment: ['none', 'medicine ball', 'dumbbells'], source: 'The Art of Expressing the Human Body, p. 60' },
  { name: 'Plank', description: 'Hold a plank for 1 minute. Repeat 2-3 times.', equipment: ['none', 'mat'], source: 'The Art of Expressing the Human Body, p. 62' },
  { name: 'Dumbbell Shoulder Press', description: '3 sets of 12 reps with moderate weight.', equipment: ['dumbbells'], source: 'The Art of Expressing the Human Body, p. 70' },
  { name: 'Medicine Ball Slams', description: '3 sets of 10 explosive slams.', equipment: ['medicine ball'], source: 'The Art of Expressing the Human Body, p. 75' },
  { name: 'Kettlebell Swings', description: '3 sets of 15 swings.', equipment: ['kettlebell'], source: 'The Art of Expressing the Human Body, p. 80' },
  { name: 'Resistance Band Rows', description: '3 sets of 15 rows.', equipment: ['resistance bands'], source: 'The Art of Expressing the Human Body, p. 85' },
  { name: 'Core Circuit', description: '30 seconds each: mountain climbers, bicycle crunches, leg raises. Repeat 3 times.', equipment: ['none', 'mat'], source: 'The Art of Expressing the Human Body, p. 90' },
  { name: 'Cool Down Stretch', description: 'Full body stretch for 5 minutes.', equipment: ['none', 'mat'], source: 'The Art of Expressing the Human Body, p. 100' },
];

function generateFitnessSession(selectedEquipment: string[]): typeof fitnessDrills {
  // Filter drills by available equipment, always include 'none' drills
  return fitnessDrills.filter(drill =>
    drill.equipment.some(eq => selectedEquipment.includes(eq) || eq === 'none')
  );
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