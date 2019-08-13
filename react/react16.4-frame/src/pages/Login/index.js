import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actionCreators } from './store';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { getStorage } from '@common/utils/auth'

class Login extends PureComponent {
	render() {
    const { loginStatus, handelClickLogin } = this.props;
    if(!loginStatus) {
			return (
				<LoginWrapper>
					<LoginBox>
						<Input placeholder='账号' ref={(input) => {this.account = input}}/>
						<Input placeholder='密码' type='password' ref={(input) => {this.password = input}}/>
						<Button onClick={() => handelClickLogin(this.account, this.password)}>登陆</Button>
					</LoginBox>
				</LoginWrapper>
			)
    } else {
      return <Redirect to="/" push />  
    }
  }
  
  componentWillMount () {
    this.props.checkLoginStatus()
  }

}

const mapState = (state) => ({
  loginStatus: state.getIn(['login','loginStatus'])
});

const mapDispatch = (dispatch) => ({
  checkLoginStatus () {
    let token = getStorage()
    dispatch(actionCreators.changeLogin(!!token))
  },
  handelClickLogin (accountElem, passwordElem) {
    dispatch(actionCreators.handelLogin(accountElem.value,passwordElem.value))
  }
});

export default connect(mapState, mapDispatch)(Login);
