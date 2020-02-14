import React, { Component } from 'react'
import FormItem from './components/FormItem'
import { Row, Col, Card, Typography, Tooltip } from 'antd'
const { Title, Paragraph } = Typography

class FormPage extends Component {
  render() {
    return (
      <Card>
        <Typography>
          <Title>
            <Tooltip title='cs'>
                            Designers
            </Tooltip>
          </Title>
          <Paragraph>
                        In the process of internal desktop applications development, many different design specs and
                        implementations would be involved, which might cause designers and developers difficulties and
                        duplication and reduce the efficiency of development.
          </Paragraph>
        </Typography>
        <Row gutter={16} style={{ 'margin-top': '40px' }}>
          <Col span={12}>
            <FormItem />
          </Col>
        </Row>
      </Card>
    )
  }
}
export default FormPage