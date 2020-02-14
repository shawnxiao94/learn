import React, { Component } from 'react'
import { Row, Col, Card, Statistic } from 'antd'
import './ThemePercent.less'
class themePercent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percent: this.props.percent,
      bodyStyle: this.props.bodyStyle
    }
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
  }
  render() {
    const { bodyStyle, valueStyle } = this.props
    return (
      <Card className='w-chart-percent' bordered={false} bodyStyle={ bodyStyle }>
        <div className='w-chart-percent-wrapper'>
          <div className='w-chart-percent-top'>
            <Row gutter={10}>
              {this.props.options.map((item, index) => {
                return (
                  <Col span={12} key={index}>
                    <Statistic
                      valueStyle={valueStyle}
                      title={item.title}
                      value={item.value}
                      suffix={item.suffix}
                    />
                  </Col>
                )
              })}
            </Row>
          </div>
          <div className='w-chart-percent-bottom'>
            {this.props.percent &&
              <div className='percent-inner'>
                <span className='percent-bg' style={{ 'width': Math.min(this.props.percent, 100) + '%', 'background-color': this.props.valueStyle.color }}>
                  {this.props.percent > 0 && <span className='tip'>{Math.min(this.props.percent, 100) + '%'}</span>}
                </span>
              </div>
            }
          </div>
        </div>
      </Card>
    )
  }
}
export default themePercent