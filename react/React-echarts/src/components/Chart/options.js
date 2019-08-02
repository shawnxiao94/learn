/**
 * echarts 常用图表配置项
 * @return {Object} DEFAULT_OPTION 默认配置
 * @return {Object} AXIS_OPTION 带X轴Y轴坐标系图表配置
 * @return {Object} PIE_SERIES_STYLE 饼状图系series风格配置
 */

/*
 * JS动态色系
 */
import colors from '@/assets/styles/color/color.js'
import { objectMerge, deepClone } from '@/common/utils/index'

/**
 * 默认配置
 */
const DEFAULT_OPTION = {
    /**
     * 悬浮框
     */
    tooltip: {
        trigger: 'item',
        padding: 10,
        backgroundColor: colors.echart.tooltip.backgroundColor,
        borderColor: colors.echart.tooltip.borderColor,
        borderWidth: 1,
        textStyle: {
            color: colors.echart.tooltip.textColor,
            fontSize: '12'
        }
    },
    /**
     * 标注
     */
    legend: {
        data: [],
        icon: 'circle',
        itemGap: 16,
        top: 0,
        textStyle: {
            color: colors.echart.axis.textStyleColor,
            fontWeight: 'normal',
            fontSize: colors.echart.axis.textStyleSize
        }
    }
}

/**
 * 带X轴Y轴坐标系图表配置
 */
const AXIS_OPTION = objectMerge(deepClone(DEFAULT_OPTION), {
    /**
     * X轴
     */
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
                color: [colors.gray.colorGraySSSS]
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: colors.echart.axis.lineStyleColor
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                color: colors.echart.axis.textStyleSize
            }
        }
    },
    /**
     * Y轴
     */
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                color: [colors.gray.colorGraySSSS]
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: colors.echart.axis.lineStyleColor
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                color: colors.echart.axis.textStyleSize
            }
        }
    },
    /**
     * 定位
     */
    grid: {
        top: '15%',
        left: '4%',
        right: '4%',
        bottom: '0',
        containLabel: true
    }
})

/**
 * 饼状图系series风格配置
 */
const PIE_SERIES_STYLE = {
    label: {
        normal: {
            show: false,
            position: 'center'
        },
        emphasis: {
            show: true,
            textStyle: {
                fontSize: 22,
                color: colors.echart.axis.textStyleColor
            }
        }
    },
    labelLine: {
        normal: {
            show: false
        }
    },
    itemStyle: {
        normal: {
            color: function(params) {
            // build a color map as your need.
                var colorList = [
                    colors.c1,
                    colors.c2,
                    colors.c3,
                    colors.c4,
                    colors.c5,
                    colors.c6
                ]
                return colorList[params.dataIndex]
            }
        }
    }
}

/**
 * 柱状图系series风格配置
 */
const BAR_SERIES_STYLE = {
    type: 'bar',
    barMaxWidth: 30,
    barCategoryGap: '40%',
    animation: false,
    itemStyle: {
        normal: {
            color: colors.c1
        }
    }
}

/**
 * 线型图系series风格配置
 */
const LINE_SERIES_STYLE = {
    type: 'line',
    smooth: true,
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: {
        normal: {
            color: colors.c1
        }
    },
    lineStyle: {
        normal: {
            width: 3
        }
    },
    data: []
}

export { DEFAULT_OPTION, AXIS_OPTION, PIE_SERIES_STYLE, BAR_SERIES_STYLE, LINE_SERIES_STYLE }