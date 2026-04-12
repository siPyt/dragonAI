import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

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
        <IonToolbar className="martial-toolbar">
          <IonTitle>Training</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="martial-content">
        <IonHeader collapse="condense">
          <IonToolbar className="martial-toolbar">
            <IonTitle size="large">Training</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="martial-page training-page">
          <section className="section-heading-block">
            <p className="section-kicker">Practice Floor</p>
            <h1>Training is organized around direct function, not collection.</h1>
            <p>
              The layout treats technique, conditioning, and timing as one integrated session so the user sees Jeet Kune Do as a method under pressure, not a catalog of isolated moves.
            </p>
          </section>

          <section className="pillar-grid training-grid">
            {modules.map((module) => (
              <article key={module.title} className="martial-card training-card">
                <p className="section-kicker">Module</p>
                <h2>{module.title}</h2>
                <p>{module.body}</p>
              </article>
            ))}
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
