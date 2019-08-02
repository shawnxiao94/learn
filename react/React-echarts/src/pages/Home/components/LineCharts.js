import React, { Component } from 'react'
import { Card } from 'antd'
import { objectMerge, deepClone } from '@/common/utils/index'
/**
 * 全局图表组件
 */
import Chart from '@/components/Chart'
import { AXIS_OPTION, LINE_SERIES_STYLE } from '@/components/Chart/options'
/*
 * JS动态色系
 */
import colors from '@/assets/styles/color/color.js'

class LineCharts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: this.setOption()
        }
    }
    setOption() {
        return objectMerge(deepClone(AXIS_OPTION), {
            legend: {
                data: ['触达数', '点击数', '到店数', '成交数']
            },
            series: [
                {
                    ...LINE_SERIES_STYLE,
                    itemStyle: {
                        normal: {
                            color: colors.c1
                        }
                    },
                    name: '触达数'
                },
                {
                    ...LINE_SERIES_STYLE,
                    itemStyle: {
                        normal: {
                            color: colors.c2
                        }
                    },
                    name: '点击数'
                },
                {
                    ...LINE_SERIES_STYLE,
                    itemStyle: {
                        normal: {
                            color: colors.c3
                        }
                    },
                    name: '到店数'
                },
                {
                    ...LINE_SERIES_STYLE,
                    itemStyle: {
                        normal: {
                            color: colors.c4
                        }
                    },
                    name: '成交数'
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
        option.xAxis.data = ['2019-07-29', '2019-07-30', '2019-07-31', '2019-08-01']
        option.series[0].data = [Math.random() * 200, Math.random() * 200, Math.random() * 200, Math.random() * 200]
        option.series[1].data = [Math.random() * 200, Math.random() * 200, Math.random() * 200, Math.random() * 200]
        option.series[2].data = [Math.random() * 200, Math.random() * 200, Math.random() * 200, Math.random() * 200]
        option.series[3].data = [Math.random() * 200, Math.random() * 200, Math.random() * 200, Math.random() * 200]
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
export default LineCharts