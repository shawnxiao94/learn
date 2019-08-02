import React, { Component } from 'react'
import { Layout } from 'antd'
import Left from './components/Left'
import Head from './components/Head'
import Main from './components/Main'
import Foot from './components/Foot'
import TabsView from './components/TabsView'
import './index.less'
class Layouts extends Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Left />
                <Layout>
                    <Head />
                    <TabsView />
                    <Main />
                    <Foot />
                </Layout>
            </Layout>
        )
    }
}
export default Layouts