/**
 * echarts 常用图表配置项
 * @return {Object} DEFAULT_OPTION 默认配置
 * @return {Object} AXIS_OPTION 带X轴Y轴坐标系图表配置
 * @return {Object} PIE_SERIES_STYLE 饼状图系series风格配置
 * @return {Object} GRAPH_SERIES_STYLE 关系图系series风格配置
 */

/*
 * JS动态色系
 */
import color from '@/assets/styles/color/color.js'
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
    backgroundColor: color.echart.tooltip.backgroundColor,
    borderColor: color.echart.tooltip.borderColor,
    borderWidth: 1,
    textStyle: {
      color: color.gray.colorGrayOtherA,
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
    itemWidth: 8,
    itemHeight: 8,
    top: 0,
    inactiveColor: color.gray.colorGray,
    textStyle: {
      color: color.gray.colorGrayOtherA,
      fontWeight: 'normal',
      lineHeight: 1,
      fontSize: color.echart.axis.textStyleSize
    }
  }
}

/**
 * tooltip 文本风格
 */

const TOOLTIP_FORMATTER_STYLE = {
  formatter(params) {
    if (Object.prototype.toString.call(params) === '[object Array]') {
      let name = ''
      let dom = params.map(item => {
        name = item.name
        return `
          <div>
            <span style="display:inline-block;vertical-align:middle;margin-right:5px;border-radius:100%;width:6px;height:6px;background-color:${item.color};"></span>
            <span style="color:${color.gray.colorGrayOtherA}">
              ${item.seriesName}
            </span> 
            <span style="margin-left:5px;color:${color.gray.colorGraySSSS}">
              ${item.value}
            </span>
          </div>
        `
      })
      dom = `
      <span style="color:${color.gray.colorGrayOtherA}">
        ${name}
      </span> ` + dom.join('')
      return dom
    } else {
      return `
      <span style="display:inline-block;vertical-align:middle;margin-right:5px;border-radius:100%;width:6px;height:6px;background-color:${params.color};"></span>
      <span style="color:${color.gray.colorGrayOtherA}">
        ${params.data.name}
      </span> 
      <span style="margin-left:5px;color:${color.gray.colorGraySSSS}">
        ${params.data.value}
      </span>
    `
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
    trigger: 'axis',
    axisPointer: {
      label: {
        show: false
      },
      type: 'line',
      lineStyle: {
        color: color.c1,
        width: 1
      }
    }
    // axisPointer: {
    //   z: 0,
    //   type: 'shadow',
    //   shadowStyle: {
    //     color: 'rgba(0,0,0,.1)'
    //   }
    // }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    splitLine: {
      show: false
      // interval: 'auto',
      // lineStyle: {
      //   color: [color.gray.colorGrayX]
      // }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: color.echart.axis.lineStyleColor
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        // color: color.echart.axis.textStyleColor
        color: '#666'
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
        color: [color.gray.colorGrayX],
        type: 'dashed'
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
      // lineStyle: {
      //   color: color.echart.axis.lineStyleColor
      // }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        // color: color.echart.axis.textStyleColor
        color: '#666'
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
        color: color.echart.axis.textStyleColor
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
        let colorList = [
          color.c10,
          color.c4,
          color.c1,
          color.c8,
          color.c3,
          color.c9,
          '#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'
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
  barMaxWidth: 16,
  barCategoryGap: '40%',
  animation: false,
  itemStyle: {
    normal: {
      color: color.c1
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
  // symbol: 'circle',
  symbolSize: 4,
  itemStyle: {
    normal: {
      color: color.c1
    }
  },
  lineStyle: {
    normal: {
      width: 3
    }
  },
  data: []
}

/**
 * 线型图系series风格配置 2
 */
const LINE_SERIES_STYLE_2 = {
  type: 'line',
  showSymbol: false,
  symbolSize: 4,
  itemStyle: {
    normal: {
      color: color.c1
    }
  },
  lineStyle: {
    normal: {
      width: 2
    }
  },
  data: []
}

/**
 * 关系图系series风格配置
 */
const GRAPH_SERIES_STYLE = {
  // 关系图
  type: 'graph',
  /**
   * 'none' 不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
   * 'circular' 采用环形布局，见示例 Les Miserables，布局相关的配置项见 graph.circular
   * 'force' 采用力引导布局，见示例 Force，布局相关的配置项见 graph.force
   */
  layout: 'none',
  // 是否启用图例 hover(悬停) 时的联动高亮。
  legendHoverLink: true,
  // 是否开启鼠标悬停节点的显示动画
  hoverAnimation: true,
  // 坐标系可选
  coordinateSystem: null,
  // x轴坐标 有多种坐标系轴坐标选项
  xAxisIndex: 0,
  // y轴坐标
  yAxisIndex: 0,
  // 力引导图基本配置
  force: {
    // 力引导的初始化布局，默认使用xy轴的标点
    // initLayout: ,
    // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
    repulsion: 80,
    // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
    gravity: 0.03,
    // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
    edgeLength: 90,
    // 因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
    layoutAnimation: false
  },
  // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
  roam: false,
  // 鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
  nodeScaleRatio: 0.6,
  // 节点是否可拖拽，只在使用力引导布局的时候有用。
  draggable: false,
  // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
  focusNodeAdjacency: true,
  // 关系图节点标记的图形。ECharts 提供的标记类型包括 'circle'(圆形), 'rect'（矩形）, 'roundRect'（圆角矩形）, 'triangle'（三角形）, 'diamond'（菱形）, 'pin'（大头针）, 'arrow'（箭头）  也可以通过 'image://url' 设置为图片，其中 url 为图片的链接。'path:// 这种方式可以任意改变颜色并且抗锯齿
  symbol: 'rect',
  // 也可以用数组分开表示宽和高，例如 [20, 10] 如果需要每个数据的图形大小不一样，可以设置为如下格式的回调函数：(value: Array|number, params: Object) => number|Array
  // symbolSize: 10,
  // 关系图节点标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
  // symbolRotate:,
  // 关系图节点标记相对于原本位置的偏移。[0, '50%']
  // symbolOffset:[0,0],
  // 边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
  edgeSymbol: [ 'none', 'none' ],
  // edgeSymbol: ['none', 'arrow'],
  // 边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
  edgeSymbolSize: 10,
  // 图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
  itemStyle: {
    normal: {
      // 默认样式
      label: {
        show: true,
        textStyle: {
          rich: {
            a: {
              color: '#666',
              fontSize: 12,
              lineHeight: 14,
              align: 'left'
            },
            b: {
              // color: '#D8D8D8',
              fontSize: 12,
              lineHeight: 14,
              align: 'center'
            }
          }
        },
        formatter: function(val) {
          let result = ''
          // result = `{a|${val.data.value}}\n{b|${val.data.name}}`
          result = `{b|${val.data.name}}`
          return result
        }
      },
      // item背景色
      // color: 'rgba(255,215,0,1)',
      // 图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
      borderType: 'solid',
      // 设置图形边框为淡金色,透明度为0.4
      // borderColor: 'rgba(255,215,0,1)',
      // 图形的描边线宽。为 0 时无描边。
      borderWidth: 2,
      // 阴影大小
      shadowBlur: 10,
      // 阴影颜色
      shadowColor: 'rgba(0,0,0,.3)',
      // 阴影水平偏移
      shadowOffsetX: 0,
      // 阴影垂直偏移
      shadowOffsetY: 0,
      // 透明度
      opacity: 1
    },
    // 高亮状态
    emphasis: {
      lineStyle: {
        width: 3
      }
    }
  },
  // 关系边的公用线条样式。
  lineStyle: {
    normal: {
      color: 'source',
      width: 1,
      // 线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
      type: 'solid',
      // 线条的曲线程度，从0到1
      curveness: 0.2,
      // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
      opacity: 0.4
    },
    // 高亮状态
    emphasis: {
      width: 4
    }
  },
  // 图形上的文本标签
  label: {
    normal: {
      // 是否显示标签。
      show: true,
      // 标签的位置。['50%', '50%'] [x,y]
      position: 'top',
      // 标签的字体样式
      textStyle: {
        // 字体颜色
        // color: '#FFFFFF',
        // 文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
        fontStyle: 'normal',
        // 'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
        // fontWeight: 'bolder',
        // 文字的字体系列
        fontFamily: 'sans-serif',
        // 字体大小
        fontSize: 12
      }
    },
    // 高亮状态
    emphasis: {
    }
  },
  // 线条的边缘标签
  edgeLabel: {
    normal: {
      show: false
    },
    // 高亮状态
    emphasis: {
    }
  }
}

/**
 * 漏斗图配置
 */
const FUNNEL_SERIES_STYLE = {

  // x2: 80,
  // height: {totalHeight} - y - y2,
  name: '漏斗分析',
  type: 'funnel',
  // top: 0,
  bottom: '10%',
  left: 'center',
  width: '70%',
  min: 0,
  // max: 0,
  minSize: '0%',
  maxSize: '100%',
  sort: 'none',
  gap: 5,
  label: {
    normal: {
      color: color.gray.colorGraySSSS,
      position: 'inside',
      formatter: '{b}'
    }
    // emphasis: {
    //   position: "inside",
    //   formatter: "{b}实际: {c}%"
    // }
  },
  // labelLine: {
  //   length: 10,
  //   lineStyle: {
  //     width: 1,
  //     type: 'solid'
  //   }
  // },
  itemStyle: {
    normal: {
      // borderColor: '#ff0000',
      borderWidth: 0,
      color: function(params) {
        var colorList = [
          color.c4,
          color.c1,
          color.c8,
          color.c3,
          color.c5,
          color.c6
        ]
        return colorList[params.dataIndex]
      }
    }
  },
  emphasis: {
    label: {
      fontSize: 15
    }
  }
}

export {
  DEFAULT_OPTION,
  AXIS_OPTION,
  PIE_SERIES_STYLE,
  BAR_SERIES_STYLE,
  LINE_SERIES_STYLE,
  LINE_SERIES_STYLE_2,
  TOOLTIP_FORMATTER_STYLE,
  GRAPH_SERIES_STYLE,
  FUNNEL_SERIES_STYLE
}