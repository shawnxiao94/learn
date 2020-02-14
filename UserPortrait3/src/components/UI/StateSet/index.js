/**
 * 选择标签画像 - 状态
 * @props {number} name 状态name
 * @props {String} color 颜色
 */
import React, { Component } from 'react'
import { Button } from 'antd'
import { deepClone } from '@/common/utils'
import './index.less'
class StateSet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.setState({ 'data': deepClone(this.props.data) })
  }
  handleClick(item) {
    let data = [...this.state.data]
    data = data.map(a => {
      if (a.value === item.value) {
        a.cancel = !a.cancel
      }
      return a
    })
    this.setState({
      data: data
    })
    let values = data.filter(item => !item.cancel).map(item => item.value)
    this.props.changes(values)
  }
  render() {
    return (
      <div className='status-btn'>
        {
          this.state.data.map((item, key) => {
            return (
              <Button
                key={key}
                type='link'
                block
                className={'status-btn-' + (item.cancel ? 'gray' : item.color)}
                onClick={_ => {
                  this.handleClick(item)
                }}
              >
                <span className='status-btn-line'></span>
                <span className='status-btn-text'>{item.name}</span>
              </Button>
            )
          })
        }
      </div>
    )
  }
}

export default StateSet
