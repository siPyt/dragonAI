import SifuStreakTracker from './components/SifuStreakTracker';
import SifuFlexibilityLeaderboard from './components/SifuFlexibilityLeaderboard';
import SifuReflexLeaderboard from './components/SifuReflexLeaderboard';
import SifuProgressVisualization from './components/SifuProgressVisualization';
import SifuPromotionCriteria from './components/SifuPromotionCriteria';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { barbell, flame, journal } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import FlexibilityAssessment from './components/FlexibilityAssessment';
import ReactionDrill from './components/ReactionDrill';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/doctrine">
            <Tab1 />
          </Route>
          <Route exact path="/training">
            <Tab2 />
          </Route>
          <Route exact path="/living-the-way">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/doctrine" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className="dragon-tab-bar">
          <IonTabButton tab="doctrine" href="/doctrine">
            <IonIcon aria-hidden="true" icon={flame} />
            <IonLabel>Doctrine</IonLabel>
          </IonTabButton>
          <IonTabButton tab="training" href="/training">
            <IonIcon aria-hidden="true" icon={barbell} />
            <IonLabel>Training</IonLabel>
          </IonTabButton>
          <IonTabButton tab="living-the-way" href="/living-the-way">
            <IonIcon aria-hidden="true" icon={journal} />
            <IonLabel>Living The Way</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
      <ReactionDrill />
      <SifuPromotionCriteria />
      <SifuProgressVisualization />
      <SifuReflexLeaderboard />
      <SifuFlexibilityLeaderboard />
      <SifuStreakTracker />
);

export default App;
