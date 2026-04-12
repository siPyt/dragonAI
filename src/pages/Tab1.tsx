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
    'Simplicity and directness: "It is not daily increase but daily decrease—hack away the unessential." (Tao of Jeet Kune Do, p. 24)',
    'Personal expression: "Absorb what is useful, reject what is useless, add what is specifically your own." (Bruce Lee’s Fighting Method, Vol. 1, p. 10)',
    'Disciplined adaptation: "The martial way is not static, but a living process of refinement." (Living the Martial Way, p. 5)',
    'Physical cultivation: "The body is an instrument of the mind." (The Art of Expressing the Human Body, p. 8)'
  ];

  const commandDeck = [
    'Authenticity lock: All answers are strictly sourced from: Tao of Jeet Kune Do, Bruce Lee’s Fighting Method (all volumes), The Art of Expressing the Human Body, and Living the Martial Way.',
    'Voice lane: Browser speech input captures commands; spoken replies are played back. (No content outside approved sources.)',
    'Session memory: Practice ledger stores concise local records of training intent and refinement, inspired by Bruce Lee’s own training notes.'
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
          <DailySifuGuidance />
          {/* Hero Section: Brand, Symbol, and Command Deck */}
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="section-kicker">dragon_ai // Virtual Sifu</p>
              <h1>Jeet Kune Do as a Living Martial Way</h1>
              <p className="hero-text">
                Disciplined study chamber: source-bound, stripped of noise, designed to keep you inside Bruce Lee&apos;s written method only.
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
            <div className="hero-symbol-card">
              <JkdSymbol />
              <div className="symbol-plaque">
                <span>Living The Martial Way</span>
                <strong>Interception. Economy. Expression.</strong>
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
