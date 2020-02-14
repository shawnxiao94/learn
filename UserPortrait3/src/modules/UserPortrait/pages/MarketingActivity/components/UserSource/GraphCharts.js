/**
  * description: 营销活动活动用户来源 - 关系图
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { objectMerge, deepClone } from '@/common/utils/index'
import Chart from '@/components/Chart'
import { DEFAULT_OPTION, GRAPH_SERIES_STYLE } from '@/components/Chart/options'
import colors from '@/assets/styles/color/color.js'
/**
 * 全局图表组件
 */

class GraphCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.setOption(),
      xyIndex: [
        { x: 100, y: 0 },
        { x: 85, y: 95 },
        { x: 60, y: 60 },
        { x: 40, y: 40 },
        { x: 85, y: 50 }
      ]
    }
    this.resize = this.resize.bind(this)
    this.foucusNode = this.foucusNode.bind(this)
    // this.unfoucusNode = this.unfoucusNode.bind(this)
  }

  setOption() {
    const iconArrow = require('@/assets/images/icon/leftArrow.png')
    const leftArrow = `<img width='12px' height='12px' src='${iconArrow}'>`
    const rightArrow = `<img style='transform:rotate(180deg)' width='12px' height='12px' src='${iconArrow}'>`
    return objectMerge(deepClone(DEFAULT_OPTION), {
      tooltip: {
        formatter: function(seriesData) {
          let icon = `
            <span style="display:inline-block;vertical-align:middle;margin-right:5px;border-radius:100%;width:6px;height:6px;background-color:${seriesData.color};"></span>
          `
          const formatter = (type, title) => {
            // let titledom = `<div style='margin-top:5px'><span style="color:${colors.gray.colorGrayOtherA}">${title}</span></div>`
            let datadom = this.props.data.links.filter(item => {
              return item[type] === seriesData.data.category
            }).map(item => {
              let text
              if (type === 'source') {
                text = `${item.targetName}`
                // text = `${item.sourceName} ${rightArrow} ${item.targetName}`
              }
              if (type === 'target') {
                text = `${item.targetName} ${leftArrow} ${item.sourceName}`
              }
              return `<div style='display:flex;align-items:center'>
                <span style="color:${colors.gray.colorGrayOtherA};margin-left:13px;margin-right:5px;width:60px;margin-top:2px;">${text}</span> ${item.value}
              </div>`
            }).join('')
            // return datadom && titledom + datadom
            return datadom && datadom
          }
          if (seriesData.dataType === 'node') {
            let source = formatter('source', '共享方')
            return `<div style="color:${colors.gray.colorGraySSSS}">
              <span style="color:${colors.gray.colorGrayOtherA};margin-right:5px;width:73px;display:inline-block;">${icon} ${seriesData.data.name} </span>${seriesData.data.value}
              ${source}
            </div>`
          } else {
            return `<div style="color:${colors.gray.colorGraySSSS}">
              ${icon} <span style="color:${colors.gray.colorGrayOtherA}">${seriesData.data.sourceName} ${rightArrow} ${seriesData.data.targetName}</span> ${seriesData.data.value}
            </div>`
          }
        }.bind(this)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setChartsData(nextProps.data)
    }
  }
  componentDidMount() {
    this.setChartsData()
  }
  /**
   * 活动用户来源数据初始化
   */
  setChartsData(data = this.props.data) {
    if (!data.nodes) {
      return
    }
    let option = Object.assign({}, this.state.option)
    let categories = data.nodes.map((item, index) => {
      let dataIndex
      this.state.xyIndex.find((itemy, indexy) => {
        if (index === indexy) {
          dataIndex = {
            name: item.name,
            itemStyle: {
              color: colors['c' + (index + 1)]
            },
            x: [
              itemy.x + ''
            ],
            y: [
              itemy.y + ''
            ]
          }
        }
      })
      return dataIndex
    })
    option.series = [
      {
        ...GRAPH_SERIES_STYLE,
        data: data.nodes,
        categories,
        links: data.links
      }
    ]
    this.setState({ option })
  }
  
  /**
   * 图表重置
   */
  resize() {
    let option = Object.assign({}, this.state.option)
    this.setState({ option })
  }
  /**
   * 节点悬浮
   */
  foucusNode(params) {
    let currentNode = params.name.indexOf('>') > 0 ? params.data.sourceName : params.name
    let option = Object.assign({}, this.state.option)
    let dataLinks = option.series[0].links
    dataLinks.map(item => {
      if (currentNode !== item.sourceName) {
        return Object.assign(item, {
          emphasis: {
            lineStyle: {
              width: 1
            }
          },
          lineStyle: {
            opacity: 0.15
          }
        })
      } else {
        return Object.assign(item, {
          emphasis: {},
          lineStyle: {
            opacity: 0.3
          }
        })
      }
    })
    this.setState({ option })
  }
  // unfoucusNode() {
  //   let option = Object.assign({}, this.state.option)
  //   let dataLinks = option.series[0].links
  //   dataLinks.map(item => {
  //     return Object.assign(item, {
  //       emphasis: {},
  //       lineStyle: {
  //         opacity: 0.3
  //       }
  //     })
  //   })
  //   this.setState({ option })
  // }

  render() {
    return (
      <Chart option={this.state.option} foucusNode={this.foucusNode} resize={this.resize} />
    )
  }
}
export default GraphCharts