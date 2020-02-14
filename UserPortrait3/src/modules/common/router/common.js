/**
  * description: 过滤路由
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import NotLiveRoute from 'react-live-route'
/**
 * 过滤路由
 */
import { filterPermissionRouters } from '@/common/permission/check'
import Permission from '@/data/store/Permission'
const LiveRoute = withRouter(NotLiveRoute)
/**
 * 缓存回来图表错位问题
 */
const reappearForChartsResize = () => {
  setTimeout(() => {
    window.trigger(window, 'resize')
  })
}
const FormatCacheRoute = (_route, _parentPath = '') => {
  if (_route.cache) {
    return (
      <LiveRoute
        livePath={_route.cache.livePath}
        forceUnmount={_route.cache.forceUnmount}
        onHide={_route.cache.onHide}
        onReappear={(location, match, livePath, alwaysLive) => {
          reappearForChartsResize()
          _route.cache.onReappear && _route.cache.onReappear(location, match, livePath, alwaysLive)
        }}
        alwaysLive={_route.cache.alwaysLive}
        key={_parentPath + _route.path}
        path={_parentPath + _route.path}
        component={_route.component}
        exact={_route.exact}
      />
    )
  } else {
    return (
      <Route
        key={_parentPath + _route.path}
        path={_parentPath + _route.path}
        exact={_route.exact}
        component={_route.component}
      />
    )
  }
}
const formatRouter = config => {
  const filterRouters = (_router, _parentPath = '') => {
    return _router.map(item => {
      item.fillPath = _parentPath + item.path
      if (item.subRoute && item.subRoute.length) {
        let _routers = filterRouters(item.subRoute, item.fillPath)
        _routers.push(FormatCacheRoute(item, _parentPath))
        return _routers
      } else {
        return FormatCacheRoute(item, _parentPath)
      }
    })
  }
  return filterRouters(filterPermissionRouters(config, Permission.allKeys))
}

export default formatRouter
