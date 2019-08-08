import React, { Fragment } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import routers from './config';

// 路由列表
const routerList = routers.map((item, index) => {
  const ComponentPage = item.component;
  if(item.path) {
    if(item.children && item.children.length) {
      return <Route
        exact={item.exact}
        path={item.path}
        render={(props) => {
          return <ComponentPage {...props} routers={item.children}/>
        }}
        key={`page_${item.path}`}/>;
    }
    // {/* Redirect代表重定向，如果加了exact代表精准匹配 */}
    return <Route
      exact={item.exact}
      path={item.path}
      render={(props) => {
        document.title = (item.meta && item.meta.title) || ''
        return item.redirectUrl ? <Redirect to={item.redirectUrl} push /> : <ComponentPage {...props}/>;
      }}
      key={`page_${item.path}`}/>;
  }
  return <Route component={ComponentPage} key={`page_${index}`}></Route>;
})

const Routes = () => (
  <Fragment>
    {/* <Switch>是唯一的因为它仅仅只会渲染一个路径 */}
    <Switch>
      { routerList }
    </Switch>
  </Fragment>
)

export default Routes