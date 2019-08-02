import React, { Component } from 'react'
import { Card } from 'antd'
import { objectMerge, deepClone } from '@/common/utils/index'
/**
 * 全局图表组件
 */
import Chart from '@/components/Chart'
import { DEFAULT_OPTION, PIE_SERIES_STYLE } from '@/components/Chart/options'

class PieCharts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: this.setOption()
        }
    }
    setOption() {
        return objectMerge(deepClone(DEFAULT_OPTION), {
            legend: {
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    ...PIE_SERIES_STYLE,
                    name: '访问来源',
                    type: 'pie',
                    radius: ['60%', '75%'],
                    center: ['50%', '55%'],
                    avoidLabelOverlap: false,
                    data: []
                }
            ]
        })
    }
    componentDidMount() {
        this.setChartsData()
        this.timer = setInterval(() => {
            this.setChartsData()
        }, 2000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    setChartsData() {
        let option = Object.assign({}, this.state.option)
        option.series[0].data = [
            { value: Math.random() * 200, name: '直接访问' },
            { value: Math.random() * 200, name: '邮件营销' },
            { value: Math.random() * 100, name: '联盟广告' }
        ]
        this.setState({ option })
    }
    render() {
        return (
            <Card title='图表' bordered={false} extra={<a href='#'>More</a>}>
                <div style={{ height: '240px' }}>
                    <Chart option={this.state.option} />
                </div>
            </Card>
        )
    }
}
export default PieCharts