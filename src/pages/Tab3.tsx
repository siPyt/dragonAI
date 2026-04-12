import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SessionLedger from '../components/SessionLedger';
import './Tab3.css';

const Tab3: React.FC = () => {
  const rituals = [
    'Begin with a clear training intention.',
    'Keep a brief record of what worked and what needs improvement.',
    'Include recovery, mobility, and rest as part of the discipline.',
    'Focus on clarity and control in daily life.'
  ];

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="martial-toolbar minimal-toolbar">
          <IonTitle>Living The Way</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="martial-content minimal-content">
        <div className="martial-page living-page minimal-page">
          <section className="minimal-grid">
            <article className="ritual-card minimal-card">
              <ul className="text-list minimal-list">
                {rituals.map((ritual) => (
                  <li key={ritual}>{ritual}</li>
                ))}
              </ul>
            </article>
            <article className="journal-card minimal-card">
              <div className="prompt-stack minimal-stack">
                  <div>
                    <strong>What could be improved today?</strong>
                    <span>Identify one habit, motion, or thought to refine.</span>
                  </div>
                  <div>
                    <strong>Where was timing off?</strong>
                    <span>Note if the issue was hesitation, tension, or preparation.</span>
                  </div>
                  <div>
                    <strong>What felt more direct?</strong>
                    <span>Capture one action that was simpler or more effective than before.</span>
                  </div>
              </div>
            </article>
          </section>

          <section className="pillar-grid living-grid">
            <article className="martial-card pillar-card accent-card">
              <p className="section-kicker">Recovery</p>
              <h3>Mobility and restoration belong inside the system.</h3>
              <p>Conditioning without restoration degrades expression. The app should hold mobility, breath, and rest as deliberate parts of the practice.</p>
            </article>
            <article className="martial-card pillar-card accent-card">
              <p className="section-kicker">Memory</p>
              <h3>Document the path like a practitioner, not a spectator.</h3>
              <p>The journal and session memory should read like training notes: concise, honest, and specific enough to guide the next repetition.</p>
            </article>
          </section>

          <SessionLedger />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
