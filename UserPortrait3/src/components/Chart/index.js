/**
 * 全局Charts组建封装
 * @props {Object} option 图表配置文件
 * @props {Object} styles 图表容器CSS样式
 * @props {String} renderer 用于配置渲染方式 可以是 svg 或者 canvas
 * @props {Boolean} notMerge 可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。
 * @props {Boolean} lazyUpdate 可选，在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
 * @props {Boolean} silent 可选，阻止调用 setOption 时抛出事件，默认为 false，即抛出事件。
 */
 
import React, { PureComponent } from 'react'
import echarts from 'echarts'
import './index.less'
/**
 * 节流
 */
import { throttle } from 'throttle-debounce'
export default class Chart extends PureComponent {
  constructor(props) {
    super(props)
    /**
     * 图表实例
     */
    this.chart = null
    /**
     * 节流图表resize事件，声明公用变量方便注册和销毁
     */
    this.throttleFunction = throttle(300, this.resize.bind(this))
  }
  async componentDidMount() {
    /**
     * 初始化图表
     */
    await this.initChart(this.el)
    /**
     * 将传入的配置(包含数据)注入
     */
    this.setOption(this.props.option)
    /**
     * 监听屏幕缩放，重新绘制 echart 图表
     */
    window.addEventListener('resize', this.throttleFunction)
  }
  componentDidUpdate() {
    /**
     * 每次更新组件都重置
     */
    this.setOption(this.props.option)
  }
  componentWillUnmount() {
    /**
     * 组件卸载前卸载图表
     */
    this.dispose()
  }
  render() {
    /**
     * 父组建额外声明样式
     */
    const _styles = this.props.styles ? this.props.styles : {}
    return (
      <div
        className='default-chart'
        ref={el => (this.el = el)}
        style={{
          width: '100%',
          height: '100%',
          ..._styles
        }}
      />
    )
  }
  initChart = el => {
    /**
     * renderer 用于配置渲染方式 可以是 svg 或者 canvas
     */
    const renderer = this.props.renderer || 'canvas'

    /**
     * 注意：
     * 虽然在 componentDidMount 中组件已经被装配，
     * 但是如果设置容器宽高为百分比的值，那么容器的 clientWidth 和 clientHeight 有可能还处于计算中
     * 这个时候如果在容器中实例化 echarts，echarts 获得的 clientWidth 和 clientHeight 不一定是我们预期的，
     * 因此这里使用了定时器延迟实例化，也可以提前计算出像素之后 赋值给 width、height，这样不是百分比就没有问题
     */
    return new Promise(resolve => {
      setTimeout(() => {
        this.chart = echarts.init(el, null, {
          renderer,
          width: 'auto',
          height: 'auto'
        })
        resolve()
      }, 0)
    })
  };
  setOption = option => {
    if (!this.chart) {
      return
    }
    /**
     * 可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。
     */
    const notMerge = this.props.notMerge
      
    /**
     * 可选，在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
     */
    const lazyUpdate = this.props.lazyUpdate

    /**
     * 可选，阻止调用 setOption 时抛出事件，默认为 false，即抛出事件。
     */
    const silent = this.props.silent

    this.chart.setOption(option, {
      notMerge,
      lazyUpdate,
      silent
    })
    /**
     * 关系图悬浮显示单向关系
     * @count 控制鼠标进入和移除节点时执行一次
     */
    const _this = this
    let count = 0
    this.chart.on('mouseover', function(params) {
      option.series[0].type === 'graph' && count === 0 && _this.foucusNode(params)
      ++count
    })
    this.chart.on('mouseout', function(params) {
      count--
    })
  };
  dispose = () => {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    window.removeEventListener('resize', this.throttleFunction)
    this.throttleFunction.cancel()
  };
  resize = () => {
    if (this.chart._dom.offsetWidth === 0) {
      /**
       * 当图表父层DOM状态为display：none，不重新计算图表尺寸，以免以0宽度0高度计算错位
       */
      return
    }
    if (this.props.resize) {
      this.props.resize(this.chart)
    }
    this.chart && this.chart.resize()
  };
  foucusNode = params => {
    this.props.foucusNode(params)
  }
  // unfoucusNode = params => {
  //   this.props.unfoucusNode(params)
  // }
  getInstance = () => {
    return this.chart
  };
}