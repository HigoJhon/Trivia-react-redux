import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/trivia" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
        </Switch>
      </div>
    );
  }
}

export default App;
