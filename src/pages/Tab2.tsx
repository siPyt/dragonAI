import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

import TrainingSessionGenerator from '../components/TrainingSessionGenerator';
import { useState } from 'react';

const Tab2: React.FC = () => {
  const modules = [
    {
      title: 'Interception Session',
      body: 'Reaction cues, timing drills, and practical entries.'
    },
    {
      title: 'Mobility and Structure',
      body: 'Stance transitions, balance, and efficient footwork.'
    },
    {
      title: 'Conditioning Layer',
      body: 'Cardio, flexibility, and bodyweight circuits.'
    }
  ];

  const measures = [
    'Speed of entry',
    'Economy of motion',
    'Range recognition',
    'Recovery and breath control'
  ]; // Kept generic, no quotes

  const equipmentOptions = [
    'none',
    'heavy bag',
    'double-end bag',
    'focus mitts',
    'dumbbells',
    'pull-up bar',
    'jump rope',
    'medicine ball',
    'kettlebell',
    'resistance bands',
    'mat',
    'timer',
    'mirror',
  ];
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['none']);

  const handleEquipmentChange = (eq: string) => {
    setSelectedEquipment((prev) => {
      if (eq === 'none') {
        return ['none'];
      }
      const filtered = prev.filter((e) => e !== 'none');
      if (prev.includes(eq)) {
        return filtered.filter((e) => e !== eq);
      } else {
        return [...filtered, eq];
      }
    });
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="martial-toolbar minimal-toolbar">
          <IonTitle>Training</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="martial-content minimal-content">
        <div className="martial-page training-page minimal-page">
          <section className="training-grid minimal-grid">
            {modules.map((module) => (
              <article key={module.title} className="training-card minimal-card">
                <h3>{module.title}</h3>
                <p>{module.body}</p>
              </article>
            ))}
          </section>

          <section className="equipment-section" style={{ margin: '1em 0' }}>
            <h3>Available Equipment</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {equipmentOptions.map((eq) => (
                <label key={eq} style={{ fontSize: 14, marginRight: 16 }}>
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes(eq)}
                    onChange={() => handleEquipmentChange(eq)}
                    disabled={eq === 'none' && selectedEquipment.length > 1}
                  />
                  {eq.charAt(0).toUpperCase() + eq.slice(1)}
                </label>
              ))}
            </div>
          </section>


          <TrainingSessionGenerator equipment={selectedEquipment} />

          {/* New: Physical Fitness Challenge Card */}
          <section className="martial-card">
            <h2>Generate Physical Fitness Challenge</h2>
            <p style={{marginBottom: 8}}>A daily challenge inspired by <em>The Art of Expressing the Human Body</em>, adapted to your available equipment.</p>
            {/* You can further customize this to pass equipment if ProgressiveChallenge is updated to use it */}
            <ProgressiveChallenge />
          </section>

          <section className="content-grid two-column-grid">
            <article className="martial-card timeline-card">
              <p className="section-kicker">Sample Flow</p>
              <div className="timeline-list">
                <div>
                  <strong>01</strong>
                  <span>Warm the stance, hips, shoulders, and breath.</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>Lead-hand intercept drills with footwork shifts.</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>Power-endurance circuit with trunk and leg emphasis.</span>
                </div>
                <div>
                  <strong>04</strong>
                  <span>Journal what became simpler, faster, and cleaner.</span>
                </div>
              </div>
            </article>

            <article className="martial-card metrics-card">
              <p className="section-kicker">Session Measures</p>
              <h2>What the app should track</h2>
              <ul className="chip-list">
                {measures.map((measure) => (
                  <li key={measure}>{measure}</li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
