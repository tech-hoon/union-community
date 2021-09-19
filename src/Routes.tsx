import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, Main } from 'pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/main'>
        <Main />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
