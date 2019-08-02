import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import NotLiveRoute from 'react-live-route'
const LiveRoute = withRouter(NotLiveRoute)
const FormatCacheRoute = (_route, _parentPath = '') => {
    if (_route.cache) {
        return (
            <LiveRoute
                livePath={_route.cache.livePath}
                forceUnmount={_route.cache.forceUnmount}
                onHide={_route.cache.onHide}
                onReappear={_route.cache.onReappear}
                alwaysLive={_route.cache.alwaysLive}
                key={_parentPath + _route.path}
                path={_parentPath + _route.path}
                component={_route.component}
            />
        )
    } else {
        return (
            <Route
                key={_parentPath + _route.path}
                path={_parentPath + _route.path}
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
    return filterRouters(config)
}

export default formatRouter
