/**
  * description: 营销活动排名
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Card, Radio, Progress, message, Spin } from 'antd'
import { formatFloat } from '@/common/utils'
import { getRankData } from '@/modules/UserPortrait/data/api/MarketingActivity/Ranking'
import './index.less'

class Ranking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      form: {},
      nodata: false,
      type: 'stopNum'
    }
  }
  /**
   * 类型切换 转化率 - 触达数
   */
  onChangeData = e => {
    this.setState({
      type: e.target.value
    })
    this.getRankList()
  };
  componentDidMount() {
    this.getRankList()
  }
  /**
   * 获取活动排名数据
   */
  getRankList() {
    this.setState({ 'loading': true })
    getRankData(this.state.form).then(res => {
      if (this.state.type === 'stopNum') {
        this.setState({ 'data': res.enterStoreConversionRate })
      } else if (this.state.type === 'changeNum') {
        this.setState({ 'data': res.turnoverConversionRate })
      }
      if (this.state.data && this.state.data.length > 0) {
        this.setState({ 'nodata': false })
      } else {
        this.setState({ 'nodata': true })
      }
    }).catch(() => {
      message.error('获取活动排名失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
  render() {
    let rankData = this.state.data
    return (
      <Card title='营销活动排名' bordered={false} >
        <div style={{ 'height': '396px' }}>
          <div style={{ 'float': 'right' }}>
            <Radio.Group onChange={this.onChangeData} value={this.state.type}>
              <Radio.Button value='stopNum'>到店率</Radio.Button>
              <Radio.Button value='changeNum'>成交率</Radio.Button>
            </Radio.Group>
          </div>
          <div className='ranking'>
            <Spin spinning={this.state.loading}>
              <div style={{ 'height': '344px' }}>
                {this.state.nodata
                  ? <p style={{ 'margin-top': '30px', 'text-align': 'center' }}>暂无数据</p>
                  : rankData.map((item, index) => {
                    return (
                      <div className='ranking-item' key={index}>
                        <div className='ranking-num'>{index + 1}</div>
                        <div className='ranking-name' title={item.markName}>{item.markName}</div>
                        <div className='ranking-percent'>
                          <div className='c-rank-tip'>
                            <span className='c-rank-tip-percent'>{formatFloat(item.rate * 100, 2) + '%'}</span>
                            <Progress
                              strokeColor={{
                                '0%': '#26A5CA',
                                '100%': '#217FE7'
                              }}
                              percent={formatFloat(item.rate * 100, 2)} showInfo={false}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </Spin>
          </div>
        </div>
      </Card>
    )
  }
}
export default Ranking