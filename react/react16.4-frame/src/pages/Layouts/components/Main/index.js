import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect,withRouter } from 'react-router-dom';
import Routes from '@router'
import { MainWrapper } from './style'

class Main extends PureComponent {
	render() {
    const { loginStatus } = this.props
    if(loginStatus) {
      return (
        <MainWrapper>
          <Routes></Routes>
        </MainWrapper>
      )
    } else {
      return <Redirect to="/login" push/>
      // this.props.history.push('/login');
    }
	}
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login','loginStatus'])
});

export default connect(mapState, null)(withRouter(Main));
