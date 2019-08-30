import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  LayoutWrapper,
  LeftWrapper,
  MainWrapper
} from './style'
import Header from './components/Header'
import Foot from './components/Foot'
import CRouter from '@router'
import store from '@/store'
import { actionCreators } from '@/store/Permission'
import Loading from '@components/Loading'

class Layout extends PureComponent {
  render () {
    const { routerPermissions } = this.props
    if (routerPermissions.size) {
      return (
        <LayoutWrapper>
          <LeftWrapper>
            {/* <Sidebar menuList={menuList}/> */}
          </LeftWrapper>
          <MainWrapper>
            <Header/>
            <MainWrapper>
              <CRouter routes={routerPermissions}/>
              {/* 可以方法形式调用，也可以组件形式调用，但纯函数接收参数时以props接收使用
                {
                  CRouter(routerPermissions)
                }
                */
              }
            </MainWrapper>
            <Foot/>
          </MainWrapper>
        </LayoutWrapper>
      )
    } else {
      //  获取权限
      store.dispatch(actionCreators.getPermissionFn())
      return <Loading />
    }
  }
}

const mapState = (state) => ({
  routerPermissions: state.getIn(['permission', 'routerPermissions'])
  // menuList: state.getIn(['permission', 'menuList'])
})

Layout.propTypes = {
  routerPermissions: PropTypes.array.isRequired
  // menuList: PropTypes.array.isRequired
}

export default connect(mapState)(Layout)
