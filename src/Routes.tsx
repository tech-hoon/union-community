import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  About,
  PostDetail,
  UploadPost,
  Setting,
  MyLikes,
  MyPosts,
  MyNotification,
  Messages,
  ProductDetail,
  UploadProduct,
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

        <PrivateRoute exact path='/posts/:id' component={PostDetail} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/post/upload' component={UploadPost} isLoggedIn={isLoggedIn} />

        <PrivateRoute
          exact
          path='/products/:id'
          component={ProductDetail}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          exact
          path='/product/upload'
          component={UploadProduct}
          isLoggedIn={isLoggedIn}
        />

        <PrivateRoute exact path='/setting' component={Setting} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/likes' component={MyLikes} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/myposts' component={MyPosts} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/messages' component={Messages} isLoggedIn={isLoggedIn} />
        <PrivateRoute
          exact
          path='/notifications'
          component={MyNotification}
          isLoggedIn={isLoggedIn}
        />

        <PrivateRoute exact path='/not-found' component={NotFound} isLoggedIn={isLoggedIn} />
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
