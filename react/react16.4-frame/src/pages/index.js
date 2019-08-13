import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layouts from './Layouts'
import { getStorage } from '@common/utils/auth'
import { actionCreators } from './Login/store';
import { actionCreators as permissionActionCreators } from '@pages/store'

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
  componentWillMount () {
    this.props.checkLoginStatus()
  }

}

const mapState = (state) => ({
  loginStatus: state.getIn(['login','loginStatus'])
})

const mapDispatch = (dispatch) => ({
  checkLoginStatus () {
    let token = getStorage()
    if(token) {
      // 登录有效状态
      //  获取权限
      dispatch(permissionActionCreators.getPermissionFn(token))
    }
    dispatch(actionCreators.changeLogin(!!token))
  }
});

export default connect(mapState, mapDispatch)(Pages);