import React, { Fragment } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { asyncRouterMap } from './config';

function filterAsyncRouterMap (authRoutes,asyncRouter) {
  return asyncRouter.filter(item => {
    return authRoutes.includes(item.name)
  })  
}

// 依据角色权限路由得到路由DOM
export function getRouterDoms (authRoutes) {
// 登录后权限过滤后的路由
  const asyncFilterRouter = filterAsyncRouterMap(authRoutes, asyncRouterMap)

  const list = [];
  asyncFilterRouter.forEach(item => {
    list.push(
      <Route
        exact
        path={item.path} 
        key={item.path}
        render={(props => {
        const ComponentPage = item.component
        return <ComponentPage {...props}/>
      })} />
    )
  })
  return list;
}

// 路由dom列表
function getRouterDomList(routers) {
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
  return () => (
    <Fragment>
      {/* <Switch>是唯一的因为它仅仅只会渲染一个路径 */}
        { routerList }
    </Fragment>
  )
}