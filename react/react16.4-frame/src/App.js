import React, { PureComponent } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Layouts from '@pages/Layouts'
import { Login, NotFound, ErrorPage403 } from '@router/config'
import PrivateRoute from '@components/PrivateRoute'

class App extends PureComponent {
  render () {
    const { loginStatus } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/home" push />} />
          <Route path='/404' component={NotFound}/>
          <Route path='/403' component={ErrorPage403}/>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Layouts} auth={loginStatus}/>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )     
  }
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'loginStatus'])
})

export default connect(mapState, null)(App)