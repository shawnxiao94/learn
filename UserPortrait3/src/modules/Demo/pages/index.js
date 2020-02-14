import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import Layouts from './Layouts'
import store from '@/data/store'
import permission from '@/common/permission'

@withRouter
class Pages extends Component {
  constructor(props) {
    super(props)
    this.pathname = props.location.pathname
  }

    checkJsessionID = () => {
      /**
         * 权限系统
         * @param {Object} props 父级传参
         */
      permission(this.props)
    }
    /**
     * 组件生命周期挂载钩子
     */
    componentWillMount() {
      this.checkJsessionID()
    }

    componentWillReceiveProps() {
      this.checkJsessionID()
    }

    render() {
      return (
        <Provider {...store}>
          <Switch>
            <Route path='/' component={Layouts} />
          </Switch>
        </Provider>
      )
    }
}

export default Pages
