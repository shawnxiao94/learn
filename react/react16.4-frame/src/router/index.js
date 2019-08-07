import React, { Fragment } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import routeArr from './config';
import ErrorPage from '@pages/ErrorPage';

const Routes = () => (
  <Fragment>
    {/* <Switch>是唯一的因为它仅仅只会渲染一个路径 */}
    <Switch>
      {/* Redirect代表重定向，如果加了exact代表精准匹配 */}
      <Redirect exact from="/" to="/home"></Redirect>
      {
        routeArr.map(item => (
          <Route
           path={item.path}
           key={item.path}
           exact 
           render={(props) => {
             document.title = item.meta.title
             return <item.component {...props} path={item.path}></item.component>
           }}
          >
          </Route>
        ))
      }
      <Route component={ErrorPage} />
    </Switch>
  </Fragment>
)

export default Routes