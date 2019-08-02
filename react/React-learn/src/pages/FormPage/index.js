import React, { Component } from 'react'
import FormItem from './components/FormItem'
import { Row, Col } from 'antd'
import Search from '@/pages/Home/components/Search'
class FormPage extends Component {
    render() {
        return (
            <div>
                <Search />
                <Row gutter={16} style={{ 'margin-top': '16px' }}>
                    <Col span={12}>
                        <FormItem />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default FormPage