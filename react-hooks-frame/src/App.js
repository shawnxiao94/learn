import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import Layouts from '@pages/Layouts'
import { Login, NotFound, ErrorPage403 } from '@router/config'
import PrivateRoute from '@components/PrivateRoute'

function App (props) {
  // let currHref = ''
  // const href = window.location.href
  // if (currHref !== href) {
  //   NProgress.start()
  //   setTimeout(() => {
  //     NProgress.done()
  //     currHref = href
  //   }, 3000)
  // }
  const { loginStatus } = props
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/home" push />} />
        <Route path='/404' component={NotFound}/>
        <Route path='/403' component={ErrorPage403}/>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={Layouts} auth={loginStatus}/>
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  )
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'loginStatus'])
})

App.propTypes = {
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapState, null)(App)
