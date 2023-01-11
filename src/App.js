import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Configurações from './pages/Configurações';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/configurações" component={ Configurações } />
        </Switch>
      </div>
    );
  }
}

export default App;
