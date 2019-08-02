import React, { Component } from 'react'
import { Layout } from 'antd'
import Loading from '@/components/Loading'
import Router from '@/router'
const { Content } = Layout
class Main extends Component {
    render() {
        return (
            <Content style={{ margin: '16px 16px 0' }}>
                <Loading>
                    <Router />
                </Loading>
            </Content>
        )
    }
}
export default Main