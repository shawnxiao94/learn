import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layouts from './Layouts'

class Pages extends PureComponent {

  render () {
    // react 组件首字母必须大写
    const { loginStatus } = this.props;
    if(loginStatus) {
			return (
        <Layouts/>
			)
    } else {
      return <Redirect to="/login" push />      
    }
  }

}

const mapState = (state) => ({
  loginStatus: state.getIn(['login','loginStatus'])
})

export default connect(mapState, null)(Pages);