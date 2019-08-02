import React, { Component } from 'react'
import CardItem from './components/CardItem'
import { Row, Col } from 'antd'
import Search from '@/pages/Home/components/Search'
class CardPage extends Component {
    render() {
        return (
            <div>
                <Search />
                <Row gutter={16} style={{ 'margin-top': '16px' }}>
                    <Col span={12}>
                        <CardItem />
                    </Col>
                    <Col span={12}>
                        <CardItem />
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
export default CardPage