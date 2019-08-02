import React, { Component } from 'react'
import FormItem from './components/FormItem'
import { Row, Col } from 'antd'
class FormPage extends Component {
    render() {
        return (
            <Row gutter={16} style={{ 'margin-top': '10px' }}>
                <Col span={12}>
                    <FormItem />
                </Col>
            </Row>
        )
    }
}
export default FormPage