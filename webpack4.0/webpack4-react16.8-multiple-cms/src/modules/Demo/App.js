/*
 * @Author: your name
 * @Date: 2020-01-19 14:16:55
 * @LastEditTime : 2020-01-19 17:59:41
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\modules\Demo\App.js
 */
import React, {
  memo,
} from "react"
import PropTypes from "prop-types"
import {
  connect,
} from "react-redux"
import {
  HashRouter,
  Route,
  Switch,
} from "react-router-dom"

import Layouts from "./pages/Layouts"
import Login from "./pages/Login"

const FiterRouter = memo(isLogin => (
  isLogin ? (
    <Route
      path="/"
      component={
        Layouts
      }
    />
  )
    : (
      <Route
        path="/login"
        exact
        component={
          Login
        }
      />
    )))

function App(props) {
  const {
    loginStatus,
  } = props
  return (
    <HashRouter>
      <Switch>
        <FiterRouter isLogin={
          loginStatus
        }
        />
      </Switch>
    </HashRouter>
  )
}

const mapState = state => ({
  loginStatus: state.getIn(["login", "loginStatus"]),
})

App.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
}

export default connect(mapState, null)(App)
