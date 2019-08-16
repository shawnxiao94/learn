import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

/**
 * 注意： 使用此高阶组件时，上层路由不能使用render props方式渲染，否则会堆栈溢出。
 *  */

class PrivateRoute extends PureComponent {
  render () {
    const {
      exact, 
      path,
      component,
      auth,
      redirect
    } = this.props;
  
    const pass = typeof auth === 'function' ? auth() : auth;
    let pathname = '/login';
    let search = '';
    if(typeof redirect === 'string') {
      pathname = redirect;
    }
    if(typeof redirect === 'object' && redirect !== null) {
        pathname = redirect.pathname || '/login';
        search = redirect.search;
    }
    return pass ? <Route exact={exact} component={component} path={path} /> : <Redirect exact to={{pathname, search, state: {referrer: path}}}/>
  }
}

PrivateRoute.propTypes = {
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  path: PropTypes.string,
  //是否有访问权限，接受布尔值，或者一个函数.
  auth: PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.func,
  ]).isRequired,
  //无权访问时，重定向url (与 <Link to>属性一致，可以是string 或object)
  redirect: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
  ]),
  //是否使用render props方式渲染
  render: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ])
}

export default PrivateRoute