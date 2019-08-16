import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
// import PropTypes from "prop-types";
import { LoginWrapper, LoginBox, Input, Button } from './style';

class Login extends PureComponent {
	render() {
    const { handelClickLogin, history } = this.props;
    return (
      <LoginWrapper>
        <LoginBox>
          <Input placeholder='账号' ref={(input) => {this.account = input}}/>
          <Input placeholder='密码' type='password' ref={(input) => {this.password = input}}/>
          <Button onClick={() => handelClickLogin(this.account, this.password, history)}>登陆</Button>
        </LoginBox>
      </LoginWrapper>
    )
  }
}

const mapDispatch = (dispatch) => ({
  handelClickLogin (accountElem, passwordElem, history) {
    dispatch(actionCreators.handelLogin(accountElem.value,passwordElem.value, history))
  }
});

export default connect(null, mapDispatch)(Login);
