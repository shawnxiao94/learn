import React, { Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Home from "@pages/Home"
import Login from "@pages/Login"

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" exact component={Login}></Route>
      </Switch>
    </Fragment>
  </BrowserRouter>
)

export default Routes