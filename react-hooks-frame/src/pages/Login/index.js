import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './index.css'
import { actionCreators } from './store'

import { Form, Icon, Input, Button, Checkbox } from 'antd'

const NormalLoginForm = ({ form, history, handelClickLogin }) => {
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        handelClickLogin(values, history)
      }
    })
  }

  const { getFieldDecorator } = form
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="账号"
          />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Remember me</Checkbox>)}
        <a className="login-form-forgot" href="">
              Forgot password
        </a>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button">
              登陆
        </Button>
            Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  )
}

const mapDispatch = (dispatch) => ({
  handelClickLogin (values, history) {
    dispatch(actionCreators.handelLogin(values.username, values.password, history))
  }
})

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

NormalLoginForm.propTypes = {
  form: PropTypes.any,
  handelClickLogin: PropTypes.func,
  history: PropTypes.any
}

export default connect(null, mapDispatch)(WrappedNormalLoginForm)
