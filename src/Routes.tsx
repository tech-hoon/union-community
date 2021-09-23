import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, About, PostDetail } from 'pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/login'>
        <Login />
      </Route>

      <Route exact path='/about'>
        <About />
      </Route>

      <Route exact path='/post/:id'>
        <PostDetail />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
