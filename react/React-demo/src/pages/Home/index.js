import React, { Component } from 'react'
import CardItem from './components/CardItem'
import CardCharts from './components/CardCharts'
import { Row, Col } from 'antd'
class Home extends Component {
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <CardItem />
                    </Col>
                    <Col span={12}>
                        <CardCharts />
                    </Col>
                </Row>
                <Row gutter={16} style={{ 'margin-top': '16px' }}>
                    <Col span={8}>
                        <CardItem />
                    </Col>
                    <Col span={8}>
                        <CardItem />
                    </Col>
                    <Col span={8}>
                        <CardItem />
                    </Col>
                </Row>
                <Row gutter={16} style={{ 'margin-top': '16px' }}>
                    <Col span={12}>
                        <CardItem />
                    </Col>
                    <Col span={12}>
                        <CardItem />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Home