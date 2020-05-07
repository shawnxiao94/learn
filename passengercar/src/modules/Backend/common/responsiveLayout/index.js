/**
 * @see 响应式适配布局
 *   */
import { objectMerge } from '@/common/utils/index'
import storeB from 'dataB/store'
import Layout from './layout'
class ResponsiveLayout {
  // 构造函数
  constructor(options) {
    this.setupOptions(options)
    this.run()
  }
  // 默认配置
  setupOptions(options) {
    const defaultOptions = {
      /**
       *  默认配置
       * */
      terminalWidth: {
        // 手机端宽度
        mobileMaxWidth: 768,
        // Ipad宽度
        ipadMaxWidth: 1200
      },
      clientType: 'pc'
    }
    this.options = objectMerge(defaultOptions, options)
  }
  // run
  run() {
    // remove resize
    this.clearWindowResize()
    // window resize
    this.windowResize()
    // 设置终端类型
    this.setupClientType()
    // 执行layout响应式布局
    this.setupLayout()
  }
  // window resize
  windowResize() {
    // 设置终端类型
    window.addEventListener('resize', this.setupClientType.bind(this))
  }
  // remove resize
  clearWindowResize() {
    // 设置终端类型
    window.removeEventListener('resize', this.setupClientType.bind(this))
    // 清楚layout window resize事件
    this.layout && this.layout.clearWindowResize()
  }
  // 设置终端类型
  setupClientType(e) {
    if (e && e.dispatchEvent) {
      return
    }
    let _windowInnerWidth = window.innerWidth
    if (_windowInnerWidth < this.options.terminalWidth.mobileMaxWidth) {
      storeB.dispatch('SetClientType', 'mobile')
      this.options.clientType = 'mobile'
    } else if (_windowInnerWidth < this.options.terminalWidth.ipadMaxWidth) {
      storeB.dispatch('SetClientType', 'ipad')
      this.options.clientType = 'ipad'
    } else {
      storeB.dispatch('SetClientType', 'pc')
      this.options.clientType = 'pc'
    }
  }
  // 执行layout响应式布局
  setupLayout() {
    this.layout = new Layout(this)
  }
}
export default function responsiveLayout(options) {
  new ResponsiveLayout(options)
}
