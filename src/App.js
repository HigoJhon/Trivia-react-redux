import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/Trivia-react-redux" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/trivia" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/Ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}

export default App;
