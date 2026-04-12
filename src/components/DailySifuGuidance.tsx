import SifuAdaptiveGuidance from './SifuAdaptiveGuidance';
import ProgressiveChallenge from './ProgressiveChallenge';
import SkillTracker from './SkillTracker';
import LiveTraining from './LiveTraining';
import SifuStreakTracker from './SifuStreakTracker';
import SifuFlexibilityLeaderboard from './SifuFlexibilityLeaderboard';
import SifuReflexLeaderboard from './SifuReflexLeaderboard';
import SifuProgressVisualization from './SifuProgressVisualization';
import SifuPromotionCriteria from './SifuPromotionCriteria';
import ReactionDrill from './ReactionDrill';
import { useEffect, useState } from 'react';
import TrainingSessionGenerator from './TrainingSessionGenerator';
import SifuCallsShadowBoxing from './SifuCallsShadowBoxing';
import CameraPoseFeedback from './CameraPoseFeedback';
import ProgressTracker from './ProgressTracker';
import PromotionTracker from './PromotionTracker';
import FlexibilityAssessment from './FlexibilityAssessment';
import EquipmentSelector from './EquipmentSelector';

interface DailyPlanStep {
  title: string;
  description: string;
  done: boolean;
  source?: string;
}

const dailyPlan: DailyPlanStep[] = [
  {
    title: 'Warmup',
    description: 'Jump rope, dynamic stretching, and stance mobility for 8 minutes.',
    done: false,
    source: 'The Art of Expressing the Human Body, p. 42'
  },
  {
    title: 'Kicking Range Drill',
    description: 'Lead Side Stop Kick: Intercept with the lead leg as the opponent advances. Focus on timing and minimal telegraphing.',
    done: false,
    source: 'Bruce Lee’s Fighting Method, Vol. 2, p. 34'
  },
  {
    title: 'Punching Range Drill',
    description: 'Lead Straight Punch: Fire a non-telegraphed lead straight punch to the chin. Recover instantly to guard.',
    done: false,
    source: 'Bruce Lee’s Fighting Method, Vol. 1, p. 22'
  },
  {
    title: 'Trapping Range Drill',
    description: 'Pak Sao-Lap Sao: Clear the guard with pak sao, then lap sao to control and strike.',
    done: false,
    source: 'Bruce Lee’s Fighting Method, Vol. 3, p. 41'
  },
  {
    title: 'Grappling Range Drill',
    description: 'Standing Clinch Escape: Use hip movement and hand fighting to break free and create striking distance.',
    done: false,
    source: 'Living the Martial Way, p. 112'
  },
  {
    title: 'Reflection',
    description: 'Journal: What became simpler, faster, and cleaner today? What needs refinement?',
    done: false,
    source: 'Tao of Jeet Kune Do, p. 24'
  }
];

export default function DailySifuGuidance() {
  const [steps, setSteps] = useState<DailyPlanStep[]>(dailyPlan);
  const [greeting, setGreeting] = useState('');
  const [equipment, setEquipment] = useState<string[]>(['none']);
  const [showProgress, setShowProgress] = useState(false);
  const [showLeaderboards, setShowLeaderboards] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning. Today, empty your cup. I will fill it.');
    else if (hour < 18) setGreeting('Good afternoon. Let us train with directness and simplicity.');
    else setGreeting('Good evening. Reflection and refinement are the way.');
  }, []);

  function markDone(idx: number) {
    setSteps((prev) => prev.map((step, i) => (i === idx ? { ...step, done: !step.done } : step)));
  }

  return (
    <section className="martial-card daily-sifu-guidance component-full-width">
      <SifuAdaptiveGuidance />
      <h2>Virtual Sifu Guidance</h2>
      <p className="sifu-greeting">{greeting}</p>
      <EquipmentSelector value={equipment} onChange={setEquipment} />
      <ol className="daily-plan-list">
        {steps.map((step, idx) => (
          <li key={step.title} className={step.done ? 'done' : ''}>
            <label>
              <input type="checkbox" checked={step.done} onChange={() => markDone(idx)} />
              <strong>{step.title}:</strong> {step.description}
              {step.source && <span className="plan-source"> ({step.source})</span>}
            </label>
          </li>
        ))}
      </ol>
      <p className="plan-note">You can follow this plan or choose your own focus from the Training tab.</p>
      <a href="/info" className="ledger-button dragon-link">View Advancement Criteria</a>
      <div className="dragon-section">
        <CameraPoseFeedback />
      </div>
      <div className="dragon-section">
        <button onClick={() => setShowLeaderboards((v) => !v)} className="ledger-button">
          {showLeaderboards ? 'Hide Leaderboards' : 'Show Leaderboards'}
        </button>
        {showLeaderboards && (
          <>
            <SifuReflexLeaderboard />
            <SifuFlexibilityLeaderboard />
          </>
        )}
      </div>
      <div className="dragon-section">
        <button onClick={() => setShowAdvanced((v) => !v)} className="ledger-button">
          {showAdvanced ? 'Hide Advanced Modules' : 'Show Advanced Modules'}
        </button>
        {showAdvanced && (
          <>
            <SkillTracker />
            <ProgressiveChallenge />
            <FlexibilityAssessment />
            <ReactionDrill />
          </>
        )}
      </div>
    </section>
  );
}
