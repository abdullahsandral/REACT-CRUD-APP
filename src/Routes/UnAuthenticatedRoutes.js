import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Signup from '../Authentication/Signup/Signup';
import Signin from '../Authentication/Signin/Signin';

const UnAuthenticatedRoutes = props => {

  return <Router>
    <Switch>
      <Route path='/signup' exact>
        <Signup />
      </Route>
      <Route path='/login' exact>
        <Signin />
      </Route>
      <Redirect to='/login' />
    </Switch>
  </Router>
}
export default UnAuthenticatedRoutes;