import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, About, PostDetail, NewPost } from 'pages';

interface Props {
  isLoggedIn: boolean;
}

const Routes = ({ isLoggedIn }: Props) => (
  <Router>
    <Switch>
      <Route exact path='/'>
        {isLoggedIn ? <Home /> : <About />}
      </Route>

      <Route exact path='/post/:id'>
        <PostDetail />
      </Route>

      <Route exact path='/new'>
        <NewPost />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
