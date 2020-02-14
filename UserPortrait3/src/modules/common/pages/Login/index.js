/**
  * description: 登陆卡槽
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import LoginForm from './components/LoginForm'
import './index.less'
class Login extends Component {
  render() {
    return (
      <div className='login-wrapper'>
        <div className='login-header'>
                    
        </div>
        <LoginForm />
      </div>
    )
  }
}
export default Login