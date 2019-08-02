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