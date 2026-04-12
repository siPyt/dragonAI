import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import JkdSymbol from '../components/JkdSymbol';
import DailySifuGuidance from '../components/DailySifuGuidance';
import SifuConsole from '../components/SifuConsole';
import SourceCanon from '../components/SourceCanon';
import './Tab1.css';

const Tab1: React.FC = () => {
  const pillars = [
    {
      title: 'Source-Locked Guidance',
      icon: '🔒',
      color: '#ca9938',
      body: 'The app is grounded in authentic martial arts principles and training methods from reputable sources.'
    },
    {
      title: 'Directness Over Ornament',
      icon: '⚡',
      color: '#e63946',
      body: 'Every section is built around practical training, adaptability, and simplicity.'
    },
    {
      title: 'Living Practice',
      icon: '🔥',
      color: '#43aa8b',
      body: 'Training, reflection, and daily conduct are unified as a way of life.'
    }
  ];

  const doctrineItems = [
    'Simplicity and directness in training and mindset.',
    'Personal expression and adaptation within disciplined practice.',
    'Continuous refinement and learning.',
    'Physical and mental cultivation as one process.'
  ];

  const commandDeck = [
    'All answers are based on authentic martial arts knowledge and training experience.',
    'Voice input and spoken replies are supported.',
    'Session memory stores concise records of training and refinement.'
  ];

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="martial-toolbar">
          <IonTitle>Doctrine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="martial-content">
        {/* Top JKD Symbol and Jeet Kune Do title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
          <JkdSymbol />
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', color: '#ca9938', margin: '0.7rem 0 0 0', letterSpacing: '0.06em', textShadow: '0 2px 8px #0008' }}>Jeet Kune Do</h1>
        </div>
        <IonHeader collapse="condense">
          <IonToolbar className="martial-toolbar">
            <IonTitle size="large">Doctrine</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="martial-page doctrine-page">
          <DailySifuGuidance />
          {/* Hero Section: Brand and Command Deck (no explicit book names) */}
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="section-kicker">dragon_ai // Virtual Sifu</p>
              <h1>Jeet Kune Do as a Living Martial Way</h1>
              <p className="hero-text">
                Disciplined study chamber: source-bound, stripped of noise, designed to keep you inside authentic martial arts principles only.
              </p>
              <div className="hero-badges" aria-label="Design principles">
                <span>Black / Red / Gold</span>
                <span>Source Bound</span>
                <span>Modern JKD Emblem</span>
              </div>
              <div className="hero-command-deck">
                {commandDeck.map((item, index) => (
                  <div key={item} className="command-deck-row">
                    <span>{`0${index + 1}`}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Foundation and Source Overview */}
          <section className="doctrine-foundation-section">
            <div className="foundation-col">
              <article className="martial-card manifesto-card">
                <p className="section-kicker">Foundation</p>
                <h2>Training Hall Discipline</h2>
                <ul className="text-list">
                  {doctrineItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="source-col">
              <article className="martial-card source-card">
                <p className="section-kicker">Primary Sources</p>
                <h2>Only the writings that define the method</h2>
                <div className="source-stack">
                  <div>
                    <strong>Tao of Jeet Kune Do</strong>
                    <span>Philosophy, principles, and technical frame. E.g., "The art of Jeet Kune Do is simply to simplify." (p. 8)</span>
                  </div>
                  <div>
                    <strong>Bruce Lee&apos;s Fighting Method</strong>
                    <span>Structure, drills, ranges, and application. E.g., "The lead hand is the closest weapon to the target." (Vol. 2, p. 15)</span>
                  </div>
                  <div>
                    <strong>The Art of Expressing the Human Body</strong>
                    <span>Physical training, conditioning, and body mechanics. E.g., "Endurance and flexibility are as important as strength." (p. 42)</span>
                  </div>
                  <div>
                    <strong>Living the Martial Way</strong>
                    <span>Martial mindset, discipline, and the way as a living process. E.g., "A martial artist’s way is forged in daily practice." (p. 12)</span>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Section: Source Canon (detailed breakdown) */}
          <SourceCanon />

          {/* Section: Virtual Sifu and Rules */}
          <section className="sifu-section">
            <div className="sifu-console-col">
              <SifuConsole />
            </div>
            <div className="sifu-rules-col">
              <article className="martial-card readiness-card">
                <p className="section-kicker">Behavior Rules</p>
                <h2>What the virtual sifu is allowed to do</h2>
                <ul className="text-list">
                  <li>Answer only from the approved Bruce Lee source set and say when the source set is insufficient.</li>
                  <li>Prefer direct language, training cues, and practical distinctions over broad philosophy.</li>
                  <li>Refuse fabricated lineage claims, invented quotations, or unverifiable historical detail.</li>
                  <li>Turn vague questions into study direction, drills, or reflection prompts tied to the canon.</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Section: Pillars */}
          <section className="pillar-grid">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="martial-card pillar-card" style={{ borderLeft: `6px solid ${pillar.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em', marginBottom: '0.5em' }}>
                  <span style={{ fontSize: '2em', color: pillar.color }}>{pillar.icon}</span>
                  <h3 style={{ margin: 0 }}>{pillar.title}</h3>
                </div>
                <p style={{ color: pillar.color, fontWeight: 500 }}>{pillar.body}</p>
              </article>
            ))}
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
