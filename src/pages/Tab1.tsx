import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import JkdSymbol from '../components/JkdSymbol';
import './Tab1.css';

const Tab1: React.FC = () => {
  const pillars = [
    {
      title: 'Source-Locked Guidance',
      body:
        'The app voice and structure stay grounded in Tao of Jeet Kune Do, Bruce Lee\'s Fighting Method, his recorded memories, and his fitness writings only.'
    },
    {
      title: 'Directness Over Ornament',
      body:
        'Every section is built around interception, economy, timing, and adaptability rather than movie mythology or invented lore.'
    },
    {
      title: 'Living Practice',
      body:
        'Training, reflection, and daily conduct are treated as one discipline so the method becomes a way of life instead of a themed archive.'
    }
  ];

  const doctrineItems = [
    'Core themes: simplicity, directness, personal expression, and disciplined adaptation.',
    'Voice: calm, exact, demanding, and rooted in training reality rather than abstraction.',
    'Use: a digital sifu companion for study, reflection, conditioning, and session intent.'
  ];

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="martial-toolbar">
          <IonTitle>Doctrine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="martial-content">
        <IonHeader collapse="condense">
          <IonToolbar className="martial-toolbar">
            <IonTitle size="large">Doctrine</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="martial-page doctrine-page">
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="section-kicker">DragonAI // Virtual Sifu</p>
              <h1>Pure and authentic Jeet Kune Do, shaped as a living martial way.</h1>
              <p className="hero-text">
                This experience is framed as a disciplined study chamber: source-bound, stripped of noise, and designed to keep the user inside Bruce Lee&apos;s written method rather than around it.
              </p>
              <div className="hero-badges" aria-label="Design principles">
                <span>Black / Red / Gold</span>
                <span>Source Bound</span>
                <span>Modern JKD Emblem</span>
              </div>
            </div>
            <div className="hero-symbol-card">
              <JkdSymbol />
            </div>
          </section>

          <section className="content-grid two-column-grid">
            <article className="martial-card manifesto-card">
              <p className="section-kicker">Foundation</p>
              <h2>The App Must Feel Like Training Hall Discipline</h2>
              <ul className="text-list">
                {doctrineItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="martial-card source-card">
              <p className="section-kicker">Primary Sources</p>
              <h2>Only the writings that define the method</h2>
              <div className="source-stack">
                <div>
                  <strong>Tao of Jeet Kune Do</strong>
                  <span>Philosophical and technical frame.</span>
                </div>
                <div>
                  <strong>Bruce Lee&apos;s Fighting Method</strong>
                  <span>Structure, drills, ranges, and application.</span>
                </div>
                <div>
                  <strong>Memories and fitness writings</strong>
                  <span>Daily discipline, conditioning, and working mindset.</span>
                </div>
              </div>
            </article>
          </section>

          <section className="pillar-grid">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="martial-card pillar-card">
                <p className="section-kicker">Pillar</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
