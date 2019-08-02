import React, { Component } from 'react'
import { Card } from 'antd'
class CardItem extends Component {
    render() {
        return (
            <Card title='Card title' bordered={false}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        )
    }
}
export default CardItem