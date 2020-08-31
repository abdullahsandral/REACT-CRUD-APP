import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from '../Shared/Navigation/Navbar';
import AllPosts from '../Posts/AllPosts';
import SinglePost from '../Posts/OnePost';
import NewPost from '../Posts/NewPost';
import Profile from '../Profile/Profile';
import ReactGoogleMap from '../Google-Map/ReactGoogleMap';
import Calculator from '../Calculator.js/Calculator';
import Demo from '../Web-Cam/WebCam';

const AuthenticatedRoutes = props => {

  return <Router>
    <NavBar />
    <main style={{ marginTop: '4rem' }}>
      <Switch>
        <Route path='/dashboard' exact>
          <AllPosts />
        </Route>
        <Route path='/new-post' exact>
          <NewPost />
        </Route>
        <Route path='/post/:pid' exact>
          <SinglePost />
        </Route>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='/google-map' exact>
          <ReactGoogleMap />
        </Route>
        <Route path='/calculator' exact>
          <Calculator />
        </Route>
        <Route path='/web-cam' exact>
          <Demo />
        </Route>
        <Redirect to='/dashboard' />
      </Switch>
    </main>
  </Router>
}
export default AuthenticatedRoutes;