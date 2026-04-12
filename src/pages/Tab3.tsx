import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const rituals = [
    'Begin with a clear training intention rather than random consumption.',
    'Keep a brief record of what felt false, forced, or unnecessary.',
    'Preserve recovery, mobility, and sleep as part of the martial discipline.',
    'Measure daily life by clarity and control, not by performance theater.'
  ];

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="martial-toolbar">
          <IonTitle>Living The Way</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="martial-content">
        <IonHeader collapse="condense">
          <IonToolbar className="martial-toolbar">
            <IonTitle size="large">Living The Way</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="martial-page living-page">
          <section className="section-heading-block">
            <p className="section-kicker">Daily Discipline</p>
            <h1>Make the philosophy visible in how the day is lived.</h1>
            <p>
              This section shifts the tone from technique to conduct: reflection prompts, fitness discipline, and stripped-down routines that keep the martial way present beyond formal sessions.
            </p>
          </section>

          <section className="content-grid two-column-grid">
            <article className="martial-card ritual-card">
              <p className="section-kicker">Rituals</p>
              <h2>Daily anchors</h2>
              <ul className="text-list">
                {rituals.map((ritual) => (
                  <li key={ritual}>{ritual}</li>
                ))}
              </ul>
            </article>

            <article className="martial-card journal-card">
              <p className="section-kicker">Journal Prompts</p>
              <div className="prompt-stack">
                <div>
                  <strong>What was wasteful today?</strong>
                  <span>Remove one habit, one motion, or one thought that added friction.</span>
                </div>
                <div>
                  <strong>Where was timing lost?</strong>
                  <span>Note whether the issue came from hesitation, tension, or poor preparation.</span>
                </div>
                <div>
                  <strong>What became more direct?</strong>
                  <span>Capture the one action that felt simpler and truer than before.</span>
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
