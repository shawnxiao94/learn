/**
  * description: 全局标签选项卡
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Layout } from 'antd'
import Left from './components/Left'
import Head from './components/Head'
import Main from './components/Main'
import Foot from './components/Foot'
// import TabsView from './components/TabsView'
// <TabsView router={this.props.routerConfig} />
import PageLoading from './components/PageLoading'
import './index.less'
import { inject, observer } from 'mobx-react'
@inject('Permission')
@observer
class Layouts extends Component {
  render() {
    return (
      /**
       * React 主题模块
       */
      <React.Fragment>
        {this.props.Permission.loading ? <PageLoading />
          : this.props.Permission.isGetReady && <Layout style={{ minHeight: '100vh' }} className='w-layout'>
            <Left router={this.props.routerConfig} />
            <Layout>
              <Head />
              <Main Router={this.props.Router} />
              <Foot />
            </Layout>
          </Layout>
        }
      </React.Fragment>
    )
  }
}
export default Layouts