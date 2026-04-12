import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import TrainingSessionGenerator from '../components/TrainingSessionGenerator';

const Tab2: React.FC = () => {
  const modules = [
    {
      title: 'Interception Session',
      body: 'Reaction cue work, stop-hit entries, longest weapon to nearest target, and timing rounds built around economy.'
    },
    {
      title: 'Mobility and Structure',
      body: 'Stance transitions, broken rhythm, lead-side efficiency, and footwork lines that preserve balance under pressure.'
    },
    {
      title: 'Conditioning Layer',
      body: 'Roadwork, skip rope, trunk strength, flexibility, and repeatable bodyweight circuits drawn from Bruce Lee\'s training emphasis.'
    }
  ];

  const measures = [
    'Speed of entry',
    'Economy of motion',
    'Range recognition',
    'Recovery and breath control'
  ];

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

          <TrainingSessionGenerator />

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
