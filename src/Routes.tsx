import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  About,
  PostDetail,
  NewPost,
  UpdatePost,
  Setting,
  MyLikes,
  MyPosts,
  Loading,
} from 'pages';
import NotFound from 'pages/NotFound';

interface Props {
  isLoggedIn: boolean;
}

const Routes = ({ isLoggedIn }: Props) => (
  <Router>
    <Switch>
      <>
        <Route exact path='/'>
          {isLoggedIn ? <Redirect to={{ pathname: '/home' }} /> : <About />}
        </Route>

        <PrivateRoute exact path='/home' component={Home} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/post/:id' component={PostDetail} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/new' component={NewPost} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/update' component={UpdatePost} isLoggedIn={isLoggedIn} />

        <PrivateRoute exact path='/setting' component={Setting} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/likes' component={MyLikes} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/myposts' component={MyPosts} isLoggedIn={isLoggedIn} />

        {/* <Route path='*' component={NotFound} /> */}
      </>
    </Switch>
  </Router>
);

export default Routes;

const PrivateRoute = ({ component, isLoggedIn, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isLoggedIn ? React.createElement(component, props) : <Redirect to={{ pathname: '/' }} />;
  return <Route {...rest} render={routeComponent} />;
};
