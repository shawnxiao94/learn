import React from 'react';
import {
  Route,
  Switch, 
  Redirect
} from 'react-router-dom';
import { asyncRouterMap } from './config';

function getRoutDom (r) {
  const ComponentPage = r.component
  return (
    <Route
      key={r.path}
      exact
      path={r.path}
      render={props => {
        console.log(props)
        // const { params } = props.match;
        const merge = {
          ...props,
          query: {}
        }
        // 重新包装组件
        const WrapperComponent = (
          <ComponentPage {...merge} />
        )
        return WrapperComponent;
      }}
    />
  )
}

function filterAsyncRouterMap (authRoutes,asyncRouter) {
  return asyncRouter.filter(item => {
    return authRoutes.includes(item.name)
  })  
}

const AuthRoute = (authRoutes) => {
  const routeList = [];
  function formatRouteDom (arr) {
    arr.forEach(r => {
      if(!r.component) {
        return
      }
      routeList.push(getRoutDom(r))
      if(r.children && r.children.length) {
        formatRouteDom(r.children)
      }
    })
  }
  formatRouteDom(filterAsyncRouterMap(authRoutes, asyncRouterMap))
  return routeList
}

const CRouter = (props) => {
  const { routes } = props
  return (
    <Switch>
      {
        AuthRoute(routes)
      }
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  )     
}

export default CRouter;